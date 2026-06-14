<?php
/**
 * Accueil — Section 10 : newsletter.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;
?>
<section class="n-section n-news">
	<div class="n-container">
		<div class="n-news__card reveal">
			<span class="n-news__diamond" aria-hidden="true"><?php nampelli_the_icon( 'diamond', 34 ); ?></span>
			<h2><?php echo esc_html( nampelli_mod( 'nampelli_news_titre' ) ); ?></h2>
			<p class="n-news__text"><?php echo esc_html( nampelli_mod( 'nampelli_news_texte' ) ); ?></p>
			<?php nampelli_newsletter_form(); ?>
		</div>
	</div>
</section>
