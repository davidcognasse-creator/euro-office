// Configuration centrale du site Euro-Office Actualités.
// Modifiez ces valeurs pour adapter le site (nom, URL, réseaux, etc.).

export const site = {
  name: "Euro-Office Actus",
  shortName: "Euro-Office",
  // URL de production (sans slash final). Utilisée pour le flux RSS, le sitemap
  // et les liens absolus des e-mails de la newsletter.
  url: "https://euro-office-actus.eu",
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
