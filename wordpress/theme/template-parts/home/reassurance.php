<?php
/**
 * Accueil — Section 2 : réassurance (4 piliers).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$threshold = (int) nampelli_mod( 'nampelli_seuil_livraison' );
$pillars   = array(
	array( 'sparkle', __( 'Routine simple', 'nampelli' ), __( '3 gestes essentiels, des résultats visibles au quotidien.', 'nampelli' ) ),
	array( 'diamond', __( 'Expérience premium', 'nampelli' ), __( 'Des soins élégants et sensoriels, signés NAMPELLI.', 'nampelli' ) ),
	array( 'lock', __( 'Paiement sécurisé', 'nampelli' ), __( 'Transactions chiffrées SSL — CB, PayPal, Apple Pay.', 'nampelli' ) ),
	array(
		'truck',
		__( 'Livraison suivie', 'nampelli' ),
		$threshold > 0
			/* translators: %d : seuil de livraison offerte. */
			? sprintf( __( 'Expédition 24/48 h, offerte dès %d € d’achat.', 'nampelli' ), $threshold )
			: __( 'Expédition soignée sous 24/48 h ouvrées.', 'nampelli' ),
	),
);
?>
<section class="n-reassurance" aria-label="<?php esc_attr_e( 'Nos engagements', 'nampelli' ); ?>">
	<div class="n-container">
		<ul class="n-reassurance__grid">
			<?php foreach ( $pillars as $i => $pillar ) : ?>
				<li class="reveal" data-reveal-delay="<?php echo esc_attr( $i ); ?>">
					<span class="n-reassurance__icon"><?php nampelli_the_icon( $pillar[0], 24 ); ?></span>
					<h2><?php echo esc_html( $pillar[1] ); ?></h2>
					<p><?php echo esc_html( $pillar[2] ); ?></p>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
