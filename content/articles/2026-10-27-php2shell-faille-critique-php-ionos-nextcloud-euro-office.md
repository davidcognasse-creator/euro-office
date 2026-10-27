---
title: "PHP2Shell : deux failles PHP critiques ébranlent l'infrastructure d'IONOS Nextcloud — et l'écosystème Euro-Office avec"
date: 2026-10-27
description: "Deux vulnérabilités critiques baptisées PHP2Shell (CVE-2026-109618 et CVE-2026-109619, CVSS 9.2) ont été divulguées le 20 octobre. Elles ont contraint IONOS à couper temporairement ses services Nextcloud — dont la brique Office — en urgence."
kicker: "Actualité"
author: "Rédaction (veille assistée par IA)"
tags: sécurité, Nextcloud, IONOS
source: "Help Net Security"
sourceUrl: "https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/"
---

Rarement une faille dans le langage PHP lui-même aura suscité autant d'alarmisme dans la communauté de la sécurité informatique. Baptisées **PHP2Shell**, deux vulnérabilités critiques découvertes dans le cœur de PHP viennent de secouer l'ensemble de l'écosystème web — et l'infrastructure sur laquelle repose Euro-Office ne fait pas exception.

## Deux failles vieilles de décennies, révélées à l'ère de l'IA


PHP2Shell désigne une paire de vulnérabilités à fort impact (CVE-2026-109618 et CVE-2026-109619) portant sur des failles de sécurité mémoire dans les versions PHP 5.4 à 8.5. Elles permettent à un attaquant d'exécuter du code à distance. Découvertes avec l'aide de l'IA en août 2026, leur existence a été rendue publique le 20 octobre 2026.



Le projet PHP a publié des correctifs le 21 octobre 2026 pour ces deux failles, qui portent toutes deux un score CVSS v4.0 de 9.2 — niveau « Critique ».
 La fenêtre d'exposition était particulièrement préoccupante : 
selon Amazon Threat Intelligence, son réseau de honeypots MadPot a enregistré une tentative d'exploitation dès le 17 octobre 2026, soit quatre jours avant la divulgation publique de CVE-2026-109618 et CVE-2026-109619.



Il ne s'agit pas d'une vulnérabilité propre à une application particulière : c'est une faille dans PHP lui-même, qui touche donc toutes les applications PHP d'un serveur — WordPress, Joomla, Drupal, Nextcloud, boutiques en ligne, forums, Roundcube, phpMyAdmin…
 
Les failles, suivies sous les identifiants CVE-2026-109618 et CVE-2026-109619 et collectivement connues sous le nom PHP2Shell, résident dans le moteur d'exécution PHP lui-même, et non dans une application ou un site web en particulier.


## IONOS coupe ses services Nextcloud en urgence

La réaction d'IONOS — hébergeur de référence de l'écosystème Euro-Office — a été immédiate et radicale. 
En raison d'une vulnérabilité critique PHP à portée industrielle, IONOS a procédé à un arrêt d'urgence temporaire de l'ensemble de ses services Nextcloud pour protéger les données clients et l'infrastructure.



À IONOS, les produits utilisant PHP incluent notamment le Web Hosting, Managed WordPress, MyWebsite 8, **Managed Nextcloud** et HiDrive Next. Deux vulnérabilités de sécurité critiques ont été divulguées dans le cœur de PHP, susceptibles de permettre à des attaquants d'exécuter leur propre code sur un site web et d'accéder aux données des clients.



IONOS a appliqué la mise à jour officielle sur l'ensemble des plateformes qu'il opère lui-même, et avait même mis en place des mesures de sécurité supplémentaires avant la publication des correctifs.
 
Les plateformes d'hébergement d'IONOS utilisent des configurations PHP personnalisées et des règles de pare-feu actives pour bloquer les requêtes suspectes — mais seule la mise à jour officielle peut corriger définitivement les vulnérabilités.


## Les correctifs disponibles, la vigilance reste de mise


Au 23 octobre 2026, le projet PHP a corrigé les deux failles dans les versions PHP 8.5.12, 8.4.27, 8.3.36 et 8.2.35, et Nextcloud a publié des builds corrigés pour son conteneur All-in-One (AIO).


Pour les administrateurs auto-hébergeurs d'Euro-Office et de Nextcloud, la mise à jour PHP s'impose sans délai. 
Des tentatives d'exploitation ont été observées dans la nature dès le 21 octobre 2026, détectées via le réseau mondial de honeypots « Attacker Eye » de watchTowr.


**Mise en perspective.** Cet épisode illustre une réalité structurelle de l'écosystème souverain : Euro-Office, aussi bien conçu soit-il, repose sur des couches logicielles partagées avec l'ensemble du web. La dépendance à PHP — commun à Nextcloud, à IONOS Managed Workspace et à d'innombrables autres services — rappelle que la souveraineté numérique ne s'arrête pas aux frontières d'une application : elle exige une veille continue sur l'ensemble de la chaîne d'approvisionnement logicielle.
