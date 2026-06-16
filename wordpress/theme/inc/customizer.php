<?php
/**
 * Customizer : tous les textes, images et réglages de la page d'accueil
 * et de la marque, modifiables depuis Apparence → Personnaliser.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

/**
 * Valeurs par défaut (issues du brief de marque NAMPELLI).
 * Centralisées ici pour être réutilisées par les templates.
 */
function nampelli_defaults() {
	return array(
		// Marque & bandeau.
		'nampelli_annonce'          => __( 'Livraison offerte dès 49 € · Expédition sous 24/48 h · Paiement sécurisé', 'nampelli' ),
		'nampelli_baseline'         => __( 'Révélez votre éclat', 'nampelli' ),
		'nampelli_email'            => 'contact@nampelli.com',
		'nampelli_seuil_livraison'  => 49,

		// Héro.
		'nampelli_hero_badge'       => __( 'Nouveau · La Routine Éclat', 'nampelli' ),
		'nampelli_hero_titre'       => __( 'Révélez votre éclat avec une routine simple en 3 étapes', 'nampelli' ),
		'nampelli_hero_texte'       => __( 'Des soins essentiels, élégants et sensoriels pour nettoyer, illuminer et nourrir votre peau au quotidien.', 'nampelli' ),
		'nampelli_hero_cta1'        => __( 'Découvrir la Routine Éclat', 'nampelli' ),
		'nampelli_hero_cta2'        => __( 'Voir les soins', 'nampelli' ),

		// Routine en 3 étapes.
		'nampelli_routine_titre'    => __( 'Votre rituel éclat, en 3 gestes', 'nampelli' ),
		'nampelli_routine_intro'    => __( 'Pas de routine compliquée : trois essentiels pensés pour fonctionner ensemble, matin et soir.', 'nampelli' ),
		'nampelli_etape1_texte'     => __( 'Le Nettoyant Purifiant élimine impuretés et excès de sébum, sans dessécher. La peau est nette, fraîche, prête à recevoir ses soins.', 'nampelli' ),
		'nampelli_etape2_texte'     => __( 'Le Sérum Éclat Vitamine C ravive la luminosité du teint et aide à estomper les signes de fatigue, jour après jour.', 'nampelli' ),
		'nampelli_etape3_texte'     => __( 'La Crème Nutrition Karité nourrit intensément et enveloppe la peau d’un voile de confort durable.', 'nampelli' ),
		'nampelli_routine_cta'      => __( 'Adopter la Routine Éclat', 'nampelli' ),

		// Focus produit.
		'nampelli_focus_slug'       => 'serum-eclat-vitamine-c',
		'nampelli_focus_surtitre'   => __( 'Le soin signature', 'nampelli' ),
		'nampelli_focus_titre'      => __( 'Sérum Éclat Vitamine C', 'nampelli' ),
		'nampelli_focus_texte'      => __( 'Quelques gouttes suffisent : la vitamine C illumine le teint, lisse le grain de peau et redonne au visage son éclat naturel.', 'nampelli' ),
		'nampelli_focus_points'     => __( "Teint visiblement plus lumineux\nGrain de peau affiné\nTexture légère, absorption rapide\nConvient à tous les types de peau", 'nampelli' ),

		// Bundle Routine Éclat.
		'nampelli_bundle_slug'      => 'routine-eclat',
		'nampelli_bundle_surtitre'  => __( 'L’essentiel NAMPELLI', 'nampelli' ),
		'nampelli_bundle_titre'     => __( 'La Routine Éclat complète', 'nampelli' ),
		'nampelli_bundle_texte'     => __( 'Les 3 essentiels NAMPELLI réunis dans un rituel simple et premium : nettoyer, illuminer, nourrir. Tout ce dont votre peau a besoin, rien de superflu.', 'nampelli' ),
		'nampelli_bundle_economie'  => __( 'Économisez 17,80 € par rapport aux soins achetés séparément', 'nampelli' ),

		// Pourquoi NAMPELLI.
		'nampelli_pourquoi_titre'   => __( 'NAMPELLI, l’élégance en essentiel', 'nampelli' ),
		'nampelli_pourquoi_texte'   => __( "Chez NAMPELLI, nous croyons que le soin doit être à la fois simple, élégant et efficace. Pas de routine à rallonge, pas de promesses creuses : des formules pensées avec soin, des textures sensorielles et une identité affirmée.\n\nLa beauté n’est que le point de départ. NAMPELLI imagine des univers féminins premium qui sublimeront bientôt chaque facette de votre quotidien : soins corps, parfums, coffrets, bijoux, maroquinerie…", 'nampelli' ),
		'nampelli_pourquoi_points'  => __( "Routine courte, résultats visibles\nTextures sensorielles et élégantes\nMarque française déposée à l’INPI\nUne maison pensée pour durer", 'nampelli' ),

		// Avis clientes.
		'nampelli_avis_titre'       => __( 'Elles ont adopté la Routine Éclat', 'nampelli' ),
		'nampelli_avis_1'           => '',
		'nampelli_avis_2'           => '',
		'nampelli_avis_3'           => '',

		// Newsletter.
		'nampelli_news_titre'       => __( 'Recevez l’univers NAMPELLI', 'nampelli' ),
		'nampelli_news_texte'       => __( 'Conseils beauté, nouveautés et offres réservées : rejoignez le cercle NAMPELLI. Pas de spam, promis — uniquement de l’éclat.', 'nampelli' ),
		'nampelli_news_shortcode'   => '',

		// Pied de page.
		'nampelli_footer_texte'     => __( 'Maison française de beauté premium accessible. Une routine simple, des soins élégants, une marque pensée pour grandir avec vous.', 'nampelli' ),

		// Réseaux sociaux.
		'nampelli_instagram'        => '',
		'nampelli_facebook'         => '',
		'nampelli_tiktok'           => '',
		'nampelli_pinterest'        => '',

		// Technique.
		'nampelli_disable_schema'   => 0,
	);
}

/**
 * Raccourci : valeur d'un réglage avec sa valeur par défaut.
 *
 * @param string $key Clé du réglage.
 * @return mixed
 */
function nampelli_mod( $key ) {
	$defaults = nampelli_defaults();
	return get_theme_mod( $key, isset( $defaults[ $key ] ) ? $defaults[ $key ] : '' );
}

/**
 * Déclaration des panneaux, sections et réglages.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function nampelli_customize_register( $wp_customize ) {
	$d = nampelli_defaults();

	$wp_customize->add_panel(
		'nampelli_panel',
		array(
			'title'    => __( 'NAMPELLI — Marque & accueil', 'nampelli' ),
			'priority' => 10,
		)
	);

	/*
	 * Définition compacte : section => [ titre, [ réglages ] ]
	 * Chaque réglage : id => [ label, type, description ]
	 * Types : text, textarea, url, number, image, checkbox.
	 */
	$sections = array(
		'nampelli_marque'     => array(
			__( '1 · Marque, bandeau & contact', 'nampelli' ),
			array(
				'nampelli_annonce'         => array( __( 'Bandeau annonce (haut de page)', 'nampelli' ), 'text', __( 'Laisser vide pour masquer le bandeau.', 'nampelli' ) ),
				'nampelli_baseline'        => array( __( 'Signature de marque', 'nampelli' ), 'text', '' ),
				'nampelli_email'           => array( __( 'E-mail de contact affiché', 'nampelli' ), 'text', '' ),
				'nampelli_seuil_livraison' => array( __( 'Seuil livraison offerte (€)', 'nampelli' ), 'number', __( 'Utilisé par la barre de progression du panier. Mettre 0 pour la masquer.', 'nampelli' ) ),
			),
		),
		'nampelli_hero'       => array(
			__( '2 · Accueil — Héro', 'nampelli' ),
			array(
				'nampelli_hero_badge'  => array( __( 'Badge au-dessus du titre', 'nampelli' ), 'text', '' ),
				'nampelli_hero_titre'  => array( __( 'Titre principal (H1)', 'nampelli' ), 'textarea', '' ),
				'nampelli_hero_texte'  => array( __( 'Sous-titre', 'nampelli' ), 'textarea', '' ),
				'nampelli_hero_cta1'   => array( __( 'Bouton principal — texte', 'nampelli' ), 'text', __( 'Pointe vers le produit Routine Éclat.', 'nampelli' ) ),
				'nampelli_hero_cta2'   => array( __( 'Bouton secondaire — texte', 'nampelli' ), 'text', __( 'Pointe vers la boutique.', 'nampelli' ) ),
				'nampelli_hero_image'  => array( __( 'Image du héro', 'nampelli' ), 'image', __( 'Format conseillé : 1600 × 1100 px, WebP/JPEG.', 'nampelli' ) ),
			),
		),
		'nampelli_routine'    => array(
			__( '3 · Accueil — Routine en 3 étapes', 'nampelli' ),
			array(
				'nampelli_routine_titre' => array( __( 'Titre de section', 'nampelli' ), 'text', '' ),
				'nampelli_routine_intro' => array( __( 'Introduction', 'nampelli' ), 'textarea', '' ),
				'nampelli_etape1_texte'  => array( __( 'Étape 1 — Nettoyer', 'nampelli' ), 'textarea', '' ),
				'nampelli_etape2_texte'  => array( __( 'Étape 2 — Illuminer', 'nampelli' ), 'textarea', '' ),
				'nampelli_etape3_texte'  => array( __( 'Étape 3 — Nourrir', 'nampelli' ), 'textarea', '' ),
				'nampelli_routine_cta'   => array( __( 'Texte du bouton', 'nampelli' ), 'text', '' ),
			),
		),
		'nampelli_focus'      => array(
			__( '4 · Accueil — Produit vedette', 'nampelli' ),
			array(
				'nampelli_focus_slug'     => array( __( 'Slug du produit mis en avant', 'nampelli' ), 'text', __( 'Exemple : serum-eclat-vitamine-c', 'nampelli' ) ),
				'nampelli_focus_surtitre' => array( __( 'Surtitre', 'nampelli' ), 'text', '' ),
				'nampelli_focus_titre'    => array( __( 'Titre', 'nampelli' ), 'text', '' ),
				'nampelli_focus_texte'    => array( __( 'Texte', 'nampelli' ), 'textarea', '' ),
				'nampelli_focus_points'   => array( __( 'Points clés (un par ligne)', 'nampelli' ), 'textarea', '' ),
				'nampelli_focus_image'    => array( __( 'Image (sinon : photo du produit)', 'nampelli' ), 'image', '' ),
			),
		),
		'nampelli_bundle'     => array(
			__( '5 · Accueil — Routine Éclat (bundle)', 'nampelli' ),
			array(
				'nampelli_bundle_slug'     => array( __( 'Slug du produit bundle', 'nampelli' ), 'text', '' ),
				'nampelli_bundle_surtitre' => array( __( 'Surtitre', 'nampelli' ), 'text', '' ),
				'nampelli_bundle_titre'    => array( __( 'Titre', 'nampelli' ), 'text', '' ),
				'nampelli_bundle_texte'    => array( __( 'Texte', 'nampelli' ), 'textarea', '' ),
				'nampelli_bundle_economie' => array( __( 'Mention économie', 'nampelli' ), 'text', '' ),
				'nampelli_bundle_image'    => array( __( 'Image (sinon : photo du produit)', 'nampelli' ), 'image', '' ),
			),
		),
		'nampelli_pourquoi'   => array(
			__( '6 · Accueil — Pourquoi NAMPELLI', 'nampelli' ),
			array(
				'nampelli_pourquoi_titre'  => array( __( 'Titre', 'nampelli' ), 'text', '' ),
				'nampelli_pourquoi_texte'  => array( __( 'Texte (storytelling)', 'nampelli' ), 'textarea', '' ),
				'nampelli_pourquoi_points' => array( __( 'Engagements (un par ligne)', 'nampelli' ), 'textarea', '' ),
				'nampelli_pourquoi_image'  => array( __( 'Image lifestyle', 'nampelli' ), 'image', '' ),
			),
		),
		'nampelli_avis'       => array(
			__( '7 · Accueil — Avis clientes', 'nampelli' ),
			array(
				'nampelli_avis_titre' => array( __( 'Titre de section', 'nampelli' ), 'text', '' ),
				'nampelli_avis_1'     => array( __( 'Avis 1', 'nampelli' ), 'textarea', __( 'Format : Texte de l’avis :: Prénom :: Note sur 5. Exemple : Ma peau est transformée :: Claire :: 5. N’utilisez que des avis authentiques issus de vos ventes.', 'nampelli' ) ),
				'nampelli_avis_2'     => array( __( 'Avis 2', 'nampelli' ), 'textarea', '' ),
				'nampelli_avis_3'     => array( __( 'Avis 3', 'nampelli' ), 'textarea', '' ),
			),
		),
		'nampelli_newsletter' => array(
			__( '8 · Accueil — Newsletter', 'nampelli' ),
			array(
				'nampelli_news_titre'     => array( __( 'Titre', 'nampelli' ), 'text', '' ),
				'nampelli_news_texte'     => array( __( 'Texte', 'nampelli' ), 'textarea', '' ),
				'nampelli_news_shortcode' => array( __( 'Shortcode externe (optionnel)', 'nampelli' ), 'text', __( 'Ex. shortcode MailPoet ou Brevo. Laisser vide pour utiliser le formulaire intégré du thème.', 'nampelli' ) ),
			),
		),
		'nampelli_social'     => array(
			__( '9 · Réseaux sociaux & pied de page', 'nampelli' ),
			array(
				'nampelli_footer_texte' => array( __( 'Texte de présentation (footer)', 'nampelli' ), 'textarea', '' ),
				'nampelli_instagram'    => array( __( 'Instagram — URL', 'nampelli' ), 'url', '' ),
				'nampelli_facebook'     => array( __( 'Facebook — URL', 'nampelli' ), 'url', '' ),
				'nampelli_tiktok'       => array( __( 'TikTok — URL', 'nampelli' ), 'url', '' ),
				'nampelli_pinterest'    => array( __( 'Pinterest — URL', 'nampelli' ), 'url', '' ),
			),
		),
		'nampelli_technique'  => array(
			__( '10 · Technique', 'nampelli' ),
			array(
				'nampelli_disable_schema' => array( __( 'Désactiver les données structurées du thème', 'nampelli' ), 'checkbox', __( 'À cocher uniquement si votre extension SEO (Rank Math, Yoast…) génère déjà Organization, FAQ et fil d’Ariane.', 'nampelli' ) ),
			),
		),
	);

	foreach ( $sections as $section_id => $section ) {
		list( $section_title, $controls ) = $section;

		$wp_customize->add_section(
			$section_id,
			array(
				'title' => $section_title,
				'panel' => 'nampelli_panel',
			)
		);

		foreach ( $controls as $id => $control ) {
			list( $label, $type, $description ) = $control;

			$sanitize = 'sanitize_text_field';
			if ( 'textarea' === $type ) {
				$sanitize = 'sanitize_textarea_field';
			} elseif ( 'url' === $type || 'image' === $type ) {
				$sanitize = 'esc_url_raw';
			} elseif ( 'number' === $type ) {
				$sanitize = 'absint';
			} elseif ( 'checkbox' === $type ) {
				$sanitize = 'absint';
			}

			$wp_customize->add_setting(
				$id,
				array(
					'default'           => isset( $d[ $id ] ) ? $d[ $id ] : '',
					'sanitize_callback' => $sanitize,
				)
			);

			if ( 'image' === $type ) {
				$wp_customize->add_control(
					new WP_Customize_Image_Control(
						$wp_customize,
						$id,
						array(
							'label'       => $label,
							'description' => $description,
							'section'     => $section_id,
						)
					)
				);
			} else {
				$wp_customize->add_control(
					$id,
					array(
						'label'       => $label,
						'description' => $description,
						'section'     => $section_id,
						'type'        => $type,
					)
				);
			}
		}
	}
}
add_action( 'customize_register', 'nampelli_customize_register' );
