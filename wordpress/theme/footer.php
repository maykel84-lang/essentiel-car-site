<?php
/**
 * Pied de page : marque, navigation, aide, informations légales, paiements.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;
?>

<footer class="n-footer">
	<div class="n-container">
		<div class="n-footer__grid">

			<div class="n-footer__brand">
				<span class="n-footer__logo"><?php nampelli_the_icon( 'diamond', 28 ); ?><span>nampelli</span></span>
				<p class="n-footer__baseline"><?php echo esc_html( nampelli_mod( 'nampelli_baseline' ) ); ?></p>
				<p class="n-footer__text"><?php echo esc_html( nampelli_mod( 'nampelli_footer_texte' ) ); ?></p>
				<?php $socials = nampelli_social_links(); ?>
				<?php if ( $socials ) : ?>
					<ul class="n-socials">
						<?php foreach ( $socials as $network => $url ) : ?>
							<li>
								<a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr( ucfirst( $network ) ); ?>">
									<?php nampelli_the_icon( $network, 20 ); ?>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>

			<nav class="n-footer__col" aria-label="<?php esc_attr_e( 'Boutique', 'nampelli' ); ?>">
				<h2><?php esc_html_e( 'Boutique', 'nampelli' ); ?></h2>
				<?php
				if ( has_nav_menu( 'footer-1' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'footer-1',
							'container'      => false,
							'depth'          => 1,
						)
					);
				} else {
					nampelli_footer_menu_fallback( 'boutique' );
				}
				?>
			</nav>

			<nav class="n-footer__col" aria-label="<?php esc_attr_e( 'Aide', 'nampelli' ); ?>">
				<h2><?php esc_html_e( 'Aide', 'nampelli' ); ?></h2>
				<?php
				if ( has_nav_menu( 'footer-2' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'footer-2',
							'container'      => false,
							'depth'          => 1,
						)
					);
				} else {
					nampelli_footer_menu_fallback( 'aide' );
				}
				?>
			</nav>

			<nav class="n-footer__col" aria-label="<?php esc_attr_e( 'Informations', 'nampelli' ); ?>">
				<h2><?php esc_html_e( 'Informations', 'nampelli' ); ?></h2>
				<?php
				if ( has_nav_menu( 'footer-3' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'footer-3',
							'container'      => false,
							'depth'          => 1,
						)
					);
				} else {
					nampelli_footer_menu_fallback( 'infos' );
				}
				?>
			</nav>
		</div>

		<div class="n-footer__bottom">
			<?php nampelli_payment_badges(); ?>
			<p class="n-footer__copy">
				&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> NAMPELLI — <?php esc_html_e( 'Tous droits réservés. Marque déposée à l’INPI.', 'nampelli' ); ?>
			</p>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
