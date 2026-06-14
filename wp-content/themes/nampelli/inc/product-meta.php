<?php
/**
 * Champs personnalisés des fiches produit NAMPELLI.
 *
 * Sans dépendance (pas d'ACF) : une métabox claire dans l'admin produit.
 * Les valeurs sont importables via le CSV WooCommerce (colonnes "Meta: …").
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Définition des champs produit.
 *
 * @return array clé => [ label, aide, lignes ].
 */
function nampelli_product_fields() {
	return array(
		'_nampelli_benefits'    => array(
			__( 'Bénéfices clés', 'nampelli' ),
			__( 'Un bénéfice par ligne. Affichés sous le prix avec une puce diamant.', 'nampelli' ),
			4,
		),
		'_nampelli_for_who'     => array(
			__( 'Pour qui ?', 'nampelli' ),
			__( 'Types de peau, besoins concernés.', 'nampelli' ),
			3,
		),
		'_nampelli_how_to'      => array(
			__( 'Comment l’utiliser', 'nampelli' ),
			__( 'Gestes d’application, quantité.', 'nampelli' ),
			4,
		),
		'_nampelli_when'        => array(
			__( 'Quand l’utiliser', 'nampelli' ),
			__( 'Matin / soir, fréquence, place dans la routine.', 'nampelli' ),
			3,
		),
		'_nampelli_ingredients' => array(
			__( 'Ingrédients clés', 'nampelli' ),
			__( 'Actifs principaux et leur rôle.', 'nampelli' ),
			4,
		),
		'_nampelli_precautions' => array(
			__( 'Précautions d’emploi', 'nampelli' ),
			__( 'Usage externe, contact avec les yeux, conservation…', 'nampelli' ),
			3,
		),
		'_nampelli_faq'         => array(
			__( 'FAQ produit', 'nampelli' ),
			__( 'Une question par ligne, au format : Question :: Réponse. Affichée en accordéon + données structurées FAQ (SEO).', 'nampelli' ),
			6,
		),
		'_nampelli_video_url'   => array(
			__( 'Vidéo (URL)', 'nampelli' ),
			__( 'Lien YouTube/Vimeo ou fichier .mp4 de la médiathèque. Affichée dans la section « En vidéo ».', 'nampelli' ),
			1,
		),
	);
}

/**
 * Métabox sur l'écran produit.
 */
function nampelli_add_product_metabox() {
	add_meta_box(
		'nampelli_product_details',
		__( 'NAMPELLI — Contenu de la fiche produit', 'nampelli' ),
		'nampelli_render_product_metabox',
		'product',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'nampelli_add_product_metabox' );

/**
 * Rendu de la métabox.
 *
 * @param WP_Post $post Produit.
 */
function nampelli_render_product_metabox( $post ) {
	wp_nonce_field( 'nampelli_product_meta', 'nampelli_product_meta_nonce' );
	echo '<p class="description">' . esc_html__( 'Ces champs alimentent les sections de la fiche produit (accordéons « Pour qui ? », « Comment l’utiliser », FAQ…). Laissez vide pour masquer une section.', 'nampelli' ) . '</p>';
	echo '<div class="nampelli-meta-grid">';
	foreach ( nampelli_product_fields() as $key => $field ) {
		list( $label, $help, $rows ) = $field;
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br><textarea id="%1$s" name="%1$s" rows="%3$d" class="large-text">%4$s</textarea><span class="description">%5$s</span></p>',
			esc_attr( $key ),
			esc_html( $label ),
			(int) $rows,
			esc_textarea( $value ),
			esc_html( $help )
		);
	}
	echo '</div>';
}

/**
 * Enregistrement des champs.
 *
 * @param int $post_id ID produit.
 */
function nampelli_save_product_meta( $post_id ) {
	if (
		! isset( $_POST['nampelli_product_meta_nonce'] ) ||
		! wp_verify_nonce( sanitize_key( $_POST['nampelli_product_meta_nonce'] ), 'nampelli_product_meta' ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}
	foreach ( array_keys( nampelli_product_fields() ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			$value = sanitize_textarea_field( wp_unslash( $_POST[ $key ] ) );
			if ( '' === trim( $value ) ) {
				delete_post_meta( $post_id, $key );
			} else {
				update_post_meta( $post_id, $key, $value );
			}
		}
	}
}
add_action( 'save_post_product', 'nampelli_save_product_meta' );
