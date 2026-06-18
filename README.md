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

| Hébergeur | Site statique | Formulaire d'inscription | Config |
| --- | --- | --- | --- |
| **Netlify** ✅ | oui | oui (`netlify/functions/`) | `netlify.toml` |
| **Vercel** ✅ | oui | oui (`api/`) | `vercel.json` |
| **GitHub Pages** | oui | ❌ (pas de serverless) | `.github/workflows/deploy-pages.yml` |

**Recommandé : Netlify ou Vercel** pour bénéficier du formulaire d'inscription.

1. Connectez le dépôt à Netlify/Vercel.
2. Commande de build : `npm run build` · dossier publié : `dist`.
3. Ajoutez les variables `BREVO_API_KEY` et `BREVO_LIST_ID`.
4. Mettez à jour `site.url` dans `site.config.mjs` avec votre domaine final
   (utilisé par le RSS, le sitemap et les liens de la newsletter).

La newsletter mensuelle fonctionne **quel que soit l'hébergeur** (elle part
depuis GitHub Actions).

---

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
├── scripts/send-newsletter.mjs   # génération + envoi de la newsletter
├── .github/workflows/   # CI : déploiement + newsletter mensuelle
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
