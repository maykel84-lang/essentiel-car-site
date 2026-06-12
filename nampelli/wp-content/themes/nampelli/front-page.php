<?php
/**
 * Page d'accueil NAMPELLI — 10 sections premium orientées conversion.
 *
 * Tous les textes et images se modifient dans
 * Apparence → Personnaliser → NAMPELLI — Marque & accueil.
 *
 * @package Nampelli
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<main id="primary" class="n-main n-home">
	<?php
	get_template_part( 'template-parts/home/hero' );        // 1 — Héro.
	get_template_part( 'template-parts/home/reassurance' ); // 2 — Réassurance.
	get_template_part( 'template-parts/home/routine' );     // 3 — Routine en 3 étapes.
	get_template_part( 'template-parts/home/focus' );       // 4 — Focus Sérum Éclat.
	get_template_part( 'template-parts/home/bundle' );      // 5 — Bundle Routine Éclat.
	get_template_part( 'template-parts/home/products' );    // 6 — Les essentiels.
	get_template_part( 'template-parts/home/why' );         // 7 — Pourquoi NAMPELLI.
	get_template_part( 'template-parts/home/reviews' );     // 8 — Avis clientes.
	get_template_part( 'template-parts/home/blog' );        // 9 — Conseils beauté.
	get_template_part( 'template-parts/home/newsletter' );  // 10 — Newsletter.
	?>
</main>

<?php
get_footer();
