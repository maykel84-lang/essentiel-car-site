<?php
/**
 * NAMPELLI — fonctions du thème.
 *
 * Chaque domaine fonctionnel vit dans son propre module sous /inc :
 * le thème reste lisible, maintenable et évolutif.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

define( 'NAMPELLI_VERSION', '1.0.0' );
define( 'NAMPELLI_DIR', get_template_directory() );
define( 'NAMPELLI_URI', get_template_directory_uri() );

require NAMPELLI_DIR . '/inc/setup.php';          // Supports, menus, tailles d'images.
require NAMPELLI_DIR . '/inc/assets.php';         // Styles, scripts, polices, préchargements.
require NAMPELLI_DIR . '/inc/cleanup.php';        // Performance : nettoyage du <head>, optimisations.
require NAMPELLI_DIR . '/inc/template-tags.php';  // Icônes SVG, fil d'Ariane, helpers d'affichage.
require NAMPELLI_DIR . '/inc/customizer.php';     // Tous les textes/images modifiables sans coder.
require NAMPELLI_DIR . '/inc/schema.php';         // Données structurées : Organization, Breadcrumb, FAQ.
require NAMPELLI_DIR . '/inc/newsletter.php';     // Formulaire newsletter RGPD + stockage des abonnées.

if ( class_exists( 'WooCommerce' ) ) {
	require NAMPELLI_DIR . '/inc/woocommerce.php';   // Intégration boutique : fiches produits, panier, conversion.
	require NAMPELLI_DIR . '/inc/product-meta.php';  // Champs produit : bénéfices, utilisation, ingrédients, FAQ…
}
