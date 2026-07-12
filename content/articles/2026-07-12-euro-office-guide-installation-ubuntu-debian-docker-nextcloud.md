---
title: "Euro-Office franchit le cap de l'auto-hébergement : Nextcloud publie son guide d'installation officiel"
date: 2026-07-12
description: "Nextcloud a mis en ligne début juillet un tutoriel officiel pour déployer Euro-Office sur Ubuntu, Debian ou via Docker. Une étape clé pour les administrateurs souhaitant auto-héberger la suite souveraine."
kicker: "Sortie"
author: "Rédaction (veille assistée par IA)"
tags: auto-hébergement, installation, administration système
source: "Nextcloud Blog"
sourceUrl: "https://nextcloud.com/blog/how-to-install-euro-office/"
---

Moins d'un mois après la disponibilité générale d'Euro-Office, l'écosystème passe à la vitesse supérieure sur le plan opérationnel. 
Nextcloud a publié début juillet un guide officiel permettant de déployer Euro-Office sur une instance Nextcloud via Ubuntu, Debian ou Docker.
 Daté du 1er juillet 2026, ce tutoriel s'adresse directement aux administrateurs système et marque une étape importante dans la maturité du projet.

## Un Document Server à configurer, pas un simple clic

La publication de ce guide lève le voile sur l'architecture réelle d'Euro-Office en production. 
Introduit avec Nextcloud Hub 26 Spring, Euro-Office est proposé comme option de suite bureautique avec des éditeurs web pour les documents, les tableurs, les présentations et les PDF, avec un rendu haute fidélité préservant la mise en page et le formatage des fichiers.


Mais activer la suite ne se résume pas à cocher une case. 
Pour activer Euro-Office sur une instance Nextcloud, il faut d'abord configurer le Document Server Euro-Office — là où le rendu et l'édition s'effectuent — puis s'assurer que Nextcloud peut communiquer avec ce serveur en installant l'application connecteur Nextcloud Office.


Sur le plan des prérequis matériels, le projet ne cache pas les exigences minimales : 
le Document Server nécessite au moins 4 Go de RAM (8 Go recommandés pour les déploiements multi-utilisateurs) et 10 Go d'espace disque libre.
 En production, 
le Document Server et Nextcloud doivent pouvoir communiquer via HTTPS — le serveur de documents n'ayant pas besoin de tourner sur le même hôte que Nextcloud — et un reverse proxy (nginx ou Apache) est requis pour l'exposer en HTTPS.


## Ubuntu, Debian, Fedora… et Docker pour les autres

La documentation technique officielle, hébergée sur `euro-office.github.io`, couvre un large spectre de distributions. 
Les administrateurs peuvent installer Euro-Office via un paquet `.deb` sur Ubuntu 24.04 LTS ou Debian 12 (Bookworm), ou via un paquet `.rpm` sur Fedora 41+, testé jusqu'à Fedora 44.
 
Pour toute autre distribution Linux, l'installation via Docker est disponible, et toutes les méthodes requièrent une architecture amd64 ou arm64.


Pour les nouveaux déploiements, un raccourci existe : 
les installations fraîches utilisant la dernière version de l'image Docker Nextcloud All-in-One permettent de choisir entre Euro-Office et Collabora Online dès la configuration initiale.


La documentation officielle du projet couvre également des cas d'usage avancés : 
configuration des bases de données, files de messages, backends de stockage et TLS ; intégration avec Nextcloud et d'autres plateformes de gestion documentaire ; mais aussi les opérations de suivi, de sauvegarde et de mise à jour d'un déploiement Euro-Office.


## Une documentation qui concrétise la trajectoire du projet

Cette publication intervient à un moment charnière. Euro-Office, 
présenté comme une alternative open source souveraine à Microsoft Office pour les organisations européennes souhaitant réduire leur dépendance aux fournisseurs technologiques américains, comprend quatre applications en mode navigateur : un éditeur de documents, un tableur, un outil de présentation et un éditeur PDF, chacun permettant l'édition collaborative.


La mise à disposition d'un guide d'installation officiel et d'une documentation structurée est un signal clair de maturité. Elle répond à un besoin concret des équipes IT publiques et privées qui évaluent une migration : disposer d'instructions fiables pour déployer la suite dans leur propre infrastructure, sans dépendance à un prestataire tiers. 
En juin 2026, Euro-Office se comprend avant tout comme un serveur de documents auto-hébergeable et un éditeur web qui s'intègre à des plateformes comme Nextcloud
 — et le guide d'installation vient consacrer cette réalité technique pour les administrateurs prêts à franchir le pas.
