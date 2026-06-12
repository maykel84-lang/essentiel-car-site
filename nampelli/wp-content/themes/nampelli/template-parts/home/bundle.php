<?php
/**
 * Accueil — Section 5 : bundle Routine Éclat (économie visible).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$bundle_slug    = nampelli_mod( 'nampelli_bundle_slug' );
$bundle_product = nampelli_get_product( $bundle_slug );
$bundle_url     = nampelli_product_url( $bundle_slug );

$bundle_image = get_theme_mod( 'nampelli_bundle_image' );
if ( ! $bundle_image && $bundle_product ) {
	$bundle_image = wp_get_attachment_image_url( $bundle_product->get_image_id(), 'nampelli-wide' );
}
if ( ! $bundle_image ) {
	$bundle_image = NAMPELLI_URI . '/assets/img/routine-eclat-coffret.jpg';
}

$contents = array(
	__( 'Nettoyant Purifiant — 200 ml', 'nampelli' ),
	__( 'Sérum Éclat Vitamine C — 30 ml', 'nampelli' ),
	__( 'Crème Nutrition Karité — 50 ml', 'nampelli' ),
);
?>
<section class="n-section n-bundle">
	<div class="n-container">
		<div class="n-bundle__card reveal">

			<figure class="n-bundle__media">
				<img src="<?php echo esc_url( $bundle_image ); ?>"
					alt="<?php esc_attr_e( 'Coffret Routine Éclat NAMPELLI : les 3 soins essentiels du rituel visage', 'nampelli' ); ?>"
					width="800" height="533" loading="lazy" decoding="async">
				<?php if ( nampelli_mod( 'nampelli_bundle_economie' ) ) : ?>
					<span class="n-bundle__flag"><?php esc_html_e( 'Offre routine', 'nampelli' ); ?></span>
				<?php endif; ?>
			</figure>

			<div class="n-bundle__content">
				<p class="n-section__kicker"><?php echo esc_html( nampelli_mod( 'nampelli_bundle_surtitre' ) ); ?></p>
				<h2><?php echo esc_html( nampelli_mod( 'nampelli_bundle_titre' ) ); ?></h2>
				<p class="n-bundle__text"><?php echo esc_html( nampelli_mod( 'nampelli_bundle_texte' ) ); ?></p>

				<ul class="n-bundle__list">
					<?php foreach ( $contents as $line ) : ?>
						<li><?php nampelli_the_icon( 'check', 16 ); ?><?php echo esc_html( $line ); ?></li>
					<?php endforeach; ?>
				</ul>

				<?php if ( $bundle_product ) : ?>
					<p class="n-bundle__price"><?php echo wp_kses_post( $bundle_product->get_price_html() ); ?></p>
				<?php endif; ?>

				<?php if ( nampelli_mod( 'nampelli_bundle_economie' ) ) : ?>
					<p class="n-bundle__save"><?php nampelli_the_icon( 'sparkle', 16 ); ?><?php echo esc_html( nampelli_mod( 'nampelli_bundle_economie' ) ); ?></p>
				<?php endif; ?>

				<a class="n-btn n-btn--primary" href="<?php echo esc_url( $bundle_url ); ?>">
					<?php esc_html_e( 'Adopter la Routine Éclat', 'nampelli' ); ?>
					<?php nampelli_the_icon( 'arrow', 18 ); ?>
				</a>
			</div>
		</div>
	</div>
</section>
