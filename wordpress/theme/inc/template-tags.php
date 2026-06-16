<?php
/**
 * Helpers d'affichage : icônes SVG inline (zéro requête réseau),
 * logo, fil d'Ariane, liens produits.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Bibliothèque d'icônes SVG du thème (trait fin, style premium).
 *
 * @param string $name Nom de l'icône.
 * @param int    $size Taille en px.
 * @return string SVG inline.
 */
function nampelli_icon( $name, $size = 24 ) {
	$icons = array(
		// Diamant signature NAMPELLI (facettes).
		'diamond'  => '<path d="M7 4h10l4 5.5L12 21 3 9.5 7 4Z"/><path d="M3 9.5h18M7 4l3 5.5L12 4l2 5.5L17 4M10 9.5 12 21l2-11.5"/>',
		'sparkle'  => '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
		'leaf'     => '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z"/><path d="M5 19c3-5 7-9 11-11"/>',
		'shield'   => '<path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
		'truck'    => '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17.5" cy="17.5" r="1.6"/>',
		'lock'     => '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
		'heart'    => '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/>',
		'star'     => '<path d="m12 3 2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-3-5.5 3 1-6.2L3 9.5l6.3-.9L12 3Z"/>',
		'cart'     => '<path d="M4 5h2l2.2 11h10.3l2-8H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="16.8" cy="19.5" r="1.4"/>',
		'account'  => '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1.5-3.5 4.2-5 7.5-5s6 1.5 7.5 5"/>',
		'search'   => '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
		'menu'     => '<path d="M4 7h16M4 12h16M4 17h16"/>',
		'close'    => '<path d="m6 6 12 12M18 6 6 18"/>',
		'arrow'    => '<path d="M4 12h15M13 6l6 6-6 6"/>',
		'check'    => '<path d="m4.5 12.5 5 5L19.5 7"/>',
		'mail'     => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
		'box'      => '<path d="M3 8 12 3l9 5v8l-9 5-9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
		'return'   => '<path d="M9 5 4 10l5 5"/><path d="M4 10h11a5 5 0 0 1 0 10h-4"/>',
		'instagram' => '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none"/>',
		'facebook' => '<path d="M14.5 8.5h3V5h-3a4 4 0 0 0-4 4v2.5H8V15h2.5v6H14v-6h3l.5-3.5H14V9a.9.9 0 0 1 .5-.5Z"/>',
		'tiktok'   => '<path d="M14.5 4v9.5a3.75 3.75 0 1 1-3.2-3.7"/><path d="M14.5 5.5c.8 2 2.4 3.3 4.5 3.5"/>',
		'pinterest' => '<circle cx="12" cy="12" r="8.5"/><path d="M10.5 20.5 13 11M9.5 13.5A3.8 3.8 0 1 1 16 10.6c0 2.4-1.6 4.4-3.6 4.4-1 0-1.8-.6-2-1.5"/>',
	);

	if ( ! isset( $icons[ $name ] ) ) {
		return '';
	}

	return sprintf(
		'<svg class="n-icon n-icon--%1$s" width="%2$d" height="%2$d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">%3$s</svg>',
		esc_attr( $name ),
		(int) $size,
		$icons[ $name ]
	);
}

/**
 * Affiche une icône.
 *
 * @param string $name Nom.
 * @param int    $size Taille.
 */
function nampelli_the_icon( $name, $size = 24 ) {
	echo nampelli_icon( $name, $size ); // phpcs:ignore WordPress.Security.EscapeOutput -- SVG construit en interne.
}

/**
 * Logo : logo téléversé (Apparence → Personnaliser) sinon logotype SVG du thème.
 */
function nampelli_logo() {
	if ( has_custom_logo() ) {
		the_custom_logo();
		return;
	}
	printf(
		'<a href="%s" class="n-logo" rel="home" aria-label="%s">%s<span class="n-logo__text">nampelli</span></a>',
		esc_url( home_url( '/' ) ),
		esc_attr( get_bloginfo( 'name' ) ),
		nampelli_icon( 'diamond', 30 ) // phpcs:ignore WordPress.Security.EscapeOutput
	);
}

/**
 * URL d'un produit WooCommerce à partir de son slug, avec repli vers la boutique.
 *
 * @param string $slug Slug produit.
 * @return string URL.
 */
function nampelli_product_url( $slug ) {
	$post = get_page_by_path( $slug, OBJECT, 'product' );
	if ( $post ) {
		return get_permalink( $post );
	}
	if ( function_exists( 'wc_get_page_id' ) && wc_get_page_id( 'shop' ) > 0 ) {
		return get_permalink( wc_get_page_id( 'shop' ) );
	}
	return home_url( '/' );
}

/**
 * Produit WooCommerce par slug.
 *
 * @param string $slug Slug produit.
 * @return WC_Product|null
 */
function nampelli_get_product( $slug ) {
	if ( ! function_exists( 'wc_get_product' ) ) {
		return null;
	}
	$post = get_page_by_path( $slug, OBJECT, 'product' );
	return $post ? wc_get_product( $post->ID ) : null;
}

/**
 * URL d'une page par slug (repli : accueil).
 *
 * @param string $slug Slug de page.
 * @return string
 */
function nampelli_page_url( $slug ) {
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' );
}

/**
 * Éléments du fil d'Ariane (partagés entre l'affichage HTML et le schéma JSON-LD).
 *
 * @return array[] Liste de [ label, url ] — le dernier élément n'a pas d'URL.
 */
function nampelli_breadcrumb_items() {
	$items   = array();
	$items[] = array( __( 'Accueil', 'nampelli' ), home_url( '/' ) );

	if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() ) ) {
		$shop_id = wc_get_page_id( 'shop' );
		if ( $shop_id > 0 && ! is_shop() ) {
			$items[] = array( get_the_title( $shop_id ), get_permalink( $shop_id ) );
		}
		if ( is_product_category() ) {
			$term   = get_queried_object();
			$parent = $term && $term->parent ? get_term( $term->parent, 'product_cat' ) : null;
			if ( $parent && ! is_wp_error( $parent ) ) {
				$items[] = array( $parent->name, get_term_link( $parent ) );
			}
			$items[] = array( $term ? $term->name : '', '' );
		} elseif ( is_product() ) {
			$terms = get_the_terms( get_the_ID(), 'product_cat' );
			if ( $terms && ! is_wp_error( $terms ) ) {
				$term    = $terms[0];
				$items[] = array( $term->name, get_term_link( $term ) );
			}
			$items[] = array( get_the_title(), '' );
		} elseif ( is_shop() ) {
			$items[] = array( $shop_id > 0 ? get_the_title( $shop_id ) : __( 'Boutique', 'nampelli' ), '' );
		} else {
			$items[] = array( get_the_title(), '' );
		}
		return $items;
	}

	if ( is_singular( 'post' ) ) {
		$blog_id = (int) get_option( 'page_for_posts' );
		if ( $blog_id ) {
			$items[] = array( get_the_title( $blog_id ), get_permalink( $blog_id ) );
		}
		$items[] = array( get_the_title(), '' );
	} elseif ( is_home() ) {
		$blog_id = (int) get_option( 'page_for_posts' );
		$items[] = array( $blog_id ? get_the_title( $blog_id ) : __( 'Conseils beauté', 'nampelli' ), '' );
	} elseif ( is_category() || is_tag() ) {
		$items[] = array( single_term_title( '', false ), '' );
	} elseif ( is_page() ) {
		$parent_id = wp_get_post_parent_id( get_the_ID() );
		if ( $parent_id ) {
			$items[] = array( get_the_title( $parent_id ), get_permalink( $parent_id ) );
		}
		$items[] = array( get_the_title(), '' );
	} elseif ( is_search() ) {
		$items[] = array( __( 'Recherche', 'nampelli' ), '' );
	} elseif ( is_404() ) {
		$items[] = array( __( 'Page introuvable', 'nampelli' ), '' );
	}

	return $items;
}

/**
 * Affiche le fil d'Ariane.
 */
function nampelli_breadcrumb() {
	if ( is_front_page() ) {
		return;
	}
	$items = nampelli_breadcrumb_items();
	if ( count( $items ) < 2 ) {
		return;
	}
	echo '<nav class="n-breadcrumb" aria-label="' . esc_attr__( 'Fil d’Ariane', 'nampelli' ) . '"><div class="n-container"><ol>';
	$last = count( $items ) - 1;
	foreach ( $items as $i => $item ) {
		list( $label, $url ) = $item;
		if ( $i < $last && $url ) {
			printf( '<li><a href="%s">%s</a></li>', esc_url( $url ), esc_html( $label ) );
		} else {
			printf( '<li aria-current="page">%s</li>', esc_html( $label ) );
		}
	}
	echo '</ol></div></nav>';
}

/**
 * Liens réseaux sociaux configurés.
 *
 * @return array slug => url.
 */
function nampelli_social_links() {
	$links = array();
	foreach ( array( 'instagram', 'facebook', 'tiktok', 'pinterest' ) as $network ) {
		$url = nampelli_mod( 'nampelli_' . $network );
		if ( $url ) {
			$links[ $network ] = $url;
		}
	}
	return $links;
}

/**
 * Badges de paiement (SVG textuels minimalistes, zéro image externe).
 */
function nampelli_payment_badges() {
	$badges = array( 'CB', 'VISA', 'Mastercard', 'PayPal', 'Apple Pay' );
	echo '<ul class="n-payments" aria-label="' . esc_attr__( 'Moyens de paiement acceptés', 'nampelli' ) . '">';
	foreach ( $badges as $badge ) {
		printf( '<li>%s</li>', esc_html( $badge ) );
	}
	echo '</ul>';
}

/**
 * Note moyenne d'étoiles (affichage avis).
 *
 * @param float $rating Note 0-5.
 */
function nampelli_stars( $rating ) {
	$rating = max( 0, min( 5, (float) $rating ) );
	echo '<span class="n-stars" role="img" aria-label="' . esc_attr( sprintf( __( 'Note : %s sur 5', 'nampelli' ), $rating ) ) . '">';
	for ( $i = 1; $i <= 5; $i++ ) {
		printf( '<span class="n-star %s">%s</span>', $i <= round( $rating ) ? 'is-on' : '', nampelli_icon( 'star', 16 ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
	echo '</span>';
}

/**
 * Fallback du menu principal quand aucun menu n'est encore assigné :
 * liens vers les pages/catégories clés si elles existent.
 */
function nampelli_menu_fallback() {
	$links = array();

	$routine = get_page_by_path( 'routine-eclat-rituel' );
	$links[ __( 'Accueil', 'nampelli' ) ] = home_url( '/' );
	if ( $routine ) {
		$links[ __( 'Routine Éclat', 'nampelli' ) ] = get_permalink( $routine );
	}
	foreach ( array(
		'soins-visage' => __( 'Soins visage', 'nampelli' ),
		'corps'        => __( 'Corps', 'nampelli' ),
		'coffrets'     => __( 'Coffrets', 'nampelli' ),
	) as $slug => $label ) {
		$term = get_term_by( 'slug', $slug, 'product_cat' );
		if ( $term && ! is_wp_error( $term ) ) {
			$links[ $label ] = get_term_link( $term );
		}
	}
	$blog_id = (int) get_option( 'page_for_posts' );
	if ( $blog_id ) {
		$links[ __( 'Conseils beauté', 'nampelli' ) ] = get_permalink( $blog_id );
	}
	$apropos = get_page_by_path( 'a-propos' );
	if ( $apropos ) {
		$links[ __( 'À propos', 'nampelli' ) ] = get_permalink( $apropos );
	}

	echo '<ul class="n-nav__list">';
	foreach ( $links as $label => $url ) {
		printf( '<li class="menu-item"><a href="%s">%s</a></li>', esc_url( $url ), esc_html( $label ) );
	}
	echo '</ul>';
}

/**
 * Fallback des menus de pied de page.
 *
 * @param string $zone Zone : boutique|aide|infos.
 */
function nampelli_footer_menu_fallback( $zone ) {
	$map = array(
		'boutique' => array(
			'routine-eclat-rituel' => __( 'Routine Éclat', 'nampelli' ),
		),
		'aide'     => array(
			'faq'                 => __( 'FAQ', 'nampelli' ),
			'contact'             => __( 'Contact', 'nampelli' ),
			'livraison-et-retours' => __( 'Livraison & retours', 'nampelli' ),
			'suivi-de-commande'   => __( 'Suivi de commande', 'nampelli' ),
		),
		'infos'    => array(
			'a-propos'                      => __( 'À propos', 'nampelli' ),
			'cgv'                           => __( 'CGV', 'nampelli' ),
			'mentions-legales'              => __( 'Mentions légales', 'nampelli' ),
			'politique-de-confidentialite'  => __( 'Politique de confidentialité', 'nampelli' ),
			'politique-cookies'             => __( 'Politique cookies', 'nampelli' ),
		),
	);

	echo '<ul>';
	if ( 'boutique' === $zone && function_exists( 'wc_get_page_id' ) && wc_get_page_id( 'shop' ) > 0 ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ), esc_html__( 'Tous les soins', 'nampelli' ) );
	}
	if ( isset( $map[ $zone ] ) ) {
		foreach ( $map[ $zone ] as $slug => $label ) {
			$page = get_page_by_path( $slug );
			if ( $page ) {
				printf( '<li><a href="%s">%s</a></li>', esc_url( get_permalink( $page ) ), esc_html( $label ) );
			}
		}
	}
	if ( 'aide' === $zone && function_exists( 'wc_get_page_id' ) && wc_get_page_id( 'myaccount' ) > 0 ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( get_permalink( wc_get_page_id( 'myaccount' ) ) ), esc_html__( 'Mon compte', 'nampelli' ) );
	}
	echo '</ul>';
}
