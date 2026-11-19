---
title: "Nextcloud Office Desktop s'installe via APT et DNF : Euro-Office franchit le cap du déploiement système"
date: 2026-11-19
description: "Disponible depuis le 13 novembre 2026, Nextcloud Office Desktop s'appuie sur des dépôts APT et DNF signés pour s'intégrer aux cycles de mise à jour Linux — un pas décisif vers un déploiement en environnement géré."
kicker: "Sortie"
author: "Rédaction (veille assistée par IA)"
tags: Nextcloud, Euro-Office, Linux
source: "It's FOSS News"
sourceUrl: "https://itsfoss.com/news/nextcloud-office-desktop-launched/"
---

## Des paquets signés pour trois plateformes


Nextcloud a mis à disposition la version prête à l'emploi de son application Nextcloud Office Desktop le 13 novembre 2026, avec des paquets Linux pour Debian, Ubuntu et Fedora, aux côtés des builds Windows et macOS.
 
Il s'agit d'une suite bureautique libre et open source pour Windows, macOS et Linux, propulsée par Euro-Office, que Nextcloud décrit comme développée et gouvernée en Europe.



L'application inclut des éditeurs de documents texte, de tableurs, de présentations et de PDF. Elle prend en charge les formats Microsoft Office (DOCX, XLSX, PPTX) ainsi que les formats ouverts (ODT, ODS, ODP), et se connecte à Nextcloud Hub pour l'édition collaborative en temps réel.


Côté signatures, 
sous Windows et macOS, les paquets sont signés, ce qui les rend vérifiables en termes d'intégrité et adaptés aux déploiements sur appareils gérés.
 
Windows reçoit des versions x64 et ARM64, tandis que Linux bénéficie de paquets .deb et .rpm pour x86_64 et aarch64.


## APT et DNF : l'intégration aux gestionnaires de paquets

Le point le plus notable pour les administrateurs système est l'existence de dépôts de paquets dédiés. 
Sur Linux, Nextcloud héberge des dépôts APT et DNF signés. Une fois ajoutés, l'application se met à jour avec le reste du système.



Nextcloud Office fournit ainsi des dépôts APT et DNF signés à l'adresse `https://download.nextcloud.com/office/repo` pour le serveur de documents et pour les éditeurs de bureau.
 
Installer depuis le dépôt permet de maintenir les paquets à jour lors des mises à jour système habituelles.



Les builds communautaires d'Euro-Office, issues du même code source, sont non signées et présentées comme destinées aux tests et aux contributions — elles ne sont disponibles que via GitHub et sans dépôt de paquets.


## Nextcloud Office face à ONLYOFFICE Desktop Editors


Nextcloud Office n'est pas une application entièrement différente des éditeurs de bureau qu'Euro-Office produit. Il s'agit de la distribution signée par Nextcloud du même code source DesktopEditors, mais davantage orientée vers un usage en production.


Pourtant, des nuances existent. 
Nextcloud a retiré les capacités d'intégration avec l'éditeur ONLYOFFICE : Nextcloud Office Desktop ne peut se connecter qu'à Nextcloud, ce qui contraint l'utilisateur à cette solution. À l'inverse, ONLYOFFICE offre davantage de choix, avec des connexions possibles vers Nextcloud, ownCloud, Seafile, Moodle, Liferay et même kDrive.



Euro-Office est un projet open source d'origine européenne basé sur un fork du code ONLYOFFICE, sous licence AGPLv3, établi pour améliorer la transparence du développement, simplifier les contributions externes et fournir une solution bureautique à gouvernance indépendante.
 
Selon ses mainteneurs, la décision de forker ONLYOFFICE a suivi des préoccupations relatives à la collaboration limitée en amont, aux difficultés de compilation depuis les sources et à la présence de composants propriétaires. Le projet est soutenu par plusieurs entreprises et organisations technologiques européennes, dont Nextcloud, IONOS, OpenProject, Proton et XWiki.


La mise à disposition de dépôts de paquets signés constitue une étape structurante : elle permet aux équipes IT de déployer et maintenir Euro-Office via leurs outils d'administration habituels, sans sortir du cycle de mise à jour de leur distribution Linux. Un signal fort à destination des DSI du secteur public européen, pour lesquels la traçabilité et l'automatisation des mises à jour sont souvent des prérequis non négociables.
