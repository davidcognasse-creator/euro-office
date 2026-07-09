---
title: "Euro-Office franchit le cap de l'auto-hébergement : Nextcloud publie son guide d'installation officiel"
date: 2026-07-09
description: "Nextcloud a mis en ligne le 1er juillet un tutoriel complet pour déployer Euro-Office via Docker, Ubuntu ou Debian. Une étape clé pour les administrateurs système qui souhaitent héberger eux-mêmes la suite souveraine."
kicker: "Écosystème"
author: "Rédaction (veille assistée par IA)"
tags: déploiement, auto-hébergement, Docker
source: "Nextcloud Blog"
sourceUrl: "https://nextcloud.com/blog/how-to-install-euro-office/"
---

Moins d'un mois après le lancement officiel d'Euro-Office le 9 juin 2026, l'équipe Nextcloud a franchi une nouvelle étape pratique : la publication, le 1er juillet, d'un **guide d'installation officiel** détaillant comment déployer le serveur documentaire sur sa propre infrastructure. Une publication attendue par les administrateurs système et les DSI qui souhaitent ne pas dépendre d'une offre cloud hébergée.

## Trois chemins vers l'auto-hébergement


Le guide couvre deux voies natives : l'installation du Document Server Euro-Office via les paquets Ubuntu ou Debian, et, pour les autres distributions Linux, le déploiement via Docker.
 
Les deux méthodes requièrent une architecture amd64 ou arm64.



Les prérequis minimaux sont 4 Go de RAM (8 Go recommandés pour les déploiements multi-utilisateurs) et 10 Go d'espace disque. En production, le Document Server et l'instance Nextcloud doivent communiquer en HTTPS, et le serveur documentaire peut résider sur un hôte distinct. Un reverse proxy (nginx ou Apache) est requis pour exposer le service en HTTPS.



La méthode la plus rapide pour démarrer reste l'image Docker officielle, qui nécessite Docker Engine 20.10 ou supérieur ainsi que 5 Go d'espace pour l'image.


Un détail notable pour les nouvelles installations : 
les déploiements utilisant la dernière version de l'image Nextcloud All-in-One (AIO) permettent désormais de choisir entre Euro-Office et Collabora Online dès la configuration initiale.
 Le choix de l'éditeur bureautique devient ainsi aussi simple qu'une option de démarrage.

## Une documentation qui accompagne la maturité du projet

La publication de ce guide coïncide avec une activité soutenue sur le dépôt GitHub du projet. 
Les dépôts `web-apps` et `eurooffice-nextcloud` ont tous deux reçu des mises à jour le 8 juillet 2026
, confirmant que le développement actif se poursuit à un rythme hebdomadaire.


Euro-Office est conçu comme un serveur documentaire auto-hébergeable — documents, feuilles de calcul, présentations et PDFs — pensé pour s'intégrer à une plateforme comme Nextcloud. Il ne s'agit pas d'une application autonome : il requiert un backend de stockage compatible pour assurer l'interface utilisateur et la gestion des fichiers.



La documentation officielle couvre le déploiement en production via Docker, Ubuntu (deb) et Fedora (rpm), ainsi que la connexion d'Euro-Office à Nextcloud et à d'autres plateformes de gestion documentaire.


## Un signal pour les DSI et les collectivités

Ce guide marque un tournant dans la stratégie de diffusion du projet. Jusqu'ici, Euro-Office était principalement accessible via les offres gérées des membres du consortium. Avec une documentation technique claire et des paquets natifs pour les distributions Linux les plus répandues, le projet s'ouvre désormais aux **équipes IT internes** — collectivités, établissements d'enseignement, administrations — qui souhaitent maîtriser l'ensemble de leur pile logicielle.


Frank Karlitschek, CEO de Nextcloud, avait annoncé la couleur lors du lancement : après la mise à disposition d'une version utilisable, « l'étape suivante consiste à travailler sur les applications desktop et mobile et les fonctionnalités d'intégration ». Il avait également précisé que le support complet des formats ODF serait « en tête de l'agenda pour la prochaine version ».


La v1.1, attendue fin juillet selon la feuille de route publiée par le consortium, devrait donc apporter son lot de nouveautés sur ces deux fronts. En attendant, la disponibilité d'un guide d'installation structuré — et d'une communauté déjà active sur les forums Nextcloud — abaisse significativement le seuil d'entrée pour les organisations qui veulent passer à l'acte.
