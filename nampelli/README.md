# NAMPELLI — Site e-commerce WordPress / WooCommerce

> **Révélez votre éclat** — boutique premium de la marque NAMPELLI (marque verbale déposée à l'INPI).
> Lancement : univers beauté avec la Routine Éclat en 3 étapes. Architecture pensée pour accueillir ensuite
> les soins corps, parfums, coffrets, accessoires beauté, bijoux, maroquinerie et mode.

Ce dossier contient **tout le nécessaire pour mettre en ligne le site** sur n'importe quel hébergement WordPress :

```
nampelli/
├── wp-content/themes/nampelli/   ← Thème sur mesure (à téléverser tel quel)
├── import/
│   ├── nampelli-contenu.xml      ← 12 pages + 3 articles + catégories produits (import WordPress)
│   ├── nampelli-produits.csv     ← 4 fiches produits complètes (import WooCommerce)
│   └── README.md                 ← Ordre d'import pas à pas
├── medias/                       ← 14 visuels de marque prêts à téléverser (noms SEO)
├── docs/                         ← Guides : installation, extensions, SEO, performance, sécurité…
└── README.md                     ← Ce fichier
```

## Démarrage rapide (résumé)

1. **Hébergement + WordPress** en français (`fr_FR`), HTTPS actif → `docs/01-installation.md`
2. **Permaliens** : Réglages → Permaliens → « Titre de la publication »
3. **WooCommerce** : installer l'extension, suivre l'assistant (France, EUR, TVA 20 %)
4. **Thème** : téléverser `wp-content/themes/nampelli/` puis l'activer
5. **Médias** : téléverser le contenu de `medias/` dans la Médiathèque (avant le CSV !)
6. **Contenu** : Outils → Importer → WordPress → `import/nampelli-contenu.xml`
7. **Produits** : Produits → Tous les produits → Importer → `import/nampelli-produits.csv`
8. **Accueil** : Réglages → Lecture → page statique « Accueil » + page des articles « Conseils beauté »
9. **Menus** : Apparence → Menus → créer les 4 menus → `docs/04-contenu-menus-personnalisation.md`
10. **Extensions** (paiement, SEO, cache, sécurité…) → `docs/02-extensions.md`

L'ordre détaillé, avec captures des écrans concernés, est dans `import/README.md`.

## Ce que fait le thème `nampelli`

**Design** — identité fidèle au brief : jaune signature `#FDE618` en accent maîtrisé (boutons, labels,
détails), fonds blanc chaud / crème / beige, noir profond, touches dorées et vert botanique.
Titres Cormorant Garamond, texte Jost. Mobile-first, animations légères (désactivées si
`prefers-reduced-motion`).

**Page d'accueil** — 10 sections pilotées depuis *Apparence → Personnaliser → NAMPELLI* :
héro, réassurance, routine en 3 étapes, focus Sérum, bundle Routine Éclat avec économie visible,
cartes produits, storytelling « Pourquoi NAMPELLI », avis clientes, conseils beauté, newsletter RGPD.

**Fiches produits** — promesse, bénéfices à puces diamant, badges de réassurance sous le bouton
d'achat, sections accordéon (« Pour qui ? », « Comment l'utiliser », « Quand », « Ingrédients clés »,
« Précautions », « Livraison & retours », FAQ produit), vidéo optionnelle, avis clients,
module « Complétez votre routine », **bouton d'achat sticky sur mobile**.

**Conversion** — barre de progression « livraison offerte » dans le panier, cross-sells,
compteur panier AJAX, tunnel épuré avec rappel paiement sécurisé, panier vide avec retour boutique.

**SEO** — H1 unique, données structurées JSON-LD (Organization, WebSite, BreadcrumbList, FAQPage),
fil d'Ariane, alt sur toutes les images du thème, URLs propres, compatible Rank Math / Yoast
(schémas du thème désactivables d'un clic).

**Performance** — zéro dépendance JS externe, un seul CSS + un seul JS (defer), préchargement de
l'image héro (LCP), lazy-loading, nettoyage du `<head>`, émojis/embeds retirés, XML-RPC désactivé.

**Back-office** — tous les textes/images de l'accueil modifiables sans coder, champs produit dédiés
(métabox NAMPELLI), abonnées newsletter visibles dans l'admin, menus extensibles pour les futurs univers.

## À compléter avant la mise en ligne

- [ ] Mentions `[À COMPLÉTER]` dans CGV, Mentions légales, Confidentialité (SIRET, adresse, hébergeur, médiateur…)
- [ ] Créer l'adresse `contact@nampelli.com` et la renseigner (Customizer + WooCommerce → E-mails)
- [ ] Moyens de paiement : comptes Stripe et PayPal (docs/03)
- [ ] Bandeau cookies (Complianz) et formulaire de contact (docs/02)
- [ ] Remplacer à terme les visuels de lancement par des packshots studio définitifs
- [ ] Premiers avis clients réels (section avis de l'accueil + avis produits)

## Les prix de lancement (modifiables dans WooCommerce)

| Produit | Prix |
|---|---|
| Nettoyant Purifiant 200 ml | 19,90 € |
| Sérum Éclat Vitamine C 30 ml | 34,90 € |
| Crème Nutrition Karité 50 ml | 27,90 € |
| **Routine Éclat (coffret des 3)** | **64,90 €** au lieu de 82,70 € (−17,80 €) |
