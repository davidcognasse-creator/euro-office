// Petites fonctions utilitaires partagées par le générateur et la newsletter.
// Aucune dépendance externe : on garde le build léger et robuste.

/**
 * Parse un fichier Markdown avec en-tête (front matter) au format simple :
 *
 *   ---
 *   title: Mon titre
 *   date: 2026-06-09
 *   tags: souveraineté, nextcloud
 *   ---
 *   Contenu Markdown...
 *
 * Renvoie { data, body }.
 */
export function parseFrontMatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // Retire les guillemets éventuels.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Les listes simples séparées par des virgules deviennent des tableaux.
    if (key === "tags" && value) {
      data[key] = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }

  return { data, body: raw.slice(match[0].length) };
}

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Formate une date ISO (YYYY-MM-DD) en français long : « 9 juin 2026 ». */
export function formatDateFr(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return String(iso);
  return `${d} ${MONTHS_FR[m - 1]} ${y}`;
}

/** Renvoie un libellé mois/année : « juin 2026 ». */
export function monthLabelFr(iso) {
  const [y, m] = String(iso).split("-").map(Number);
  return `${MONTHS_FR[m - 1]} ${y}`;
}

/** Transforme un texte en slug URL. */
export function slugify(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Échappe les caractères spéciaux XML/HTML pour un contenu texte. */
export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Estime le temps de lecture (≈ 200 mots/minute). */
export function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
