/* =========================================================
   ESSENTIEL CAR — Internationalisation (FR / EN / ES / AR / IT / PT / DE / NL)
   ========================================================= */

const TRANSLATIONS = {
  fr: {
    /* ── Navigation ── */
    nav_home: 'Accueil',
    nav_products: 'Produits',
    nav_categories: 'Catégories',
    nav_reviews: 'Avis',
    nav_faq: 'FAQ',
    nav_shop: 'Boutique',
    nav_track: 'Suivi commande',

    /* ── Hero ── */
    hero_badge: 'Équipement Auto Premium',
    hero_title_1: 'ÉQUIPEZ.',
    hero_title_2: 'PROTÉGEZ.',
    hero_title_3: 'PERFORMEZ.',
    hero_sub: 'L\'essentiel pour votre voiture — accessoires utiles, pratiques et haute performance, livrés directement chez vous.',
    hero_cta1: 'Découvrir la boutique',
    hero_cta2: 'Voir les bestsellers',
    hero_stat1_label: 'Clients satisfaits',
    hero_stat2_label: 'Note moyenne',
    hero_stat3_label: 'Livraison express',
    hero_scroll: 'Défiler',

    /* ── Trust bar ── */
    trust_1: 'Livraison rapide 48h',
    trust_2: 'Paiement 100% sécurisé',
    trust_3: '10 000+ clients satisfaits',
    trust_4: 'Retours faciles 30 jours',
    trust_5: 'Produits testés & sélectionnés',
    trust_6: 'SAV réactif 24/7',

    /* ── Products section ── */
    products_eyebrow: 'Nos incontournables',
    products_title: 'MEILLEURES VENTES',
    products_sub: 'Sélectionnés pour leur qualité, leur utilité et leur rapport qualité/prix exceptionnel.',
    products_cta: 'Voir tous les produits',
    product_cta: 'Voir le produit',
    product_reviews_label: 'avis',

    /* ── Demo section ── */
    demo_eyebrow: 'En situation réelle',
    demo_title: 'VU EN ACTION',
    demo_sub: 'Des produits pensés pour le quotidien. Voyez par vous-même la différence qu\'ils font.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Résoudre le quotidien',
    problem_title: 'VOTRE VOITURE\nMÉRITE MIEUX',
    problem_sub: 'Chaque conducteur fait face aux mêmes défis. ESSENTIEL CAR a la solution concrète.',
    problem_label: 'Problème',
    solution_label: 'Solution',
    result_label: 'Résultat',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR en chiffres',
    stats_title: 'ILS NOUS FONT\nCONFIANCE',
    stat_1_label: 'Clients satisfaits',
    stat_2_label: 'Produits sélectionnés',
    stat_3_label: 'Note moyenne client',
    stat_4_label: 'Livraison express',

    /* ── Categories ── */
    cat_eyebrow: 'Trouvez ce qu\'il vous faut',
    cat_title: 'PAR CATÉGORIE',
    cat_sub: 'Six univers de produits pour équiper, protéger et améliorer chaque aspect de votre voiture.',
    cat_cta: 'Voir la catégorie',

    /* ── Why section ── */
    why_eyebrow: 'Notre engagement',
    why_title: 'POURQUOI\nESSENTIEL CAR ?',
    why_1_title: 'Qualité sélectionnée',
    why_1_text: 'Chaque produit est rigoureusement testé avant d\'intégrer notre catalogue. Nous ne vendons que ce qui fonctionne vraiment, sur le terrain.',
    why_2_title: 'Prix juste',
    why_2_text: 'Des produits premium sans les marges excessives des grandes marques. Le meilleur rapport qualité/prix pour équiper votre voiture intelligemment.',
    why_3_title: 'Livraison rapide',
    why_3_text: 'Expédition sous 24h, suivi en temps réel. Livraison en 3 à 7 jours ouvrés en France métropolitaine. Satisfait ou remboursé.',
    why_4_title: 'SAV réactif',
    why_4_text: 'Notre équipe répond sous 24h, du lundi au vendredi. Si un produit ne vous convient pas, nous trouvons toujours une solution rapide.',

    /* ── Reviews ── */
    reviews_eyebrow: 'Ils nous font confiance',
    reviews_title: 'CE QU\'ILS EN DISENT',
    reviews_sub: 'Des milliers de conducteurs ont déjà choisi ESSENTIEL CAR. Voici leurs retours.',
    reviews_verified: 'Achat vérifié',

    /* ── FAQ ── */
    faq_eyebrow: 'Questions fréquentes',
    faq_title: 'FAQ',
    faq_sub: 'Tout ce que vous avez besoin de savoir avant de commander.',
    faq_1_q: 'Quels sont les délais de livraison ?',
    faq_1_a: 'Vos commandes sont expédiées sous 24h ouvrées. La livraison prend entre 3 et 7 jours ouvrés en France métropolitaine. Dès l\'expédition, vous recevez un email avec votre lien de suivi en temps réel.',
    faq_2_q: 'Puis-je retourner un produit ?',
    faq_2_a: 'Oui, vous bénéficiez de 30 jours pour retourner tout produit non utilisé dans son emballage d\'origine. Le remboursement est effectué sous 5 à 10 jours ouvrés après réception du retour.',
    faq_3_q: 'Quels moyens de paiement acceptez-vous ?',
    faq_3_a: 'Nous acceptons Visa, Mastercard, American Express, PayPal et Apple Pay. Toutes les transactions sont sécurisées par un cryptage SSL 256 bits. Vos données bancaires ne sont jamais stockées sur nos serveurs.',
    faq_4_q: 'Les produits sont-ils garantis ?',
    faq_4_a: 'Tous nos produits bénéficient d\'une garantie fabricant de 12 mois minimum. En cas de défaut ou de problème, contactez notre service client — nous remplaçons ou remboursons systématiquement, sans question.',
    faq_5_q: 'Comment contacter le service client ?',
    faq_5_a: 'Notre équipe est disponible par email à contact@essentielcar.com, du lundi au vendredi de 9h à 18h. Nous répondons sous 24h maximum. Pour une réponse immédiate, utilisez le chat en direct sur notre site.',
    faq_6_q: 'Les produits sont-ils compatibles avec mon véhicule ?',
    faq_6_a: 'La grande majorité de nos produits sont universels et compatibles avec tous les véhicules, toutes marques et modèles confondus. Les spécificités de compatibilité sont clairement indiquées sur chaque fiche produit.',

    /* ── Final CTA ── */
    cta_eyebrow: 'Prêt à passer à l\'action ?',
    cta_title: 'ÉQUIPEZ VOTRE\nVOITURE MAINTENANT',
    cta_sub: 'Plus de 50 accessoires auto premium disponibles. Livraison rapide. Retours faciles. Satisfaction garantie.',
    cta_btn1: 'Commander maintenant',
    cta_btn2: 'Voir les bestsellers',

    /* ── Footer ── */
    footer_tagline: 'L\'essentiel pour votre voiture.',
    footer_promise: 'Performez au quotidien.',
    footer_nav: 'Navigation',
    footer_contact_title: 'Contact',
    footer_legal_title: 'Légal',
    footer_home: 'Accueil',
    footer_shop: 'Boutique',
    footer_about: 'À propos',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Mentions légales',
    footer_privacy: 'Confidentialité',
    footer_cgv: 'CGV',
    footer_rights: '© 2024 ESSENTIEL CAR. Tous droits réservés.',
    footer_made: 'Fait avec passion pour les passionnés d\'automobile.',

    /* ── Boutique page ── */
    boutique_title: 'NOS PRODUITS',
    boutique_sub: 'Toute notre sélection d\'accessoires auto premium.',
    filter_all: 'Tous',
    filter_nettoyage: 'Nettoyage',
    filter_securite: 'Sécurité',
    filter_confort: 'Confort',
    filter_technologie: 'Technologie',
    filter_entretien: 'Entretien',
    sort_popular: 'Popularité',
    sort_price_asc: 'Prix croissant',
    sort_price_desc: 'Prix décroissant',
    sort_rating: 'Mieux notés',
  },

  en: {
    /* ── Navigation ── */
    nav_home: 'Home',
    nav_products: 'Products',
    nav_categories: 'Categories',
    nav_reviews: 'Reviews',
    nav_faq: 'FAQ',
    nav_shop: 'Shop',
    nav_track: 'Track order',

    /* ── Hero ── */
    hero_badge: 'Premium Auto Equipment',
    hero_title_1: 'EQUIP.',
    hero_title_2: 'PROTECT.',
    hero_title_3: 'PERFORM.',
    hero_sub: 'The essentials for your car — useful, practical, high-performance accessories delivered directly to your door.',
    hero_cta1: 'Discover the shop',
    hero_cta2: 'See bestsellers',
    hero_stat1_label: 'Satisfied customers',
    hero_stat2_label: 'Average rating',
    hero_stat3_label: 'Express delivery',
    hero_scroll: 'Scroll',

    /* ── Trust bar ── */
    trust_1: 'Fast 48h delivery',
    trust_2: '100% secure payment',
    trust_3: '10,000+ happy customers',
    trust_4: 'Easy 30-day returns',
    trust_5: 'Tested & curated products',
    trust_6: 'Reactive 24/7 support',

    /* ── Products section ── */
    products_eyebrow: 'Our must-haves',
    products_title: 'BEST SELLERS',
    products_sub: 'Selected for quality, utility and exceptional value for money.',
    products_cta: 'View all products',
    product_cta: 'View product',
    product_reviews_label: 'reviews',

    /* ── Demo section ── */
    demo_eyebrow: 'In real situations',
    demo_title: 'SEEN IN ACTION',
    demo_sub: 'Products designed for everyday life. See for yourself the difference they make.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Solving everyday problems',
    problem_title: 'YOUR CAR\nDESERVES BETTER',
    problem_sub: 'Every driver faces the same challenges. ESSENTIEL CAR has the concrete solution.',
    problem_label: 'Problem',
    solution_label: 'Solution',
    result_label: 'Result',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR in numbers',
    stats_title: 'THEY TRUST\nUS',
    stat_1_label: 'Satisfied customers',
    stat_2_label: 'Curated products',
    stat_3_label: 'Average customer rating',
    stat_4_label: 'Express delivery',

    /* ── Categories ── */
    cat_eyebrow: 'Find what you need',
    cat_title: 'BY CATEGORY',
    cat_sub: 'Six product universes to equip, protect and improve every aspect of your car.',
    cat_cta: 'View category',

    /* ── Why section ── */
    why_eyebrow: 'Our commitment',
    why_title: 'WHY\nESSENTIEL CAR?',
    why_1_title: 'Curated quality',
    why_1_text: 'Every product is rigorously tested before entering our catalog. We only sell what truly works, in the real world.',
    why_2_title: 'Fair pricing',
    why_2_text: 'Premium products without the excessive margins of big brands. The best value to equip your car intelligently.',
    why_3_title: 'Fast delivery',
    why_3_text: 'Shipped within 24h, real-time tracking. Delivery in 3 to 7 business days. Satisfied or refunded.',
    why_4_title: 'Reactive support',
    why_4_text: 'Our team responds within 24h, Monday to Friday. If a product doesn\'t suit you, we always find a quick solution.',

    /* ── Reviews ── */
    reviews_eyebrow: 'They trust us',
    reviews_title: 'WHAT THEY SAY',
    reviews_sub: 'Thousands of drivers have already chosen ESSENTIEL CAR. Here\'s their feedback.',
    reviews_verified: 'Verified purchase',

    /* ── FAQ ── */
    faq_eyebrow: 'Frequently asked questions',
    faq_title: 'FAQ',
    faq_sub: 'Everything you need to know before ordering.',
    faq_1_q: 'What are the delivery times?',
    faq_1_a: 'Orders are shipped within 24 business hours. Delivery takes 3 to 7 business days in mainland France. Once shipped, you receive an email with your real-time tracking link.',
    faq_2_q: 'Can I return a product?',
    faq_2_a: 'Yes, you have 30 days to return any unused product in its original packaging. Refund is processed within 5 to 10 business days of receipt.',
    faq_3_q: 'What payment methods do you accept?',
    faq_3_a: 'We accept Visa, Mastercard, American Express, PayPal and Apple Pay. All transactions are secured by 256-bit SSL encryption. Your banking data is never stored on our servers.',
    faq_4_q: 'Are products under warranty?',
    faq_4_a: 'All our products come with a minimum 12-month manufacturer warranty. In case of defect or issue, contact our customer service — we systematically replace or refund, no questions asked.',
    faq_5_q: 'How to contact customer service?',
    faq_5_a: 'Our team is available by email at contact@essentielcar.com, Monday to Friday 9am to 6pm. We respond within 24h maximum. For an immediate response, use the live chat on our site.',
    faq_6_q: 'Are products compatible with my vehicle?',
    faq_6_a: 'The vast majority of our products are universal and compatible with all vehicles, regardless of make or model. Compatibility specifics are clearly indicated on each product page.',

    /* ── Final CTA ── */
    cta_eyebrow: 'Ready to take action?',
    cta_title: 'EQUIP YOUR\nCAR NOW',
    cta_sub: 'Over 50 premium auto accessories available. Fast delivery. Easy returns. Guaranteed satisfaction.',
    cta_btn1: 'Order now',
    cta_btn2: 'See bestsellers',

    /* ── Footer ── */
    footer_tagline: 'The essentials for your car.',
    footer_promise: 'Perform every day.',
    footer_nav: 'Navigation',
    footer_contact_title: 'Contact',
    footer_legal_title: 'Legal',
    footer_home: 'Home',
    footer_shop: 'Shop',
    footer_about: 'About',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Legal notice',
    footer_privacy: 'Privacy policy',
    footer_cgv: 'T&C',
    footer_rights: '© 2024 ESSENTIEL CAR. All rights reserved.',
    footer_made: 'Made with passion for car enthusiasts.',

    /* ── Boutique page ── */
    boutique_title: 'OUR PRODUCTS',
    boutique_sub: 'Our complete selection of premium auto accessories.',
    filter_all: 'All',
    filter_nettoyage: 'Cleaning',
    filter_securite: 'Safety',
    filter_confort: 'Comfort',
    filter_technologie: 'Technology',
    filter_entretien: 'Maintenance',
    sort_popular: 'Popularity',
    sort_price_asc: 'Price: low to high',
    sort_price_desc: 'Price: high to low',
    sort_rating: 'Highest rated',
  },

  es: {
    /* ── Navigation ── */
    nav_home: 'Inicio',
    nav_products: 'Productos',
    nav_categories: 'Categorías',
    nav_reviews: 'Opiniones',
    nav_faq: 'FAQ',
    nav_shop: 'Tienda',
    nav_track: 'Seguimiento',

    /* ── Hero ── */
    hero_badge: 'Equipamiento Auto Premium',
    hero_title_1: 'EQUIPA.',
    hero_title_2: 'PROTEGE.',
    hero_title_3: 'RINDE.',
    hero_sub: 'Lo esencial para tu coche — accesorios útiles, prácticos y de alto rendimiento, entregados directamente en tu puerta.',
    hero_cta1: 'Descubrir la tienda',
    hero_cta2: 'Ver más vendidos',
    hero_stat1_label: 'Clientes satisfechos',
    hero_stat2_label: 'Valoración media',
    hero_stat3_label: 'Entrega exprés',
    hero_scroll: 'Desplazar',

    /* ── Trust bar ── */
    trust_1: 'Entrega rápida 48h',
    trust_2: 'Pago 100% seguro',
    trust_3: '+10 000 clientes satisfechos',
    trust_4: 'Devoluciones fáciles 30 días',
    trust_5: 'Productos probados y seleccionados',
    trust_6: 'Atención al cliente 24/7',

    /* ── Products section ── */
    products_eyebrow: 'Nuestros imprescindibles',
    products_title: 'MÁS VENDIDOS',
    products_sub: 'Seleccionados por su calidad, utilidad y excepcional relación calidad/precio.',
    products_cta: 'Ver todos los productos',
    product_cta: 'Ver el producto',
    product_reviews_label: 'opiniones',

    /* ── Demo section ── */
    demo_eyebrow: 'En situación real',
    demo_title: 'VISTO EN ACCIÓN',
    demo_sub: 'Productos pensados para el día a día. Comprueba por ti mismo la diferencia que marcan.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Resolver el día a día',
    problem_title: 'TU COCHE\nSE MERECE MÁS',
    problem_sub: 'Cada conductor se enfrenta a los mismos desafíos. ESSENTIEL CAR tiene la solución concreta.',
    problem_label: 'Problema',
    solution_label: 'Solución',
    result_label: 'Resultado',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR en cifras',
    stats_title: 'CONFÍAN\nEN NOSOTROS',
    stat_1_label: 'Clientes satisfechos',
    stat_2_label: 'Productos seleccionados',
    stat_3_label: 'Valoración media del cliente',
    stat_4_label: 'Entrega exprés',

    /* ── Categories ── */
    cat_eyebrow: 'Encuentra lo que necesitas',
    cat_title: 'POR CATEGORÍA',
    cat_sub: 'Seis universos de productos para equipar, proteger y mejorar cada aspecto de tu coche.',
    cat_cta: 'Ver la categoría',

    /* ── Why section ── */
    why_eyebrow: 'Nuestro compromiso',
    why_title: '¿POR QUÉ\nESSENTIEL CAR?',
    why_1_title: 'Calidad seleccionada',
    why_1_text: 'Cada producto es rigurosamente probado antes de entrar en nuestro catálogo. Solo vendemos lo que realmente funciona, sobre el terreno.',
    why_2_title: 'Precio justo',
    why_2_text: 'Productos premium sin los márgenes excesivos de las grandes marcas. La mejor relación calidad/precio para equipar tu coche de forma inteligente.',
    why_3_title: 'Entrega rápida',
    why_3_text: 'Envío en 24h, seguimiento en tiempo real. Entrega en 3 a 7 días hábiles. Satisfecho o reembolsado.',
    why_4_title: 'Atención al cliente reactiva',
    why_4_text: 'Nuestro equipo responde en 24h, de lunes a viernes. Si un producto no te conviene, siempre encontramos una solución rápida.',

    /* ── Reviews ── */
    reviews_eyebrow: 'Confían en nosotros',
    reviews_title: 'LO QUE DICEN',
    reviews_sub: 'Miles de conductores ya han elegido ESSENTIEL CAR. Aquí están sus opiniones.',
    reviews_verified: 'Compra verificada',

    /* ── FAQ ── */
    faq_eyebrow: 'Preguntas frecuentes',
    faq_title: 'FAQ',
    faq_sub: 'Todo lo que necesitas saber antes de hacer tu pedido.',
    faq_1_q: '¿Cuáles son los plazos de entrega?',
    faq_1_a: 'Los pedidos se envían en 24 horas hábiles. La entrega tarda entre 3 y 7 días hábiles. Una vez enviado, recibirás un correo con tu enlace de seguimiento en tiempo real.',
    faq_2_q: '¿Puedo devolver un producto?',
    faq_2_a: 'Sí, dispones de 30 días para devolver cualquier producto no usado en su embalaje original. El reembolso se realiza en 5 a 10 días hábiles tras la recepción de la devolución.',
    faq_3_q: '¿Qué métodos de pago aceptáis?',
    faq_3_a: 'Aceptamos Visa, Mastercard, American Express, PayPal y Apple Pay. Todas las transacciones están protegidas por cifrado SSL de 256 bits. Tus datos bancarios nunca se almacenan en nuestros servidores.',
    faq_4_q: '¿Los productos tienen garantía?',
    faq_4_a: 'Todos nuestros productos incluyen una garantía del fabricante de mínimo 12 meses. En caso de defecto o problema, contacta con nuestro servicio de atención al cliente — siempre reemplazamos o reembolsamos, sin preguntas.',
    faq_5_q: '¿Cómo contactar con el servicio de atención al cliente?',
    faq_5_a: 'Nuestro equipo está disponible por email en contact@essentielcar.com, de lunes a viernes de 9h a 18h. Respondemos en un máximo de 24h. Para una respuesta inmediata, usa el chat en directo de nuestra web.',
    faq_6_q: '¿Los productos son compatibles con mi vehículo?',
    faq_6_a: 'La gran mayoría de nuestros productos son universales y compatibles con todos los vehículos, independientemente de la marca o modelo. Las especificaciones de compatibilidad se indican claramente en cada ficha de producto.',

    /* ── Final CTA ── */
    cta_eyebrow: '¿Listo para pasar a la acción?',
    cta_title: 'EQUIPA TU\nCOCHE AHORA',
    cta_sub: 'Más de 50 accesorios auto premium disponibles. Entrega rápida. Devoluciones fáciles. Satisfacción garantizada.',
    cta_btn1: 'Pedir ahora',
    cta_btn2: 'Ver más vendidos',

    /* ── Footer ── */
    footer_tagline: 'Lo esencial para tu coche.',
    footer_promise: 'Rinde cada día.',
    footer_nav: 'Navegación',
    footer_contact_title: 'Contacto',
    footer_legal_title: 'Legal',
    footer_home: 'Inicio',
    footer_shop: 'Tienda',
    footer_about: 'Acerca de',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Aviso legal',
    footer_privacy: 'Política de privacidad',
    footer_cgv: 'T&C',
    footer_rights: '© 2024 ESSENTIEL CAR. Todos los derechos reservados.',
    footer_made: 'Hecho con pasión para los amantes del automóvil.',

    /* ── Boutique page ── */
    boutique_title: 'NUESTROS PRODUCTOS',
    boutique_sub: 'Toda nuestra selección de accesorios auto premium.',
    filter_all: 'Todos',
    filter_nettoyage: 'Limpieza',
    filter_securite: 'Seguridad',
    filter_confort: 'Confort',
    filter_technologie: 'Tecnología',
    filter_entretien: 'Mantenimiento',
    sort_popular: 'Popularidad',
    sort_price_asc: 'Precio: menor a mayor',
    sort_price_desc: 'Precio: mayor a menor',
    sort_rating: 'Mejor valorados',
  },

  ar: {
    /* ── Navigation ── */
    nav_home: 'الرئيسية',
    nav_products: 'المنتجات',
    nav_categories: 'الفئات',
    nav_reviews: 'التقييمات',
    nav_faq: 'الأسئلة الشائعة',
    nav_shop: 'المتجر',
    nav_track: 'تتبع الطلب',

    /* ── Hero ── */
    hero_badge: 'معدات السيارات الفاخرة',
    hero_title_1: 'جَهِّز.',
    hero_title_2: 'احمِ.',
    hero_title_3: 'تفوَّق.',
    hero_sub: 'كل ما تحتاجه سيارتك — إكسسوارات عملية وعالية الأداء، تُوصَّل مباشرة إلى بابك.',
    hero_cta1: 'اكتشف المتجر',
    hero_cta2: 'شاهد الأكثر مبيعاً',
    hero_stat1_label: 'عملاء راضون',
    hero_stat2_label: 'متوسط التقييم',
    hero_stat3_label: 'توصيل سريع',
    hero_scroll: 'تمرير',

    /* ── Trust bar ── */
    trust_1: 'توصيل سريع خلال 48 ساعة',
    trust_2: 'دفع آمن 100%',
    trust_3: '+10 000 عميل راضٍ',
    trust_4: 'إرجاع سهل خلال 30 يوماً',
    trust_5: 'منتجات مختبرة ومختارة',
    trust_6: 'دعم فعّال 24/7',

    /* ── Products section ── */
    products_eyebrow: 'منتجاتنا الأساسية',
    products_title: 'الأكثر مبيعاً',
    products_sub: 'مختارة لجودتها وفائدتها وقيمتها الاستثنائية مقارنة بسعرها.',
    products_cta: 'عرض جميع المنتجات',
    product_cta: 'عرض المنتج',
    product_reviews_label: 'تقييم',

    /* ── Demo section ── */
    demo_eyebrow: 'في الواقع العملي',
    demo_title: 'شاهده في العمل',
    demo_sub: 'منتجات مصممة للحياة اليومية. اكتشف بنفسك الفرق الذي تصنعه.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'حلول للحياة اليومية',
    problem_title: 'سيارتك\nتستحق الأفضل',
    problem_sub: 'كل سائق يواجه نفس التحديات. ESSENTIEL CAR لديها الحل المناسب.',
    problem_label: 'المشكلة',
    solution_label: 'الحل',
    result_label: 'النتيجة',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR بالأرقام',
    stats_title: 'يثقون\nبنا',
    stat_1_label: 'عملاء راضون',
    stat_2_label: 'منتجات مختارة',
    stat_3_label: 'متوسط تقييم العملاء',
    stat_4_label: 'توصيل سريع',

    /* ── Categories ── */
    cat_eyebrow: 'اعثر على ما تحتاجه',
    cat_title: 'حسب الفئة',
    cat_sub: 'ستة عوالم من المنتجات لتجهيز وحماية وتحسين كل جانب من جوانب سيارتك.',
    cat_cta: 'عرض الفئة',

    /* ── Why section ── */
    why_eyebrow: 'التزامنا',
    why_title: 'لماذا\nESSENTIEL CAR؟',
    why_1_title: 'جودة مختارة',
    why_1_text: 'يخضع كل منتج لاختبار صارم قبل إدراجه في كتالوجنا. نبيع فقط ما يعمل فعلاً على أرض الواقع.',
    why_2_title: 'سعر عادل',
    why_2_text: 'منتجات فاخرة دون الهوامش المفرطة للعلامات الكبرى. أفضل قيمة مقابل المال لتجهيز سيارتك بذكاء.',
    why_3_title: 'توصيل سريع',
    why_3_text: 'شحن خلال 24 ساعة، تتبع في الوقت الفعلي. التوصيل من 3 إلى 7 أيام عمل. راضٍ أو مسترد المبلغ.',
    why_4_title: 'دعم فعّال',
    why_4_text: 'يرد فريقنا خلال 24 ساعة، من الاثنين إلى الجمعة. إذا لم يناسبك منتج ما، نجد دائماً حلاً سريعاً.',

    /* ── Reviews ── */
    reviews_eyebrow: 'يثقون بنا',
    reviews_title: 'ما يقولونه',
    reviews_sub: 'آلاف السائقين اختاروا ESSENTIEL CAR. إليك آراؤهم.',
    reviews_verified: 'شراء موثّق',

    /* ── FAQ ── */
    faq_eyebrow: 'الأسئلة الشائعة',
    faq_title: 'الأسئلة الشائعة',
    faq_sub: 'كل ما تحتاج معرفته قبل الطلب.',
    faq_1_q: 'ما هي مواعيد التسليم؟',
    faq_1_a: 'تُشحن الطلبات خلال 24 ساعة عمل. يستغرق التوصيل من 3 إلى 7 أيام عمل. بعد الشحن، ستصلك رسالة بريد إلكتروني تتضمن رابط التتبع الفوري.',
    faq_2_q: 'هل يمكنني إرجاع منتج؟',
    faq_2_a: 'نعم، لديك 30 يوماً لإرجاع أي منتج غير مستخدم في عبوته الأصلية. يتم استرداد المبلغ خلال 5 إلى 10 أيام عمل من استلام المرتجع.',
    faq_3_q: 'ما وسائل الدفع التي تقبلونها؟',
    faq_3_a: 'نقبل Visa وMastercard وAmerican Express وPayPal وApple Pay. جميع المعاملات محمية بتشفير SSL 256 بت. لا يتم تخزين بياناتك المصرفية على خوادمنا.',
    faq_4_q: 'هل المنتجات مضمونة؟',
    faq_4_a: 'تأتي جميع منتجاتنا بضمان من الشركة المصنعة لمدة 12 شهراً على الأقل. في حالة وجود عيب أو مشكلة، تواصل مع خدمة العملاء — نستبدل أو نسترد المبلغ دائماً دون أي تساؤلات.',
    faq_5_q: 'كيف أتواصل مع خدمة العملاء؟',
    faq_5_a: 'فريقنا متاح عبر البريد الإلكتروني contact@essentielcar.com، من الاثنين إلى الجمعة من 9 صباحاً حتى 6 مساءً. نرد خلال 24 ساعة كحد أقصى. للحصول على رد فوري، استخدم الدردشة المباشرة على موقعنا.',
    faq_6_q: 'هل المنتجات متوافقة مع سيارتي؟',
    faq_6_a: 'الغالبية العظمى من منتجاتنا عالمية ومتوافقة مع جميع المركبات بغض النظر عن الماركة أو الطراز. تُذكر تفاصيل التوافق بوضوح في كل صفحة منتج.',

    /* ── Final CTA ── */
    cta_eyebrow: 'مستعد للتحرك؟',
    cta_title: 'جَهِّز سيارتك\nالآن',
    cta_sub: 'أكثر من 50 إكسسواراً فاخراً للسيارات متاح. توصيل سريع. إرجاع سهل. رضا مضمون.',
    cta_btn1: 'اطلب الآن',
    cta_btn2: 'شاهد الأكثر مبيعاً',

    /* ── Footer ── */
    footer_tagline: 'كل ما تحتاجه سيارتك.',
    footer_promise: 'تفوّق كل يوم.',
    footer_nav: 'التنقل',
    footer_contact_title: 'التواصل',
    footer_legal_title: 'قانوني',
    footer_home: 'الرئيسية',
    footer_shop: 'المتجر',
    footer_about: 'من نحن',
    footer_faq: 'الأسئلة الشائعة',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'إشعار قانوني',
    footer_privacy: 'سياسة الخصوصية',
    footer_cgv: 'الشروط والأحكام',
    footer_rights: '© 2024 ESSENTIEL CAR. جميع الحقوق محفوظة.',
    footer_made: 'صُنع بشغف لعشاق السيارات.',

    /* ── Boutique page ── */
    boutique_title: 'منتجاتنا',
    boutique_sub: 'مجموعتنا الكاملة من إكسسوارات السيارات الفاخرة.',
    filter_all: 'الكل',
    filter_nettoyage: 'تنظيف',
    filter_securite: 'أمان',
    filter_confort: 'راحة',
    filter_technologie: 'تكنولوجيا',
    filter_entretien: 'صيانة',
    sort_popular: 'الأكثر شعبية',
    sort_price_asc: 'السعر: من الأقل إلى الأعلى',
    sort_price_desc: 'السعر: من الأعلى إلى الأقل',
    sort_rating: 'الأعلى تقييماً',
  },

  it: {
    /* ── Navigation ── */
    nav_home: 'Home',
    nav_products: 'Prodotti',
    nav_categories: 'Categorie',
    nav_reviews: 'Recensioni',
    nav_faq: 'FAQ',
    nav_shop: 'Negozio',
    nav_track: 'Traccia ordine',

    /* ── Hero ── */
    hero_badge: 'Attrezzatura Auto Premium',
    hero_title_1: 'EQUIPAGGIA.',
    hero_title_2: 'PROTEGGI.',
    hero_title_3: 'PERFORMA.',
    hero_sub: 'L\'essenziale per la tua auto — accessori utili, pratici e ad alte prestazioni, consegnati direttamente a casa tua.',
    hero_cta1: 'Scopri il negozio',
    hero_cta2: 'Vedi i bestseller',
    hero_stat1_label: 'Clienti soddisfatti',
    hero_stat2_label: 'Valutazione media',
    hero_stat3_label: 'Consegna express',
    hero_scroll: 'Scorri',

    /* ── Trust bar ── */
    trust_1: 'Consegna rapida 48h',
    trust_2: 'Pagamento 100% sicuro',
    trust_3: '+10 000 clienti soddisfatti',
    trust_4: 'Resi facili entro 30 giorni',
    trust_5: 'Prodotti testati e selezionati',
    trust_6: 'Assistenza reattiva 24/7',

    /* ── Products section ── */
    products_eyebrow: 'I nostri imperdibili',
    products_title: 'PIÙ VENDUTI',
    products_sub: 'Selezionati per qualità, utilità e un eccezionale rapporto qualità/prezzo.',
    products_cta: 'Vedi tutti i prodotti',
    product_cta: 'Vedi il prodotto',
    product_reviews_label: 'recensioni',

    /* ── Demo section ── */
    demo_eyebrow: 'In situazione reale',
    demo_title: 'VISTO IN AZIONE',
    demo_sub: 'Prodotti pensati per la vita quotidiana. Scopri di persona la differenza che fanno.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Risolvere il quotidiano',
    problem_title: 'LA TUA AUTO\nMERITA DI PIÙ',
    problem_sub: 'Ogni guidatore affronta le stesse sfide. ESSENTIEL CAR ha la soluzione concreta.',
    problem_label: 'Problema',
    solution_label: 'Soluzione',
    result_label: 'Risultato',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR in cifre',
    stats_title: 'CI HANNO\nFIDUCIA',
    stat_1_label: 'Clienti soddisfatti',
    stat_2_label: 'Prodotti selezionati',
    stat_3_label: 'Valutazione media clienti',
    stat_4_label: 'Consegna express',

    /* ── Categories ── */
    cat_eyebrow: 'Trova quello che ti serve',
    cat_title: 'PER CATEGORIA',
    cat_sub: 'Sei universi di prodotti per equipaggiare, proteggere e migliorare ogni aspetto della tua auto.',
    cat_cta: 'Vedi la categoria',

    /* ── Why section ── */
    why_eyebrow: 'Il nostro impegno',
    why_title: 'PERCHÉ\nESSENTIEL CAR?',
    why_1_title: 'Qualità selezionata',
    why_1_text: 'Ogni prodotto è rigorosamente testato prima di entrare nel nostro catalogo. Vendiamo solo ciò che funziona davvero, sul campo.',
    why_2_title: 'Prezzo giusto',
    why_2_text: 'Prodotti premium senza i margini eccessivi dei grandi brand. Il miglior rapporto qualità/prezzo per equipaggiare la tua auto in modo intelligente.',
    why_3_title: 'Consegna rapida',
    why_3_text: 'Spedizione entro 24h, tracciamento in tempo reale. Consegna in 3-7 giorni lavorativi. Soddisfatto o rimborsato.',
    why_4_title: 'Assistenza reattiva',
    why_4_text: 'Il nostro team risponde entro 24h, dal lunedì al venerdì. Se un prodotto non ti soddisfa, troviamo sempre una soluzione rapida.',

    /* ── Reviews ── */
    reviews_eyebrow: 'Ci hanno fiducia',
    reviews_title: 'COSA DICONO',
    reviews_sub: 'Migliaia di guidatori hanno già scelto ESSENTIEL CAR. Ecco i loro feedback.',
    reviews_verified: 'Acquisto verificato',

    /* ── FAQ ── */
    faq_eyebrow: 'Domande frequenti',
    faq_title: 'FAQ',
    faq_sub: 'Tutto ciò che devi sapere prima di ordinare.',
    faq_1_q: 'Quali sono i tempi di consegna?',
    faq_1_a: 'Gli ordini vengono spediti entro 24 ore lavorative. La consegna richiede da 3 a 7 giorni lavorativi. Una volta spedito, riceverai un\'email con il link di tracciamento in tempo reale.',
    faq_2_q: 'Posso restituire un prodotto?',
    faq_2_a: 'Sì, hai 30 giorni per restituire qualsiasi prodotto non utilizzato nella sua confezione originale. Il rimborso viene effettuato entro 5-10 giorni lavorativi dalla ricezione del reso.',
    faq_3_q: 'Quali metodi di pagamento accettate?',
    faq_3_a: 'Accettiamo Visa, Mastercard, American Express, PayPal e Apple Pay. Tutte le transazioni sono protette da crittografia SSL a 256 bit. I tuoi dati bancari non vengono mai memorizzati sui nostri server.',
    faq_4_q: 'I prodotti sono in garanzia?',
    faq_4_a: 'Tutti i nostri prodotti sono coperti da una garanzia del produttore di almeno 12 mesi. In caso di difetto o problema, contatta il nostro servizio clienti — sostituiamo o rimborsiamo sistematicamente, senza fare domande.',
    faq_5_q: 'Come contattare il servizio clienti?',
    faq_5_a: 'Il nostro team è disponibile via email a contact@essentielcar.com, dal lunedì al venerdì dalle 9 alle 18. Rispondiamo entro 24h al massimo. Per una risposta immediata, usa la live chat sul nostro sito.',
    faq_6_q: 'I prodotti sono compatibili con il mio veicolo?',
    faq_6_a: 'La grande maggioranza dei nostri prodotti è universale e compatibile con tutti i veicoli, indipendentemente da marca e modello. Le specifiche di compatibilità sono chiaramente indicate su ogni scheda prodotto.',

    /* ── Final CTA ── */
    cta_eyebrow: 'Pronto a passare all\'azione?',
    cta_title: 'EQUIPAGGIA LA TUA\nAUTO ORA',
    cta_sub: 'Oltre 50 accessori auto premium disponibili. Consegna rapida. Resi facili. Soddisfazione garantita.',
    cta_btn1: 'Ordina ora',
    cta_btn2: 'Vedi i bestseller',

    /* ── Footer ── */
    footer_tagline: 'L\'essenziale per la tua auto.',
    footer_promise: 'Performa ogni giorno.',
    footer_nav: 'Navigazione',
    footer_contact_title: 'Contatto',
    footer_legal_title: 'Legale',
    footer_home: 'Home',
    footer_shop: 'Negozio',
    footer_about: 'Chi siamo',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Note legali',
    footer_privacy: 'Privacy policy',
    footer_cgv: 'T&C',
    footer_rights: '© 2024 ESSENTIEL CAR. Tutti i diritti riservati.',
    footer_made: 'Fatto con passione per gli appassionati di auto.',

    /* ── Boutique page ── */
    boutique_title: 'I NOSTRI PRODOTTI',
    boutique_sub: 'La nostra completa selezione di accessori auto premium.',
    filter_all: 'Tutti',
    filter_nettoyage: 'Pulizia',
    filter_securite: 'Sicurezza',
    filter_confort: 'Comfort',
    filter_technologie: 'Tecnologia',
    filter_entretien: 'Manutenzione',
    sort_popular: 'Popolarità',
    sort_price_asc: 'Prezzo: crescente',
    sort_price_desc: 'Prezzo: decrescente',
    sort_rating: 'Meglio valutati',
  },

  pt: {
    /* ── Navigation ── */
    nav_home: 'Início',
    nav_products: 'Produtos',
    nav_categories: 'Categorias',
    nav_reviews: 'Avaliações',
    nav_faq: 'FAQ',
    nav_shop: 'Loja',
    nav_track: 'Rastrear pedido',

    /* ── Hero ── */
    hero_badge: 'Equipamento Auto Premium',
    hero_title_1: 'EQUIPE.',
    hero_title_2: 'PROTEJA.',
    hero_title_3: 'PERFORME.',
    hero_sub: 'O essencial para o seu carro — acessórios úteis, práticos e de alta performance, entregues diretamente na sua porta.',
    hero_cta1: 'Descobrir a loja',
    hero_cta2: 'Ver os mais vendidos',
    hero_stat1_label: 'Clientes satisfeitos',
    hero_stat2_label: 'Avaliação média',
    hero_stat3_label: 'Entrega expresso',
    hero_scroll: 'Rolar',

    /* ── Trust bar ── */
    trust_1: 'Entrega rápida 48h',
    trust_2: 'Pagamento 100% seguro',
    trust_3: '+10 000 clientes satisfeitos',
    trust_4: 'Devoluções fáceis em 30 dias',
    trust_5: 'Produtos testados e selecionados',
    trust_6: 'Suporte reativo 24/7',

    /* ── Products section ── */
    products_eyebrow: 'Os nossos essenciais',
    products_title: 'MAIS VENDIDOS',
    products_sub: 'Selecionados pela qualidade, utilidade e relação qualidade/preço excecional.',
    products_cta: 'Ver todos os produtos',
    product_cta: 'Ver o produto',
    product_reviews_label: 'avaliações',

    /* ── Demo section ── */
    demo_eyebrow: 'Em situação real',
    demo_title: 'VISTO EM AÇÃO',
    demo_sub: 'Produtos pensados para o dia a dia. Veja por si mesmo a diferença que fazem.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Resolver o quotidiano',
    problem_title: 'O SEU CARRO\nMERECE MAIS',
    problem_sub: 'Cada condutor enfrenta os mesmos desafios. ESSENTIEL CAR tem a solução concreta.',
    problem_label: 'Problema',
    solution_label: 'Solução',
    result_label: 'Resultado',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR em números',
    stats_title: 'CONFIAM\nEM NÓS',
    stat_1_label: 'Clientes satisfeitos',
    stat_2_label: 'Produtos selecionados',
    stat_3_label: 'Avaliação média do cliente',
    stat_4_label: 'Entrega expresso',

    /* ── Categories ── */
    cat_eyebrow: 'Encontre o que precisa',
    cat_title: 'POR CATEGORIA',
    cat_sub: 'Seis universos de produtos para equipar, proteger e melhorar cada aspeto do seu carro.',
    cat_cta: 'Ver a categoria',

    /* ── Why section ── */
    why_eyebrow: 'O nosso compromisso',
    why_title: 'PORQUÊ\nESSENTIEL CAR?',
    why_1_title: 'Qualidade selecionada',
    why_1_text: 'Cada produto é rigorosamente testado antes de entrar no nosso catálogo. Só vendemos o que realmente funciona, no terreno.',
    why_2_title: 'Preço justo',
    why_2_text: 'Produtos premium sem as margens excessivas das grandes marcas. A melhor relação qualidade/preço para equipar o seu carro de forma inteligente.',
    why_3_title: 'Entrega rápida',
    why_3_text: 'Envio em 24h, rastreio em tempo real. Entrega em 3 a 7 dias úteis. Satisfeito ou reembolsado.',
    why_4_title: 'Suporte reativo',
    why_4_text: 'A nossa equipa responde em 24h, de segunda a sexta-feira. Se um produto não o satisfizer, encontramos sempre uma solução rápida.',

    /* ── Reviews ── */
    reviews_eyebrow: 'Confiam em nós',
    reviews_title: 'O QUE DIZEM',
    reviews_sub: 'Milhares de condutores já escolheram ESSENTIEL CAR. Aqui estão as suas opiniões.',
    reviews_verified: 'Compra verificada',

    /* ── FAQ ── */
    faq_eyebrow: 'Perguntas frequentes',
    faq_title: 'FAQ',
    faq_sub: 'Tudo o que precisa de saber antes de encomendar.',
    faq_1_q: 'Quais são os prazos de entrega?',
    faq_1_a: 'As encomendas são enviadas em 24 horas úteis. A entrega demora entre 3 a 7 dias úteis. Após o envio, receberá um email com o link de rastreio em tempo real.',
    faq_2_q: 'Posso devolver um produto?',
    faq_2_a: 'Sim, tem 30 dias para devolver qualquer produto não utilizado na sua embalagem original. O reembolso é processado em 5 a 10 dias úteis após receção da devolução.',
    faq_3_q: 'Que métodos de pagamento aceitam?',
    faq_3_a: 'Aceitamos Visa, Mastercard, American Express, PayPal e Apple Pay. Todas as transações são protegidas por encriptação SSL de 256 bits. Os seus dados bancários nunca são armazenados nos nossos servidores.',
    faq_4_q: 'Os produtos têm garantia?',
    faq_4_a: 'Todos os nossos produtos incluem uma garantia do fabricante de no mínimo 12 meses. Em caso de defeito ou problema, contacte o nosso serviço de apoio ao cliente — substituímos ou reembolsamos sistematicamente, sem questionar.',
    faq_5_q: 'Como contactar o serviço de apoio ao cliente?',
    faq_5_a: 'A nossa equipa está disponível por email em contact@essentielcar.com, de segunda a sexta-feira das 9h às 18h. Respondemos em no máximo 24h. Para uma resposta imediata, use o chat ao vivo no nosso site.',
    faq_6_q: 'Os produtos são compatíveis com o meu veículo?',
    faq_6_a: 'A grande maioria dos nossos produtos são universais e compatíveis com todos os veículos, independentemente da marca ou modelo. As especificações de compatibilidade estão claramente indicadas em cada página de produto.',

    /* ── Final CTA ── */
    cta_eyebrow: 'Pronto para agir?',
    cta_title: 'EQUIPE O SEU\nCARRO AGORA',
    cta_sub: 'Mais de 50 acessórios auto premium disponíveis. Entrega rápida. Devoluções fáceis. Satisfação garantida.',
    cta_btn1: 'Encomendar agora',
    cta_btn2: 'Ver os mais vendidos',

    /* ── Footer ── */
    footer_tagline: 'O essencial para o seu carro.',
    footer_promise: 'Performe todos os dias.',
    footer_nav: 'Navegação',
    footer_contact_title: 'Contacto',
    footer_legal_title: 'Legal',
    footer_home: 'Início',
    footer_shop: 'Loja',
    footer_about: 'Sobre nós',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Aviso legal',
    footer_privacy: 'Política de privacidade',
    footer_cgv: 'T&C',
    footer_rights: '© 2024 ESSENTIEL CAR. Todos os direitos reservados.',
    footer_made: 'Feito com paixão para os entusiastas do automóvel.',

    /* ── Boutique page ── */
    boutique_title: 'OS NOSSOS PRODUTOS',
    boutique_sub: 'A nossa seleção completa de acessórios auto premium.',
    filter_all: 'Todos',
    filter_nettoyage: 'Limpeza',
    filter_securite: 'Segurança',
    filter_confort: 'Conforto',
    filter_technologie: 'Tecnologia',
    filter_entretien: 'Manutenção',
    sort_popular: 'Popularidade',
    sort_price_asc: 'Preço: crescente',
    sort_price_desc: 'Preço: decrescente',
    sort_rating: 'Melhor avaliados',
  },

  de: {
    /* ── Navigation ── */
    nav_home: 'Startseite',
    nav_products: 'Produkte',
    nav_categories: 'Kategorien',
    nav_reviews: 'Bewertungen',
    nav_faq: 'FAQ',
    nav_shop: 'Shop',
    nav_track: 'Sendungsverfolgung',

    /* ── Hero ── */
    hero_badge: 'Premium Auto-Ausstattung',
    hero_title_1: 'AUSRÜSTEN.',
    hero_title_2: 'SCHÜTZEN.',
    hero_title_3: 'PERFORMEN.',
    hero_sub: 'Das Wesentliche für Ihr Auto — nützliche, praktische Hochleistungs-Accessoires, direkt zu Ihnen geliefert.',
    hero_cta1: 'Shop entdecken',
    hero_cta2: 'Bestseller ansehen',
    hero_stat1_label: 'Zufriedene Kunden',
    hero_stat2_label: 'Durchschnittsbewertung',
    hero_stat3_label: 'Expresslieferung',
    hero_scroll: 'Scrollen',

    /* ── Trust bar ── */
    trust_1: 'Schnelle Lieferung 48h',
    trust_2: '100% sichere Zahlung',
    trust_3: '+10 000 zufriedene Kunden',
    trust_4: 'Einfache Rückgabe 30 Tage',
    trust_5: 'Getestete & ausgewählte Produkte',
    trust_6: 'Reaktiver Support 24/7',

    /* ── Products section ── */
    products_eyebrow: 'Unsere Must-haves',
    products_title: 'BESTSELLER',
    products_sub: 'Ausgewählt nach Qualität, Nutzen und außergewöhnlichem Preis-Leistungs-Verhältnis.',
    products_cta: 'Alle Produkte ansehen',
    product_cta: 'Produkt ansehen',
    product_reviews_label: 'Bewertungen',

    /* ── Demo section ── */
    demo_eyebrow: 'In der Praxis',
    demo_title: 'IM EINSATZ GESEHEN',
    demo_sub: 'Produkte, die für den Alltag entwickelt wurden. Überzeugen Sie sich selbst vom Unterschied.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Alltag meistern',
    problem_title: 'IHR AUTO\nVERDIENT MEHR',
    problem_sub: 'Jeder Fahrer kennt dieselben Herausforderungen. ESSENTIEL CAR hat die konkrete Lösung.',
    problem_label: 'Problem',
    solution_label: 'Lösung',
    result_label: 'Ergebnis',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR in Zahlen',
    stats_title: 'SIE VERTRAUEN\nUNS',
    stat_1_label: 'Zufriedene Kunden',
    stat_2_label: 'Ausgewählte Produkte',
    stat_3_label: 'Durchschnittliche Kundenbewertung',
    stat_4_label: 'Expresslieferung',

    /* ── Categories ── */
    cat_eyebrow: 'Finden Sie, was Sie brauchen',
    cat_title: 'NACH KATEGORIE',
    cat_sub: 'Sechs Produktwelten, um jeden Aspekt Ihres Autos auszurüsten, zu schützen und zu verbessern.',
    cat_cta: 'Kategorie ansehen',

    /* ── Why section ── */
    why_eyebrow: 'Unser Versprechen',
    why_title: 'WARUM\nESSENTIEL CAR?',
    why_1_title: 'Geprüfte Qualität',
    why_1_text: 'Jedes Produkt wird vor der Aufnahme in unseren Katalog rigoros getestet. Wir verkaufen nur, was wirklich funktioniert — in der Praxis.',
    why_2_title: 'Fairer Preis',
    why_2_text: 'Premium-Produkte ohne die überhöhten Margen großer Marken. Das beste Preis-Leistungs-Verhältnis für eine intelligente Fahrzeugausstattung.',
    why_3_title: 'Schnelle Lieferung',
    why_3_text: 'Versand innerhalb von 24h, Echtzeit-Tracking. Lieferung in 3 bis 7 Werktagen. Zufrieden oder zurückerstattet.',
    why_4_title: 'Reaktiver Support',
    why_4_text: 'Unser Team antwortet innerhalb von 24h, montags bis freitags. Wenn ein Produkt nicht passt, finden wir immer schnell eine Lösung.',

    /* ── Reviews ── */
    reviews_eyebrow: 'Sie vertrauen uns',
    reviews_title: 'WAS SIE SAGEN',
    reviews_sub: 'Tausende von Fahrern haben sich bereits für ESSENTIEL CAR entschieden. Hier sind ihre Meinungen.',
    reviews_verified: 'Verifizierter Kauf',

    /* ── FAQ ── */
    faq_eyebrow: 'Häufig gestellte Fragen',
    faq_title: 'FAQ',
    faq_sub: 'Alles, was Sie vor der Bestellung wissen müssen.',
    faq_1_q: 'Wie lange dauert die Lieferung?',
    faq_1_a: 'Bestellungen werden innerhalb von 24 Wertstunden versandt. Die Lieferung dauert 3 bis 7 Werktage. Nach dem Versand erhalten Sie eine E-Mail mit Ihrem Echtzeit-Tracking-Link.',
    faq_2_q: 'Kann ich ein Produkt zurückgeben?',
    faq_2_a: 'Ja, Sie haben 30 Tage Zeit, ein ungenutztes Produkt in seiner Originalverpackung zurückzugeben. Die Rückerstattung erfolgt innerhalb von 5 bis 10 Werktagen nach Eingang der Rücksendung.',
    faq_3_q: 'Welche Zahlungsmethoden akzeptieren Sie?',
    faq_3_a: 'Wir akzeptieren Visa, Mastercard, American Express, PayPal und Apple Pay. Alle Transaktionen sind durch 256-Bit-SSL-Verschlüsselung gesichert. Ihre Bankdaten werden niemals auf unseren Servern gespeichert.',
    faq_4_q: 'Haben die Produkte Garantie?',
    faq_4_a: 'Alle unsere Produkte verfügen über eine Herstellergarantie von mindestens 12 Monaten. Bei einem Defekt oder Problem wenden Sie sich an unseren Kundendienst — wir ersetzen oder erstatten systematisch, ohne Fragen zu stellen.',
    faq_5_q: 'Wie erreiche ich den Kundendienst?',
    faq_5_a: 'Unser Team ist per E-Mail unter contact@essentielcar.com erreichbar, montags bis freitags von 9 bis 18 Uhr. Wir antworten innerhalb von maximal 24h. Für eine sofortige Antwort nutzen Sie den Live-Chat auf unserer Website.',
    faq_6_q: 'Sind die Produkte mit meinem Fahrzeug kompatibel?',
    faq_6_a: 'Die große Mehrheit unserer Produkte ist universell und mit allen Fahrzeugen kompatibel, unabhängig von Marke oder Modell. Kompatibilitätsdetails sind auf jeder Produktseite klar angegeben.',

    /* ── Final CTA ── */
    cta_eyebrow: 'Bereit zum Handeln?',
    cta_title: 'RÜSTEN SIE IHR\nAUTO JETZT AUS',
    cta_sub: 'Über 50 Premium-Auto-Accessoires verfügbar. Schnelle Lieferung. Einfache Rückgabe. Zufriedenheit garantiert.',
    cta_btn1: 'Jetzt bestellen',
    cta_btn2: 'Bestseller ansehen',

    /* ── Footer ── */
    footer_tagline: 'Das Wesentliche für Ihr Auto.',
    footer_promise: 'Performen Sie jeden Tag.',
    footer_nav: 'Navigation',
    footer_contact_title: 'Kontakt',
    footer_legal_title: 'Rechtliches',
    footer_home: 'Startseite',
    footer_shop: 'Shop',
    footer_about: 'Über uns',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Impressum',
    footer_privacy: 'Datenschutz',
    footer_cgv: 'AGB',
    footer_rights: '© 2024 ESSENTIEL CAR. Alle Rechte vorbehalten.',
    footer_made: 'Mit Leidenschaft für Autobegeisterte gemacht.',

    /* ── Boutique page ── */
    boutique_title: 'UNSERE PRODUKTE',
    boutique_sub: 'Unsere vollständige Auswahl an Premium-Auto-Accessoires.',
    filter_all: 'Alle',
    filter_nettoyage: 'Reinigung',
    filter_securite: 'Sicherheit',
    filter_confort: 'Komfort',
    filter_technologie: 'Technologie',
    filter_entretien: 'Wartung',
    sort_popular: 'Beliebtheit',
    sort_price_asc: 'Preis: aufsteigend',
    sort_price_desc: 'Preis: absteigend',
    sort_rating: 'Bestbewertet',
  },

  nl: {
    /* ── Navigation ── */
    nav_home: 'Home',
    nav_products: 'Producten',
    nav_categories: 'Categorieën',
    nav_reviews: 'Beoordelingen',
    nav_faq: 'FAQ',
    nav_shop: 'Winkel',
    nav_track: 'Bestelling volgen',

    /* ── Hero ── */
    hero_badge: 'Premium Auto-uitrusting',
    hero_title_1: 'UITRUSTEN.',
    hero_title_2: 'BESCHERMEN.',
    hero_title_3: 'PRESTEREN.',
    hero_sub: 'Het essentiële voor uw auto — nuttige, praktische en hoogwaardige accessoires, rechtstreeks bij u thuis bezorgd.',
    hero_cta1: 'Ontdek de winkel',
    hero_cta2: 'Bekijk bestsellers',
    hero_stat1_label: 'Tevreden klanten',
    hero_stat2_label: 'Gemiddelde beoordeling',
    hero_stat3_label: 'Expreslevering',
    hero_scroll: 'Scrollen',

    /* ── Trust bar ── */
    trust_1: 'Snelle levering 48u',
    trust_2: '100% veilige betaling',
    trust_3: '+10 000 tevreden klanten',
    trust_4: 'Eenvoudig retourneren 30 dagen',
    trust_5: 'Geteste & geselecteerde producten',
    trust_6: 'Reactieve klantenservice 24/7',

    /* ── Products section ── */
    products_eyebrow: 'Onze must-haves',
    products_title: 'BESTSELLERS',
    products_sub: 'Geselecteerd op kwaliteit, nut en uitzonderlijke prijs-kwaliteitverhouding.',
    products_cta: 'Bekijk alle producten',
    product_cta: 'Bekijk product',
    product_reviews_label: 'beoordelingen',

    /* ── Demo section ── */
    demo_eyebrow: 'In de praktijk',
    demo_title: 'IN ACTIE GEZIEN',
    demo_sub: 'Producten ontworpen voor het dagelijks leven. Zie zelf het verschil dat ze maken.',

    /* ── Problem/Solution ── */
    problem_eyebrow: 'Dagelijkse problemen oplossen',
    problem_title: 'UW AUTO\nVERDIENT MEER',
    problem_sub: 'Elke bestuurder staat voor dezelfde uitdagingen. ESSENTIEL CAR heeft de concrete oplossing.',
    problem_label: 'Probleem',
    solution_label: 'Oplossing',
    result_label: 'Resultaat',

    /* ── Stats ── */
    stats_eyebrow: 'ESSENTIEL CAR in cijfers',
    stats_title: 'ZIJ VERTROUWEN\nONS',
    stat_1_label: 'Tevreden klanten',
    stat_2_label: 'Geselecteerde producten',
    stat_3_label: 'Gemiddelde klantbeoordeling',
    stat_4_label: 'Expreslevering',

    /* ── Categories ── */
    cat_eyebrow: 'Vind wat u nodig heeft',
    cat_title: 'PER CATEGORIE',
    cat_sub: 'Zes productwerelden om elk aspect van uw auto uit te rusten, te beschermen en te verbeteren.',
    cat_cta: 'Bekijk categorie',

    /* ── Why section ── */
    why_eyebrow: 'Onze belofte',
    why_title: 'WAAROM\nESSENTIEL CAR?',
    why_1_title: 'Geselecteerde kwaliteit',
    why_1_text: 'Elk product wordt rigoureus getest voordat het in onze catalogus wordt opgenomen. We verkopen alleen wat echt werkt, in de praktijk.',
    why_2_title: 'Eerlijke prijs',
    why_2_text: 'Premium producten zonder de buitensporige marges van grote merken. De beste prijs-kwaliteitverhouding om uw auto intelligent uit te rusten.',
    why_3_title: 'Snelle levering',
    why_3_text: 'Verzending binnen 24u, realtime tracking. Levering in 3 tot 7 werkdagen. Tevreden of terugbetaald.',
    why_4_title: 'Reactieve klantenservice',
    why_4_text: 'Ons team reageert binnen 24u, maandag tot vrijdag. Als een product niet bevalt, vinden we altijd snel een oplossing.',

    /* ── Reviews ── */
    reviews_eyebrow: 'Zij vertrouwen ons',
    reviews_title: 'WAT ZIJ ZEGGEN',
    reviews_sub: 'Duizenden bestuurders hebben al voor ESSENTIEL CAR gekozen. Dit zijn hun ervaringen.',
    reviews_verified: 'Geverifieerde aankoop',

    /* ── FAQ ── */
    faq_eyebrow: 'Veelgestelde vragen',
    faq_title: 'FAQ',
    faq_sub: 'Alles wat u moet weten voordat u bestelt.',
    faq_1_q: 'Wat zijn de levertijden?',
    faq_1_a: 'Bestellingen worden verzonden binnen 24 werkuren. De levering duurt 3 tot 7 werkdagen. Na verzending ontvangt u een e-mail met uw realtime traceerlink.',
    faq_2_q: 'Kan ik een product retourneren?',
    faq_2_a: 'Ja, u heeft 30 dagen om elk ongebruikt product in de originele verpakking te retourneren. De terugbetaling wordt verwerkt binnen 5 tot 10 werkdagen na ontvangst van de retourzending.',
    faq_3_q: 'Welke betaalmethoden accepteert u?',
    faq_3_a: 'Wij accepteren Visa, Mastercard, American Express, PayPal en Apple Pay. Alle transacties zijn beveiligd met 256-bit SSL-versleuteling. Uw bankgegevens worden nooit opgeslagen op onze servers.',
    faq_4_q: 'Hebben de producten garantie?',
    faq_4_a: 'Al onze producten worden geleverd met minimaal 12 maanden fabrieksgarantie. Bij een defect of probleem kunt u contact opnemen met onze klantenservice — we vervangen of restitueren altijd, zonder vragen.',
    faq_5_q: 'Hoe neem ik contact op met de klantenservice?',
    faq_5_a: 'Ons team is bereikbaar per e-mail op contact@essentielcar.com, maandag tot vrijdag van 9 tot 18 uur. We reageren binnen maximaal 24u. Voor een directe reactie gebruikt u de live chat op onze website.',
    faq_6_q: 'Zijn de producten compatibel met mijn voertuig?',
    faq_6_a: 'De grote meerderheid van onze producten is universeel en compatibel met alle voertuigen, ongeacht merk of model. Compatibiliteitsspecificaties staan duidelijk vermeld op elke productpagina.',

    /* ── Final CTA ── */
    cta_eyebrow: 'Klaar om actie te ondernemen?',
    cta_title: 'RUS UW AUTO\nNU UIT',
    cta_sub: 'Meer dan 50 premium auto-accessoires beschikbaar. Snelle levering. Eenvoudig retourneren. Tevredenheid gegarandeerd.',
    cta_btn1: 'Nu bestellen',
    cta_btn2: 'Bekijk bestsellers',

    /* ── Footer ── */
    footer_tagline: 'Het essentiële voor uw auto.',
    footer_promise: 'Presteer elke dag.',
    footer_nav: 'Navigatie',
    footer_contact_title: 'Contact',
    footer_legal_title: 'Juridisch',
    footer_home: 'Home',
    footer_shop: 'Winkel',
    footer_about: 'Over ons',
    footer_faq: 'FAQ',
    footer_email: 'contact@essentielcar.com',
    footer_mentions: 'Juridische mededeling',
    footer_privacy: 'Privacybeleid',
    footer_cgv: 'Algemene voorwaarden',
    footer_rights: '© 2024 ESSENTIEL CAR. Alle rechten voorbehouden.',
    footer_made: 'Gemaakt met passie voor autoliefhebbers.',

    /* ── Boutique page ── */
    boutique_title: 'ONZE PRODUCTEN',
    boutique_sub: 'Onze complete selectie premium auto-accessoires.',
    filter_all: 'Alle',
    filter_nettoyage: 'Reiniging',
    filter_securite: 'Veiligheid',
    filter_confort: 'Comfort',
    filter_technologie: 'Technologie',
    filter_entretien: 'Onderhoud',
    sort_popular: 'Populariteit',
    sort_price_asc: 'Prijs: laag naar hoog',
    sort_price_desc: 'Prijs: hoog naar laag',
    sort_rating: 'Hoogst beoordeeld',
  }
};

/* ── i18n Engine ── */
let currentLang = localStorage.getItem('ec_lang') || 'fr';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['fr'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });

  const htmlEl = document.documentElement;
  htmlEl.lang = currentLang;

  /* RTL support for Arabic */
  htmlEl.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const pageTitles = {
      fr: 'ESSENTIEL CAR — L\'équipement auto premium',
      en: 'ESSENTIEL CAR — Premium Auto Equipment',
      es: 'ESSENTIEL CAR — Equipamiento Auto Premium',
      ar: 'ESSENTIEL CAR — معدات السيارات الفاخرة',
      it: 'ESSENTIEL CAR — Attrezzatura Auto Premium',
      pt: 'ESSENTIEL CAR — Equipamento Auto Premium',
      de: 'ESSENTIEL CAR — Premium Auto-Ausstattung',
      nl: 'ESSENTIEL CAR — Premium Auto-uitrusting',
    };
    document.title = pageTitles[currentLang] || pageTitles['fr'];
  }
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('ec_lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  applyTranslations();

  if (typeof renderProducts === 'function') renderProducts();
  if (typeof renderReviews === 'function') renderReviews();
  if (typeof renderCategories === 'function') renderCategories();
  if (typeof renderProblems === 'function') renderProblems();

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  setLang(currentLang);
});
