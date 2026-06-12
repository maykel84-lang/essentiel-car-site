<?php
/**
 * Page 404 élégante avec retour boutique.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<main id="primary" class="n-main">
	<div class="n-container n-404">
		<span class="n-404__diamond" aria-hidden="true"><?php nampelli_the_icon( 'diamond', 48 ); ?></span>
		<h1><?php esc_html_e( 'Cette page s’est volatilisée', 'nampelli' ); ?></h1>
		<p><?php esc_html_e( 'Le lien que vous avez suivi n’existe plus — mais votre éclat, lui, est toujours là.', 'nampelli' ); ?></p>
		<div class="n-hero__ctas">
			<a class="n-btn n-btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Retour à l’accueil', 'nampelli' ); ?></a>
			<?php if ( function_exists( 'wc_get_page_id' ) && wc_get_page_id( 'shop' ) > 0 ) : ?>
				<a class="n-btn n-btn--ghost" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>"><?php esc_html_e( 'Voir les soins', 'nampelli' ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</main>

<?php
get_footer();
