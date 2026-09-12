---
title: "Collabora Online 26.04.3-3 renforce la sécurité des documents avec le sandboxing noyau Landlock"
date: 2026-09-12
description: "Collabora Online, l'un des moteurs de rendu bureautique de l'écosystème Nextcloud, publie sa version 26.04.3-3 avec une troisième couche d'isolation des processus basée sur la technologie Linux Landlock — une avancée de sécurité qui profite directement à l'environnement dans lequel s'inscrit Euro-Office."
kicker: "Écosystème"
author: "Rédaction (veille assistée par IA)"
tags: sécurité, Collabora Online, sandboxing
source: "Nextcloud Blog"
sourceUrl: "https://nextcloud.com/blog/collabora-landlock-adds-a-third-tougher-sandbox-tier/"
---

## Un troisième niveau d'isolation pour les processus documentaires

À moins de 48 heures du lancement officiel de Nextcloud Hub 26 Summer — prévu en direct le 16 septembre — l'équipe Collabora a discrètement publié une mise à jour de sécurité majeure pour son moteur de rendu bureautique en ligne. 
Collabora Online 26.04.3-3 intègre désormais Landlock comme nouvelle option de sandboxing, isolant le processus Kit de chaque document au niveau du noyau Linux.


Jusqu'à présent, 
pour protéger l'ensemble d'un serveur contre toute compromission d'un composant, Collabora Online isolait chaque document dans son propre processus Kit. Il existait jusqu'ici deux méthodes : le chroot avec capabilities, ou les user namespaces. Les deux présentent des limitations en matière de sécurité, de performance, de complexité et de compatibilité.



Collabora Online 26.04.3-3 ajoute la nouvelle fonctionnalité noyau Landlock comme troisième voie, devançant ainsi plusieurs autres solutions.
 Concrètement, 
les jails Kit sécurisées peuvent désormais reposer sur le LSM Linux Landlock comme alternative au dispositif basé sur capability/chroot, permettant un déploiement sans privilèges supplémentaires ; les jails Landlock interdisent également la création de pipes nommés et de sockets.


## Une technologie disponible sur les distributions récentes

L'activation de Landlock ne requiert aucune modification de configuration. 
Landlock offre à chaque déploiement un sandbox renforcé, imposé par le noyau : sans inconvénient pour les configurations classiques, sans changements de configuration requis.



Cette technologie est disponible par défaut depuis Ubuntu 22.04 (noyau 5.15), Debian 12 « Bookworm » (noyau 6.1), et RHEL 9 (ainsi que ses dérivés Rocky/AlmaLinux) à partir de la version 9.6, et toutes les versions plus récentes.


Une attention particulière est à noter pour les déploiements conteneurisés : 
pour Nextcloud sur Docker, c'est le noyau de l'hôte qu'il faut vérifier, et non celui du conteneur, car c'est lui que Landlock lit.


Le travail préparatoire sur Landlock avait été mené de longue haleine. 
Le travail de confinement Landlock avait progressé substantiellement et avait atteint la branche 26.04, avec Michael Stahl comme développeur principal — interdisant la création de pipes nommés et de sockets, corrigeant la configuration des préréglages partagés dans le kit.


## Ce que cela change pour l'écosystème Euro-Office

Cette mise à jour, publiée à la veille de la NCC 2026, arrive dans un contexte de montée en exigence réglementaire pour les organisations publiques européennes. Collabora Online est l'un des moteurs de rendu bureautique proposés dans Nextcloud Hub — la plateforme socle d'Euro-Office. 
Le renforcement apporté par Landlock importe surtout si un déploiement est bloqué sur le mode de secours parce que les namespaces sont bloqués par politique, ou si l'on fait tourner RichDocumentsCode sans capabilities.


En d'autres termes, les administrateurs qui opèrent Nextcloud dans des environnements à haute contrainte de sécurité — administrations, hôpitaux, établissements scolaires — disposent désormais d'une troisième option d'isolation, sans configuration supplémentaire et sans dégradation de performance.

**Mise en perspective :** Cette publication illustre une dynamique de fond : à mesure qu'Euro-Office et Collabora coexistent dans l'écosystème Nextcloud, les améliorations de sécurité de l'un profitent à l'environnement partagé par les deux. À quatre jours du lancement de Hub 26 Summer — dont les préversions RC4 promettent des nouveautés Office et gouvernance — la sécurité du rendu documentaire s'impose comme un axe de différenciation central face aux suites américaines soumises au Cloud Act.
