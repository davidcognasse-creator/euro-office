---
title: "Nextcloud Talk franchit un cap : recevoir des notifications sans les serveurs de Google"
date: 2026-09-03
description: "Nextcloud publie un guide officiel pour configurer UnifiedPush sur Android et Nextcloud Talk, permettant de s'affranchir totalement de Google Play Services pour les notifications push — une avancée directement utile aux utilisateurs d'Euro-Office."
kicker: "Écosystème"
author: "Rédaction (veille assistée par IA)"
tags: souveraineté numérique, Nextcloud Talk, UnifiedPush
source: "Nextcloud Blog"
sourceUrl: "https://nextcloud.com/blog/unifiedpush-android-nextcloud-talk/"
---

Publié le 1er septembre 2026 sur le blog officiel de Nextcloud, un nouveau tutoriel technique s'attaque à l'un des derniers angles morts de la souveraineté numérique mobile : les notifications push sur Android. Le message est clair — il est désormais possible de recevoir des alertes de Nextcloud Talk sans qu'un seul octet ne transite par l'infrastructure de Google.

## Le problème : Google au cœur des notifications mobiles


Pour les utilisateurs Android disposant de téléphones « dégooglisés », s'assurer que les notifications push arrivent de façon fiable constitue un véritable défi.
 La raison est structurelle : 
les ROM Android axées sur la vie privée et la sécurité — comme microG ou GrapheneOS — réimplémentent les API de Google Play Services ou les isolent dans un bac à sable, mais dans les deux cas, chaque notification push implique encore les serveurs de Google.


C'est précisément ce que le standard ouvert **UnifiedPush** cherche à corriger, en décentralisant la chaîne de distribution des notifications et en permettant à chaque utilisateur de choisir — ou d'auto-héberger — son propre serveur de distribution.

## La solution en trois étapes


Le guide explique comment recevoir des notifications push dans l'application Android Nextcloud Talk sans Google Play Services, en activant UnifiedPush dans les paramètres de l'application et en installant l'application distributeur Sunup.
 
Trois actions suffisent : activer le web push sur son instance Nextcloud, installer l'application Sunup, puis activer UnifiedPush dans Nextcloud Talk.



Pour les configurations plus avancées, le guide couvre également d'autres applications distributrices — comme NextPush ou ntfy — ainsi que l'option d'un serveur push auto-hébergé.


La démarche est cohérente avec la philosophie de Nextcloud : 
ne pas dépendre des serveurs de Google pour recevoir des notifications, en trois étapes.
 Une simplicité revendiquée qui tranche avec la réputation parfois technique de l'auto-hébergement.

## Un signal fort pour l'écosystème souverain

Pour les organisations ayant déployé Euro-Office dans un environnement Nextcloud — qu'il s'agisse d'une collectivité territoriale, d'un établissement scolaire ou d'une PME soucieuse de conformité — cette évolution n'est pas anodine. Elle complète le tableau d'une stack entièrement souveraine : documents édités dans Euro-Office, échanges coordonnés via Nextcloud Talk, et désormais **notifications mobiles sans intermédiation américaine**.


Pour ceux qui ne sont pas encore familiers du sujet, le guide inclut un excursus expliquant pourquoi la gestion des notifications par Google pose problème et comment certaines applications open source y remédient.


La publication intervient à moins de trois semaines du lancement de **Nextcloud Hub 26 Summer** (16 septembre) et de la **Nextcloud Community Conference 2026** (19-20 septembre à Berlin). 
La prochaine version majeure promet des mises à jour sur les automations, l'IA, Office et la gouvernance.
 Le tutoriel UnifiedPush semble en être le prélude technique : avant les grandes annonces, Nextcloud consolide les fondations de sa promesse souveraine, brique par brique.
