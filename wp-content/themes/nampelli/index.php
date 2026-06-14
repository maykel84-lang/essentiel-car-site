<?php
/**
 * Template de repli (liste d'articles, résultats de recherche).
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<main id="primary" class="n-main">
	<div class="n-container">

		<header class="n-page-head">
			<h1>
				<?php
				if ( is_home() ) {
					$blog_id = (int) get_option( 'page_for_posts' );
					echo esc_html( $blog_id ? get_the_title( $blog_id ) : __( 'Conseils beauté', 'nampelli' ) );
				} elseif ( is_search() ) {
					/* translators: %s : terme recherché. */
					printf( esc_html__( 'Résultats pour « %s »', 'nampelli' ), esc_html( get_search_query() ) );
				} elseif ( is_archive() ) {
					echo esc_html( wp_strip_all_tags( get_the_archive_title() ) );
				} else {
					esc_html_e( 'Le journal NAMPELLI', 'nampelli' );
				}
				?>
			</h1>
			<?php if ( is_home() ) : ?>
				<p class="n-page-head__intro"><?php esc_html_e( 'Rituels, actifs et gestes d’expertes : tous nos conseils pour une peau lumineuse.', 'nampelli' ); ?></p>
			<?php endif; ?>
		</header>

		<?php if ( have_posts() ) : ?>
			<ul class="n-bloghome__grid n-archive-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<li class="n-blogcard">
						<a class="n-blogcard__media" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php the_post_thumbnail( 'nampelli-blog', array( 'loading' => 'lazy', 'decoding' => 'async' ) ); ?>
							<?php else : ?>
								<span class="n-blogcard__placeholder"><?php nampelli_the_icon( 'diamond', 36 ); ?></span>
							<?php endif; ?>
						</a>
						<div class="n-blogcard__body">
							<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
							<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
							<a class="n-link-more" href="<?php the_permalink(); ?>">
								<?php esc_html_e( 'Lire l’article', 'nampelli' ); ?>
								<?php nampelli_the_icon( 'arrow', 16 ); ?>
							</a>
						</div>
					</li>
				<?php endwhile; ?>
			</ul>

			<nav class="n-pagination" aria-label="<?php esc_attr_e( 'Pagination', 'nampelli' ); ?>">
				<?php
				the_posts_pagination(
					array(
						'prev_text' => __( '← Précédent', 'nampelli' ),
						'next_text' => __( 'Suivant →', 'nampelli' ),
					)
				);
				?>
			</nav>

		<?php else : ?>
			<div class="n-empty">
				<p><?php esc_html_e( 'Aucun contenu trouvé pour le moment.', 'nampelli' ); ?></p>
				<a class="n-btn n-btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Retour à l’accueil', 'nampelli' ); ?></a>
			</div>
		<?php endif; ?>

	</div>
</main>

<?php
get_footer();
