---
title: "Euro-Office Desktop v9.3.6 : corrections Linux, nouvelle icône et stabilisation de l'écosystème"
date: 2026-10-30
description: "Publiée le 22 octobre sur GitHub, la version 9.3.6 du client de bureau Euro-Office consolide la branche stable avec des correctifs ciblés sur Linux, les applications web et le moteur ODF."
kicker: "Sortie"
author: "Rédaction (veille assistée par IA)"
tags: Euro-Office Desktop, Linux, mise à jour
source: "GitHub – Euro-Office/DesktopEditors"
sourceUrl: "https://github.com/Euro-Office/DesktopEditors/releases/tag/v9.3.6"
---

Moins d'une semaine après le lancement de la première release candidate, 
la version stable 9.3.6 d'Euro-Office DesktopEditors a été fusionnée et publiée le 22 octobre 2026
. Cette mise à jour de maintenance, la première depuis la disponibilité générale du client natif annoncée mi-octobre, concerne à la fois le **DocumentServer** et les **DesktopEditors** — les deux composants publiés en miroir sous les organisations `Euro-Office` et `nextcloud-releases` sur GitHub.

## Ce qui change dans la v9.3.6

La release est centrée sur la robustesse plutôt que sur de nouvelles fonctionnalités. Côté Linux, 
le packaging `.deb` et `.rpm` intègre désormais les métadonnées de mainteneur correctement estampillées « Euro-Office »
, ce qui facilitera la distribution via les dépôts APT et DNF. 
Deux correctifs critiques pour Linux font également leur apparition : la résolution d'un crash au signal SIGTERM et l'ajout de la dépendance `libxcb-cursor` manquante dans les paquets Linux
 — un problème qui empêchait le lancement de l'application sur certaines distributions minimalistes.

Du côté des **applications web**, 
deux régressions visuelles sont corrigées : le rendu des icônes SVG dans les barres de boutons et un bug qui gonflait les menus de langues avec des icônes SVG vides
 — ce dernier ayant notamment affecté les utilisateurs de Nextcloud Office sous Linux sur Chromebook. Les traductions sont également enrichies, avec 
l'ajout de la visionneuse de diagrammes en danois
 et une mise à jour générale des chaînes via Hosted Weblate.

Sur le moteur de documents, 
un crash du moteur ODF sur les formes personnalisées comportant une formule vide est résolu
 — un bug de stabilité pouvant survenir à l'ouverture de présentations créées avec LibreOffice Impress ou des outils ODP tiers.

Enfin, point symbolique : 
la v9.3.6 introduit une nouvelle icône applicative reprenant le branding Nextcloud
, alignant visuellement le client de bureau sur l'identité de la suite depuis son intégration dans Nextcloud Hub 26 Summer.

## Un pipeline de release qui se professionnalise

Au-delà des correctifs, cette version marque aussi un tournant dans la maturité du projet. 
La release 9.3.6 est la première à être pilotée via un dépôt dédié `Euro-Office/release`, qui orchestre la publication synchronisée du DocumentServer et des DesktopEditors
. 
Le projet a adopté une convention de versionnement stricte : seule la forme `vX.Y.Z` sans suffixe est considérée comme stable, ce qui déclenche automatiquement la publication sur les dépôts APT et DNF
 — les préversions (rc, beta, test) restant cantonnées aux artefacts GitHub.

Les binaires sont disponibles pour Windows (x86-64 et ARM64), macOS Apple Silicon et Linux (x86-64 et aarch64, en `.tar.xz`, `.rpm` et, prochainement, `.deb`). 
Le produit est également accessible via le dépôt GitHub de l'organisation Euro-Office sous la rubrique Assets
.

## Mise en perspective

Cette v9.3.6 intervient dans un contexte où Euro-Office doit consolider rapidement la confiance des administrateurs système, notamment après l'épisode CVE-2026-110447 qui a écorné la réputation de l'écosystème Nextcloud/Collabora. 
Euro-Office se veut une bureautique « souveraine européenne » gratuite et open source offrant une compatibilité native avec les formats DOCX, XLSX, PPTX et PDF
 — une promesse qui ne peut tenir que si la stabilité de la brique desktop est au rendez-vous. La régularité des correctifs et la professionnalisation du pipeline de release vont dans le bon sens.
