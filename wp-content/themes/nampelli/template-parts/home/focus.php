<?php
/**
 * Accueil — Section 4 : focus produit (Sérum Éclat Vitamine C).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$focus_slug    = nampelli_mod( 'nampelli_focus_slug' );
$focus_product = nampelli_get_product( $focus_slug );
$focus_url     = nampelli_product_url( $focus_slug );

$focus_image = get_theme_mod( 'nampelli_focus_image' );
if ( ! $focus_image && $focus_product ) {
	$focus_image = wp_get_attachment_image_url( $focus_product->get_image_id(), 'nampelli-card' );
}
if ( ! $focus_image ) {
	$focus_image = NAMPELLI_URI . '/assets/img/serum-vitamine-c.jpg';
}

$points = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) nampelli_mod( 'nampelli_focus_points' ) ) ) ) );
?>
<section class="n-section n-focus">
	<div class="n-container n-focus__grid">

		<figure class="n-focus__media reveal">
			<img src="<?php echo esc_url( $focus_image ); ?>"
				alt="<?php echo esc_attr( nampelli_mod( 'nampelli_focus_titre' ) ); ?> — NAMPELLI"
				width="600" height="800" loading="lazy" decoding="async">
		</figure>

		<div class="n-focus__content">
			<p class="n-section__kicker reveal"><?php echo esc_html( nampelli_mod( 'nampelli_focus_surtitre' ) ); ?></p>
			<h2 class="reveal" data-reveal-delay="1"><?php echo esc_html( nampelli_mod( 'nampelli_focus_titre' ) ); ?></h2>
			<p class="n-focus__text reveal" data-reveal-delay="2"><?php echo esc_html( nampelli_mod( 'nampelli_focus_texte' ) ); ?></p>

			<?php if ( $points ) : ?>
				<ul class="n-benefits reveal" data-reveal-delay="3">
					<?php foreach ( $points as $point ) : ?>
						<li><?php nampelli_the_icon( 'diamond', 16 ); ?><span><?php echo esc_html( $point ); ?></span></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>

			<div class="n-focus__buy reveal" data-reveal-delay="4">
				<?php if ( $focus_product ) : ?>
					<span class="n-price"><?php echo wp_kses_post( $focus_product->get_price_html() ); ?></span>
				<?php endif; ?>
				<a class="n-btn n-btn--dark" href="<?php echo esc_url( $focus_url ); ?>">
					<?php esc_html_e( 'Découvrir le sérum', 'nampelli' ); ?>
					<?php nampelli_the_icon( 'arrow', 18 ); ?>
				</a>
			</div>
		</div>
	</div>
</section>
