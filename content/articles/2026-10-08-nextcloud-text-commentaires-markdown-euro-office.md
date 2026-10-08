---
title: "Nextcloud Text introduit les commentaires natifs dans les fichiers Markdown — une avancée pour la collaboration souveraine"
date: 2026-10-08
description: "Nextcloud a annoncé le 7 octobre 2026 l'arrivée de commentaires natifs dans les fichiers Markdown au sein de Nextcloud Text, Notes et Collectives. Une fonctionnalité attendue qui enrichit l'expérience collaborative de l'écosystème Euro-Office."
kicker: "Sortie"
author: "Rédaction (veille assistée par IA)"
tags: Nextcloud Text, Markdown, collaboration souveraine
source: "Nextcloud Blog"
sourceUrl: "https://nextcloud.com/blog/markdown-comments-nextcloud-text/"
---

## Une lacune longtemps comblée par des contournements

Collaborer sur des fichiers Markdown a longtemps relevé du bricolage. 
Le format Markdown est portable, simple d'utilisation et lisible aussi bien en rendu qu'en texte brut — mais collaborer efficacement à plusieurs sur un fichier Markdown nécessite des hacks et des contournements.


La communauté avait bien développé une astuce reposant sur les définitions de liens de référence pour simuler des commentaires, mais 
ce contournement était loin d'être parfait : la syntaxe est cryptique pour quiconque ne connaît pas l'astuce, chaque ligne de commentaire nécessite son propre préfixe `[comment]: <>`, et certains caractères peuvent le briser.


C'est pour résoudre ce problème structurel que Nextcloud a décidé d'implémenter une solution robuste et native.

## Une implémentation fondée sur la syntaxe des notes de bas de page


La fonctionnalité qui permet d'insérer des commentaires et d'y répondre a été introduite dans Nextcloud Text, Notes et Collectives avec la version Nextcloud Hub 26 Summer.


Pour y parvenir, 
les équipes de Nextcloud ont opté pour une approche plus robuste, s'appuyant sur la syntaxe des notes de bas de page : une extension communautaire absente de la spécification originale de John Gruber (2004), mais devenue le standard de facto, supportée par de nombreux parseurs Markdown.



La syntaxe de commentaires retenue intègre des éléments pour les réponses, les noms d'affichage, les identifiants utilisateur Nextcloud et les horodatages
 — garantissant ainsi une traçabilité complète des échanges, sans sortir du fichier. Un commentaire s'insère directement depuis l'interface, 
en cliquant sur une nouvelle icône de bulle de dialogue.



Nextcloud Text est au cœur de plusieurs applications qui supportent la syntaxe Markdown : c'est l'éditeur de texte collaboratif qui propulse également Nextcloud Notes et Nextcloud Collectives.
 La fonctionnalité bénéficie donc simultanément à l'ensemble de ces outils.

## Ce que cela change pour les utilisateurs d'Euro-Office

Pour les organisations qui ont adopté Euro-Office et son intégration avec l'écosystème Nextcloud, cette mise à jour représente un gain concret. Les équipes qui rédigent des notes internes, des bases de connaissances ou de la documentation technique dans Collectives disposent désormais d'un mécanisme de révision et de relecture intégré, sans recourir à des outils tiers.


Nextcloud Write est un éditeur de documents collaboratif en temps réel qui s'exécute entièrement sur une infrastructure de son choix, les données ne quittant jamais les serveurs de l'organisation ou un cloud de confiance
 — et l'ajout des commentaires Markdown renforce encore cette logique de souveraineté totale du cycle de vie documentaire.

La fonctionnalité est disponible dès maintenant pour tous les utilisateurs de Nextcloud Hub 26 Summer. Pour l'écosystème Euro-Office, qui s'appuie sur cette même base technique, c'est une brique de plus qui comble l'écart fonctionnel avec des outils comme Google Docs ou Microsoft Word — lesquels proposent les commentaires inline depuis des années. La course à la parité fonctionnelle avec les géants du cloud se joue désormais aussi dans les détails.
