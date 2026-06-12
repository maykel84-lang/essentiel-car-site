<?php
/**
 * Formulaire de recherche.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

$nampelli_search_id = 'search-' . wp_unique_id();
?>
<form role="search" method="get" class="n-searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="<?php echo esc_attr( $nampelli_search_id ); ?>"><?php esc_html_e( 'Rechercher', 'nampelli' ); ?></label>
	<input type="search" id="<?php echo esc_attr( $nampelli_search_id ); ?>" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Rechercher…', 'nampelli' ); ?>">
	<button type="submit" class="n-btn n-btn--primary"><?php esc_html_e( 'Rechercher', 'nampelli' ); ?></button>
</form>
