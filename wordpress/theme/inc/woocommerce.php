<?php
/**
 * Intégration WooCommerce : tout passe par des hooks
 * (aucun template Woo écrasé → mises à jour sereines).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/* -------------------------------------------------------------------------
 * Habillage général
 * ---------------------------------------------------------------------- */

// Wrappers de contenu adaptés au thème.
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
add_action( 'woocommerce_before_main_content', function () {
	echo '<main id="primary" class="n-main n-woo"><div class="n-container">';
}, 10 );
add_action( 'woocommerce_after_main_content', function () {
	echo '</div></main>';
}, 10 );

// Fil d'Ariane Woo remplacé par celui du thème (cohérence visuelle + schéma).
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );

// Grilles : 3 colonnes, 9 produits par page.
add_filter( 'loop_shop_columns', function () {
	return 3;
} );
add_filter( 'loop_shop_per_page', function () {
	return 9;
} );

// Notices déplacées dans un conteneur propre (voir header.php).
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
remove_action( 'woocommerce_before_single_product', 'woocommerce_output_all_notices', 10 );

/* -------------------------------------------------------------------------
 * Cartes produit (boucles boutique / accueil)
 * ---------------------------------------------------------------------- */

/**
 * Promesse courte sous le titre de la carte (extrait du produit).
 */
function nampelli_loop_tagline() {
	global $product;
	$tagline = $product ? $product->get_short_description() : '';
	if ( $tagline ) {
		echo '<p class="n-card__tagline">' . esc_html( wp_strip_all_tags( $tagline ) ) . '</p>';
	}
}
add_action( 'woocommerce_after_shop_loop_item_title', 'nampelli_loop_tagline', 7 );

/* -------------------------------------------------------------------------
 * Fiche produit
 * ---------------------------------------------------------------------- */

// Onglets natifs retirés : remplacés par des sections accordéon premium.
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );

// Up-sells limités à 3, titre orienté routine.
add_filter( 'woocommerce_upsells_total', function () {
	return 3;
} );
add_filter( 'woocommerce_product_upsells_products_heading', function () {
	return __( 'Complétez votre routine', 'nampelli' );
} );
add_filter( 'woocommerce_product_related_products_heading', function () {
	return __( 'Vous aimerez aussi', 'nampelli' );
} );
add_filter( 'woocommerce_output_related_products_args', function ( $args ) {
	$args['posts_per_page'] = 3;
	$args['columns']        = 3;
	return $args;
} );

/**
 * Bénéfices clés sous la promesse (liste à puces diamant).
 */
function nampelli_single_benefits() {
	$benefits = nampelli_product_lines( '_nampelli_benefits' );
	if ( ! $benefits ) {
		return;
	}
	echo '<ul class="n-benefits">';
	foreach ( $benefits as $benefit ) {
		printf( '<li>%s<span>%s</span></li>', nampelli_icon( 'diamond', 16 ), esc_html( $benefit ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
	echo '</ul>';
}
add_action( 'woocommerce_single_product_summary', 'nampelli_single_benefits', 25 );

/**
 * Badges de réassurance sous le bouton d'achat.
 */
function nampelli_single_trust_badges() {
	$threshold = (int) nampelli_mod( 'nampelli_seuil_livraison' );
	$shipping  = $threshold > 0
		/* translators: %d : seuil de livraison offerte. */
		? sprintf( __( 'Livraison suivie · offerte dès %d €', 'nampelli' ), $threshold )
		: __( 'Livraison suivie en 48/72 h', 'nampelli' );

	$badges = array(
		array( 'lock', __( 'Paiement 100 % sécurisé (SSL)', 'nampelli' ) ),
		array( 'truck', $shipping ),
		array( 'return', __( 'Retours sous 14 jours', 'nampelli' ) ),
	);
	echo '<ul class="n-trust">';
	foreach ( $badges as $badge ) {
		printf( '<li>%s<span>%s</span></li>', nampelli_icon( $badge[0], 18 ), esc_html( $badge[1] ) ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
	echo '</ul>';
}
add_action( 'woocommerce_single_product_summary', 'nampelli_single_trust_badges', 35 );

/**
 * Sections détaillées de la fiche (accordéons) : description, conseils, FAQ…
 */
function nampelli_single_details() {
	global $product;
	if ( ! $product ) {
		return;
	}

	$sections = array();

	$description = get_the_content( null, false, $product->get_id() );
	if ( trim( wp_strip_all_tags( $description ) ) ) {
		$sections[] = array( __( 'Description', 'nampelli' ), apply_filters( 'the_content', $description ), true );
	}

	$video = get_post_meta( $product->get_id(), '_nampelli_video_url', true );
	if ( $video ) {
		$embed = wp_oembed_get( $video );
		if ( ! $embed && preg_match( '/\.(mp4|webm)$/i', $video ) ) {
			$embed = sprintf( '<video controls playsinline preload="none" src="%s"></video>', esc_url( $video ) );
		}
		if ( $embed ) {
			$sections[] = array( __( 'En vidéo', 'nampelli' ), '<div class="n-video">' . $embed . '</div>', false );
		}
	}

	$meta_sections = array(
		'_nampelli_for_who'     => __( 'Pour qui ?', 'nampelli' ),
		'_nampelli_how_to'      => __( 'Comment l’utiliser', 'nampelli' ),
		'_nampelli_when'        => __( 'Quand l’utiliser', 'nampelli' ),
		'_nampelli_ingredients' => __( 'Ingrédients clés', 'nampelli' ),
		'_nampelli_precautions' => __( 'Précautions d’emploi', 'nampelli' ),
	);
	foreach ( $meta_sections as $key => $title ) {
		$value = get_post_meta( $product->get_id(), $key, true );
		if ( $value ) {
			$sections[] = array( $title, wpautop( esc_html( $value ) ), false );
		}
	}

	// Livraison & retours : rappel commun à toutes les fiches.
	$threshold = (int) nampelli_mod( 'nampelli_seuil_livraison' );
	$shipping_text  = '<p>' . esc_html__( 'Commande préparée avec soin et expédiée sous 24/48 h ouvrées, en livraison suivie.', 'nampelli' ) . '</p>';
	if ( $threshold > 0 ) {
		/* translators: %d : seuil de livraison offerte. */
		$shipping_text .= '<p>' . esc_html( sprintf( __( 'Livraison offerte dès %d € d’achat.', 'nampelli' ), $threshold ) ) . '</p>';
	}
	$shipping_text .= '<p>' . sprintf(
		/* translators: %s : lien vers la page livraison. */
		wp_kses_post( __( 'Vous changez d’avis ? Vous disposez de 14 jours pour nous retourner votre commande. Détails sur la page <a href="%s">Livraison &amp; retours</a>.', 'nampelli' ) ),
		esc_url( nampelli_page_url( 'livraison-et-retours' ) )
	) . '</p>';
	$sections[] = array( __( 'Livraison & retours', 'nampelli' ), $shipping_text, false );

	$faq = nampelli_product_faq( $product->get_id() );
	if ( $faq ) {
		$faq_html = '';
		foreach ( $faq as $qa ) {
			$faq_html .= sprintf(
				'<details class="n-faq__item"><summary>%s</summary><div class="n-faq__answer"><p>%s</p></div></details>',
				esc_html( $qa[0] ),
				esc_html( $qa[1] )
			);
		}
		$sections[] = array( __( 'Questions fréquentes', 'nampelli' ), $faq_html, false );
	}

	if ( ! $sections ) {
		return;
	}

	echo '<section class="n-product-details" aria-label="' . esc_attr__( 'Informations détaillées', 'nampelli' ) . '">';
	foreach ( $sections as $i => $section ) {
		list( $title, $content, $open ) = $section;
		printf(
			'<details class="n-acc"%s><summary><h2>%s</h2>%s</summary><div class="n-acc__body">%s</div></details>',
			$open ? ' open' : '',
			esc_html( $title ),
			nampelli_icon( 'arrow', 18 ), // phpcs:ignore WordPress.Security.EscapeOutput
			wp_kses_post( $content )
		);
	}
	echo '</section>';
}
add_action( 'woocommerce_after_single_product_summary', 'nampelli_single_details', 5 );

/**
 * Avis clientes : section dédiée (les onglets natifs étant remplacés,
 * on recharge le template d'avis WooCommerce ici).
 */
function nampelli_single_reviews() {
	if ( ! comments_open() ) {
		return;
	}
	echo '<section class="n-product-reviews" id="avis">';
	comments_template();
	echo '</section>';
}
add_action( 'woocommerce_after_single_product_summary', 'nampelli_single_reviews', 12 );

/**
 * Barre d'achat sticky sur mobile (fiche produit).
 */
function nampelli_sticky_atc() {
	if ( ! is_product() ) {
		return;
	}
	global $post;
	$product = wc_get_product( $post->ID );
	if ( ! $product || ! $product->is_purchasable() || ! $product->is_in_stock() ) {
		return;
	}
	?>
	<div class="n-sticky-atc" id="n-sticky-atc" hidden>
		<div class="n-sticky-atc__info">
			<?php echo $product->get_image( array( 56, 75 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<div>
				<strong><?php echo esc_html( $product->get_name() ); ?></strong>
				<span class="n-sticky-atc__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
			</div>
		</div>
		<button type="button" class="n-btn n-btn--primary" data-sticky-add>
			<?php esc_html_e( 'Ajouter au panier', 'nampelli' ); ?>
		</button>
	</div>
	<?php
}
add_action( 'wp_footer', 'nampelli_sticky_atc' );

/* -------------------------------------------------------------------------
 * Panier & commande
 * ---------------------------------------------------------------------- */

/**
 * Barre de progression vers la livraison offerte (panier).
 */
function nampelli_free_shipping_bar() {
	$threshold = (float) nampelli_mod( 'nampelli_seuil_livraison' );
	if ( $threshold <= 0 || ! WC()->cart ) {
		return;
	}
	$subtotal  = (float) WC()->cart->get_displayed_subtotal();
	$remaining = max( 0, $threshold - $subtotal );
	$percent   = min( 100, ( $subtotal / $threshold ) * 100 );
	?>
	<div class="n-shipbar" role="status">
		<p>
			<?php
			if ( $remaining > 0 ) {
				printf(
					/* translators: %s : montant restant. */
					wp_kses_post( __( 'Plus que <strong>%s</strong> pour profiter de la livraison offerte ✨', 'nampelli' ) ),
					wp_kses_post( wc_price( $remaining ) )
				);
			} else {
				echo wp_kses_post( __( '<strong>Bravo !</strong> La livraison vous est offerte.', 'nampelli' ) );
			}
			?>
		</p>
		<div class="n-shipbar__track"><span style="width:<?php echo esc_attr( round( $percent, 1 ) ); ?>%"></span></div>
	</div>
	<?php
}
add_action( 'woocommerce_before_cart', 'nampelli_free_shipping_bar', 5 );

// Cross-sells du panier : 3 produits max, titre routine.
add_filter( 'woocommerce_cross_sells_total', function () {
	return 3;
} );
add_filter( 'woocommerce_product_cross_sells_products_heading', function () {
	return __( 'Complétez votre routine', 'nampelli' );
} );

/**
 * Réassurance sous le bouton de paiement (checkout).
 */
function nampelli_checkout_trust() {
	echo '<p class="n-checkout-trust">' . nampelli_icon( 'lock', 16 ) . esc_html__( 'Paiement chiffré SSL — vos données bancaires ne sont jamais stockées sur ce site.', 'nampelli' ) . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput
}
add_action( 'woocommerce_review_order_after_submit', 'nampelli_checkout_trust' );

/**
 * Panier vide : message premium + retour boutique.
 */
function nampelli_empty_cart_cta() {
	if ( function_exists( 'wc_get_page_id' ) && wc_get_page_id( 'shop' ) > 0 ) {
		printf(
			'<p class="n-empty-cart-cta"><a class="n-btn n-btn--primary" href="%s">%s</a></p>',
			esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ),
			esc_html__( 'Découvrir les soins NAMPELLI', 'nampelli' )
		);
	}
}
add_action( 'woocommerce_cart_is_empty', 'nampelli_empty_cart_cta', 20 );

/**
 * Compteur du panier mis à jour en AJAX (ajout au panier sans rechargement).
 */
function nampelli_cart_count_fragment( $fragments ) {
	$fragments['.n-cart-count'] = sprintf(
		'<span class="n-cart-count">%d</span>',
		WC()->cart ? WC()->cart->get_cart_contents_count() : 0
	);
	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'nampelli_cart_count_fragment' );

/* -------------------------------------------------------------------------
 * Helpers données produit
 * ---------------------------------------------------------------------- */

/**
 * Méta texte multi-lignes → tableau de lignes propres.
 *
 * @param string   $key        Clé méta.
 * @param int|null $product_id ID produit (défaut : produit courant).
 * @return string[]
 */
function nampelli_product_lines( $key, $product_id = null ) {
	$product_id = $product_id ? $product_id : get_the_ID();
	$raw        = (string) get_post_meta( $product_id, $key, true );
	if ( '' === trim( $raw ) ) {
		return array();
	}
	return array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', $raw ) ) ) );
}

/**
 * FAQ produit : lignes "Question :: Réponse" → tableau [question, réponse].
 *
 * @param int $product_id ID produit.
 * @return array[]
 */
function nampelli_product_faq( $product_id ) {
	$faq = array();
	foreach ( nampelli_product_lines( '_nampelli_faq', $product_id ) as $line ) {
		$parts = array_map( 'trim', explode( '::', $line, 2 ) );
		if ( 2 === count( $parts ) && $parts[0] && $parts[1] ) {
			$faq[] = $parts;
		}
	}
	return $faq;
}
