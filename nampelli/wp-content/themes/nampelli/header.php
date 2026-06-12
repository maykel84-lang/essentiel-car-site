<?php
/**
 * En-tête du site : bandeau annonce, logo, navigation, compte, panier.
 *
 * @package Nampelli
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Aller au contenu', 'nampelli' ); ?></a>

<?php $annonce = nampelli_mod( 'nampelli_annonce' ); ?>
<?php if ( $annonce ) : ?>
	<div class="n-annonce" role="region" aria-label="<?php esc_attr_e( 'Annonce', 'nampelli' ); ?>">
		<p><?php nampelli_the_icon( 'diamond', 13 ); ?><span><?php echo esc_html( $annonce ); ?></span></p>
	</div>
<?php endif; ?>

<header class="n-header" id="n-header">
	<div class="n-container n-header__row">

		<button class="n-burger" type="button" aria-expanded="false" aria-controls="n-mobile-nav" data-nav-toggle>
			<span class="n-burger__open"><?php nampelli_the_icon( 'menu', 24 ); ?></span>
			<span class="n-burger__close"><?php nampelli_the_icon( 'close', 24 ); ?></span>
			<span class="screen-reader-text"><?php esc_html_e( 'Menu', 'nampelli' ); ?></span>
		</button>

		<div class="n-header__brand">
			<?php nampelli_logo(); ?>
		</div>

		<nav class="n-nav" aria-label="<?php esc_attr_e( 'Navigation principale', 'nampelli' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_class'     => 'n-nav__list',
					'container'      => false,
					'fallback_cb'    => 'nampelli_menu_fallback',
					'depth'          => 2,
				)
			);
			?>
		</nav>

		<div class="n-header__actions">
			<?php if ( function_exists( 'wc_get_page_id' ) ) : ?>
				<a class="n-action" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>" title="<?php esc_attr_e( 'Rechercher un soin', 'nampelli' ); ?>" data-search-toggle aria-expanded="false" role="button">
					<?php nampelli_the_icon( 'search', 21 ); ?>
					<span class="screen-reader-text"><?php esc_html_e( 'Rechercher', 'nampelli' ); ?></span>
				</a>
				<a class="n-action n-action--account" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'myaccount' ) ) ); ?>">
					<?php nampelli_the_icon( 'account', 21 ); ?>
					<span class="screen-reader-text"><?php esc_html_e( 'Mon compte', 'nampelli' ); ?></span>
				</a>
				<a class="n-action n-action--cart" href="<?php echo esc_url( wc_get_cart_url() ); ?>">
					<?php nampelli_the_icon( 'cart', 21 ); ?>
					<span class="n-cart-count"><?php echo WC()->cart ? absint( WC()->cart->get_cart_contents_count() ) : 0; ?></span>
					<span class="screen-reader-text"><?php esc_html_e( 'Panier', 'nampelli' ); ?></span>
				</a>
			<?php endif; ?>
		</div>
	</div>

	<div class="n-search" id="n-search" hidden>
		<div class="n-container">
			<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<label class="screen-reader-text" for="n-search-field"><?php esc_html_e( 'Rechercher un soin', 'nampelli' ); ?></label>
				<input type="search" id="n-search-field" name="s" placeholder="<?php esc_attr_e( 'Rechercher un soin…', 'nampelli' ); ?>">
				<?php if ( function_exists( 'wc_get_page_id' ) ) : ?>
					<input type="hidden" name="post_type" value="product">
				<?php endif; ?>
				<button type="submit" class="n-btn n-btn--primary"><?php esc_html_e( 'Rechercher', 'nampelli' ); ?></button>
			</form>
		</div>
	</div>

	<nav class="n-mobile-nav" id="n-mobile-nav" hidden aria-label="<?php esc_attr_e( 'Navigation mobile', 'nampelli' ); ?>">
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'menu_class'     => 'n-mobile-nav__list',
				'container'      => false,
				'fallback_cb'    => 'nampelli_menu_fallback',
				'depth'          => 2,
			)
		);
		?>
	</nav>
</header>

<?php if ( function_exists( 'wc_print_notices' ) && ! is_admin() ) : ?>
	<div class="n-notices n-container"><?php woocommerce_output_all_notices(); ?></div>
<?php endif; ?>

<?php nampelli_breadcrumb(); ?>
