<?php
/**
 * Performance & sécurité : allègement de WordPress.
 *
 * Chaque optimisation est volontairement conservatrice : rien ici ne casse
 * les extensions courantes (SEO, cache, paiement).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Nettoyage du <head> : balises inutiles pour une boutique.
 */
function nampelli_clean_head() {
	remove_action( 'wp_head', 'wp_generator' );                          // Version de WP (sécurité).
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' );
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
	remove_action( 'wp_head', 'rest_output_link_wp_head' );

	// Émojis : scripts et styles retirés (inutile, pénalise le chargement).
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'nampelli_clean_head' );

/**
 * Scripts superflus côté visiteur.
 */
function nampelli_dequeue_extras() {
	if ( is_admin() ) {
		return;
	}
	// Lecteur d'embeds WordPress (rarement utile sur une boutique).
	wp_deregister_script( 'wp-embed' );

	// Dashicons réservés aux utilisatrices connectées (admin bar).
	if ( ! is_user_logged_in() ) {
		wp_dequeue_style( 'dashicons' );
		wp_deregister_style( 'dashicons' );
	}
}
add_action( 'wp_enqueue_scripts', 'nampelli_dequeue_extras', 100 );

// XML-RPC désactivé : vecteur d'attaques par force brute.
add_filter( 'xmlrpc_enabled', '__return_false' );

// Pages "pièce jointe" désactivées : évite du contenu pauvre indexable (SEO).
add_filter( 'wp_attachment_pages_enabled', '__return_false' );

// Versions retirées des URL d'assets externes ne sont pas modifiées :
// le thème versionne ses propres fichiers via filemtime (cache fiable).

/**
 * Intervalle Heartbeat réduit (charge serveur en back-office).
 */
function nampelli_heartbeat( $settings ) {
	$settings['interval'] = 60;
	return $settings;
}
add_filter( 'heartbeat_settings', 'nampelli_heartbeat' );

/**
 * Lazy-loading natif : WordPress l'applique déjà aux images ;
 * on s'assure que les iframes (vidéos produit) en profitent aussi.
 */
function nampelli_lazy_iframes( $content ) {
	if ( is_admin() || false === strpos( $content, '<iframe' ) ) {
		return $content;
	}
	return str_replace( '<iframe ', '<iframe loading="lazy" ', $content );
}
add_filter( 'the_content', 'nampelli_lazy_iframes', 20 );

/**
 * Login : message d'erreur générique (n'indique pas si l'identifiant existe).
 */
function nampelli_login_errors() {
	return __( 'Identifiants incorrects.', 'nampelli' );
}
add_filter( 'login_errors', 'nampelli_login_errors' );
