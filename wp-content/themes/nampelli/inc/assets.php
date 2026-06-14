<?php
/**
 * Chargement des styles, scripts et polices.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Styles et scripts du front.
 */
function nampelli_enqueue_assets() {
	$css = NAMPELLI_DIR . '/assets/css/main.css';
	$js  = NAMPELLI_DIR . '/assets/js/main.js';

	// Polices : Cormorant Garamond (titres) + Jost (texte).
	// Conseil RGPD/performance : l'extension OMGF permet de les héberger localement.
	wp_enqueue_style(
		'nampelli-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'nampelli-main', NAMPELLI_URI . '/assets/css/main.css', array(), (string) filemtime( $css ) );

	wp_enqueue_script(
		'nampelli-main',
		NAMPELLI_URI . '/assets/js/main.js',
		array(),
		(string) filemtime( $js ),
		array(
			'strategy'  => 'defer',
			'in_footer' => true,
		)
	);
}
add_action( 'wp_enqueue_scripts', 'nampelli_enqueue_assets' );

/**
 * Préconnexion aux serveurs de polices (gain de latence au premier chargement).
 */
function nampelli_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
		$urls[] = 'https://fonts.googleapis.com';
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'nampelli_resource_hints', 10, 2 );

/**
 * Préchargement de l'image héro (élément LCP) sur la page d'accueil.
 */
function nampelli_preload_hero() {
	if ( ! is_front_page() ) {
		return;
	}
	$hero = nampelli_hero_image_url();
	if ( $hero ) {
		printf( '<link rel="preload" as="image" href="%s" fetchpriority="high">' . "\n", esc_url( $hero ) );
	}
}
add_action( 'wp_head', 'nampelli_preload_hero', 1 );

/**
 * URL de l'image héro : réglage du Customizer, sinon visuel fourni avec le thème.
 */
function nampelli_hero_image_url() {
	$custom = get_theme_mod( 'nampelli_hero_image' );
	if ( $custom ) {
		return $custom;
	}
	return NAMPELLI_URI . '/assets/img/hero-routine-eclat.jpg';
}
