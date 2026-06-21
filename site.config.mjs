// Configuration centrale du site Euro-Office Actualités.
// Modifiez ces valeurs pour adapter le site (nom, URL, réseaux, etc.).

export const site = {
  name: "Euro-Office Actus",
  shortName: "Euro-Office",
  // Domaine de production (sans slash final). Utilisé pour le flux RSS, le
  // sitemap et les liens absolus des e-mails de la newsletter.
  url: "https://euro-office.fr",
  // Préfixe d'URL. Domaine personnalisé (euro-office.fr) servi à la racine : "".
  // GitHub Pages SANS domaine perso (dépôt de projet) : "/euro-office".
  basePath: "",
  // Formulaire newsletter :
  //   - GitHub Pages : collez l'URL d'un formulaire Brevo dans newsletter.embedUrl.
  //   - Netlify / Vercel : laissez embedUrl vide → la fonction /api/subscribe est utilisée.
  newsletter: {
    embedUrl: "https://8e20c293.sibforms.com/serve/MUIFAB7JZI0gDv2P8cgwqhVaIc1BxXGNgYH87vPUZDLDFv6BvNSEkHlZWlqWN199Ql-azvp6rTTHb6-6Yii4kpwgroSReXl35Y2WzhUb8K1yRyyUb2DHZhjDSFKfBwDAhCy80eKRnhM8SG2UD1OuMxlRi_nBKfqiwelFzjvrerwbLZHbysOjTAVHlB9fVMpwmCaXFzSBaus_7ozU",
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
