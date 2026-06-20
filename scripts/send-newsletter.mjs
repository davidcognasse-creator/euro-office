// Génère et envoie la newsletter mensuelle d'Euro-Office Actus.
//
// Fonctionnement :
//   1. Sélectionne les articles publiés le mois ciblé (par défaut : le mois
//      précédent, car le script tourne le 1er du mois via GitHub Actions).
//   2. Construit un e-mail HTML soigné (styles en ligne pour la compatibilité).
//   3. Crée et envoie une campagne Brevo vers la liste d'abonnés.
//
// Modes :
//   node scripts/send-newsletter.mjs            → envoie réellement
//   node scripts/send-newsletter.mjs --preview  → écrit un aperçu, n'envoie rien
//
// Variables d'environnement :
//   BREVO_API_KEY    — clé API Brevo (requise pour l'envoi)
//   BREVO_LIST_ID    — identifiant de la liste d'abonnés
//   NEWSLETTER_MONTH — (optionnel) mois ciblé au format YYYY-MM (sinon : mois précédent)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../site.config.mjs";
import { parseFrontMatter, formatDateFr, monthLabelFr, slugify } from "../src/lib.mjs";
import { abs } from "../src/url.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const PREVIEW = process.argv.includes("--preview");

// --- 1. Déterminer le mois ciblé -------------------------------------------
function targetMonth() {
  if (process.env.NEWSLETTER_MONTH) return process.env.NEWSLETTER_MONTH;
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() - 1, 1); // mois précédent
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function loadArticlesForMonth(ym) {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = parseFrontMatter(
        fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8")
      );
      const slug = slugify(
        data.slug || f.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "")
      );
      return { ...data, slug, url: `/actualites/${slug}/` };
    })
    .filter((a) => String(a.date).startsWith(ym))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

// --- 2. Construire l'e-mail HTML -------------------------------------------
function buildEmail(articles, ym) {
  const monthName = monthLabelFr(ym + "-01");
  const items = articles
    .map(
      (a) => `
      <tr><td style="padding:0 0 26px;">
        <a href="${abs(a.url)}" style="color:#003399;text-decoration:none;font-family:Georgia,serif;font-size:20px;font-weight:bold;line-height:1.3;display:block;">${a.title}</a>
        <div style="color:#717885;font-size:13px;margin:6px 0 8px;">${formatDateFr(a.date)}${a.kicker ? " · " + a.kicker : ""}</div>
        <div style="color:#23282f;font-size:15px;line-height:1.6;">${a.description}</div>
        <a href="${abs(a.url)}" style="color:#003399;font-size:14px;font-weight:bold;text-decoration:none;display:inline-block;margin-top:8px;">Lire l'article →</a>
      </td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e9ee;">
        <tr><td style="background:#003399;padding:28px 32px;">
          <span style="color:#ffcc00;font-size:18px;">★</span>
          <span style="color:#ffffff;font-family:Georgia,serif;font-size:18px;font-weight:bold;margin-left:6px;">${site.shortName} Actus</span>
          <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:6px;">La newsletter mensuelle · ${monthName}</div>
        </td></tr>
        <tr><td style="padding:32px 32px 8px;">
          <h1 style="font-family:Georgia,serif;font-size:24px;color:#14181f;margin:0 0 8px;">L'essentiel d'Euro-Office en ${monthName}</h1>
          <p style="color:#444c59;font-size:15px;line-height:1.6;margin:0 0 24px;">Voici les actualités marquantes du mois. Bonne lecture !</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
        </td></tr>
        <tr><td style="padding:8px 32px 28px;">
          <a href="${abs("/formation/")}" style="display:inline-block;background:#003399;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:999px;">Découvrir l'espace formation</a>
        </td></tr>
        <tr><td style="background:#f7f8fa;padding:22px 32px;border-top:1px solid #e7e9ee;">
          <p style="color:#717885;font-size:12px;line-height:1.6;margin:0;">
            Vous recevez cet e-mail car vous êtes inscrit·e à la newsletter d'${site.shortName} Actus.<br>
            <a href="{{ unsubscribe }}" style="color:#717885;">Se désabonner</a> · <a href="${abs("/")}" style="color:#717885;">${abs("/").replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
          </p>
        </td></tr>
      </table>
      <p style="color:#a0a6b0;font-size:11px;margin:16px 0 0;">Site d'information indépendant · Non affilié officiellement au projet Euro-Office.</p>
    </td></tr>
  </table>
</body></html>`;
}

// --- 3. Envoyer via Brevo ---------------------------------------------------
async function sendViaBrevo({ subject, html, ym }) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) {
    throw new Error("BREVO_API_KEY et BREVO_LIST_ID sont requis pour l'envoi.");
  }

  // Création de la campagne.
  const createRes = await fetch("https://api.brevo.com/v3/emailCampaigns", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: `Newsletter ${site.shortName} — ${ym}`,
      subject,
      sender: { name: site.newsletterFromName, email: site.newsletterFromEmail },
      htmlContent: html,
      recipients: { listIds: [listId] },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Création de campagne échouée (${createRes.status}) : ${err}`);
  }
  const { id } = await createRes.json();
  console.log(`✓ Campagne créée (id ${id}).`);

  // Envoi immédiat.
  const sendRes = await fetch(
    `https://api.brevo.com/v3/emailCampaigns/${id}/sendNow`,
    { method: "POST", headers: { "api-key": apiKey, Accept: "application/json" } }
  );
  if (!sendRes.ok && sendRes.status !== 204) {
    const err = await sendRes.text();
    throw new Error(`Envoi échoué (${sendRes.status}) : ${err}`);
  }
  console.log("✓ Newsletter envoyée à la liste d'abonnés.");
}

// --- Programme principal ----------------------------------------------------
async function main() {
  const ym = targetMonth();
  const articles = loadArticlesForMonth(ym);
  const monthName = monthLabelFr(ym + "-01");

  console.log(`Mois ciblé : ${monthName} (${ym}) — ${articles.length} article(s).`);

  if (articles.length === 0) {
    console.log("Aucun article ce mois-ci : pas d'envoi (newsletter vide évitée).");
    return;
  }

  const subject = `Euro-Office : l'essentiel de ${monthName}`;
  const html = buildEmail(articles, ym);

  if (PREVIEW) {
    const outDir = path.join(ROOT, "dist");
    fs.mkdirSync(outDir, { recursive: true });
    const out = path.join(outDir, "newsletter-preview.html");
    fs.writeFileSync(out, html);
    console.log(`✓ Aperçu écrit : ${path.relative(ROOT, out)} (aucun envoi).`);
    return;
  }

  await sendViaBrevo({ subject, html, ym });
}

main().catch((err) => {
  console.error("✗ Échec de la newsletter :", err.message);
  process.exit(1);
});
