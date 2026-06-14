<?php
/**
 * Accueil — Section 8 : avis clientes.
 *
 * Affiche en priorité les avis saisis dans le Customizer
 * (format : Texte :: Prénom :: Note), sinon les derniers avis
 * WooCommerce approuvés. Section masquée si aucun avis.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$reviews = array();

// 1) Avis rédigés dans le Customizer.
foreach ( array( 'nampelli_avis_1', 'nampelli_avis_2', 'nampelli_avis_3' ) as $key ) {
	$raw = trim( (string) nampelli_mod( $key ) );
	if ( ! $raw ) {
		continue;
	}
	$parts = array_map( 'trim', explode( '::', $raw ) );
	if ( ! empty( $parts[0] ) ) {
		$reviews[] = array(
			'text'   => $parts[0],
			'author' => isset( $parts[1] ) && $parts[1] ? $parts[1] : __( 'Cliente NAMPELLI', 'nampelli' ),
			'rating' => isset( $parts[2] ) ? (float) str_replace( ',', '.', $parts[2] ) : 5,
		);
	}
}

// 2) Sinon : derniers avis produits WooCommerce.
if ( ! $reviews && function_exists( 'wc_get_products' ) ) {
	$comments = get_comments(
		array(
			'post_type' => 'product',
			'status'    => 'approve',
			'number'    => 3,
			'parent'    => 0,
		)
	);
	foreach ( $comments as $comment ) {
		$rating    = (float) get_comment_meta( $comment->comment_ID, 'rating', true );
		$reviews[] = array(
			'text'   => wp_strip_all_tags( $comment->comment_content ),
			'author' => $comment->comment_author,
			'rating' => $rating > 0 ? $rating : 5,
		);
	}
}

if ( ! $reviews ) {
	return;
}
?>
<section class="n-section n-reviews">
	<div class="n-container">
		<header class="n-section__head reveal">
			<p class="n-section__kicker"><?php esc_html_e( 'Avis vérifiés', 'nampelli' ); ?></p>
			<h2><?php echo esc_html( nampelli_mod( 'nampelli_avis_titre' ) ); ?></h2>
		</header>

		<ul class="n-reviews__grid">
			<?php foreach ( $reviews as $i => $review ) : ?>
				<li class="n-review reveal" data-reveal-delay="<?php echo esc_attr( $i + 1 ); ?>">
					<?php nampelli_stars( $review['rating'] ); ?>
					<blockquote><p><?php echo esc_html( $review['text'] ); ?></p></blockquote>
					<cite><?php echo esc_html( $review['author'] ); ?></cite>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
