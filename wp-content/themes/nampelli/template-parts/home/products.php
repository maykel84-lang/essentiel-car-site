<?php
/**
 * Accueil — Section 6 : les 3 soins essentiels (cartes produits).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'wc_get_products' ) ) {
	return;
}

// Produits mis en avant en priorité, sinon les derniers publiés.
$products = wc_get_products(
	array(
		'status'   => 'publish',
		'featured' => true,
		'limit'    => 3,
		'orderby'  => 'menu_order',
		'order'    => 'ASC',
	)
);
if ( count( $products ) < 3 ) {
	$products = wc_get_products(
		array(
			'status'  => 'publish',
			'limit'   => 3,
			'orderby' => 'date',
			'order'   => 'DESC',
		)
	);
}
if ( ! $products ) {
	return;
}

$shop_url = wc_get_page_id( 'shop' ) > 0 ? get_permalink( wc_get_page_id( 'shop' ) ) : home_url( '/' );
?>
<section class="n-section n-essentials">
	<div class="n-container">
		<header class="n-section__head reveal">
			<p class="n-section__kicker"><?php esc_html_e( 'La collection', 'nampelli' ); ?></p>
			<h2><?php esc_html_e( 'Les essentiels NAMPELLI', 'nampelli' ); ?></h2>
			<p class="n-section__intro"><?php esc_html_e( 'Une gamme courte et cohérente : chaque soin a sa place, chaque geste a son effet.', 'nampelli' ); ?></p>
		</header>

		<ul class="n-products-grid">
			<?php foreach ( $products as $i => $product ) : ?>
				<li class="n-product-card reveal" data-reveal-delay="<?php echo esc_attr( $i + 1 ); ?>">
					<a class="n-product-card__media" href="<?php echo esc_url( $product->get_permalink() ); ?>">
						<?php echo $product->get_image( 'nampelli-card', array( 'loading' => 'lazy', 'decoding' => 'async' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</a>
					<div class="n-product-card__body">
						<h3><a href="<?php echo esc_url( $product->get_permalink() ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h3>
						<?php if ( $product->get_short_description() ) : ?>
							<p class="n-card__tagline"><?php echo esc_html( wp_strip_all_tags( $product->get_short_description() ) ); ?></p>
						<?php endif; ?>
						<p class="n-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></p>
						<a class="n-btn n-btn--outline" href="<?php echo esc_url( $product->get_permalink() ); ?>"><?php esc_html_e( 'Découvrir', 'nampelli' ); ?></a>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>

		<p class="n-section__cta reveal">
			<a class="n-link-more" href="<?php echo esc_url( $shop_url ); ?>">
				<?php esc_html_e( 'Voir tous les soins', 'nampelli' ); ?>
				<?php nampelli_the_icon( 'arrow', 16 ); ?>
			</a>
		</p>
	</div>
</section>
