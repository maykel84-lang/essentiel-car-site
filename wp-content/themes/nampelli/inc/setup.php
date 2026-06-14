<?php
/**
 * Configuration de base du thème.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Supports du thème, menus et tailles d'images.
 */
function nampelli_setup() {
	load_theme_textdomain( 'nampelli', NAMPELLI_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 96,
			'width'       => 320,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	// WooCommerce : galerie produit complète (zoom, lightbox, slider).
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	register_nav_menus(
		array(
			'primary'  => __( 'Menu principal', 'nampelli' ),
			'footer-1' => __( 'Pied de page — Boutique', 'nampelli' ),
			'footer-2' => __( 'Pied de page — Aide', 'nampelli' ),
			'footer-3' => __( 'Pied de page — Informations', 'nampelli' ),
		)
	);

	// Tailles d'images du thème (recadrage propre pour des cartes uniformes).
	add_image_size( 'nampelli-card', 600, 800, true );    // Cartes produits 3:4.
	add_image_size( 'nampelli-wide', 1200, 800, true );   // Sections éditoriales.
	add_image_size( 'nampelli-blog', 800, 530, true );    // Cartes d'articles.
}
add_action( 'after_setup_theme', 'nampelli_setup' );

/**
 * Classe no-js : retirée par le script du thème.
 * Si JavaScript est indisponible, les animations restent visibles.
 */
function nampelli_no_js_class( $classes ) {
	$classes[] = 'no-js';
	return $classes;
}
add_filter( 'body_class', 'nampelli_no_js_class' );

/**
 * Largeur de contenu (utilisée par certains embeds).
 */
function nampelli_content_width() {
	$GLOBALS['content_width'] = 1200;
}
add_action( 'after_setup_theme', 'nampelli_content_width', 0 );

/**
 * Cartes produits WooCommerce au ratio portrait 3:4 — rendu premium et uniforme.
 */
function nampelli_wc_thumbnail_size( $size ) {
	return array(
		'width'  => 450,
		'height' => 600,
		'crop'   => 1,
	);
}
add_filter( 'woocommerce_get_image_size_thumbnail', 'nampelli_wc_thumbnail_size' );

/**
 * Image principale de fiche produit.
 */
function nampelli_wc_single_size( $size ) {
	return array(
		'width'  => 720,
		'height' => 960,
		'crop'   => 1,
	);
}
add_filter( 'woocommerce_get_image_size_single', 'nampelli_wc_single_size' );
