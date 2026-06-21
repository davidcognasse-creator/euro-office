// Gabarits HTML du site. Tout est en template literals : pas de moteur de
// template externe, ce qui garde le build transparent et facile à modifier.

import { site } from "../site.config.mjs";
import { formatDateFr, escapeHtml } from "./lib.mjs";
import { withBase } from "./url.mjs";

/** En-tête commun avec navigation. `current` est le href de la page active. */
function header(current) {
  const items = site.nav
    .map((item) => {
      const active =
        item.href === current ||
        (item.href !== "/" && current.startsWith(item.href))
          ? ' aria-current="page"'
          : "";
      return `<a href="${withBase(item.href)}"${active}>${item.label}</a>`;
    })
    .join("");

  return `<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${withBase("/")}">
      <span class="brand-mark" aria-hidden="true">★</span>
      <span class="brand-text">${site.shortName}<small>Actus</small></span>
    </a>
    <button class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav">${items}</nav>
  </div>
</header>`;
}

/** Pied de page commun. */
function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <span class="brand-mark" aria-hidden="true">★</span>
      <strong>${site.shortName} Actus</strong>
      <p>${escapeHtml(site.tagline)}.</p>
      <p class="footer-note">Site d'information indépendant. Non affilié officiellement au projet Euro-Office.</p>
    </div>
    <nav class="footer-col" aria-label="Navigation pied de page">
      <h3>Naviguer</h3>
      ${site.nav.map((n) => `<a href="${withBase(n.href)}">${n.label}</a>`).join("")}
    </nav>
    <nav class="footer-col" aria-label="Liens utiles">
      <h3>Ressources</h3>
      <a href="${site.links.projet}" rel="noopener" target="_blank">Projet Euro-Office</a>
      <a href="${site.links.nextcloud}" rel="noopener" target="_blank">Nextcloud</a>
      <a href="${withBase(site.links.rss)}">Flux RSS</a>
    </nav>
    <div class="footer-col">
      <h3>Newsletter</h3>
      <p>Un seul e-mail par mois, les actualités essentielles.</p>
      <a class="btn btn-small" href="${withBase("/newsletter/")}">S'inscrire</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© ${year} ${site.shortName} Actus · Contenu sous licence CC BY-SA 4.0</span>
    <span>Fait en Europe 🇪🇺</span>
  </div>
</footer>`;
}

/** Gabarit principal : enveloppe le contenu d'une page. */
export function layout({
  title,
  description = site.description,
  content,
  current = "/",
  extraHead = "",
  bodyClass = "",
  canonical = "",
}) {
  const fullTitle =
    title && title !== site.name ? `${title} · ${site.name}` : site.name;
  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta property="og:title" content="${escapeHtml(fullTitle)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${escapeHtml(site.name)}">
<meta name="twitter:card" content="summary_large_image">
${canonical ? `<link rel="canonical" href="${canonical}">` : ""}
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.name)}" href="${withBase("/rss.xml")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${withBase("/assets/style.css")}">
<link rel="icon" href="${withBase("/assets/favicon.svg")}" type="image/svg+xml">
${extraHead}
</head>
<body class="${bodyClass}">
${header(current)}
<main id="contenu">
${content}
</main>
${footer()}
<script src="${withBase("/assets/main.js")}" defer></script>
</body>
</html>`;
}

/** Carte d'article pour les listes. */
export function articleCard(article, { featured = false } = {}) {
  const tags = (article.tags || [])
    .slice(0, 2)
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");
  const media = article.image
    ? `<div class="card-media has-photo">
      <img src="${withBase(article.image)}" alt="" loading="lazy" decoding="async" width="1280" height="720">
      <span class="card-kicker">${escapeHtml(article.kicker || "Actualité")}</span>
    </div>`
    : `<div class="card-media" style="--accent: ${article.accent || "#003399"}">
      <span class="card-kicker">${escapeHtml(article.kicker || "Actualité")}</span>
    </div>`;
  return `<article class="card${featured ? " card-featured" : ""}">
  <a class="card-link" href="${withBase(article.url)}">
    ${media}
    <div class="card-body">
      <div class="card-meta">
        <time datetime="${article.date}">${formatDateFr(article.date)}</time>
        <span aria-hidden="true">·</span>
        <span>${article.readingTime} min</span>
      </div>
      <h3 class="card-title">${escapeHtml(article.title)}</h3>
      <p class="card-excerpt">${escapeHtml(article.description)}</p>
      <div class="card-tags">${tags}</div>
    </div>
  </a>
</article>`;
}

/** Bloc d'inscription newsletter réutilisable. */
export function newsletterBlock({ compact = false } = {}) {
  // En mode « formulaire Brevo intégré » (GitHub Pages), on renvoie vers la
  // page newsletter qui contient le formulaire ; sinon, formulaire AJAX en ligne.
  const cta = site.newsletter && site.newsletter.embedUrl
    ? `<a class="btn nl-cta-btn" href="${withBase("/newsletter/")}">S'inscrire à la newsletter</a>`
    : `<form class="nl-form" data-newsletter action="${withBase("/api/subscribe")}" method="post">
        <label class="sr-only" for="nl-email">Adresse e-mail</label>
        <input id="nl-email" type="email" name="email" required placeholder="vous@exemple.eu" autocomplete="email">
        <input type="text" name="company" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true">
        <button type="submit" class="btn">S'inscrire</button>
        <p class="nl-status" role="status" aria-live="polite"></p>
      </form>`;

  return `<section class="newsletter-cta${compact ? " compact" : ""}">
  <div class="container">
    <div class="nl-inner">
      <div class="nl-text">
        <h2>Une fois par mois, l'essentiel d'Euro-Office</h2>
        <p>Recevez automatiquement le récapitulatif mensuel des actualités, analyses et nouveautés. Pas de spam, désabonnement en un clic.</p>
      </div>
      ${cta}
    </div>
  </div>
</section>`;
}
