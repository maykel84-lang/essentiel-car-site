/**
 * NAMPELLI — interactions front.
 * Vanilla JS, chargé en defer : aucune dépendance, aucun blocage de rendu.
 */
( function () {
	'use strict';

	document.body.classList.remove( 'no-js' );

	/* ----- Header : ombre au scroll ------------------------------------ */
	var header = document.getElementById( 'n-header' );
	if ( header ) {
		var onScroll = function () {
			header.classList.toggle( 'is-scrolled', window.scrollY > 8 );
		};
		window.addEventListener( 'scroll', onScroll, { passive: true } );
		onScroll();
	}

	/* ----- Menu mobile --------------------------------------------------- */
	var burger = document.querySelector( '[data-nav-toggle]' );
	var mobileNav = document.getElementById( 'n-mobile-nav' );
	if ( burger && mobileNav ) {
		burger.addEventListener( 'click', function () {
			var open = burger.getAttribute( 'aria-expanded' ) === 'true';
			burger.setAttribute( 'aria-expanded', String( ! open ) );
			mobileNav.hidden = open;
		} );
	}

	/* ----- Recherche ------------------------------------------------------ */
	var searchToggle = document.querySelector( '[data-search-toggle]' );
	var searchPanel = document.getElementById( 'n-search' );
	if ( searchToggle && searchPanel ) {
		searchToggle.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			var open = ! searchPanel.hidden;
			searchPanel.hidden = open;
			searchToggle.setAttribute( 'aria-expanded', String( ! open ) );
			if ( ! open ) {
				var field = searchPanel.querySelector( 'input[type="search"]' );
				if ( field ) {
					field.focus();
				}
			}
		} );
	}

	/* ----- Apparitions douces (IntersectionObserver) ------------------------ */
	var revealItems = document.querySelectorAll( '.reveal' );
	if ( revealItems.length ) {
		if ( 'IntersectionObserver' in window &&
			! window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
			var observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'is-visible' );
							observer.unobserve( entry.target );
						}
					} );
				},
				{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
			);
			revealItems.forEach( function ( item ) {
				observer.observe( item );
			} );
		} else {
			revealItems.forEach( function ( item ) {
				item.classList.add( 'is-visible' );
			} );
		}
	}

	/* ----- Barre d'achat sticky (fiche produit, mobile) ----------------------- */
	var stickyBar = document.getElementById( 'n-sticky-atc' );
	var realButton = document.querySelector( 'form.cart .single_add_to_cart_button' );
	if ( stickyBar && realButton ) {
		stickyBar.hidden = false;

		var barObserver = new IntersectionObserver(
			function ( entries ) {
				// La barre apparaît quand le vrai bouton sort de l'écran.
				stickyBar.classList.toggle( 'is-visible', ! entries[ 0 ].isIntersecting );
			},
			{ threshold: 0 }
		);
		barObserver.observe( realButton );

		var stickyButton = stickyBar.querySelector( '[data-sticky-add]' );
		if ( stickyButton ) {
			stickyButton.addEventListener( 'click', function () {
				realButton.click();
				realButton.scrollIntoView( { behavior: 'smooth', block: 'center' } );
			} );
		}
	}

	/* ----- Newsletter : scroll vers le message de confirmation ----------------- */
	if ( window.location.search.indexOf( 'newsletter=' ) !== -1 ) {
		var notice = document.querySelector( '.n-news__notice' );
		if ( notice ) {
			notice.scrollIntoView( { behavior: 'smooth', block: 'center' } );
		}
	}
}() );
