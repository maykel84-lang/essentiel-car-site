# 05 — SEO : configuration et bonnes pratiques

## 1. Ce que le thème fait déjà

- **H1 unique** par page, hiérarchie H2/H3 propre sur tous les templates ;
- **Données structurées JSON-LD** : `Organization` + `WebSite` (accueil), `BreadcrumbList`
  (pages internes), `FAQPage` (page FAQ + FAQ des fiches produit) — `Product` est généré
  par WooCommerce ;
- Fil d'Ariane visible et balisé ;
- Alt sur toutes les images du thème ; URLs courtes ; liens internes structurels
  (accueil ↔ routine ↔ produits ↔ blog) ;
- Performance Core Web Vitals (docs/06) — un critère de classement.

> Si Rank Math génère déjà ces schémas, cochez « Désactiver les données structurées du thème »
> (Personnaliser → NAMPELLI → 10 · Technique) pour éviter les doublons.

## 2. Configurer Rank Math

1. Assistant : profil « Avancé » — connecter le compte (gratuit) ;
2. **Titles & Meta** :
   - Format des titres : `%title% %sep% NAMPELLI` ;
   - Accueil : titre « NAMPELLI — Routine visage éclat en 3 étapes | Cosmétiques premium » ;
     description ≈ « Nettoyer, illuminer, nourrir : découvrez la Routine Éclat NAMPELLI.
     Soins visage premium, livraison offerte dès 49 €. » ;
3. **Sitemap** : activé par défaut → `https://www.nampelli.com/sitemap_index.xml` ;
4. Schéma : laisser « Product » actif pour les produits ; désactiver les doublons éventuels ;
5. Breadcrumbs Rank Math : inutile de les afficher (le thème a les siens).

Pour **chaque produit et page clé**, remplissez l'encart Rank Math : titre ≤ 60 caractères,
meta description 150-160 caractères, avec le bénéfice et un appel à l'action.

## 3. Google Search Console

1. search.google.com/search-console → Ajouter la propriété « Domaine » `nampelli.com` ;
2. Validation DNS (chez le registrar) ou via Rank Math (Réglages généraux → Search Console) ;
3. Soumettre le sitemap `sitemap_index.xml` ;
4. Au lancement : vérifier que Réglages → Lecture → « ne pas indexer » est **décoché**,
   puis demander l'indexation de l'accueil et des 4 fiches produits.

## 4. Google Merchant Center (Shopping gratuit)

1. Compte sur merchants.google.com (lié à la Search Console = validation automatique) ;
2. Installez **Product Feed PRO for WooCommerce** → créer un flux Google Shopping
   (catégorie Google : `Health & Beauty > Personal Care > Skin Care`) ;
3. Renseignez la marque NAMPELLI et les **GTIN/EAN** quand vous en aurez (sinon
   `identifier_exists = no`) ;
4. Les fiches gratuites Google Shopping s'activent dans Merchant Center → Croissance.

## 5. Stratégie de contenu (maillage)

Le triangle gagnant déjà en place — à entretenir :

```
Article de blog (intention informationnelle)
   ↓ lien interne
Page Routine Éclat (intention mixte)
   ↓ lien interne
Fiche produit (intention transactionnelle)
```

Calendrier conseillé : **2 articles/mois** sur des requêtes précises, par exemple :
« routine peau terne », « vitamine C avant ou après crème », « karité visage peau sèche »,
« dans quel ordre appliquer ses soins », « routine peau sensible 3 étapes »…
Chaque article : 700-1200 mots, 1 H1, des H2, 2-3 liens internes, 1 image optimisée + alt.

## 6. Hygiène SEO continue

- Texte alternatif sur **chaque** image téléversée (décrire ce qu'on voit, inclure le produit) ;
- Jamais deux pages pour la même requête ;
- Redirection 301 si vous changez un slug (Rank Math → Redirections) ;
- Search Console 1×/semaine : couverture, requêtes, erreurs ;
- robots.txt : celui de WordPress suffit ; Rank Math permet d'y ajouter
  `Disallow: /panier/` et `Disallow: /commander/` (pages sans valeur d'indexation).
