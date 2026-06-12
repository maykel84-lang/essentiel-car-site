# 03 — Configuration WooCommerce

## 1. Réglages généraux

WooCommerce → Réglages → **Général** :

- Adresse de la boutique : votre adresse (sert aux taxes et à la livraison) ;
- Lieux de vente : « Vendre dans des pays spécifiques » → France (élargir ensuite : Belgique,
  Luxembourg, UE) ;
- Activer les taux de taxe et leurs calculs : ✅ ;
- Devise : Euro — séparateur décimal `,` — format `99,99 €`.

## 2. TVA

WooCommerce → Réglages → **TVA** :

- « Saisir les prix TTC » : ✅ (vous saisissez 19,90 € TTC, plus simple) ;
- Afficher les prix TTC dans la boutique et le panier ;
- Onglet « Taux standards » → Ajouter une ligne : Pays `FR`, Taux `20.0000`, Nom `TVA`. 
- Si vous êtes en franchise en base de TVA (micro-entreprise) : ne configurez pas de taxe et
  ajoutez la mention « TVA non applicable, art. 293 B du CGI » dans les CGV.

## 3. Livraison

WooCommerce → Réglages → **Expédition** → Zone « France » :

1. **Tarif forfaitaire** : 4,90 € — intitulé « Livraison suivie (2-4 jours ouvrés) » ;
2. **Livraison gratuite** : condition « Montant minimal de commande » = **49 €**
   (cocher « Appliquer la règle avant le code promo ») ;
3. Zone « Belgique & Luxembourg » : forfait 7,90 € — Zone « Union européenne » : 9,90 €.

> Le seuil de 49 € est aussi celui de la **barre de progression du panier** (Personnaliser →
> NAMPELLI → 1 · Marque → Seuil livraison offerte). Gardez les deux synchronisés.

Phase 2 : extensions officielles Colissimo / Mondial Relay pour les étiquettes et points relais.

## 4. Paiements

WooCommerce → Réglages → **Paiements** :

- **Stripe** : CB, Apple Pay, Google Pay. Créez le compte sur stripe.com, connectez l'extension,
  testez en mode test (carte `4242 4242 4242 4242`), puis passez en mode live.
- **PayPal** : compte Business, connexion via l'extension officielle.
- Désactivez les moyens non utilisés (chèque, virement) pour un tunnel épuré.

## 5. Comptes et confidentialité

WooCommerce → Réglages → **Comptes et confidentialité** :

- ✅ Permettre la commande sans compte (« guest checkout ») — indispensable en beauté ;
- ✅ Permettre la création de compte pendant la validation ;
- Renseigner la page de politique de confidentialité (importée).

## 6. E-mails transactionnels

WooCommerce → Réglages → **E-mails** :

- « Adresse de l'expéditeur » : contact@nampelli.com — Nom : NAMPELLI ;
- Couleur de base : `#000000` — Couleur de fond : `#FAF7EF` — Couleur du corps : `#FFFDF7` ;
- Texte de pied de page : `NAMPELLI — Révélez votre éclat · nampelli.com` ;
- Téléversez le logo dans « Image d'en-tête ».

> Fiabilité d'envoi : si les e-mails partent en spam, installez **WP Mail SMTP** branché sur
> l'e-mail pro de l'hébergeur (ou Brevo SMTP gratuit).

## 7. Avis produits

WooCommerce → Réglages → Produits :

- ✅ Activer les avis ; ✅ « Acheteur vérifié » affiché ; ✅ notes obligatoires ;
- (Conseillé) n'autoriser les avis qu'aux acheteurs vérifiés.

Les avis s'affichent automatiquement dans la section dédiée des fiches produit du thème,
et les 3 derniers peuvent nourrir la section « Avis » de l'accueil.

## 8. Champs produit NAMPELLI

Chaque fiche produit possède une métabox **« NAMPELLI — Contenu de la fiche produit »**
(sous l'éditeur) : bénéfices, « Pour qui ? », « Comment l'utiliser », « Quand l'utiliser »,
ingrédients, précautions, **FAQ produit** (format `Question :: Réponse`, une par ligne)
et URL vidéo (YouTube/Vimeo/.mp4 — affichée dans l'accordéon « En vidéo »).

Les 4 produits importés arrivent **pré-remplis**. Pour un nouveau produit, remplissez ces champs
et le thème construit la fiche complète automatiquement (accordéons + données structurées FAQ).

## 9. Ventes croisées (« Complétez votre routine »)

Édition produit → Données produit → **Produits liés** :

- *Ventes incitatives (upsells)* : affichées sous la fiche → « Complétez votre routine » ;
- *Ventes croisées (cross-sells)* : affichées dans le panier.

Les produits importés sont déjà reliés entre eux (sérum ↔ crème ↔ nettoyant ↔ coffret).

## 10. Suivi de commande

La page **Suivi de commande** contient le formulaire natif `[woocommerce_order_tracking]`.
Renseignez le numéro de suivi du transporteur dans la note de commande au moment de l'expédition
(ou automatiquement via l'extension Colissimo en phase 2).
