<?php
/**
 * Accueil — Section 1 : héro.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$hero_badge = nampelli_mod( 'nampelli_hero_badge' );
$bundle_url = nampelli_product_url( nampelli_mod( 'nampelli_bundle_slug' ) );
$shop_url   = function_exists( 'wc_get_page_id' ) && wc_get_page_id( 'shop' ) > 0
	? get_permalink( wc_get_page_id( 'shop' ) )
	: home_url( '/' );
?>
<section class="n-hero">
	<div class="n-container n-hero__grid">

		<div class="n-hero__content">
			<?php if ( $hero_badge ) : ?>
				<p class="n-hero__badge reveal">
					<span class="n-hero__badge-diamond"><?php nampelli_the_icon( 'diamond', 15 ); ?></span>
					<?php echo esc_html( $hero_badge ); ?>
				</p>
			<?php endif; ?>

			<h1 class="n-hero__title reveal" data-reveal-delay="1"><?php echo esc_html( nampelli_mod( 'nampelli_hero_titre' ) ); ?></h1>

			<p class="n-hero__text reveal" data-reveal-delay="2"><?php echo esc_html( nampelli_mod( 'nampelli_hero_texte' ) ); ?></p>

			<div class="n-hero__ctas reveal" data-reveal-delay="3">
				<a class="n-btn n-btn--primary" href="<?php echo esc_url( $bundle_url ); ?>">
					<?php echo esc_html( nampelli_mod( 'nampelli_hero_cta1' ) ); ?>
					<?php nampelli_the_icon( 'arrow', 18 ); ?>
				</a>
				<a class="n-btn n-btn--ghost" href="<?php echo esc_url( $shop_url ); ?>">
					<?php echo esc_html( nampelli_mod( 'nampelli_hero_cta2' ) ); ?>
				</a>
			</div>

			<ul class="n-hero__props reveal" data-reveal-delay="4">
				<li><?php nampelli_the_icon( 'check', 15 ); ?><?php esc_html_e( '3 gestes, 5 minutes', 'nampelli' ); ?></li>
				<li><?php nampelli_the_icon( 'check', 15 ); ?><?php esc_html_e( 'Tous types de peau', 'nampelli' ); ?></li>
				<li><?php nampelli_the_icon( 'check', 15 ); ?><?php esc_html_e( 'Marque française', 'nampelli' ); ?></li>
			</ul>
		</div>

		<figure class="n-hero__media reveal" data-reveal-delay="2">
			<img
				src="<?php echo esc_url( nampelli_hero_image_url() ); ?>"
				alt="<?php esc_attr_e( 'Routine Éclat NAMPELLI : nettoyant purifiant, sérum éclat vitamine C et crème nutrition karité', 'nampelli' ); ?>"
				width="800" height="533"
				fetchpriority="high" decoding="async">
		</figure>
	</div>
</section>
