// Gestion du préfixe d'URL (« base path »).
// Sur GitHub Pages, le site est servi sous /euro-office/ : tous les liens
// internes et les ressources doivent être préfixés. Sur Netlify/Vercel ou un
// domaine personnalisé, basePath vaut "" et rien n'est modifié.

import { site } from "../site.config.mjs";

const base = (site.basePath || "").replace(/\/+$/, "");

/** Préfixe un chemin interne absolu (commençant par /) avec le base path. */
export function withBase(p) {
  if (!p) return p;
  if (/^(https?:)?\/\//.test(p) || p.startsWith("mailto:") || p.startsWith("#")) {
    return p;
  }
  if (!p.startsWith("/")) return p;
  return base + p;
}

/** Construit une URL absolue complète (domaine + base path + chemin). */
export function abs(p) {
  return site.url.replace(/\/+$/, "") + withBase(p);
}

/** Réécrit les liens/images internes (href/src="/…") d'un fragment HTML. */
export function rewriteLinks(html) {
  if (!base || !html) return html;
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
}

export { base as basePath };
