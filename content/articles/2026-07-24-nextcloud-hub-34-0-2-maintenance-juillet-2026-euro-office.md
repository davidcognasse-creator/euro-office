---
title: "Nextcloud Hub 34.0.2 : une mise à jour de maintenance qui consolide la plateforme d'Euro-Office"
date: 2026-07-24
description: "Publiée le 23 juillet 2026, la version 34.0.2 de Nextcloud Hub 26 Spring apporte corrections de bugs et correctifs de sécurité — un socle stabilisé pour les instances qui hébergent Euro-Office."
kicker: "Sortie"
author: "Rédaction (veille assistée par IA)"
tags: Nextcloud, mise à jour, sécurité
source: "Nextcloud / GitHub (newreleases.io)"
sourceUrl: "https://newreleases.io/project/github/nextcloud-releases/server/release/v34.0.2"
---

## 34.0.2 : la deuxième maintenance de Hub 26 Spring


Le calendrier de maintenance de Nextcloud est cadencé au mois : la version 34 — baptisée Hub 26 Spring — a été publiée le 9 juin 2026, et ses correctifs successifs suivent un rythme mensuel régulier.
 C'est dans ce cadre que 
la version 34.0.2 a été publiée le 23 juillet 2026
, soit exactement six semaines après la sortie initiale.

Pour rappel, 
Hub 26 Spring (v34) est supporté jusqu'en juin 2027, sa version courante étant désormais la 34.0.2 publiée le 23 juillet 2026.


Cette publication concerne aussi les branches antérieures encore maintenues. 
Les versions 32.0.12 (Hub 25 Autumn) et 33.0.6 (Hub 26 Winter) ont également reçu leurs mises à jour le même jour.
 Nextcloud maintient ainsi simultanément trois branches actives, conformément à sa politique de support sur douze mois.

## Ce que contient cette version pour les administrateurs


Les mises à jour de maintenance incluent des correctifs importants de bugs, des améliorations de stabilité et des mises à niveau de sécurité — un processus rapide et sans risque, selon Nextcloud.


Du côté du détail technique, 
le changelog de la v34.0.2 mentionne notamment des corrections sur le verrouillage de fichiers (`files_lock`), des mises à jour de dépendances DOMPurify (bibliothèque de sécurité contre les injections XSS) et des ajustements de la matrice de tests CI.
 Ces changements, bien que discrets, sont caractéristiques d'une version de maintenance sérieuse : priorité à la robustesse et à la surface d'attaque réduite.


La politique de sécurité de Nextcloud consiste à publier les CVE environ trois semaines après la disponibilité publique d'une nouvelle version mineure, afin que les administrateurs puissent évaluer les vulnérabilités corrigées et mettre à jour leurs systèmes avant que les vecteurs d'attaque ne soient connus des acteurs malveillants.
 Autrement dit, les administrateurs qui n'auront pas appliqué la 34.0.2 d'ici mi-août s'exposeront à des risques documentés publiquement.

## Pourquoi c'est important pour l'écosystème Euro-Office

Hub 26 Spring est la version de Nextcloud dans laquelle 
Euro-Office a été intégré pour la première fois, le 9 juin 2026.
 Chaque mise à jour de maintenance de cette branche impacte donc directement toutes les instances qui hébergent la suite bureautique souveraine.


Nextcloud recommande fortement aux utilisateurs de Hub 25 Autumn, Hub 26 Winter et Hub 26 Spring de mettre à jour respectivement vers les versions 32.0.12, 33.0.6 et 34.0.1
 — et désormais 34.0.2 pour la branche Spring. Pour les organisations qui ont déployé Euro-Office en production, notamment dans le secteur public ou éducatif, appliquer ces correctifs rapidement relève autant de la bonne hygiène numérique que de la cohérence avec l'exigence de souveraineté portée par le projet.

**Mise en perspective.** La cadence mensuelle des mises à jour de Nextcloud — et, par extension, de la plateforme qui porte Euro-Office — confirme la maturité opérationnelle de cet écosystème. À l'heure où 
le consortium Euro-Office vise lui-même un rythme mensuel de mises à jour, avec une version 1.1 attendue fin juillet
, les deux projets semblent se synchroniser naturellement. Les prochaines semaines diront si la v1.1 d'Euro-Office accompagnera ou suivra de peu la v34.0.2 de son hôte de référence.
