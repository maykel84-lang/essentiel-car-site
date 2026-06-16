<?php
/**
 * Newsletter intégrée, conforme RGPD :
 * — consentement explicite obligatoire ;
 * — champ anti-spam invisible (honeypot) ;
 * — abonnées stockées en back-office (Marketing → Abonnées newsletter) ;
 * — hook `nampelli_newsletter_subscribed` pour brancher Brevo, MailPoet, etc.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Type de contenu privé pour stocker les abonnées.
 */
function nampelli_register_subscribers_cpt() {
	register_post_type(
		'nampelli_abonnee',
		array(
			'labels'       => array(
				'name'          => __( 'Abonnées newsletter', 'nampelli' ),
				'singular_name' => __( 'Abonnée', 'nampelli' ),
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => true,
			'menu_icon'    => 'dashicons-email-alt',
			'supports'     => array( 'title' ),
			'capabilities' => array( 'create_posts' => 'do_not_allow' ),
			'map_meta_cap' => true,
		)
	);
}
add_action( 'init', 'nampelli_register_subscribers_cpt' );

/**
 * Formulaire d'inscription (utilisé sur la page d'accueil).
 */
function nampelli_newsletter_form() {
	// Un shortcode externe (MailPoet, Brevo…) peut remplacer le formulaire natif.
	$shortcode = nampelli_mod( 'nampelli_news_shortcode' );
	if ( $shortcode ) {
		echo do_shortcode( $shortcode ); // phpcs:ignore WordPress.Security.EscapeOutput
		return;
	}

	$state = isset( $_GET['newsletter'] ) ? sanitize_key( $_GET['newsletter'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	?>
	<form class="n-news__form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" id="newsletter">
		<input type="hidden" name="action" value="nampelli_newsletter">
		<?php wp_nonce_field( 'nampelli_newsletter', 'nampelli_news_nonce' ); ?>
		<p class="n-news__hp" aria-hidden="true">
			<label>Ne pas remplir <input type="text" name="n_website" tabindex="-1" autocomplete="off"></label>
		</p>
		<div class="n-news__row">
			<label class="screen-reader-text" for="n-news-email"><?php esc_html_e( 'Votre adresse e-mail', 'nampelli' ); ?></label>
			<input type="email" id="n-news-email" name="n_email" required placeholder="<?php esc_attr_e( 'Votre adresse e-mail', 'nampelli' ); ?>">
			<button type="submit" class="n-btn n-btn--dark"><?php esc_html_e( 'Je m’abonne', 'nampelli' ); ?></button>
		</div>
		<label class="n-news__consent">
			<input type="checkbox" name="n_consent" value="1" required>
			<span>
				<?php
				printf(
					/* translators: %s : lien vers la politique de confidentialité. */
					wp_kses_post( __( 'J’accepte de recevoir les communications NAMPELLI et j’ai lu la <a href="%s">politique de confidentialité</a>. Désinscription possible à tout moment.', 'nampelli' ) ),
					esc_url( nampelli_page_url( 'politique-de-confidentialite' ) )
				);
				?>
			</span>
		</label>
		<?php if ( 'ok' === $state ) : ?>
			<p class="n-news__notice is-ok" role="status"><?php esc_html_e( 'Merci ! Votre inscription est bien enregistrée. À très vite ✨', 'nampelli' ); ?></p>
		<?php elseif ( 'deja' === $state ) : ?>
			<p class="n-news__notice is-ok" role="status"><?php esc_html_e( 'Vous faites déjà partie du cercle NAMPELLI 💛', 'nampelli' ); ?></p>
		<?php elseif ( 'erreur' === $state ) : ?>
			<p class="n-news__notice is-err" role="alert"><?php esc_html_e( 'Une erreur est survenue. Merci de vérifier votre adresse et de réessayer.', 'nampelli' ); ?></p>
		<?php endif; ?>
	</form>
	<?php
}

/**
 * Traitement de l'inscription.
 */
function nampelli_handle_newsletter() {
	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$redirect = remove_query_arg( 'newsletter', $redirect );

	$fail = function () use ( $redirect ) {
		wp_safe_redirect( add_query_arg( 'newsletter', 'erreur', $redirect ) . '#newsletter' );
		exit;
	};

	if (
		! isset( $_POST['nampelli_news_nonce'] ) ||
		! wp_verify_nonce( sanitize_key( $_POST['nampelli_news_nonce'] ), 'nampelli_newsletter' )
	) {
		$fail();
	}

	// Honeypot rempli → robot : on ignore silencieusement.
	if ( ! empty( $_POST['n_website'] ) ) {
		wp_safe_redirect( add_query_arg( 'newsletter', 'ok', $redirect ) . '#newsletter' );
		exit;
	}

	$email   = isset( $_POST['n_email'] ) ? sanitize_email( wp_unslash( $_POST['n_email'] ) ) : '';
	$consent = ! empty( $_POST['n_consent'] );

	if ( ! $consent || ! is_email( $email ) ) {
		$fail();
	}

	// Déjà inscrite ?
	$existing = get_posts(
		array(
			'post_type'              => 'nampelli_abonnee',
			'title'                  => $email,
			'posts_per_page'         => 1,
			'fields'                 => 'ids',
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		)
	);
	if ( $existing ) {
		wp_safe_redirect( add_query_arg( 'newsletter', 'deja', $redirect ) . '#newsletter' );
		exit;
	}

	$subscriber_id = wp_insert_post(
		array(
			'post_type'   => 'nampelli_abonnee',
			'post_title'  => $email,
			'post_status' => 'publish',
			'meta_input'  => array(
				'_nampelli_consent_date' => current_time( 'mysql' ),
				'_nampelli_consent_url'  => esc_url_raw( $redirect ),
			),
		)
	);

	if ( is_wp_error( $subscriber_id ) || ! $subscriber_id ) {
		$fail();
	}

	/**
	 * Branchez ici votre outil d'e-mailing (Brevo, MailPoet, Mailchimp…).
	 *
	 * @param string $email Adresse inscrite.
	 */
	do_action( 'nampelli_newsletter_subscribed', $email );

	wp_safe_redirect( add_query_arg( 'newsletter', 'ok', $redirect ) . '#newsletter' );
	exit;
}
add_action( 'admin_post_nopriv_nampelli_newsletter', 'nampelli_handle_newsletter' );
add_action( 'admin_post_nampelli_newsletter', 'nampelli_handle_newsletter' );

/**
 * Colonne « date de consentement » dans la liste des abonnées.
 */
function nampelli_subscriber_columns( $columns ) {
	$columns['title']            = __( 'Adresse e-mail', 'nampelli' );
	$columns['nampelli_consent'] = __( 'Consentement', 'nampelli' );
	unset( $columns['date'] );
	return $columns;
}
add_filter( 'manage_nampelli_abonnee_posts_columns', 'nampelli_subscriber_columns' );

/**
 * Contenu de la colonne consentement.
 */
function nampelli_subscriber_column_content( $column, $post_id ) {
	if ( 'nampelli_consent' === $column ) {
		echo esc_html( get_post_meta( $post_id, '_nampelli_consent_date', true ) );
	}
}
add_action( 'manage_nampelli_abonnee_posts_custom_column', 'nampelli_subscriber_column_content', 10, 2 );
