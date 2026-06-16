# NAMPELLI — site officiel

> **Révélez votre éclat** — marque féminine de beauté premium accessible (marque déposée à l'INPI).
> Lancement beauté : la **Routine Éclat** en 3 étapes (nettoyer · illuminer · nourrir).

Ce dépôt contient **deux choses** :

1. **Le site statique (HTML)** — à la racine, en ligne via **GitHub Pages**. La version sur laquelle on itère le design (rapide, moderne, animée). 👉 phase actuelle.
2. **Le projet WordPress / WooCommerce** — dans `wordpress/`, pour la vraie boutique avec paiements (à installer chez LWS quand on sera prêts).

## 🌐 Voir le site en ligne (GitHub Pages)

Une fois le dépôt publié et GitHub Pages activé, le site est visible à :

```
https://maykel84-lang.github.io/nampelli-site/
```

## 📁 Structure du dépôt

```
nampelli-site/
├── index.html              ← Page d'accueil (servie par GitHub Pages)
├── produit.html            ← Exemple de fiche produit
├── assets/
│   ├── css/style.css       ← Le design (couleurs, typographies, mises en page)
│   └── img/                ← Images du site
├── .nojekyll               ← GitHub Pages : sert les fichiers tels quels
├── docs/                   ← Guides : installation, SEO, performance, sécurité…
└── wordpress/              ← La version WordPress (pour plus tard)
    ├── theme/              ← Le thème sur mesure « nampelli »
    ├── import/             ← Pages, articles, catégories (XML) + produits (CSV)
    └── medias/             ← Visuels de marque haute définition
```

## ✏️ Modifier le site

- **Textes et structure** : `index.html`, `produit.html` (HTML simple).
- **Design** (couleurs, espacements, polices) : `assets/css/style.css`.
- **Images** : dossier `assets/img/`.

Chaque modification poussée sur la branche principale se met **automatiquement en ligne** sur l'URL GitHub Pages en 1 à 2 minutes.

## 🎨 Identité de marque

Jaune signature `#FDE618` · Noir `#000000` · Blanc chaud `#FFFDF7` · Crème `#FAF7EF` ·
Beige `#EFE5D2` · Brun ambré `#8A4B24` · Doré `#B88922` · Vert botanique `#4F6F52`.
Titres : Cormorant Garamond — Texte : Jost. Le jaune reste un **accent** sur fonds clairs (luxe accessible).

## 🚀 Prochaine étape : WordPress

Quand la boutique avec paiements sera nécessaire, tout est prêt dans `wordpress/` :
hébergement WordPress 1 clic chez LWS (Auto-installeur / WP Manager), téléversement du
thème et import du contenu. Guide complet dans `docs/`.

---

© NAMPELLI — Marque déposée à l'INPI. Tous droits réservés.
