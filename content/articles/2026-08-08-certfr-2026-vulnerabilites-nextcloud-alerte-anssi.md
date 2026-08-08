---
title: "Alerte CERT-FR : deux vulnérabilités critiques signalées dans les produits Nextcloud, la plateforme d'Euro-Office exposée"
date: 2026-08-08
description: "Le CERT-FR a publié le 6 août 2026 un avis de sécurité (CERTFR-2026-AVI-0973) signalant deux failles dans les produits Nextcloud, permettant une atteinte à la confidentialité des données et un contournement de politique de sécurité. Un signal d'alerte pour tout l'écosystème souverain."
kicker: "Actualité"
author: "Rédaction (veille assistée par IA)"
tags: sécurité, Nextcloud, CERT-FR
source: "CERT-FR (ANSSI)"
sourceUrl: "https://www.cert.ssi.gouv.fr/avis/CERTFR-2026-AVI-0973/"
---

## L'ANSSI tire la sonnette d'alarme sur Nextcloud

Deux jours avant la publication de cet article, le Centre gouvernemental de veille, d'alerte et de réponse aux attaques informatiques français (CERT-FR), rattaché à l'ANSSI, a émis un avis de sécurité officiel concernant la plateforme Nextcloud. 
L'avis CERTFR-2026-AVI-0973, publié le 6 août 2026, signale que de multiples vulnérabilités ont été découvertes dans les produits Nextcloud, permettant à un attaquant de provoquer une atteinte à la confidentialité des données et un contournement de la politique de sécurité.



Deux références CVE sont associées à cet avis : CVE-2026-61527 et CVE-2026-61545.
 Ces bulletins ont été publiés le 5 août 2026 par Nextcloud lui-même sur son dépôt GitHub dédié aux avis de sécurité, 
sous les identifiants GHSA-99gw-ww6p-f2rr et GHSA-vq3v-jv6f-6xp2.


Pour les administrateurs d'instances Nextcloud hébergeant Euro-Office, la mise à jour est donc urgente. 
Les versions mineures de Nextcloud corrigent les problèmes de sécurité remontés notamment via le programme HackerOne — ne pas les appliquer peut mettre les données en danger.


## Ce que cela signifie concrètement pour Euro-Office

Euro-Office repose structurellement sur Nextcloud Hub. Toute vulnérabilité affectant la plateforme sous-jacente constitue, par ricochet, une surface d'attaque potentielle pour les organisations ayant déployé la suite bureautique souveraine — qu'il s'agisse d'administrations publiques, d'établissements scolaires ou d'entreprises du secteur privé.


Le calendrier de maintenance Nextcloud prévoit la prochaine publication corrective (versions 32.0.13, 33.0.7 et 34.0.2) pour le 13 août 2026 sur les trois branches encore supportées.
 Les administrateurs qui n'auraient pas encore appliqué les derniers correctifs de juillet sont donc particulièrement exposés dans l'intervalle.


La politique de sécurité de Nextcloud prévoit de rendre publics les détails des CVE environ trois semaines après la disponibilité d'une nouvelle version mineure : les administrateurs peuvent alors déterminer si leurs systèmes étaient vulnérables — mais à ce stade, les acteurs malveillants sont également plus à même d'identifier les vecteurs d'attaque, d'où l'importance de mettre à jour avant la publication des CVE.


## Un écosystème souverain qui doit faire ses preuves en matière de cybersécurité

Cette alerte intervient dans un contexte sensible pour l'écosystème Euro-Office. Le projet a déjà essuyé des critiques sur sa maturité opérationnelle depuis son lancement, et la confiance des décideurs publics — qui constituent précisément sa cible principale — se construit sur la durée, notamment à travers la réactivité face aux failles de sécurité.


Nextcloud lui-même soulignait récemment que la souveraineté numérique « n'est plus un problème théorique » et que l'Europe « doit distinguer l'autonomie réelle du simple marketing ».
 Ce discours prend tout son sens face à ce type d'alerte : la souveraineté numérique ne se décrète pas, elle s'entretient — patch après patch.

La bonne nouvelle est que le processus de divulgation responsable semble fonctionner : Nextcloud a publié ses propres bulletins de sécurité le 5 août, et le CERT-FR a relayé l'alerte dès le lendemain. 
Pour les utilisateurs de l'écosystème, la recommandation est claire : appliquer sans délai les mises à jour disponibles.
 La prochaine fenêtre de maintenance officielle, fixée au 13 août, devrait apporter les correctifs formels pour les trois branches actives.
