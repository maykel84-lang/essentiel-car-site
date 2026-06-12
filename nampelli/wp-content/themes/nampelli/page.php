<?php
/**
 * Template de page (À propos, FAQ, légales, contact…).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<main id="primary" class="n-main">
	<div class="n-container n-container--narrow">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class( 'n-page' ); ?>>
				<header class="n-page-head">
					<h1><?php the_title(); ?></h1>
				</header>
				<div class="n-prose">
					<?php the_content(); ?>
				</div>
			</article>
		<?php endwhile; ?>
	</div>
</main>

<?php
get_footer();
