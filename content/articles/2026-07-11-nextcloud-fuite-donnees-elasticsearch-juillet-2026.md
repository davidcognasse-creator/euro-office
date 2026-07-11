---
title: "Nextcloud exposé : 367 000 enregistrements internes accessibles en ligne — un coup dur pour l'écosystème souverain"
date: 2026-07-11
description: "Une base Elasticsearch mal configurée a rendu publiquement accessibles 367 000 enregistrements internes de Nextcloud GmbH pendant plusieurs semaines. L'incident, révélé le 8 juillet par Cybernews, touche directement le partenaire central d'Euro-Office."
kicker: "Actualité"
author: "Rédaction (veille assistée par IA)"
tags: sécurité, Nextcloud, souveraineté numérique
source: "Cybernews"
sourceUrl: "https://cybernews.com/security/nextcloud-cloud-provider-data-leak/"
---

C'est un incident qui tombe au plus mauvais moment pour la galaxie Euro-Office. Le 8 juillet 2026, le site spécialisé Cybernews a révélé qu'une base de données Elasticsearch de la Nextcloud GmbH — l'entreprise allemande à l'origine de la plateforme éponyme et co-fondatrice d'Euro-Office — était restée publiquement accessible pendant plusieurs semaines, exposant près de 367 000 enregistrements internes représentant environ 7,92 Go de données.

## Une erreur de configuration, pas une faille logicielle


Le 18 mai, l'équipe de recherche de Cybernews a découvert cet ensemble de données exposées : le cluster, contenant près de 8 Go, renfermait des données internes de Nextcloud.
 
Après avoir signalé la découverte, Nextcloud a fermé l'accès dans un délai de deux jours.
 
Depuis le 27 mai, la base n'est plus accessible publiquement.



Parmi les fichiers exposés figuraient notamment des factures, des contrats commerciaux, des courriels professionnels, des documents techniques, ainsi que des scripts d'installation.
 
Particulièrement préoccupants, des scripts développés spécifiquement pour des clients afin d'intégrer l'infrastructure Nextcloud dans leurs systèmes étaient également présents. Parmi les informations visibles figuraient des adresses e-mail d'employés de Strato et d'IONOS — partenaire direct d'Euro-Office — ainsi que du ministère de l'Éducation de Rhénanie-du-Nord-Westphalie.



L'entreprise allemande indique que l'incident résulte d'une erreur de configuration de son infrastructure d'hébergement interne, et non d'une vulnérabilité affectant le logiciel Nextcloud lui-même.
 
Nextcloud a précisé avoir immédiatement enquêté, résolu le problème et l'avoir signalé au délégué à la protection des données compétent, en soulignant ne disposer d'aucun élément démontrant une exploitation malveillante des données publiées.


## Des données client en clair et un risque résiduel


Ce qui aggrave la situation, c'est qu'une partie des données était non chiffrée.
 
Certains scripts contenaient des identifiants techniques ou des paramètres de connexion intégrés directement dans le code. Bien que ces éléments ne permettent pas, à eux seuls, de compromettre des infrastructures clientes, ils pourraient offrir des indications précieuses à des acteurs malveillants cherchant à identifier des vulnérabilités potentielles.



Nextcloud n'a trouvé aucune preuve d'accès non autorisé, mais les chercheurs préviennent que des attaquants auraient pu accéder aux données avant leur sécurisation, des robots automatisés scannant régulièrement internet à la recherche de ce type de vulnérabilité.
 
Les clusters Elasticsearch publiquement accessibles comptent depuis des années parmi les causes les plus fréquentes de fuites de données, car de simples erreurs de configuration peuvent les rendre involontairement disponibles sans protection d'accès.


## Un signal paradoxal pour la souveraineté numérique


Nextcloud est notamment présenté comme un composant de la suite Euro-Office, l'alternative européenne à Microsoft Office et Google Docs.
 L'incident survient dans un contexte où l'argument central de la coalition — reprendre le contrôle de ses données face aux géants américains — est précisément mis à l'épreuve par un acteur européen.


La fuite relance les interrogations autour du service, utilisé notamment par le ministère de l'Éducation nationale français via la plateforme Apps.education.fr, malgré l'absence d'impact déclaré sur les instances clientes.
 
La société précise qu'aucun serveur client n'a été exposé dans cet incident.


Ce rappel inattendu illustre une réalité souvent sous-estimée dans le débat sur la souveraineté numérique : la maîtrise des données ne se résume pas au choix d'un logiciel open source ou d'un hébergeur européen — elle engage aussi l'ensemble des pratiques opérationnelles internes. Pour Euro-Office, dont Nextcloud est l'un des piliers techniques et institutionnels, l'enjeu est désormais autant de réputation que de gouvernance.
