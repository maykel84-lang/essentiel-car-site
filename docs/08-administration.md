# 08 — Administration au quotidien

Le site est conçu pour être géré **sans développeur**. Voici les gestes courants.

## Tous les jours (5 min)

- **Commandes** : WooCommerce → Commandes → traiter les nouvelles (préparer, expédier,
  passer en « Terminée » + n° de suivi en note de commande « pour le client ») ;
- **Avis** : Commentaires → approuver/répondre (toujours répondre, même aux avis moyens :
  c'est lu par les futures clientes) ;
- E-mails clients : réponse < 24 h ouvrées (la promesse des pages Contact/FAQ).

## Toutes les semaines

- Publier ou préparer un contenu (article, nouveauté, mise à jour de fiche) ;
- Jeter un œil à Search Console (clics, erreurs) et aux ventes (WooCommerce → Analytics — natif) ;
- Vérifier les mises à jour (cf. docs/07).

## Gestes courants

### Modifier un texte ou une image de l'accueil
Apparence → Personnaliser → NAMPELLI → section concernée → Publier. Aperçu en direct.

### Modifier un produit (prix, texte, photos)
Produits → Tous les produits → produit → champs WooCommerce (prix, stock) +
**métabox NAMPELLI** (bénéfices, utilisation, FAQ…) → Mettre à jour.

### Créer une promotion
- Sur un produit : champ « Tarif promo » (+ dates de planification) — le prix barré s'affiche
  partout automatiquement ;
- Code promo : Marketing → Codes promo → montant ou %, contraintes (minimum d'achat,
  usage unique par cliente…).

### Ajouter un produit
Produits → Ajouter : titre, description longue, **extrait = promesse courte** (affichée sous le
titre et sur les cartes), prix, catégorie, image + galerie (3:4 de préférence), métabox NAMPELLI,
produits liés (upsells/cross-sells), ✅ « Produit mis en avant » s'il doit apparaître sur l'accueil
(section « Les essentiels » affiche les produits mis en avant).

### Gérer les abonnées newsletter
Menu **Abonnées newsletter** : chaque inscription avec sa date de consentement (RGPD).
Export CSV via une extension d'export ou copie manuelle vers votre outil d'e-mailing —
en attendant le branchement MailPoet/Brevo (docs/02).

### Mettre à jour les pages légales
Pages → CGV / Mentions légales / Confidentialité : remplacer les `[À COMPLÉTER]`,
puis à chaque évolution (nouveau transporteur, nouvel outil marketing → mise à jour
de la politique de confidentialité).

## En cas de problème

| Symptôme | Réflexe |
|---|---|
| Site lent soudainement | Vider le cache (LiteSpeed → Purge All) ; vérifier la dernière extension installée |
| Paiement refusé en test | Mode test/live Stripe cohérent ; relancer une commande test |
| E-mails non reçus | Vérifier spam ; installer WP Mail SMTP (docs/03 §6) |
| Page blanche après une mise à jour | Restaurer la sauvegarde UpdraftPlus de la veille |
| Accueil sans produits | Vérifier que les produits sont « Publiés » et « mis en avant » |

## Le réflexe d'or

**Avant toute modification importante** (mise à jour majeure, nouvelle extension,
refonte d'une page) : UpdraftPlus → « Sauvegarder maintenant ». Deux minutes qui
peuvent sauver la boutique.
