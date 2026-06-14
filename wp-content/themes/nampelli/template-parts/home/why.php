<?php
/**
 * Accueil — Section 7 : pourquoi NAMPELLI (storytelling + lifestyle).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$why_image = get_theme_mod( 'nampelli_pourquoi_image' );
if ( ! $why_image ) {
	$why_image = NAMPELLI_URI . '/assets/img/rituel-lifestyle.jpg';
}

$paragraphs = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n\r\n|\n\n/', (string) nampelli_mod( 'nampelli_pourquoi_texte' ) ) ) ) );
$points     = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) nampelli_mod( 'nampelli_pourquoi_points' ) ) ) ) );

$apropos = get_page_by_path( 'a-propos' );
?>
<section class="n-section n-why">
	<div class="n-container n-why__grid">

		<div class="n-why__content">
			<p class="n-section__kicker reveal"><?php esc_html_e( 'Notre vision', 'nampelli' ); ?></p>
			<h2 class="reveal" data-reveal-delay="1"><?php echo esc_html( nampelli_mod( 'nampelli_pourquoi_titre' ) ); ?></h2>

			<div class="n-why__text reveal" data-reveal-delay="2">
				<?php foreach ( $paragraphs as $paragraph ) : ?>
					<p><?php echo esc_html( $paragraph ); ?></p>
				<?php endforeach; ?>
			</div>

			<?php if ( $points ) : ?>
				<ul class="n-why__points reveal" data-reveal-delay="3">
					<?php foreach ( $points as $point ) : ?>
						<li><?php nampelli_the_icon( 'diamond', 16 ); ?><span><?php echo esc_html( $point ); ?></span></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>

			<?php if ( $apropos ) : ?>
				<p class="reveal" data-reveal-delay="4">
					<a class="n-link-more" href="<?php echo esc_url( get_permalink( $apropos ) ); ?>">
						<?php esc_html_e( 'Découvrir la maison NAMPELLI', 'nampelli' ); ?>
						<?php nampelli_the_icon( 'arrow', 16 ); ?>
					</a>
				</p>
			<?php endif; ?>
		</div>

		<figure class="n-why__media reveal" data-reveal-delay="2">
			<img src="<?php echo esc_url( $why_image ); ?>"
				alt="<?php esc_attr_e( 'Rituel de soin NAMPELLI : un moment d’élégance et de douceur au quotidien', 'nampelli' ); ?>"
				width="800" height="533" loading="lazy" decoding="async">
			<span class="n-why__frame" aria-hidden="true"></span>
		</figure>
	</div>
</section>
