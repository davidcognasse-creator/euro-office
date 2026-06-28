# Euro-Office Actus

Site d'actualités et de formation autour d'**Euro-Office**, la suite bureautique
open source et souveraine européenne. Design épuré, contenu en Markdown,
newsletter mensuelle automatisée et espace de formation.

> Site d'information **indépendant**, non affilié officiellement au projet Euro-Office.

---

## ✨ Fonctionnalités

- **Fil d'actualités** : articles datés, sourcés, un par jour maximum.
- **Espace formation** : parcours en 3 étapes (intérêt, installation, usage).
- **Newsletter mensuelle** : inscription en ligne + envoi automatique chaque
  mois via GitHub Actions.
- **Design épuré et responsive**, accessible, avec flux RSS et sitemap.
- **Zéro framework lourd** : un générateur statique maison en Node
  (une seule dépendance, `marked`).

---

## 🚀 Démarrage rapide

Prérequis : **Node.js 18+** (testé sur Node 22).

```bash
npm install        # installe les dépendances
npm run build      # génère le site dans dist/
npm run serve      # sert dist/ sur http://localhost:4321
```

Pour développer en regénérant à la main : modifiez le contenu, relancez
`npm run build`, rafraîchissez le navigateur.

---

## 📝 Ajouter un article

C'est volontairement simple : **un article = un fichier Markdown** dans
`content/articles/`. Nommez-le `AAAA-MM-JJ-titre-court.md` :

```markdown
---
title: "Titre de l'article"
date: 2026-07-02
description: "Résumé d'une ou deux phrases, affiché dans les listes et le RSS."
kicker: "Actualité"        # étiquette de catégorie (Sortie, Débat, Test…)
author: "La rédaction"
tags: souveraineté, version
source: "Nom de la source"
sourceUrl: "https://exemple.eu/article"
---

Le contenu de l'article en **Markdown** : titres, listes, citations,
tableaux, liens, etc.
```

- L'**URL** est dérivée du nom de fichier (sans la date) : `2026-07-02-ma-news.md`
  → `/actualites/ma-news/`. On peut forcer un slug avec `slug:` dans l'en-tête.
- Les articles sont **triés par date décroissante** automatiquement.
- **Règle éditoriale** : un article par actualité marquante, un par jour maximum.

> 💡 Pour trouver de nouvelles actualités : Google Actualités (« Euro-Office »),
> X/Twitter, les dépôts du projet et la presse spécialisée. Vérifiez et **sourcez**
> chaque information avant publication.

### Modifier la formation

Les modules vivent dans `content/formation/` (`NN-nom.md`, champ `order`
pour l'ordre). La page « À propos » est dans `content/pages/a-propos.md`.

---

## 📬 Newsletter : configuration

L'envoi d'e-mails passe par **[Brevo](https://www.brevo.com)** (fournisseur
européen, offre gratuite généreuse). Le site reste agnostique : adaptez
`api/subscribe.js`, `netlify/functions/subscribe.js` et
`scripts/send-newsletter.mjs` si vous préférez un autre service.

### 1. Créer le compte et la liste

1. Créez un compte Brevo, validez votre adresse d'expéditeur
   (`newsletterFromEmail` dans `site.config.mjs`).
2. Créez une **liste de contacts** ; notez son **ID** numérique.
3. Récupérez une **clé API** (SMTP & API → API Keys).

### 2. Renseigner les secrets

| Variable | Où la mettre |
| --- | --- |
| `BREVO_API_KEY` | Hébergeur (Netlify/Vercel) **et** GitHub → Settings → Secrets → Actions |
| `BREVO_LIST_ID` | Idem |

En local, copiez `.env.example` en `.env` (jamais committé).

### 3. Tester

```bash
# Aperçu HTML d'un mois donné, sans envoi :
NEWSLETTER_MONTH=2026-06 npm run newsletter:preview
# → écrit dist/newsletter-preview.html

# Envoi réel (nécessite les variables ci-dessus) :
NEWSLETTER_MONTH=2026-06 npm run newsletter
```

### 4. Automatisation

`.github/workflows/newsletter.yml` envoie la newsletter **le 1er de chaque
mois à 8h UTC**. Elle compile les articles du mois précédent et **n'envoie
rien** s'il n'y en a aucun. Déclenchement manuel possible via
*Actions → Newsletter mensuelle → Run workflow*.

---

## 🌐 Déploiement

Le site est **statique** ; le formulaire d'inscription est une **fonction
serverless**. Choisissez selon vos besoins :

| Hébergeur | Site statique | Formulaire d'inscription | `basePath` |
| --- | --- | --- | --- |
| **GitHub Pages** ✅ | oui | via formulaire Brevo intégré (`newsletter.embedUrl`) | `/euro-office` |
| **Netlify** ✅ | oui | fonction serverless (`netlify/functions/`) | `""` |
| **Vercel** ✅ | oui | fonction serverless (`api/`) | `""` |

> ⚙️ **`basePath` (important)** — dans `site.config.mjs`. Un dépôt de projet
> GitHub Pages est servi sous un sous-dossier (`…github.io/euro-office/`) :
> laissez `basePath: "/euro-office"`. Sur Netlify, Vercel ou un **domaine
> personnalisé** (site servi à la racine), mettez `basePath: ""`.

### GitHub Pages (option choisie)

1. **Settings → Pages → Build and deployment → Source : « GitHub Actions »**.
2. Le workflow `deploy-pages.yml` construit et publie le site à chaque push.
3. Formulaire d'inscription : créez un **formulaire dans Brevo**
   (*Contacts → Formulaires*), copiez son URL et collez-la dans
   `site.config.mjs` → `newsletter.embedUrl`. (Cette URL est publique, ce
   n'est pas un secret.)
4. Vérifiez `site.url` (`https://VOTRE-COMPTE.github.io`) et
   `basePath` (`/euro-office`).

### Netlify / Vercel

1. Connectez le dépôt ; build `npm run build`, dossier publié `dist`.
2. Mettez `basePath: ""` et `site.url` = votre domaine.
3. Ajoutez les variables `BREVO_API_KEY` et `BREVO_LIST_ID` (le formulaire
   serverless `/api/subscribe` est alors utilisé automatiquement).

La newsletter mensuelle fonctionne **quel que soit l'hébergeur** (elle part
depuis GitHub Actions).

---

## 🤖 Génération automatique d'articles (veille IA)

Une GitHub Action quotidienne (`.github/workflows/auto-article.yml`) recherche
l'actualité Euro-Office via **Claude + recherche web** et rédige un brouillon
d'article en français, en évitant les sujets déjà traités (max 1/jour).

### Mise en place (une fois)

1. Ajoutez le secret **`ANTHROPIC_API_KEY`** dans
   *Settings → Secrets and variables → Actions* (clé depuis
   [console.anthropic.com](https://console.anthropic.com)).
2. Pour le **mode review** (recommandé), autorisez les Actions à ouvrir des PR :
   *Settings → Actions → General → Workflow permissions* → cocher
   **« Allow GitHub Actions to create and approve pull requests »** et
   **« Read and write permissions »**.
3. *(Optionnel)* variable `ARTICLE_MODEL` pour changer de modèle.

### Fonctionnement

- **Mode `publish` (défaut)** : l'article est **mis en ligne directement** et
  le déploiement est déclenché automatiquement, sans relecture.
- **Mode `review`** : l'action ouvre une **Pull Request** avec le brouillon ;
  vous **relisez, vérifiez la source, ajustez**, puis **fusionnez pour
  publier**. Lancez le workflow manuellement avec l'entrée `mode=review`.

Test manuel : *Actions → « Article quotidien (veille IA) » → Run workflow*.
Le script ne crée rien s'il ne trouve pas d'actualité nouvelle et notable.

> ⚠️ En mode `publish`, les articles rédigés par IA sont **publiés sans
> relecture humaine** : ils peuvent comporter des erreurs ou des imprécisions.
> Surveillez le site et repassez en `mode review` si besoin (changez le défaut
> dans `.github/workflows/auto-article.yml`).

## 🗂️ Structure du projet

```
euro-office/
├── content/
│   ├── articles/        # les articles (Markdown + front matter)
│   ├── formation/       # modules de l'espace formation
│   └── pages/           # pages statiques (à propos)
├── src/
│   ├── build.mjs        # générateur de site statique
│   ├── serve.mjs        # serveur de dev local
│   ├── templates.mjs    # gabarits HTML
│   └── lib.mjs          # utilitaires (front matter, dates, slugs)
├── public/assets/       # CSS, JS, favicon (copiés tels quels)
├── api/subscribe.js     # fonction d'inscription (Vercel)
├── netlify/functions/   # fonction d'inscription (Netlify)
├── scripts/
│   ├── send-newsletter.mjs    # génération + envoi de la newsletter
│   └── generate-article.mjs   # veille IA : rédaction d'un brouillon d'article
├── .github/workflows/   # déploiement + newsletter mensuelle + article quotidien
├── site.config.mjs      # configuration centrale (nom, URL, nav…)
└── dist/                # sortie générée (non versionnée)
```

---

## 🎨 Personnalisation

- **Identité & navigation** : `site.config.mjs`.
- **Design** : variables CSS en haut de `public/assets/style.css`
  (couleurs, rayons, typographie).
- **Gabarits** : `src/templates.mjs`.

---

## 📄 Licence

- **Code** : MIT.
- **Contenu éditorial** : Creative Commons BY-SA 4.0.

Les marques citées (Euro-Office, Nextcloud, Microsoft, LibreOffice…)
appartiennent à leurs propriétaires respectifs.
