<?php
/**
 * Accueil — Section 3 : la routine en 3 étapes.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$steps = array(
	array(
		'01',
		__( 'Nettoyer', 'nampelli' ),
		nampelli_mod( 'nampelli_etape1_texte' ),
		'nettoyant-purifiant',
		__( 'Nettoyant Purifiant', 'nampelli' ),
	),
	array(
		'02',
		__( 'Illuminer', 'nampelli' ),
		nampelli_mod( 'nampelli_etape2_texte' ),
		'serum-eclat-vitamine-c',
		__( 'Sérum Éclat Vitamine C', 'nampelli' ),
	),
	array(
		'03',
		__( 'Nourrir', 'nampelli' ),
		nampelli_mod( 'nampelli_etape3_texte' ),
		'creme-nutrition-karite',
		__( 'Crème Nutrition Karité', 'nampelli' ),
	),
);
?>
<section class="n-section n-routine" id="routine">
	<div class="n-container">
		<header class="n-section__head reveal">
			<p class="n-section__kicker"><?php esc_html_e( 'La méthode NAMPELLI', 'nampelli' ); ?></p>
			<h2><?php echo esc_html( nampelli_mod( 'nampelli_routine_titre' ) ); ?></h2>
			<p class="n-section__intro"><?php echo esc_html( nampelli_mod( 'nampelli_routine_intro' ) ); ?></p>
		</header>

		<ol class="n-routine__steps">
			<?php foreach ( $steps as $i => $step ) : ?>
				<li class="n-routine__step reveal" data-reveal-delay="<?php echo esc_attr( $i + 1 ); ?>">
					<span class="n-routine__num" aria-hidden="true"><?php echo esc_html( $step[0] ); ?></span>
					<h3><?php echo esc_html( $step[1] ); ?></h3>
					<p><?php echo esc_html( $step[2] ); ?></p>
					<a class="n-routine__link" href="<?php echo esc_url( nampelli_product_url( $step[3] ) ); ?>">
						<?php echo esc_html( $step[4] ); ?>
						<?php nampelli_the_icon( 'arrow', 16 ); ?>
					</a>
				</li>
			<?php endforeach; ?>
		</ol>

		<p class="n-section__cta reveal">
			<a class="n-btn n-btn--primary" href="<?php echo esc_url( nampelli_product_url( nampelli_mod( 'nampelli_bundle_slug' ) ) ); ?>">
				<?php echo esc_html( nampelli_mod( 'nampelli_routine_cta' ) ); ?>
				<?php nampelli_the_icon( 'arrow', 18 ); ?>
			</a>
		</p>
	</div>
</section>
