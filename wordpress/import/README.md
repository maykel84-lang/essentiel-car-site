# Import du contenu NAMPELLI — ordre exact

> ⚠️ **L'ordre compte.** WooCommerce doit être actif avant l'import XML (sinon les catégories
> produits ne sont pas créées), et les médias doivent être téléversés avant le CSV
> (sinon les images ne s'attachent pas aux produits).

## 1. Prérequis

- WordPress installé en français, thème **nampelli** activé ;
- **WooCommerce** installé et activé (l'assistant peut être terminé plus tard) ;
- Réglages → Permaliens → « Titre de la publication » enregistré.

## 2. Téléverser les médias

Médias → Médiathèque → **Téléverser** → sélectionner les 14 fichiers du dossier `medias/`.

Puis, pour chaque image : cliquer dessus → renseigner le **texte alternatif** (décrire l'image,
ex. « Sérum Éclat Vitamine C NAMPELLI — flacon compte-gouttes ambré 30 ml »). C'est important
pour le SEO et l'accessibilité.

## 3. Importer pages, articles et catégories

1. Outils → Importer → WordPress → **Installer maintenant**, puis **Lancer l'outil d'importation**.
2. Choisir `nampelli-contenu.xml`.
3. Attribuer les contenus à votre utilisateur administrateur.
4. Cocher « Télécharger et importer les fichiers joints » (sans effet ici, aucun risque).
5. Valider. Vous obtenez : 12 pages, 3 articles de blog, la catégorie « Conseils beauté »
   et toute l'arborescence de catégories produits (Soins visage, Corps, Coffrets & Routines,
   Parfums, Accessoires beauté, Bijoux, Petite maroquinerie…).

## 4. Importer les produits

1. Produits → Tous les produits → **Importer**.
2. Choisir `nampelli-produits.csv` ; cocher **« Mettre à jour les produits existants »** est inutile
   au premier import.
3. Sur l'écran de correspondance des colonnes : WooCommerce reconnaît tout automatiquement,
   y compris les colonnes `Meta: _nampelli_…` (les laisser telles quelles — elles alimentent
   les sections « Pour qui ? », « Comment l'utiliser », FAQ… des fiches).
4. Lancer l'import : 4 produits sont créés avec prix, catégories, images, ventes croisées.

## 5. Réglages de lecture

Réglages → Lecture :
- « La page d'accueil affiche » → **Une page statique** ;
- Page d'accueil : **Accueil** — Page des articles : **Conseils beauté**.

## 6. Pages WooCommerce

WooCommerce crée automatiquement Boutique, Panier, Validation de commande et Mon compte
(WooCommerce → Réglages → Avancé pour vérifier). La page **Suivi de commande** importée contient
déjà le formulaire de suivi natif.

## 7. Menus

Apparence → Menus — voir `../docs/04-contenu-menus-personnalisation.md` pour la composition
recommandée des 4 menus (principal + 3 colonnes de pied de page).

## 8. Vérification finale

- La page d'accueil affiche les 10 sections avec les produits et leurs prix ;
- Chaque fiche produit montre image, bénéfices, accordéons et FAQ ;
- Le coffret Routine Éclat affiche 82,70 € barré → 64,90 € ;
- Le panier affiche la barre « livraison offerte » ;
- Les pages légales sont en ligne (et leurs mentions `[À COMPLÉTER]` à compléter !).
