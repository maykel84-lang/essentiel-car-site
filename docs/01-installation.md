# 01 — Installation : hébergement, WordPress, thème

## 1. Choisir l'hébergement

Pour une boutique WooCommerce rapide et sereine, privilégiez un hébergeur **français/européen
avec serveur LiteSpeed ou cache serveur intégré**, PHP 8.2+, HTTPS inclus :

| Hébergeur | Pourquoi | Budget indicatif |
|---|---|---|
| **o2switch** (recommandé) | Illimité, support FR excellent, LiteSpeed | ≈ 7 €/mois |
| Hostinger Business | LiteSpeed, bon rapport qualité/prix | ≈ 4-8 €/mois |
| Infomaniak | Suisse, écologique, très fiable | ≈ 6-9 €/mois |

Exigences minimales : PHP ≥ 8.1, MySQL ≥ 8.0 / MariaDB ≥ 10.5, HTTPS (Let's Encrypt), sauvegardes.

## 2. Domaines

Vous possédez **nampelli.com** et **nampelli.fr** :

- Site principal sur `www.nampelli.com` (ou nampelli.fr, au choix — un seul domaine canonique) ;
- L'autre domaine en **redirection 301 permanente** vers le principal (réglage chez le registrar
  ou l'hébergeur) — jamais deux sites identiques sur les deux domaines (SEO).
- Créez l'adresse e-mail professionnelle `contact@nampelli.com` chez l'hébergeur.

## 3. Installer WordPress

1. Installation en 1 clic chez l'hébergeur **ou** téléchargement sur fr.wordpress.org.
2. Langue : **Français**. Fuseau : Paris. 
3. Identifiant administrateur : **jamais « admin »** — choisissez un identifiant unique
   + mot de passe long généré (gestionnaire de mots de passe).
4. Réglages → Général : vérifier que les deux URLs sont en `https://`.
5. Réglages → Permaliens : **« Titre de la publication »** → Enregistrer.
6. Supprimer les contenus de démonstration (article « Bonjour le monde », page d'exemple,
   extensions préinstallées inutiles type Hello Dolly).

## 4. Installer le thème NAMPELLI

**Option A — ZIP (recommandée)** : compressez le dossier `wp-content/themes/nampelli` en
`nampelli.zip`, puis Apparence → Thèmes → Ajouter → Téléverser un thème → Activer.

**Option B — FTP/SFTP** : copiez le dossier `nampelli` dans `wp-content/themes/` du serveur,
puis activez-le dans Apparence → Thèmes.

Au passage, supprimez les thèmes par défaut inutilisés (gardez-en un seul, ex. Twenty Twenty-Five,
comme thème de secours).

## 5. Installer WooCommerce

Extensions → Ajouter → **WooCommerce** → Installer → Activer, puis suivez l'assistant :

- Adresse de la boutique : France ;
- Secteur : Santé et beauté ;
- Types de produits : Produits physiques ;
- Devise : **EUR** — TVA : voir `03-woocommerce.md`.

## 6. Importer le contenu

Suivez **`import/README.md`** (ordre impératif : médias → XML → CSV → réglages de lecture).

## 7. Identité du site

- Apparence → Personnaliser → **Identité du site** : téléversez `medias/logo-nampelli-carre.png`
  comme **icône du site** (favicon). Pour le logo d'en-tête, le thème affiche par défaut un
  logotype diamant + « nampelli » élégant ; vous pouvez téléverser votre propre logo à la place.
- Réglages → Général : Titre « NAMPELLI » — Slogan « Révélez votre éclat ».

## 8. Vérifications avant ouverture

- [ ] HTTPS forcé (cadenas sur toutes les pages, pas d'avertissement « contenu mixte ») ;
- [ ] Réglages → Lecture : la case « Demander aux moteurs de recherche de ne pas indexer »
      reste **cochée pendant la construction**, puis **décochée au lancement** ;
- [ ] Test complet d'une commande en mode test Stripe (docs/03) ;
- [ ] Pages légales complétées (plus aucun `[À COMPLÉTER]`) ;
- [ ] Test mobile réel : navigation, fiche produit, panier, paiement.
