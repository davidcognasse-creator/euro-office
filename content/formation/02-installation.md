---
title: "Installer et accéder à Euro-Office"
slug: installation
order: 2
duration: "10 min"
summary: "Trois façons de démarrer : via Nextcloud, via une instance auto-hébergée, ou via un fournisseur cloud européen. On vous guide."
---

Euro-Office étant une suite avant tout **collaborative et web**, « l'installer » signifie en réalité **y accéder via un serveur**. Voici les trois chemins possibles, du plus simple au plus avancé.

> **À noter :** les procédures ci-dessous décrivent l'approche générale. Reportez-vous toujours à la documentation officielle du projet sur [github.com/Euro-Office](https://github.com/Euro-Office) pour les commandes exactes et à jour.

## Option A — Via Nextcloud (le plus simple)

Depuis juin 2026, Euro-Office est intégré à **Nextcloud Hub 26** comme alternative à Collabora dans Nextcloud Office. Si vous utilisez déjà Nextcloud, c'est de loin la voie la plus rapide.

1. Connectez-vous à votre Nextcloud avec un compte **administrateur**.
2. Ouvrez **Applications** → catégorie **Bureautique**.
3. Recherchez le moteur **Euro-Office** (Nextcloud Office) et activez-le.
4. Dans **Paramètres d'administration → Nextcloud Office**, sélectionnez Euro-Office comme moteur d'édition.
5. Ouvrez n'importe quel document : il s'édite désormais avec Euro-Office.

Aucune infrastructure supplémentaire à gérer si votre hébergeur Nextcloud prend en charge l'intégration.

## Option B — Auto-hébergement (le plus souverain)

Pour une maîtrise totale, vous pouvez héberger Euro-Office sur votre propre serveur. La méthode recommandée passe généralement par un conteneur.

**Prérequis indicatifs :**

- un serveur Linux (Debian/Ubuntu par exemple) ;
- **Docker** installé ;
- un nom de domaine et un certificat HTTPS (via un reverse proxy comme Nginx ou Caddy).

**Démarche générale :**

```bash
# 1. Récupérer l'image du serveur de documents Euro-Office
docker pull euro-office/documentserver:latest

# 2. Lancer le conteneur (exemple simplifié)
docker run -d --name euro-office \
  -p 8080:80 \
  --restart=unless-stopped \
  euro-office/documentserver:latest

# 3. Vérifier que le service répond
curl http://localhost:8080/healthcheck
```

Il reste ensuite à **connecter** ce serveur de documents à votre plateforme (Nextcloud, ownCloud, ou une intégration maison) en renseignant son URL dans la configuration de l'application. Pensez à placer le service **derrière HTTPS** et à restreindre les accès.

## Option C — Via un fournisseur cloud européen

Plusieurs partenaires du projet (par exemple **IONOS**) proposent ou prévoient des offres hébergées. C'est un bon compromis entre simplicité et souveraineté : vous bénéficiez d'Euro-Office sans gérer l'infrastructure, tout en gardant vos données en Europe. Consultez les offres des partenaires listés sur le site du projet.

## Et les applications de bureau et mobiles ?

Des applications **Windows, macOS, Linux, Android et iOS** sont prévues et se déploient progressivement. Selon le moment où vous lisez ceci, certaines peuvent déjà être disponibles : vérifiez la section *Releases* du dépôt officiel. En attendant, l'accès **via navigateur** offre déjà l'expérience la plus complète.

## Vérifier que tout fonctionne

Une fois l'accès en place :

- [ ] Créez un nouveau document texte — il s'ouvre dans l'éditeur Euro-Office.
- [ ] Importez un fichier `.docx` existant — la mise en page est respectée.
- [ ] Invitez un collègue et éditez **à deux en même temps** — vous voyez son curseur.

Si ces trois tests passent, vous êtes prêt·e !

---

➡️ Place à la pratique : découvrons l'**usage au quotidien**.
