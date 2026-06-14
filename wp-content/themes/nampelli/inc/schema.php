<?php
/**
 * Données structurées JSON-LD : Organization, WebSite, BreadcrumbList, FAQPage.
 *
 * Le schéma Product est déjà généré nativement par WooCommerce.
 * Désactivable depuis le Customizer si une extension SEO prend le relais.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Les schémas du thème sont-ils actifs ?
 *
 * @return bool
 */
function nampelli_schema_enabled() {
	$enabled = ! nampelli_mod( 'nampelli_disable_schema' );
	return (bool) apply_filters( 'nampelli_schema_enabled', $enabled );
}

/**
 * Impression d'un bloc JSON-LD.
 *
 * @param array $data Données du schéma.
 */
function nampelli_print_schema( $data ) {
	printf(
		'<script type="application/ld+json">%s</script>' . "\n",
		wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
	);
}

/**
 * Organization + WebSite (page d'accueil uniquement).
 */
function nampelli_schema_organization() {
	if ( ! nampelli_schema_enabled() || ! is_front_page() ) {
		return;
	}

	$logo_url = NAMPELLI_URI . '/assets/img/logo-nampelli.png';
	$logo_id  = get_theme_mod( 'custom_logo' );
	if ( $logo_id ) {
		$src = wp_get_attachment_image_src( $logo_id, 'full' );
		if ( $src ) {
			$logo_url = $src[0];
		}
	}

	$same_as = array_values( nampelli_social_links() );

	nampelli_print_schema(
		array(
			'@context'     => 'https://schema.org',
			'@type'        => 'Organization',
			'@id'          => home_url( '/#organization' ),
			'name'         => 'NAMPELLI',
			'url'          => home_url( '/' ),
			'logo'         => $logo_url,
			'slogan'       => nampelli_mod( 'nampelli_baseline' ),
			'email'        => nampelli_mod( 'nampelli_email' ),
			'sameAs'       => $same_as,
			'contactPoint' => array(
				'@type'             => 'ContactPoint',
				'contactType'       => 'customer service',
				'email'             => nampelli_mod( 'nampelli_email' ),
				'availableLanguage' => 'French',
			),
		)
	);

	nampelli_print_schema(
		array(
			'@context'  => 'https://schema.org',
			'@type'     => 'WebSite',
			'@id'       => home_url( '/#website' ),
			'name'      => get_bloginfo( 'name' ),
			'url'       => home_url( '/' ),
			'publisher' => array( '@id' => home_url( '/#organization' ) ),
			'inLanguage' => get_bloginfo( 'language' ),
		)
	);
}
add_action( 'wp_head', 'nampelli_schema_organization' );

/**
 * BreadcrumbList sur les pages internes.
 */
function nampelli_schema_breadcrumb() {
	if ( ! nampelli_schema_enabled() || is_front_page() || is_404() ) {
		return;
	}
	$items = nampelli_breadcrumb_items();
	if ( count( $items ) < 2 ) {
		return;
	}
	$elements = array();
	foreach ( $items as $i => $item ) {
		list( $label, $url ) = $item;
		$element = array(
			'@type'    => 'ListItem',
			'position' => $i + 1,
			'name'     => wp_strip_all_tags( (string) $label ),
		);
		if ( $url ) {
			$element['item'] = $url;
		}
		$elements[] = $element;
	}
	nampelli_print_schema(
		array(
			'@context'        => 'https://schema.org',
			'@type'           => 'BreadcrumbList',
			'itemListElement' => $elements,
		)
	);
}
add_action( 'wp_head', 'nampelli_schema_breadcrumb' );

/**
 * FAQPage :
 * — fiches produit : à partir du champ FAQ produit ;
 * — pages : à partir des blocs « Détails » (question dans <summary>).
 */
function nampelli_schema_faq() {
	if ( ! nampelli_schema_enabled() ) {
		return;
	}

	$faq = array();

	if ( function_exists( 'is_product' ) && is_product() ) {
		$faq = nampelli_product_faq( get_the_ID() );
	} elseif ( is_page() ) {
		$content = get_post_field( 'post_content', get_the_ID() );
		if ( $content && preg_match_all( '#<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>#si', $content, $matches, PREG_SET_ORDER ) ) {
			foreach ( $matches as $match ) {
				$question = trim( wp_strip_all_tags( $match[1] ) );
				$answer   = trim( wp_strip_all_tags( $match[2] ) );
				if ( $question && $answer ) {
					$faq[] = array( $question, $answer );
				}
			}
		}
	}

	if ( count( $faq ) < 2 ) {
		return;
	}

	$entities = array();
	foreach ( $faq as $qa ) {
		$entities[] = array(
			'@type'          => 'Question',
			'name'           => $qa[0],
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => $qa[1],
			),
		);
	}

	nampelli_print_schema(
		array(
			'@context'   => 'https://schema.org',
			'@type'      => 'FAQPage',
			'mainEntity' => $entities,
		)
	);
}
add_action( 'wp_head', 'nampelli_schema_faq' );
