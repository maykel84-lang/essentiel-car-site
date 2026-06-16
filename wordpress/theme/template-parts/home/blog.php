<?php
/**
 * Accueil — Section 9 : conseils beauté (3 derniers articles).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$posts = get_posts(
	array(
		'posts_per_page' => 3,
		'post_status'    => 'publish',
	)
);
if ( ! $posts ) {
	return;
}

$blog_id = (int) get_option( 'page_for_posts' );
?>
<section class="n-section n-bloghome">
	<div class="n-container">
		<header class="n-section__head reveal">
			<p class="n-section__kicker"><?php esc_html_e( 'Le journal', 'nampelli' ); ?></p>
			<h2><?php esc_html_e( 'Conseils beauté', 'nampelli' ); ?></h2>
			<p class="n-section__intro"><?php esc_html_e( 'Rituels, actifs, gestes d’expertes : nos conseils pour révéler l’éclat de votre peau.', 'nampelli' ); ?></p>
		</header>

		<ul class="n-bloghome__grid">
			<?php foreach ( $posts as $i => $post_item ) : ?>
				<li class="n-blogcard reveal" data-reveal-delay="<?php echo esc_attr( $i + 1 ); ?>">
					<a class="n-blogcard__media" href="<?php echo esc_url( get_permalink( $post_item ) ); ?>" tabindex="-1" aria-hidden="true">
						<?php if ( has_post_thumbnail( $post_item ) ) : ?>
							<?php echo get_the_post_thumbnail( $post_item, 'nampelli-blog', array( 'loading' => 'lazy', 'decoding' => 'async' ) ); ?>
						<?php else : ?>
							<span class="n-blogcard__placeholder"><?php nampelli_the_icon( 'diamond', 36 ); ?></span>
						<?php endif; ?>
					</a>
					<div class="n-blogcard__body">
						<time datetime="<?php echo esc_attr( get_the_date( 'c', $post_item ) ); ?>"><?php echo esc_html( get_the_date( '', $post_item ) ); ?></time>
						<h3><a href="<?php echo esc_url( get_permalink( $post_item ) ); ?>"><?php echo esc_html( get_the_title( $post_item ) ); ?></a></h3>
						<p><?php echo esc_html( wp_trim_words( get_the_excerpt( $post_item ), 22 ) ); ?></p>
						<a class="n-link-more" href="<?php echo esc_url( get_permalink( $post_item ) ); ?>">
							<?php esc_html_e( 'Lire l’article', 'nampelli' ); ?>
							<?php nampelli_the_icon( 'arrow', 16 ); ?>
						</a>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>

		<?php if ( $blog_id ) : ?>
			<p class="n-section__cta reveal">
				<a class="n-link-more" href="<?php echo esc_url( get_permalink( $blog_id ) ); ?>">
					<?php esc_html_e( 'Tous nos conseils beauté', 'nampelli' ); ?>
					<?php nampelli_the_icon( 'arrow', 16 ); ?>
				</a>
			</p>
		<?php endif; ?>
	</div>
</section>
