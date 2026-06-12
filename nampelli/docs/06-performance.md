# 06 — Performance & Core Web Vitals

Objectif : **LCP < 2,5 s · INP < 200 ms · CLS < 0,1** sur mobile (vérifiables sur
[PageSpeed Insights](https://pagespeed.web.dev)).

## 1. Ce que le thème fait déjà

- 1 fichier CSS + 1 fichier JS (vanilla, **defer**), zéro dépendance externe, zéro jQuery côté thème ;
- Préchargement de l'image héro (`fetchpriority="high"`) = LCP rapide ;
- Lazy-loading natif des images et iframes ; dimensions d'images déclarées (CLS ≈ 0) ;
- `<head>` nettoyé : émojis, embeds, shortlinks, manifestes inutiles supprimés ;
- Dashicons retirés pour les visiteurs ; Heartbeat ralenti ;
- Polices avec `display=swap` + préconnexion (et hébergement local possible via OMGF) ;
- Animations CSS uniquement, respect de `prefers-reduced-motion`.

## 2. Cache (obligatoire)

**Serveur LiteSpeed (o2switch…) → LiteSpeed Cache** :
1. Préréglage « Avancé » (LSCache + cache navigateur + CSS/JS minifiés) ;
2. Cache → Exclure : `/panier/`, `/commander/`, `/mon-compte/` (géré automatiquement
   pour WooCommerce, vérifier que « ESI » est actif) ;
3. Page Optimization → CSS/JS Minify ✅, Combine ❌ (HTTP/2), « Load JS Deferred » ✅.

**Autre hébergeur → WP Super Cache** : mode Expert (mod_rewrite), durée 1 h,
compression ✅ + en-têtes de cache navigateur via l'hébergeur.

## 3. Images WebP/AVIF

**Imagify** (gratuit jusqu'à 20 Mo/mois) :
- Niveau « Intelligent », ✅ « Créer des versions WebP/AVIF des images »,
  ✅ « Afficher les images au format WebP/AVIF sur le site » ;
- Optimisation en masse de la Médiathèque après chaque import ;
- Redimensionnement max : 1600 px de large.

## 4. CDN (gratuit, recommandé)

**Cloudflare plan Free** :
1. Ajouter le domaine sur cloudflare.com → changer les serveurs DNS chez le registrar ;
2. SSL/TLS : mode « Full (strict) » ;
3. Speed → Brotli ✅ ; Caching standard ; « Auto Minify » inutile (déjà géré) ;
4. Bonus sécurité : pare-feu de périmètre, atténuation DDoS.

## 5. PHP & base de données

- PHP **8.2+** (panneau de l'hébergeur) — gain immédiat ;
- LiteSpeed Cache → Database : purger transients/révisions 1×/mois
  (ou WP-Optimize si non-LiteSpeed) ;
- Limiter les révisions, dans `wp-config.php` : `define( 'WP_POST_REVISIONS', 5 );`.

## 6. Vérification

1. pagespeed.web.dev sur : accueil, une fiche produit, un article — mobile d'abord ;
2. Cibles : Performance ≥ 90 mobile, CWV verts ;
3. Re-tester après chaque nouvelle extension : **toute extension qui fait chuter le score
   doit être justifiée ou retirée.**

## 7. Pièges à éviter

- Deux extensions de cache en même temps (conflits garantis) ;
- Vidéos auto-hébergées en autoplay sur l'accueil (utilisez YouTube/Vimeo en lazy) ;
- GIF lourds (préférez le MP4 muet via le champ vidéo des fiches produit) ;
- Images > 300 Ko téléversées sans compression ;
- Scripts de tracking multiples (un seul outil d'analytics suffit).
