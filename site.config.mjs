// Configuration centrale du site Euro-Office Actualités.
// Modifiez ces valeurs pour adapter le site (nom, URL, réseaux, etc.).

export const site = {
  name: "Euro-Office Actus",
  shortName: "Euro-Office",
  // Domaine de production (sans slash final). Utilisé pour le flux RSS, le
  // sitemap et les liens absolus des e-mails de la newsletter.
  // GitHub Pages : "https://davidcognasse-creator.github.io".
  // Domaine perso / Netlify / Vercel : votre domaine (ex. "https://exemple.eu").
  url: "https://davidcognasse-creator.github.io",
  // Préfixe d'URL. GitHub Pages (dépôt de projet) : "/euro-office".
  // Domaine perso, Netlify ou Vercel : laisser "".
  basePath: "/euro-office",
  // Formulaire newsletter :
  //   - GitHub Pages : collez l'URL d'un formulaire Brevo dans newsletter.embedUrl.
  //   - Netlify / Vercel : laissez embedUrl vide → la fonction /api/subscribe est utilisée.
  newsletter: {
    embedUrl: "", // ex. "https://sibforms.com/serve/MUIFxxxxxxxxxxxx"
  },
  lang: "fr",
  locale: "fr_FR",
  description:
    "L'actualité indépendante d'Euro-Office, la suite bureautique open source et souveraine européenne. Articles, analyses et formation pour bien démarrer.",
  tagline: "L'actualité de la bureautique souveraine européenne",
  // Adresse d'expédition de la newsletter (doit être validée chez votre fournisseur d'e-mail).
  newsletterFromName: "Euro-Office Actus",
  newsletterFromEmail: "newsletter@euro-office-actus.eu",
  // Liens utiles affichés dans le pied de page.
  links: {
    projet: "https://github.com/Euro-Office",
    nextcloud: "https://nextcloud.com",
    twitter: "https://twitter.com/search?q=euro-office",
    rss: "/rss.xml",
  },
  // Navigation principale.
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Actualités", href: "/actualites/" },
    { label: "Formation", href: "/formation/" },
    { label: "Newsletter", href: "/newsletter/" },
    { label: "À propos", href: "/a-propos/" },
  ],
};

export default site;
