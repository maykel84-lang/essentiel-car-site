<?php
/**
 * Article de blog : mise en page éditoriale + produits liés.
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
			<article <?php post_class( 'n-article' ); ?>>

				<header class="n-page-head n-article__head">
					<p class="n-section__kicker"><?php esc_html_e( 'Conseils beauté', 'nampelli' ); ?></p>
					<h1><?php the_title(); ?></h1>
					<p class="n-article__meta">
						<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
						·
						<?php
						/* translators: %s : temps de lecture estimé. */
						printf( esc_html__( '%s min de lecture', 'nampelli' ), esc_html( max( 1, (int) ceil( str_word_count( wp_strip_all_tags( get_post_field( 'post_content' ) ) ) / 200 ) ) ) );
						?>
					</p>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<figure class="n-article__cover">
						<?php the_post_thumbnail( 'nampelli-wide', array( 'decoding' => 'async' ) ); ?>
					</figure>
				<?php endif; ?>

				<div class="n-prose">
					<?php the_content(); ?>
				</div>

			</article>

			<nav class="n-article__nav" aria-label="<?php esc_attr_e( 'Autres articles', 'nampelli' ); ?>">
				<?php previous_post_link( '<span class="n-article__prev">%link</span>', '← %title' ); ?>
				<?php next_post_link( '<span class="n-article__next">%link</span>', '%title →' ); ?>
			</nav>

		<?php endwhile; ?>
	</div>

	<?php if ( function_exists( 'wc_get_products' ) ) : ?>
		<?php
		$related_products = wc_get_products(
			array(
				'status'   => 'publish',
				'featured' => true,
				'limit'    => 3,
			)
		);
		?>
		<?php if ( $related_products ) : ?>
			<aside class="n-section n-article-products" aria-label="<?php esc_attr_e( 'Les soins NAMPELLI', 'nampelli' ); ?>">
				<div class="n-container">
					<header class="n-section__head">
						<p class="n-section__kicker"><?php esc_html_e( 'Passez à la pratique', 'nampelli' ); ?></p>
						<h2><?php esc_html_e( 'Les soins de la Routine Éclat', 'nampelli' ); ?></h2>
					</header>
					<ul class="n-products-grid">
						<?php foreach ( $related_products as $product ) : ?>
							<li class="n-product-card">
								<a class="n-product-card__media" href="<?php echo esc_url( $product->get_permalink() ); ?>">
									<?php echo $product->get_image( 'nampelli-card', array( 'loading' => 'lazy' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
								</a>
								<div class="n-product-card__body">
									<h3><a href="<?php echo esc_url( $product->get_permalink() ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h3>
									<p class="n-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></p>
								</div>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</aside>
		<?php endif; ?>
	<?php endif; ?>
</main>

<?php
get_footer();
