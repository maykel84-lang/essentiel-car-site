# 04 — Contenu, menus et personnalisation

## 1. Personnaliser la page d'accueil (sans coder)

Apparence → **Personnaliser** → panneau **« NAMPELLI — Marque & accueil »** :

| Section du Customizer | Ce qu'elle pilote |
|---|---|
| 1 · Marque, bandeau & contact | Bandeau annonce du haut, signature, e-mail, **seuil livraison offerte** |
| 2 · Héro | Badge, titre H1, sous-titre, textes des 2 boutons, image |
| 3 · Routine en 3 étapes | Titre, intro, textes des étapes Nettoyer / Illuminer / Nourrir |
| 4 · Produit vedette | Slug du produit (par défaut le sérum), textes, points clés, image |
| 5 · Routine Éclat (bundle) | Slug du coffret, textes, **mention d'économie**, image |
| 6 · Pourquoi NAMPELLI | Titre, storytelling (2 paragraphes séparés par une ligne vide), engagements, image lifestyle |
| 7 · Avis clientes | Titre + 3 avis au format `Texte :: Prénom :: Note` — **n'utilisez que des avis réels** ; vide = la section affiche les derniers avis WooCommerce, ou se masque |
| 8 · Newsletter | Titre, texte, shortcode externe optionnel (MailPoet/Brevo) |
| 9 · Réseaux sociaux & pied de page | Texte du footer + URLs Instagram, Facebook, TikTok, Pinterest |
| 10 · Technique | Désactivation des schémas du thème si votre extension SEO les génère |

Chaque champ a une valeur par défaut conforme au brief : vous pouvez lancer le site sans rien toucher.

## 2. Menus (Apparence → Menus)

### Menu principal (emplacement « Menu principal »)

1. Accueil (page) ;
2. Routine Éclat (page « La Routine Éclat ») ;
3. **Soins visage** (catégorie de produits) — sous-éléments : Nettoyants, Sérums, Crèmes ;
4. **Corps** (catégorie) — à afficher quand la collection arrive ;
5. **Coffrets** (catégorie « Coffrets & Routines ») ;
6. Conseils beauté (page) ;
7. À propos (page).

> Pour ajouter des catégories de produits au menu : « Préférences de l'écran » (en haut)
> → cocher **Catégories de produits**.

### Pied de page — Boutique (« Pied de page — Boutique »)
Tous les soins (page Boutique) · Routine Éclat · Soins visage · Coffrets

### Pied de page — Aide (« Pied de page — Aide »)
FAQ · Contact · Livraison & retours · Suivi de commande · Mon compte

### Pied de page — Informations (« Pied de page — Informations »)
À propos · CGV · Mentions légales · Politique de confidentialité · Politique cookies

*Tant qu'aucun menu n'est créé, le thème affiche automatiquement des liens de secours pertinents.*

## 3. Ajouter un univers (ex. lancer les parfums)

L'architecture est prête : les catégories futures existent déjà (masquées tant qu'elles sont vides).

1. Produits → Ajouter : créez les fiches dans la catégorie **Parfums**
   (remplissez la métabox NAMPELLI : bénéfices, FAQ…) ;
2. Apparence → Menus : ajoutez la catégorie « Parfums » au menu principal ;
3. (Option) Personnaliser → 4 · Produit vedette : mettez un parfum en avant sur l'accueil ;
4. C'est tout — grilles, fiches, fil d'Ariane et SEO suivent automatiquement.

Pour une nouvelle sous-catégorie (ex. « Huiles de parfum ») : Produits → Catégories →
nom + slug + **catégorie parente** + description (affichée en haut de la page de catégorie).

## 4. Écrire un article de blog

Articles → Ajouter :

1. Titre travaillé (mot-clé au début si naturel) ;
2. Intro de 2-3 lignes, puis intertitres **H2** (et H3) ;
3. 1 à 3 liens internes vers produits/pages (comme dans les 3 articles fournis) ;
4. Image mise en avant (1200 × 800 px max, < 200 Ko après compression) + texte alternatif ;
5. Catégorie « Conseils beauté » ; extrait personnalisé (≈ 150 caractères) ;
6. Onglet Rank Math : title + meta description.

Les 3 derniers articles apparaissent automatiquement sur l'accueil.

## 5. Modifier les pages

Pages → Toutes les pages : tout est en blocs Gutenberg standard (paragraphes, titres, tableaux,
**blocs « Détails »** pour les FAQ dépliantes — le thème génère automatiquement les données
structurées FAQ à partir de ces blocs).

## 6. Remplacer les visuels

Les visuels fournis (`medias/`) sont issus du dossier de marque — parfaits pour démarrer.
Quand vos packshots studio définitifs arrivent :

1. Médiathèque → téléverser (mêmes noms de fichiers = remplacement automatique partout, via
   l'extension « Enable Media Replace » ; sinon, remplacez image par image) ;
2. Fiches produits : Édition → Image produit / Galerie produit ;
3. Accueil : Personnaliser → sections 2, 4, 5, 6.

Format conseillé : JPEG/WebP, 1600 px max de large, < 300 Ko (Imagify compresse le reste).
