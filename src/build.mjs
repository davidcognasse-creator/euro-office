// Générateur de site statique pour Euro-Office Actus.
// Lit le contenu Markdown de /content, produit le HTML final dans /dist.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { site } from "../site.config.mjs";
import {
  parseFrontMatter,
  formatDateFr,
  slugify,
  escapeHtml,
  readingTime,
} from "./lib.mjs";
import {
  layout,
  articleCard,
  newsletterBlock,
} from "./templates.mjs";
import { withBase, abs, rewriteLinks } from "./url.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT = path.join(ROOT, "content");
const PUBLIC = path.join(ROOT, "public");
const DIST = path.join(ROOT, "dist");

// Palette d'accents attribuée aux articles, par roulement.
const ACCENTS = ["#003399", "#1c5fb4", "#0a7d5a", "#b8860b", "#7a3ea3"];

marked.setOptions({ gfm: true, breaks: false });

// ----------------------------------------------------------------------------
// Helpers fichiers
// ----------------------------------------------------------------------------
function read(file) {
  return fs.readFileSync(file, "utf8");
}
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}
function writePage(relPath, html) {
  const out = path.join(DIST, relPath);
  ensureDir(path.dirname(out));
  fs.writeFileSync(out, html);
}
function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  ensureDir(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

// ----------------------------------------------------------------------------
// Chargement du contenu
// ----------------------------------------------------------------------------
function loadArticles() {
  const dir = path.join(CONTENT, "articles");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const articles = files.map((file, i) => {
    const { data, body } = parseFrontMatter(read(path.join(dir, file)));
    const baseSlug =
      data.slug || file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const slug = slugify(baseSlug);
    const html = rewriteLinks(marked.parse(body));
    // Image de couverture : champ `image` explicite, sinon détection auto d'un
    // fichier public/assets/articles/<slug>.jpg. Null = repli sur l'aplat coloré.
    let image = data.image || null;
    if (!image) {
      const guess = path.join(PUBLIC, "assets", "articles", `${slug}.jpg`);
      if (fs.existsSync(guess)) image = `/assets/articles/${slug}.jpg`;
    }
    return {
      ...data,
      slug,
      url: `/actualites/${slug}/`,
      html,
      image,
      bodyText: body,
      readingTime: readingTime(body),
      accent: data.accent || ACCENTS[i % ACCENTS.length],
      kicker: data.kicker || "Actualité",
    };
  });
  // Tri par date décroissante (la plus récente d'abord).
  articles.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return articles;
}

function loadFormation() {
  const dir = path.join(CONTENT, "formation");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const modules = files.map((file) => {
    const { data, body } = parseFrontMatter(read(path.join(dir, file)));
    const slug = slugify(data.slug || file.replace(/\.md$/, "").replace(/^\d+-/, ""));
    return {
      ...data,
      slug,
      url: `/formation/${slug}/`,
      html: rewriteLinks(marked.parse(body)),
      order: Number(data.order || 99),
      duration: data.duration || "",
    };
  });
  modules.sort((a, b) => a.order - b.order);
  return modules;
}

function loadPage(name) {
  const file = path.join(CONTENT, "pages", `${name}.md`);
  const { data, body } = parseFrontMatter(read(file));
  return { ...data, html: rewriteLinks(marked.parse(body)) };
}

// ----------------------------------------------------------------------------
// Rendu des pages
// ----------------------------------------------------------------------------
function renderHome(articles, modules) {
  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 4);

  const hero = `<section class="hero">
  <div class="container hero-inner">
    <p class="eyebrow">${escapeHtml(site.tagline)}</p>
    <h1>Suivez l'aventure d'<span class="accent">Euro-Office</span>, la bureautique souveraine européenne.</h1>
    <p class="hero-lead">Actualités vérifiées, analyses et formation autour de la suite open source qui veut offrir à l'Europe une alternative à Microsoft 365 et Google Workspace.</p>
    <div class="hero-actions">
      <a class="btn" href="${withBase("/actualites/")}">Lire les actualités</a>
      <a class="btn btn-ghost" href="${withBase("/formation/")}">Découvrir la formation</a>
    </div>
  </div>
</section>`;

  const featuredBlock = `<section class="container section">
  <div class="section-head">
    <h2>À la une</h2>
    <a class="section-link" href="${withBase("/actualites/")}">Toutes les actualités →</a>
  </div>
  <div class="featured-grid">
    ${articleCard(featured, { featured: true })}
    <div class="featured-side">
      ${secondary.map((a) => articleCard(a)).join("\n")}
    </div>
  </div>
</section>`;

  const formationTeaser = `<section class="container section">
  <div class="section-head">
    <h2>Espace formation</h2>
    <a class="section-link" href="${withBase("/formation/")}">Voir le parcours →</a>
  </div>
  <div class="formation-teaser">
    <p class="formation-intro">Vous découvrez Euro-Office ? Notre parcours en ${modules.length} étapes vous explique son intérêt, son installation et son usage au quotidien.</p>
    <ol class="formation-steps">
      ${modules
        .map(
          (m) => `<li>
        <a href="${withBase(m.url)}">
          <span class="step-num">${String(m.order).padStart(2, "0")}</span>
          <span class="step-text">
            <strong>${escapeHtml(m.title)}</strong>
            <small>${escapeHtml(m.summary || "")}</small>
          </span>
        </a>
      </li>`
        )
        .join("\n")}
    </ol>
  </div>
</section>`;

  const content = hero + featuredBlock + formationTeaser + newsletterBlock();
  return layout({
    title: site.name,
    description: site.description,
    content,
    current: "/",
    bodyClass: "page-home",
    canonical: abs("/"),
  });
}

function renderArticlesIndex(articles) {
  const cards = articles.map((a) => articleCard(a)).join("\n");
  const content = `<section class="container section">
  <div class="page-head">
    <p class="eyebrow">Le fil d'actualité</p>
    <h1>Actualités d'Euro-Office</h1>
    <p class="page-lead">Toutes nos brèves et analyses, de l'annonce du consortium aux derniers développements. Un article maximum par jour, vérifié et sourcé.</p>
  </div>
  <div class="cards-grid">
    ${cards}
  </div>
</section>
${newsletterBlock({ compact: true })}`;
  return layout({
    title: "Actualités",
    description:
      "Toute l'actualité d'Euro-Office : sorties de versions, partenariats, débats et analyses.",
    content,
    current: "/actualites/",
    canonical: abs("/actualites/"),
  });
}

function renderArticle(article, all) {
  const related = all
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  const sourceBlock = article.source
    ? `<aside class="source-box">
    <h2>Sources</h2>
    <p>${
      article.sourceUrl
        ? `<a href="${article.sourceUrl}" rel="noopener" target="_blank">${escapeHtml(article.source)}</a>`
        : escapeHtml(article.source)
    }</p>
  </aside>`
    : "";

  const tags = (article.tags || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  const content = `<article class="article">
  <div class="container article-head" style="--accent: ${article.accent}">
    <a class="back-link" href="${withBase("/actualites/")}">← Toutes les actualités</a>
    <p class="eyebrow">${escapeHtml(article.kicker)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    <p class="article-lead">${escapeHtml(article.description)}</p>
    <div class="article-meta">
      <time datetime="${article.date}">${formatDateFr(article.date)}</time>
      <span aria-hidden="true">·</span>
      <span>${article.readingTime} min de lecture</span>
      ${article.author ? `<span aria-hidden="true">·</span><span>${escapeHtml(article.author)}</span>` : ""}
    </div>
  </div>
  ${
    article.image
      ? `<figure class="article-hero container">
    <img src="${withBase(article.image)}" alt="" width="1280" height="720" fetchpriority="high">
  </figure>`
      : ""
  }
  <div class="container article-body prose">
    ${article.html}
    <div class="article-tags">${tags}</div>
    ${sourceBlock}
  </div>
</article>
<section class="container section">
  <div class="section-head"><h2>À lire aussi</h2></div>
  <div class="cards-grid">${related.map((a) => articleCard(a)).join("\n")}</div>
</section>
${newsletterBlock({ compact: true })}`;

  return layout({
    title: article.title,
    description: article.description,
    content,
    current: "/actualites/",
    canonical: abs(article.url),
    extraHead: articleJsonLd(article),
  });
}

function articleJsonLd(article) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: "fr",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: abs(article.url),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function renderFormationIndex(modules) {
  const content = `<section class="container section">
  <div class="page-head">
    <p class="eyebrow">Espace formation</p>
    <h1>Prendre en main Euro-Office</h1>
    <p class="page-lead">Un parcours simple et progressif pour comprendre <strong>pourquoi</strong> Euro-Office existe, <strong>comment l'installer</strong> et <strong>comment l'utiliser</strong> au quotidien — que vous soyez particulier, association ou organisation publique.</p>
  </div>
  <div class="modules-grid">
    ${modules
      .map(
        (m) => `<a class="module-card" href="${withBase(m.url)}">
      <span class="module-num">${String(m.order).padStart(2, "0")}</span>
      <h2>${escapeHtml(m.title)}</h2>
      <p>${escapeHtml(m.summary || "")}</p>
      ${m.duration ? `<span class="module-duration">${escapeHtml(m.duration)}</span>` : ""}
      <span class="module-go">Commencer →</span>
    </a>`
      )
      .join("\n")}
  </div>
</section>`;
  return layout({
    title: "Formation",
    description:
      "Apprenez à installer et utiliser Euro-Office grâce à notre parcours de formation gratuit en plusieurs étapes.",
    content,
    current: "/formation/",
    canonical: abs("/formation/"),
  });
}

function renderFormationModule(mod, modules) {
  const idx = modules.findIndex((m) => m.slug === mod.slug);
  const prev = modules[idx - 1];
  const next = modules[idx + 1];

  const nav = `<nav class="module-pager">
    ${prev ? `<a class="pager-prev" href="${withBase(prev.url)}"><small>Précédent</small><span>${escapeHtml(prev.title)}</span></a>` : "<span></span>"}
    ${next ? `<a class="pager-next" href="${withBase(next.url)}"><small>Suivant</small><span>${escapeHtml(next.title)}</span></a>` : "<span></span>"}
  </nav>`;

  const content = `<article class="article formation-module">
  <div class="container article-head" style="--accent: #003399">
    <a class="back-link" href="${withBase("/formation/")}">← Parcours de formation</a>
    <p class="eyebrow">Étape ${String(mod.order).padStart(2, "0")}${mod.duration ? ` · ${escapeHtml(mod.duration)}` : ""}</p>
    <h1>${escapeHtml(mod.title)}</h1>
    ${mod.summary ? `<p class="article-lead">${escapeHtml(mod.summary)}</p>` : ""}
  </div>
  <div class="container article-body prose">
    ${mod.html}
    ${nav}
  </div>
</article>`;
  return layout({
    title: `${mod.title} · Formation`,
    description: mod.summary || site.description,
    content,
    current: "/formation/",
    canonical: abs(mod.url),
  });
}

function renderNewsletterPage() {
  const content = `<section class="container section newsletter-page">
  <div class="page-head">
    <p class="eyebrow">Newsletter mensuelle</p>
    <h1>Ne ratez aucune actualité d'Euro-Office</h1>
    <p class="page-lead">Chaque début de mois, nous compilons pour vous les actualités marquantes du projet : nouvelles versions, partenariats, débats de la communauté et ressources de formation. Un seul e-mail, soigné et concis.</p>
  </div>
  <div class="newsletter-layout">
    ${
      site.newsletter && site.newsletter.embedUrl
        ? `<div class="nl-embed">
      <iframe title="Formulaire d'inscription à la newsletter" src="${site.newsletter.embedUrl}" loading="lazy" scrolling="auto" allowfullscreen></iframe>
      <p class="nl-legal">En vous inscrivant, vous acceptez de recevoir un e-mail mensuel. Vos données ne sont jamais revendues. Désabonnement en un clic depuis chaque e-mail.</p>
    </div>`
        : `<form class="nl-form nl-form-page" data-newsletter action="${withBase("/api/subscribe")}" method="post">
      <label for="nl-email-page">Votre adresse e-mail</label>
      <input id="nl-email-page" type="email" name="email" required placeholder="vous@exemple.eu" autocomplete="email">
      <input type="text" name="company" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true">
      <button type="submit" class="btn">Recevoir la newsletter</button>
      <p class="nl-status" role="status" aria-live="polite"></p>
      <p class="nl-legal">En vous inscrivant, vous acceptez de recevoir un e-mail mensuel. Vos données ne sont jamais revendues. Désabonnement en un clic depuis chaque e-mail.</p>
    </form>`
    }
    <div class="newsletter-aside">
      <h2>Au programme</h2>
      <ul class="check-list">
        <li>Le récapitulatif des actualités du mois</li>
        <li>Les nouvelles versions et fonctionnalités</li>
        <li>Les analyses et débats de la communauté</li>
        <li>Un conseil de formation pour progresser</li>
      </ul>
      <h2>Notre engagement</h2>
      <ul class="check-list">
        <li>Un e-mail par mois maximum</li>
        <li>Aucune publicité, aucun pistage commercial</li>
        <li>Hébergement et envoi respectueux du RGPD</li>
      </ul>
    </div>
  </div>
</section>`;
  return layout({
    title: "Newsletter",
    description:
      "Inscrivez-vous à la newsletter mensuelle d'Euro-Office Actus : un récapitulatif des actualités chaque mois.",
    content,
    current: "/newsletter/",
    canonical: abs("/newsletter/"),
  });
}

function renderAboutPage(page, articles) {
  const content = `<section class="container section about-page">
  <div class="page-head">
    <p class="eyebrow">À propos</p>
    <h1>${escapeHtml(page.title || "À propos")}</h1>
  </div>
  <div class="article-body prose narrow">${page.html}</div>
</section>`;
  return layout({
    title: "À propos",
    description: page.summary || site.description,
    content,
    current: "/a-propos/",
    canonical: abs("/a-propos/"),
  });
}

function render404() {
  const content = `<section class="container section error-page">
  <h1>404</h1>
  <p>La page que vous cherchez n'existe pas (ou plus).</p>
  <a class="btn" href="${withBase("/")}">Retour à l'accueil</a>
</section>`;
  return layout({ title: "Page introuvable", content, current: "/" });
}

// ----------------------------------------------------------------------------
// Flux RSS, sitemap, robots
// ----------------------------------------------------------------------------
function renderRss(articles) {
  const items = articles
    .map(
      (a) => `  <item>
    <title>${escapeHtml(a.title)}</title>
    <link>${abs(a.url)}</link>
    <guid>${abs(a.url)}</guid>
    <pubDate>${new Date(a.date + "T08:00:00Z").toUTCString()}</pubDate>
    <description>${escapeHtml(a.description)}</description>
  </item>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeHtml(site.name)}</title>
  <link>${abs("/")}</link>
  <description>${escapeHtml(site.description)}</description>
  <language>fr</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;
}

function renderSitemap(urls) {
  const body = urls
    .map(
      (u) => `  <url><loc>${abs(u)}</loc></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

// ----------------------------------------------------------------------------
// Build
// ----------------------------------------------------------------------------
function build() {
  const start = Date.now();
  // Nettoyage
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);

  const articles = loadArticles();
  const modules = loadFormation();
  const about = loadPage("a-propos");

  // Pages principales
  writePage("index.html", renderHome(articles, modules));
  writePage("actualites/index.html", renderArticlesIndex(articles));
  for (const a of articles) {
    writePage(`actualites/${a.slug}/index.html`, renderArticle(a, articles));
  }
  writePage("formation/index.html", renderFormationIndex(modules));
  for (const m of modules) {
    writePage(`formation/${m.slug}/index.html`, renderFormationModule(m, modules));
  }
  writePage("newsletter/index.html", renderNewsletterPage());
  writePage("a-propos/index.html", renderAboutPage(about, articles));
  writePage("404.html", render404());

  // Flux & métadonnées
  const urls = [
    "/",
    "/actualites/",
    "/formation/",
    "/newsletter/",
    "/a-propos/",
    ...articles.map((a) => a.url),
    ...modules.map((m) => m.url),
  ];
  writePage("rss.xml", renderRss(articles));
  writePage("sitemap.xml", renderSitemap(urls));
  writePage(
    "robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${abs("/sitemap.xml")}\n`
  );

  // Assets statiques (CSS, JS, images, _redirects…)
  copyDir(PUBLIC, DIST);

  const ms = Date.now() - start;
  console.log(
    `✓ Build terminé en ${ms} ms — ${articles.length} articles, ${modules.length} modules de formation.`
  );
  console.log(`  Sortie : ${path.relative(ROOT, DIST)}/`);
}

build();
