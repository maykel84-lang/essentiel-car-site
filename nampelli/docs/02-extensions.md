# 02 — Extensions : la liste courte et suffisante

> Philosophie NAMPELLI : **chaque extension doit gagner sa place**. La liste ci-dessous couvre
> tous les besoins du brief sans alourdir le site. N'installez rien d'autre sans raison précise.

## Indispensables (lancement)

| Extension | Rôle | Réglages clés |
|---|---|---|
| **WooCommerce** | Boutique | docs/03 |
| **Payment Plugins for Stripe WooCommerce** (ou « WooCommerce Stripe Gateway ») | CB, Apple Pay, Google Pay | Mode test puis live ; activer Apple Pay/Google Pay |
| **WooCommerce PayPal Payments** | PayPal | Compte PayPal Business |
| **Rank Math SEO** | SEO : titles/meta, sitemap, breadcrumbs, schémas | docs/05 |
| **LiteSpeed Cache** (si serveur LiteSpeed, ex. o2switch) — sinon **WP Super Cache** | Cache pages + navigateur | docs/06 |
| **Imagify** (ou EWWW Image Optimizer) | Compression + **WebP/AVIF** automatique | docs/06 |
| **Wordfence Security** | Pare-feu, scan, blocage force brute, **2FA** | docs/07 |
| **UpdraftPlus** | Sauvegardes automatiques externalisées | docs/07 |
| **Complianz** | Bandeau cookies RGPD (bloque les traceurs avant consentement) | Assistant intégré |
| **Fluent Forms** (ou WPForms Lite) | Formulaire de contact | Coller le shortcode dans la page Contact |
| **Antispam Bee** | Anti-spam sans clé API ni données externalisées | Activer, c'est tout |

## Recommandées (dès les premières ventes)

| Extension | Rôle |
|---|---|
| **MailPoet** | Newsletter + e-mails automatiques ; remplacez le formulaire natif du thème en collant son shortcode dans Personnaliser → NAMPELLI → Newsletter |
| **CartFlows** ou **FunnelKit Automations (gratuit)** | **Relance de panier abandonné** par e-mail |
| **Judge.me** ou avis natifs WooCommerce + photos | Avis enrichis avec photos |
| **OMGF** | Héberge localement les polices Google (RGPD + performance) |
| **WP 2FA** | 2FA si vous n'utilisez pas celle de Wordfence |

## Phase 2 (croissance)

- **Product Feed PRO for WooCommerce** : flux Google Merchant Center (Shopping) ;
- **Colissimo officiel** / **Mondial Relay officiel** : étiquettes + points relais ;
- **WooCommerce Product Bundles** : si vous voulez des coffrets composables (le coffret
  de lancement est volontairement un produit simple, plus robuste) ;
- **TranslatePress / Weglot** : si ouverture internationale.

## À éviter absolument

- Constructeurs de pages lourds (Elementor, Divi…) : le thème NAMPELLI couvre déjà le design,
  ces outils tripleraient le poids des pages ;
- Sliders/carrousels (Revolution Slider…), pop-ups agressives ;
- Extensions « tout-en-un » redondantes (Jetpack complet, etc.) ;
- Plus d'une extension par fonction (un seul cache, un seul SEO, une seule sécurité).

## Note : newsletter intégrée au thème

Sans extension, le formulaire d'accueil enregistre déjà les inscriptions (menu
**Abonnées newsletter** dans l'admin) avec date de consentement (RGPD), honeypot anti-robots
et case de consentement obligatoire. Pour brancher un outil d'envoi (Brevo, MailPoet…),
collez son shortcode dans Personnaliser → NAMPELLI → 8 · Newsletter, ou demandez à votre
développeur d'utiliser le hook `nampelli_newsletter_subscribed`.
