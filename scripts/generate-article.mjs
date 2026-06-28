// Génération automatique d'un article d'actualité Euro-Office.
//
// Utilise l'API Claude (Anthropic) avec l'outil de recherche web pour :
//   1. trouver UNE actualité Euro-Office récente, réelle et notable,
//   2. rédiger un article en français au format Markdown + front matter du site,
//   3. l'écrire dans content/articles/ (la GitHub Action s'occupe du commit/PR).
//
// Garde-fous :
//   - Maximum un article par jour (on s'arrête si un article porte déjà la date du jour).
//   - On évite les sujets déjà couverts (les titres existants sont fournis au modèle).
//   - Si aucune actu pertinente n'est trouvée, on ne crée rien.
//
// Variables d'environnement :
//   ANTHROPIC_API_KEY  (requis)  clé API Anthropic
//   ARTICLE_MODEL      (option)  id de modèle, défaut "claude-sonnet-4-6"
//   ARTICLE_DATE       (option)  date forcée AAAA-MM-JJ (sinon : aujourd'hui)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontMatter, slugify } from "../src/lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "content", "articles");

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ARTICLE_MODEL || "claude-sonnet-4-6";

// Réserve de photos (Unsplash, licence libre, sans filigrane) distinctes de
// celles des 5 articles fondateurs. Une photo est choisie de façon déterministe
// selon le slug, puis téléchargée dans public/assets/articles/<slug>.jpg.
const IMAGE_POOL = [
  "1522071820081-009f0129c71c", // équipe de développement
  "1454165804606-c3d57bc86b40", // revue de documents
  "1551434678-e076c223a692", // bureau / développeurs
  "1460925895917-afdab827c52f", // tableau de bord / données
  "1497215728101-856f4ea42174", // poste de travail lumineux
  "1521791136064-7986c2920216", // poignée de main / partenariat
  "1559136555-9303baea8ebd", // open space / coworking
  "1487058792275-0ad4aaf24ca7", // code coloré à l'écran
  "1504384308090-c894fdcc538d", // grand open space / communauté
  "1517245386807-bb43f82c33c4", // réunion / échange autour d'un écran
  "1553877522-43269d4ea984", // collaboration (noir & blanc)
  "1542435503-956c469947f6", // bureau épuré / rédaction
  "1451187580459-43490279c0fa", // Terre de nuit / connectivité européenne
];

function pickImageId(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return IMAGE_POOL[h % IMAGE_POOL.length];
}

async function downloadImage(slug) {
  try {
    const id = pickImageId(slug);
    const url = `https://images.unsplash.com/photo-${id}?w=1280&h=720&fit=crop&crop=entropy&q=72`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    const dir = path.join(ROOT, "public", "assets", "articles");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${slug}.jpg`), buf);
    console.log(`✓ Photo ajoutée : public/assets/articles/${slug}.jpg`);
  } catch (e) {
    console.log(`⚠ Photo non récupérée (${e.message}) — l'article utilisera l'aplat coloré.`);
  }
}

function today() {
  if (process.env.ARTICLE_DATE) return process.env.ARTICLE_DATE;
  return new Date().toISOString().slice(0, 10);
}

function existingArticles() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseFrontMatter(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8")).data);
}

function buildPrompt(date, titles) {
  const list = titles.map((t) => `- ${t}`).join("\n");
  return `Tu es l'assistant de rédaction d'« Euro-Office Actus », un site d'information **indépendant** (non affilié) qui suit l'actualité d'**Euro-Office**, la suite bureautique open source et souveraine européenne (alternative à Microsoft 365 / Google Workspace, liée à Nextcloud, IONOS, etc.).

OBJECTIF : à l'aide de la recherche web, trouve UNE actualité **récente** (idéalement moins de 14 jours), **réelle, vérifiable et notable** concernant Euro-Office, puis rédige un court article de presse en français.

CONTRAINTES IMPÉRATIVES :
- N'utilise QUE des informations trouvées via la recherche web. **N'invente rien.** Si tu n'es pas sûr, ne le publie pas.
- L'actualité doit être **différente** des articles déjà publiés ci-dessous :
${list}
- Si tu ne trouves aucune actualité récente, réelle et suffisamment notable qui ne soit pas déjà couverte, réponds EXACTEMENT par : NO_NEWS
- Indique une **source réelle** (nom du média + URL exacte issue de tes recherches).

FORMAT DE SORTIE (rien d'autre, pas de commentaire autour) :
SLUG: <slug-court-en-minuscules-avec-tirets>
---FILE---
---
title: "<titre accrocheur et factuel>"
date: ${date}
description: "<résumé d'1 à 2 phrases>"
kicker: "<Actualité | Sortie | Débat | Analyse | Écosystème>"
author: "Rédaction (veille assistée par IA)"
tags: <2 ou 3 mots-clés séparés par des virgules>
source: "<nom du média>"
sourceUrl: "<URL exacte de la source>"
---

<corps de l'article en Markdown, 350 à 600 mots, en français, avec 2 ou 3 sous-titres "## ...". Ton journalistique, neutre et sourcé. Termine si pertinent par une mise en perspective.>`;
}

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2500,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 6 }],
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Erreur API Anthropic (${res.status}) : ${body}`);
  }
  const data = await res.json();
  // On concatène tous les blocs de texte de la réponse finale.
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

function parseOutput(text) {
  if (/NO_NEWS/.test(text)) return null;
  const fileIdx = text.indexOf("---FILE---");
  if (fileIdx === -1) return null;

  const slugMatch = /SLUG:\s*(.+)/.exec(text.slice(0, fileIdx));
  const fileContent = text.slice(fileIdx + "---FILE---".length).trim();

  // Validation minimale : front matter avec au moins un titre et une date.
  const { data } = parseFrontMatter(fileContent);
  if (!data.title || !data.date) return null;

  const slug = slugify(slugMatch ? slugMatch[1].trim() : data.title);
  return { slug, content: fileContent, data };
}

async function main() {
  if (!API_KEY) {
    console.error("✗ ANTHROPIC_API_KEY manquant.");
    process.exit(1);
  }
  const date = today();
  const articles = existingArticles();

  // Garde-fou « max 1 article par jour ».
  if (articles.some((a) => String(a.date) === date)) {
    console.log(`Un article porte déjà la date ${date} : rien à générer aujourd'hui.`);
    return;
  }

  const titles = articles.map((a) => a.title).filter(Boolean);
  console.log(`Recherche d'une actualité pour le ${date} (modèle ${MODEL})…`);

  const text = await callClaude(buildPrompt(date, titles));
  const parsed = parseOutput(text);

  if (!parsed) {
    console.log("Aucune actualité pertinente trouvée (ou réponse invalide) : rien n'est créé.");
    return;
  }

  const filename = `${date}-${parsed.slug}.md`;
  const outPath = path.join(ARTICLES_DIR, filename);
  fs.writeFileSync(outPath, parsed.content.endsWith("\n") ? parsed.content : parsed.content + "\n");
  await downloadImage(parsed.slug);

  console.log(`✓ Article généré : content/articles/${filename}`);
  console.log(`  Titre : ${parsed.data.title}`);
  // Sortie machine pour la GitHub Action.
  console.log(`::set-article-title::${parsed.data.title}`);
}

main().catch((err) => {
  console.error("✗ Échec de la génération :", err.message);
  process.exit(1);
});
