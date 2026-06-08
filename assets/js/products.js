/* =========================================================
   ESSENTIEL CAR — Products Data
   ========================================================= */

const PRODUCTS = [
  {
    id: 'aspirateur-sans-fil',
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    price: 49.90,
    oldPrice: 79.90,
    discount: 37,
    rating: 4.9,
    reviews: 847,
    category: 'nettoyage',
    accentColor: '#1a2a4a',
    images: [
      'assets/images/products/aspirateur-sans-fil-1.jpg.png',
      'assets/images/products/aspirateur-sans-fil-2.jpg.png',
      'assets/images/products/aspirateur-soufflant-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 38 L16 18 Q18 14 22 14 L36 14 Q40 14 40 18 L40 22 Q40 26 36 26 L26 26 L22 38 Z"/>
      <circle cx="15" cy="38" r="4" fill="var(--red)" stroke="var(--red)"/>
      <line x1="4" y1="28" x2="12" y2="26"/><line x1="3" y1="22" x2="11" y2="22"/><line x1="4" y1="16" x2="12" y2="18"/>
    </svg>`,
    fr: {
      name: 'Aspirateur Sans Fil Voiture',
      tagline: 'La puissance pro, partout avec vous',
      desc: 'Moteur 120W haute performance, batterie lithium 30 min, filtration HEPA, 4 accessoires inclus. Votre habitacle retrouve la propreté du neuf en quelques secondes.',
      features: ['Moteur 120W', 'Batterie 30 min', 'Filtre HEPA', '4 accessoires']
    },
    en: {
      name: 'Cordless Car Vacuum',
      tagline: 'Pro power, anywhere with you',
      desc: '120W high-performance motor, 30-min lithium battery, HEPA filtration, 4 accessories. Your car interior back to showroom clean in seconds.',
      features: ['120W motor', '30-min battery', 'HEPA filter', '4 accessories']
    }
  },
  {
    id: 'brosse-jantes',
    badge: '-35%',
    badgeType: 'promo',
    price: 12.90,
    oldPrice: 19.90,
    discount: 35,
    rating: 4.7,
    reviews: 523,
    category: 'nettoyage',
    accentColor: '#2a1a0a',
    images: [
      'assets/images/products/brosse-jantes-1.jpg.png',
      'assets/images/products/brosse-jantes-2.jpg.png',
      'assets/images/products/brosse-jantes-3.jpg.png',
      'assets/images/products/brosse-jantes-4.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'gris',  display: 'Gris',  hex: '#8c8c8c', imageIndex: 0 },
        { value: 'noir',  display: 'Noir',  hex: '#1a1a1a', imageIndex: 1 },
        { value: 'jaune', display: 'Jaune', hex: '#f5c518', imageIndex: 2 },
      ]},
      { label: 'Quantité', type: 'qty', options: [
        { value: '1',   display: 'À l\'unité',  price: 12.90, oldPrice: 19.90, default: true },
        { value: 'lot', display: 'Lot de 3',    price: 24.90, oldPrice: 38.70, badge: 'Meilleure valeur' },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="14"/>
      <circle cx="24" cy="24" r="4" fill="var(--red)" stroke="var(--red)"/>
      <line x1="24" y1="10" x2="24" y2="20"/><line x1="24" y1="28" x2="24" y2="38"/>
      <line x1="10" y1="24" x2="20" y2="24"/><line x1="28" y1="24" x2="38" y2="24"/>
      <line x1="14" y1="14" x2="20" y2="20"/><line x1="28" y1="28" x2="34" y2="34"/>
      <line x1="34" y1="14" x2="28" y2="20"/><line x1="20" y1="28" x2="14" y2="34"/>
    </svg>`,
    fr: {
      name: 'Brosse à Jantes Pro',
      tagline: 'Des jantes éclatantes sans effort',
      desc: 'Poils ultra-souples 360°, pénètre dans tous les recoins. Manche ergonomique antidérapant, compatible toutes tailles de jantes. Résultat professionnel chez vous.',
      features: ['Poils ultra-souples', 'Manche ergo', 'Toutes tailles', 'Résultat pro']
    },
    en: {
      name: 'Pro Wheel Brush',
      tagline: 'Sparkling rims without effort',
      desc: 'Ultra-soft 360° bristles reach every corner. Non-slip ergonomic handle, fits all wheel sizes. Professional results at home.',
      features: ['Ultra-soft bristles', 'Ergo handle', 'All sizes', 'Pro results']
    }
  },
  {
    id: 'compresseur-air',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 54.90,
    oldPrice: 89.90,
    discount: 39,
    rating: 4.8,
    reviews: 1203,
    category: 'securite',
    accentColor: '#0a1a0a',
    images: [
      'assets/images/products/compresseur-air-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="14" width="18" height="26" rx="4"/>
      <circle cx="30" cy="20" r="8"/>
      <path d="M26 14 L28 12 L34 12"/><line x1="34" y1="12" x2="38" y2="16"/>
      <path d="M17 14 L17 8 L22 8" stroke="var(--red)"/>
      <circle cx="17" cy="24" r="3" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Compresseur d\'Air Sans Fil',
      tagline: 'Gonflage intelligent, partout',
      desc: 'Capteur pression intégré, arrêt automatique précis, charge USB-C rapide. 150 PSI de puissance dans 800g. Ne repartez plus jamais avec un pneu à plat.',
      features: ['Capteur pression', 'Arrêt auto', 'USB-C', '150 PSI']
    },
    en: {
      name: 'Cordless Air Compressor',
      tagline: 'Smart inflation, anywhere',
      desc: 'Built-in pressure sensor, precise auto-stop, fast USB-C charging. 150 PSI of power in 800g. Never drive on a flat tire again.',
      features: ['Pressure sensor', 'Auto-stop', 'USB-C', '150 PSI']
    }
  },
  {
    id: 'dashcam-4k',
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    price: 89.90,
    oldPrice: 119.90,
    discount: 25,
    rating: 4.8,
    reviews: 634,
    category: 'technologie',
    accentColor: '#1a0a0a',
    images: [
      'assets/images/products/dashcam-4k-1.jpg.png',
      'assets/images/products/dashcam-4k-5.jpg.png',
      'assets/images/products/dashcam-4k-6.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="14" width="32" height="22" rx="3"/>
      <circle cx="20" cy="25" r="7"/>
      <circle cx="20" cy="25" r="3" fill="var(--red)" stroke="var(--red)"/>
      <path d="M36 19 L44 16 L44 34 L36 31"/>
      <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
    </svg>`,
    fr: {
      name: 'Dashcam 4K Ultra HD',
      tagline: 'Chaque trajet, documenté',
      desc: 'Capteur Sony 4K, grand angle 170°, vision nocturne améliorée, détection de mouvement, mode parking avec surveillance continue. Votre témoin infaillible sur la route.',
      features: ['Capteur Sony 4K', 'Grand angle 170°', 'Vision nocturne', 'Mode parking']
    },
    en: {
      name: '4K Ultra HD Dashcam',
      tagline: 'Every journey, documented',
      desc: 'Sony 4K sensor, 170° wide angle, enhanced night vision, motion detection, continuous parking mode. Your infallible road witness.',
      features: ['Sony 4K sensor', '170° wide angle', 'Night vision', 'Parking mode']
    }
  },
  {
    id: 'support-telephone',
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    price: 27.90,
    oldPrice: 34.90,
    discount: 20,
    rating: 4.6,
    reviews: 1891,
    category: 'confort',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/support-telephone-1.jpg.png',
      'assets/images/products/support-telephone-2.jpg.png',
      'assets/images/products/support-telephone-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="15" y="8" width="18" height="28" rx="3"/>
      <line x1="21" y1="11" x2="27" y2="11"/>
      <circle cx="24" cy="33" r="1.5" fill="currentColor"/>
      <path d="M24 36 L24 44 L18 44 L18 40 L30 40 L30 44 L24 44" stroke="var(--red)"/>
      <circle cx="24" cy="42" r="2" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Kit Mains Libres 360°',
      tagline: 'Votre GPS toujours en vue',
      desc: 'Aimant néodyme ultra-puissant, rotation 360°, fixation tableau de bord ou grille d\'aération. Compatible tous smartphones jusqu\'à 7". Stable sur toutes routes.',
      features: ['Aimant néodyme', 'Rotation 360°', 'Double fixation', 'Universel 7"']
    },
    en: {
      name: 'Hands-Free Kit 360°',
      tagline: 'Your GPS always in sight',
      desc: 'Ultra-powerful neodymium magnet, 360° rotation, dashboard or vent mount. Compatible with all smartphones up to 7". Stable on any road.',
      features: ['Neodymium magnet', '360° rotation', 'Dual mount', 'Universal 7"']
    }
  },
  {
    id: 'machine-polir',
    badge: 'PRO',
    badgeType: 'pro',
    price: 79.90,
    oldPrice: 149.90,
    discount: 47,
    rating: 4.9,
    reviews: 412,
    category: 'entretien',
    accentColor: '#1a1a0a',
    images: [
      'assets/images/products/machine-polir-1.jpg.png',
      'assets/images/products/machine-polir-2.jpg.png',
      'assets/images/products/machine-polir-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="22" cy="28" r="14"/>
      <circle cx="22" cy="28" r="8" stroke="var(--red)"/>
      <circle cx="22" cy="28" r="2" fill="var(--red)" stroke="var(--red)"/>
      <path d="M22 14 L22 8 L30 8 L34 12" stroke="currentColor"/>
      <path d="M30 8 L38 6 L40 14 L34 12"/>
    </svg>`,
    fr: {
      name: 'Machine à Polir Sans Fil',
      tagline: 'Finition showroom à domicile',
      desc: 'Plateau orbital 600-3200 RPM, kit complet 6 disques + produits inclus. Efface rayures, oxydation, taches tenaces. Transformez votre carrosserie en 2 heures.',
      features: ['600-3200 RPM', '6 disques inclus', 'Kit complet', 'Anti-vibrations']
    },
    en: {
      name: 'Cordless Polishing Machine',
      tagline: 'Showroom finish at home',
      desc: '600-3200 RPM orbital pad, complete kit with 6 pads + products. Removes scratches, oxidation, stains. Transform your paintwork in 2 hours.',
      features: ['600-3200 RPM', '6 pads included', 'Complete kit', 'Anti-vibration']
    }
  },
  {
    id: 'lance-mousse',
    badge: 'POPULAIRE',
    badgeType: 'popular',
    price: 44.90,
    oldPrice: 54.90,
    discount: 18,
    rating: 4.7,
    reviews: 789,
    category: 'nettoyage',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/lance-mousse-1.jpg.png',
      'assets/images/products/lance-mousse-2.jpg.png',
      'assets/images/products/lance-mousse-3.jpg.png',
      'assets/images/products/lance-mousse-4.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'noir',  display: 'Noir',             hex: '#1a1a1a', imageIndex: 1 },
        { value: 'blanc', display: 'Blanc transparent', hex: '#e8e8e8', transparent: true, imageIndex: 0 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="12" height="22" rx="3"/>
      <path d="M26 22 L34 18 L36 26 L28 24"/>
      <path d="M36 18 L38 12 L42 14 L40 18"/>
      <circle cx="40" cy="11" r="3" fill="var(--red)" stroke="var(--red)"/>
      <path d="M14 22 L8 20 M14 26 L6 26 M14 30 L8 32" stroke="var(--red)" stroke-dasharray="2 2"/>
    </svg>`,
    fr: {
      name: 'Pulvérisateur de Mousse',
      tagline: 'Lavage sans contact premium',
      desc: 'Mousse épaisse et clingante, protection peinture maximale, réservoir 1L intégré, compatible tous nettoyeurs HP. Bain de mousse professionnel à domicile.',
      features: ['Mousse épaisse', 'Réservoir 1L', 'Compatible HP', 'Sans contact']
    },
    en: {
      name: 'Foam Sprayer',
      tagline: 'Premium contactless wash',
      desc: 'Thick clinging foam, maximum paint protection, 1L integrated tank, compatible with all pressure washers. Professional foam bath at home.',
      features: ['Thick foam', '1L tank', 'HP compatible', 'Contactless']
    }
  },
  {
    id: 'tpms',
    badge: 'SÉCURITÉ',
    badgeType: 'security',
    price: 49.90,
    oldPrice: 69.90,
    discount: 29,
    rating: 4.8,
    reviews: 567,
    category: 'securite',
    accentColor: '#1a0505',
    images: [
      'assets/images/products/tpms-1.jpg.png',
      'assets/images/products/tpms-2.jpg.png',
      'assets/images/products/tpms-4.jpg.png',
      'assets/images/products/tpms-5.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="14"/>
      <circle cx="24" cy="28" r="6" fill="var(--red)" stroke="var(--red)"/>
      <path d="M24 8 Q30 14 30 28" stroke="var(--red)" stroke-dasharray="3 2"/>
      <path d="M24 8 Q18 14 18 28" stroke="var(--red)" stroke-dasharray="3 2"/>
      <path d="M20 6 Q24 2 28 6"/>
      <path d="M16 4 Q24 -2 32 4"/>
    </svg>`,
    fr: {
      name: 'TPMS Surveillance Pneus',
      tagline: 'Votre sécurité commence par vos pneus',
      desc: 'Capteurs sans fil sur 4 valves, affichage temps réel sur écran LCD, alertes sonores et visuelles. Économisez jusqu\'à 15% de carburant. Roulez serein.',
      features: ['4 capteurs sans fil', 'Écran LCD', 'Alertes temps réel', '-15% carburant']
    },
    en: {
      name: 'TPMS Tire Monitor',
      tagline: 'Safety starts with your tires',
      desc: 'Wireless sensors on 4 valves, real-time LCD display, audible and visual alerts. Save up to 15% on fuel. Drive with confidence.',
      features: ['4 wireless sensors', 'LCD display', 'Real-time alerts', '-15% fuel']
    }
  },
  {
    id: 'table-volant',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 24.90,
    oldPrice: 49.90,
    discount: 50,
    rating: 4.5,
    reviews: 334,
    category: 'confort',
    accentColor: '#0a1a10',
    images: [
      'assets/images/products/table-volant-1.jpg.png',
      'assets/images/products/table-volant-2.jpg.png',
      'assets/images/products/table-volant-3.jpg.png',
      'assets/images/products/table-volant-4.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'blanc', display: 'Blanc', hex: '#f0ede8', imageIndex: 0 },
        { value: 'noir',  display: 'Noir',  hex: '#1a1a1a', imageIndex: 1 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="32" height="16" rx="3"/>
      <path d="M24 20 L24 36"/>
      <path d="M16 36 L16 42 L20 42 M32 36 L32 42 L28 42"/>
      <circle cx="24" cy="12" r="6"/>
      <path d="M21 12 L24 8 L27 12"/>
      <circle cx="24" cy="12" r="2" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Table à Manger Volant',
      tagline: 'Votre bureau mobile parfait',
      desc: 'Surface antidérapante pliable, rangements latéraux, port USB intégré. Parfait pour les pauses repas, le télétravail et l\'organisation en déplacement. Compatible tous véhicules.',
      features: ['Antidérapante', 'Port USB', 'Pliable', 'Universel']
    },
    en: {
      name: 'Steering Wheel Table',
      tagline: 'Your perfect mobile office',
      desc: 'Non-slip foldable surface, side organizers, built-in USB port. Perfect for meal breaks, remote work and on-the-go organization. Fits all vehicles.',
      features: ['Non-slip', 'USB port', 'Foldable', 'Universal']
    }
  },
  {
    id: 'essuie-glace-retros',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 19.90,
    oldPrice: 39.90,
    discount: 50,
    rating: 4.7,
    reviews: 218,
    category: 'entretien',
    accentColor: '#0f0a1a',
    images: [
      'assets/images/products/essuie-glace-retros-1.jpg.png',
      'assets/images/products/essuie-glace-retros-2.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'noir', display: 'Noir', hex: '#1a1a1a', imageIndex: 0 },
        { value: 'rose', display: 'Rose', hex: '#e8799a', imageIndex: 1 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 36 Q24 8 42 36"/>
      <path d="M10 33 Q24 12 38 33"/>
      <line x1="24" y1="36" x2="24" y2="42"/>
      <line x1="18" y1="42" x2="30" y2="42"/>
      <path d="M16 30 Q24 16 32 30" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Essuie-Glace Rétroviseur Portable',
      tagline: 'Visibilité parfaite par tous les temps',
      desc: 'Lames en graphite haute résistance, installation universelle sans adaptateur, silence de fonctionnement garanti. Balayage parfait jusqu\'à 98cm. Résiste au gel, pluie et grêle.',
      features: ['Graphite HD', 'Silencieux', 'Anti-gel', 'Jusqu\'à 98cm']
    },
    en: {
      name: 'Portable Mirror Wiper Blades',
      tagline: 'Perfect visibility in any weather',
      desc: 'High-resistance graphite blades, universal no-adapter installation, whisper-quiet operation. Perfect wipe up to 98cm. Resistant to ice, rain and hail.',
      features: ['HD graphite', 'Silent', 'Anti-ice', 'Up to 98cm']
    }
  },
  {
    id: 'pack-entretien',
    badge: 'PACK',
    badgeType: 'bundle',
    price: 64.90,
    oldPrice: 79.80,
    discount: 19,
    rating: 4.9,
    reviews: 312,
    category: 'pack',
    isBundle: true,
    bundleIncludes: ['compresseur-air', 'table-volant'],
    accentColor: '#0a1a0a',
    variants: [
      { label: 'Table de volant', productId: 'table-volant', options: [
        { value: 'blanc', display: 'Blanc', hex: '#f0ede8', imageIndex: 2 },
        { value: 'noir',  display: 'Noir',  hex: '#1a1a1a', imageIndex: 3 },
      ]}
    ],
    images: [
      'assets/images/products/pack-entretien-cover.png',
      'assets/images/products/compresseur-air-1.jpg.png',
      'assets/images/products/table-volant-1.jpg.png',
      'assets/images/products/table-volant-2.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="14" width="18" height="26" rx="4"/>
      <circle cx="30" cy="20" r="8"/>
      <path d="M26 14 L28 12 L34 12"/><line x1="34" y1="12" x2="38" y2="16"/>
      <path d="M17 14 L17 8 L22 8" stroke="var(--red)"/>
      <circle cx="17" cy="24" r="3" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Pack Entretien Indispensable',
      tagline: 'Duo Indispensable',
      desc: 'Compresseur d\'air sans fil + Table à manger volant. Tout ce qu\'il vous faut pour l\'entretien quotidien. Économisez 14,90€ par rapport à l\'achat séparé.',
      features: ['Compresseur 150 PSI', 'Table volant', 'Livraison offerte', 'Économisez 14,90€']
    },
    en: {
      name: 'Essential Maintenance Pack',
      tagline: 'Indispensable Duo',
      desc: 'Cordless air compressor + Steering wheel table. Everything you need for daily maintenance. Save 14.90€ vs. buying separately.',
      features: ['150 PSI compressor', 'Steering table', 'Free delivery', 'Save 14.90€']
    }
  },
  {
    id: 'pack-nettoyage',
    badge: 'PACK',
    badgeType: 'bundle',
    price: 159.90,
    oldPrice: 199.60,
    discount: 20,
    rating: 4.9,
    reviews: 187,
    category: 'pack',
    isBundle: true,
    bundleIncludes: ['aspirateur-sans-fil', 'lance-mousse', 'brosse-jantes', 'machine-polir'],
    accentColor: '#001828',
    variants: [
      { label: 'Lance mousse', productId: 'lance-mousse', options: [
        { value: 'noir',  display: 'Noir',             hex: '#1a1a1a',  imageIndex: 2 },
        { value: 'blanc', display: 'Blanc transparent', hex: '#e8e8e8', transparent: true, imageIndex: 3 },
      ]},
      { label: 'Brosse jantes', productId: 'brosse-jantes', options: [
        { value: 'gris',  display: 'Gris',  hex: '#8c8c8c', imageIndex: 4 },
        { value: 'noir',  display: 'Noir',  hex: '#1a1a1a', imageIndex: 5 },
        { value: 'jaune', display: 'Jaune', hex: '#f5c518', imageIndex: 6 },
      ]}
    ],
    images: [
      'assets/images/products/pack-nettoyage-cover.png',
      'assets/images/products/aspirateur-sans-fil-1.jpg.png',
      'assets/images/products/lance-mousse-1.jpg.png',
      'assets/images/products/lance-mousse-2.jpg.png',
      'assets/images/products/brosse-jantes-1.jpg.png',
      'assets/images/products/brosse-jantes-2.jpg.png',
      'assets/images/products/brosse-jantes-3.jpg.png',
      'assets/images/products/machine-polir-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 38 L16 18 Q18 14 22 14 L36 14 Q40 14 40 18 L40 22 Q40 26 36 26 L26 26 L22 38 Z"/>
      <circle cx="15" cy="38" r="4" fill="var(--red)" stroke="var(--red)"/>
      <line x1="4" y1="28" x2="12" y2="26"/><line x1="3" y1="22" x2="11" y2="22"/>
    </svg>`,
    fr: {
      name: 'Pack Nettoyage Complet',
      tagline: 'Résultat Professionnel',
      desc: 'Aspirateur sans fil + Pulvérisateur mousse + Brosse jantes + Machine à polir. Le kit complet pour un nettoyage pro. Économisez 39,70€ par rapport à l\'achat séparé.',
      features: ['4 produits inclus', 'Nettoyage complet', 'Livraison offerte', 'Économisez 39,70€']
    },
    en: {
      name: 'Complete Cleaning Pack',
      tagline: 'Professional Results',
      desc: 'Cordless vacuum + Foam sprayer + Wheel brush + Polishing machine. The complete pro cleaning kit. Save 39.70€ vs. buying separately.',
      features: ['4 products included', 'Full clean kit', 'Free delivery', 'Save 39.70€']
    }
  },
  {
    id: 'pack-securite',
    badge: 'PACK',
    badgeType: 'bundle',
    price: 134.90,
    oldPrice: 167.70,
    discount: 20,
    rating: 4.8,
    reviews: 224,
    category: 'pack',
    isBundle: true,
    bundleIncludes: ['dashcam-4k', 'tpms', 'support-telephone'],
    accentColor: '#1a0a08',
    images: [
      'assets/images/products/pack-securite-cover.png',
      'assets/images/products/dashcam-4k-1.jpg.png',
      'assets/images/products/tpms-1.jpg.png',
      'assets/images/products/support-telephone-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4 L40 10 L40 26 Q40 38 24 44 Q8 38 8 26 L8 10 Z"/>
      <path d="M17 24 L21 28 L31 18" stroke="var(--red)" stroke-width="2.5"/>
    </svg>`,
    fr: {
      name: 'Pack Sécurité & Confort',
      tagline: 'Conduite Sereine',
      desc: 'Dashcam 4K HD + TPMS surveillance pneus + Kit mains libres 360°. La sécurité complète pour chaque trajet. Économisez 32,80€ par rapport à l\'achat séparé.',
      features: ['Dashcam 4K HD', 'TPMS 4 capteurs', 'Kit mains libres 360°', 'Économisez 32,80€']
    },
    en: {
      name: 'Safety & Comfort Pack',
      tagline: 'Serene Driving',
      desc: '4K dashcam + TPMS tire monitor + 360° hands-free kit. Complete safety for every journey. Save 32.80€ vs. buying separately.',
      features: ['4K dashcam', '4 TPMS sensors', '360° hands-free', 'Save 32.80€']
    }
  }
];

const REVIEWS = [
  {
    name: 'Thomas M.',
    city: 'Lyon',
    rating: 5,
    product: 'Aspirateur Sans Fil Voiture',
    productId: 'aspirateur-sans-fil',
    photos: ['assets/images/reviews/review-aspirateur.jpg'],
    fr: { text: 'L\'aspirateur sans fil est incroyable ! J\'ai enfin une voiture propre sans effort. La puissance est au rendez-vous et la batterie tient vraiment 30 minutes. Livraison ultra rapide, service client au top. Je recommande à 100% !' },
    en: { text: 'The cordless vacuum is incredible! My car is finally clean effortlessly. Power is impressive and the battery genuinely lasts 30 minutes. Ultra fast delivery, excellent customer service. 100% recommend!' }
  },
  {
    name: 'Sophie L.',
    city: 'Paris',
    rating: 5,
    product: 'Compresseur d\'Air Sans Fil',
    productId: 'compresseur-air',
    photos: ['assets/images/reviews/review-compresseur.jpg'],
    fr: { text: 'Le compresseur m\'a sauvé la mise deux fois déjà. Compact, rapide et précis — il s\'arrête exactement à la pression cible. Je ne pars plus jamais en voiture sans lui. Une vraie révolution du quotidien.' },
    en: { text: 'The compressor has saved me twice already. Compact, fast and precise — stops exactly at the target pressure. I never drive without it now. A true daily revolution.' }
  },
  {
    name: 'Marc D.',
    city: 'Marseille',
    rating: 5,
    product: 'Dashcam 4K Ultra HD',
    productId: 'dashcam-4k',
    photos: ['assets/images/reviews/review-dashcam.jpg'],
    fr: { text: 'La dashcam 4K est d\'une qualité impressionnante, même la nuit les images sont nettes et exploitables. L\'installation est simple, le mode parking fonctionne parfaitement. Très satisfait de mon achat.' },
    en: { text: 'The 4K dashcam quality is impressive, even at night the footage is sharp and usable. Easy installation, parking mode works perfectly. Very satisfied with my purchase.' }
  },
  {
    name: 'Julie R.',
    city: 'Bordeaux',
    rating: 5,
    product: 'Machine à Polir Sans Fil',
    productId: 'machine-polir',
    fr: { text: 'La machine à polir a transformé ma vieille Clio ! Les micro-rayures ont disparu et la carrosserie brille comme au premier jour. Le kit inclus est complet et la prise en main très facile. Bluffant !' },
    en: { text: 'The polishing machine transformed my old Clio! Micro-scratches are gone and the bodywork shines like new. The included kit is complete and very easy to use. Stunning results!' }
  },
  {
    name: 'Antoine B.',
    city: 'Toulouse',
    rating: 5,
    product: 'Kit Mains Libres 360°',
    productId: 'support-telephone',
    photos: ['assets/images/reviews/review-support-telephone.jpg'],
    fr: { text: 'Support téléphone magnétique de qualité professionnelle. Il tient même sur les pires routes de montagne. Ça fait 8 mois et il n\'a jamais bougé d\'un millimètre. Rapport qualité/prix excellent, je l\'offre maintenant à ma femme !' },
    en: { text: 'Professional quality magnetic phone mount. Holds even on the worst mountain roads. 8 months in and it has never moved a millimeter. Excellent value, I\'m now buying one for my wife!' }
  },
  {
    name: 'Camille F.',
    city: 'Nantes',
    rating: 5,
    product: 'TPMS Surveillance Pneus',
    productId: 'tpms',
    fr: { text: 'Le TPMS m\'a alerté d\'un sous-gonflage que je n\'avais pas remarqué. Sans lui, j\'aurais abîmé mon pneu. Depuis je roule l\'esprit tranquille et j\'ai même constaté une légère baisse de ma conso. Indispensable !' },
    en: { text: 'The TPMS alerted me to under-inflation I hadn\'t noticed. Without it, I would have damaged my tire. Now I drive in peace and even noticed a slight drop in fuel consumption. Essential!' }
  },
  {
    name: 'Nicolas P.',
    city: 'Strasbourg',
    rating: 5,
    product: 'Table de Travail Volant',
    productId: 'table-volant',
    photos: ['assets/images/reviews/review-table-volant.jpg'],
    fr: { text: 'Je fais beaucoup de route pour le boulot et cette table au volant est devenue mon bureau mobile. Solide, stable, installation en 10 secondes. Un achat que je ne regrette pas du tout, vraiment utile.' },
    en: { text: 'I drive a lot for work and this steering wheel desk has become my mobile office. Solid, stable, 10-second setup. A purchase I don\'t regret at all, truly useful.' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Aspirateur Sans Fil Voiture',
    productId: 'aspirateur-sans-fil',
    photos: [
      'assets/images/reviews/review-maykel-aspirateur-1.jpg',
      'assets/images/reviews/review-maykel-aspirateur-2.jpg',
      'assets/images/reviews/review-maykel-aspirateur-3.jpg'
    ],
    fr: { text: 'Je l\'utilise depuis 3 semaines et je ne pourrais plus m\'en passer. J\'ai des enfants, la voiture ramassait tout — maintenant c\'est impeccable en 5 minutes. Légère, puissante et rechargeable USB. Top qualité.' },
    en: { text: 'Been using it for 3 weeks and can\'t live without it. I have kids, the car was a mess — now it\'s spotless in 5 minutes. Light, powerful, USB rechargeable. Top quality.' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Dashcam 4K Ultra HD',
    productId: 'dashcam-4k',
    photos: [
      'assets/images/reviews/review-maykel-dashcam-1.jpg',
      'assets/images/reviews/review-maykel-dashcam-2.jpg',
      'assets/images/reviews/review-maykel-dashcam-3.jpg'
    ],
    fr: { text: 'Vendu avec la carte mémoire 64 Go incluse, livraison soignée. L\'image de nuit est vraiment nette, le mode boucle fonctionne tout seul. Je conduis sur Paris tous les jours, ça me rassure vraiment. Je recommande.' },
    en: { text: 'Came with a 64GB memory card included, careful packaging. Night footage is truly sharp, loop mode works automatically. I drive in Paris every day, it really reassures me. I recommend.' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Table de Travail Volant',
    productId: 'table-volant',
    photos: [
      'assets/images/reviews/review-maykel-table-volant-1.jpg',
      'assets/images/reviews/review-maykel-table-volant-2.jpg',
      'assets/images/reviews/review-maykel-table-volant-3.jpg'
    ],
    fr: { text: 'Pratique pour bosser ou manger entre deux rendez-vous. Le plateau est solide et l\'installation sur le volant prend 10 secondes. J\'aurais pas cru que ce serait autant utile au quotidien !' },
    en: { text: 'Perfect for working or eating between meetings. The tray is solid and setup on the steering wheel takes 10 seconds. I wouldn\'t have believed it could be so useful in daily life!' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Essuie-Glace Rétroviseurs',
    productId: 'essuie-glace-retros',
    photos: [
      'assets/images/reviews/review-maykel-essuie-glace-1.jpg',
      'assets/images/reviews/review-maykel-essuie-glace-2.jpg',
      'assets/images/reviews/review-maykel-essuie-glace-3.jpg'
    ],
    fr: { text: 'Ça fait un mois que je les ai posés et la visibilité sous la pluie est nettement améliorée. Compatibles avec mes rétros sans modification, installation rapide. Bonne qualité pour le prix, vraiment satisfait.' },
    en: { text: 'Had them for a month and visibility in the rain is noticeably improved. Compatible with my mirrors without modification, quick installation. Good quality for the price, really satisfied.' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Compresseur d\'Air Sans Fil',
    productId: 'compresseur-air',
    photos: [
      'assets/images/reviews/review-maykel-compresseur-1.jpg',
      'assets/images/reviews/review-maykel-compresseur-2.jpg',
      'assets/images/reviews/review-maykel-compresseur-3.jpg'
    ],
    fr: { text: 'Très compact, je le garde dans le coffre en permanence. Gonflage précis, s\'arrête automatiquement à la pression choisie. Vaut largement le prix — j\'aurais pu me retrouver coincé sans lui un soir de semaine.' },
    en: { text: 'Very compact, I keep it in the trunk permanently. Precise inflation, stops automatically at the chosen pressure. Totally worth the price — it could have saved me from being stranded on a weeknight.' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Machine à Polir Sans Fil',
    productId: 'machine-polir',
    photos: [
      'assets/images/reviews/review-maykel-machine-polir-1.jpg',
      'assets/images/reviews/review-maykel-machine-polir-2.jpg',
      'assets/images/reviews/review-maykel-machine-polir-3.jpg'
    ],
    fr: { text: 'Les résultats sont impressionnants. J\'ai testé sur la portière rayée par un parking et ça a quasiment tout effacé. Les disques sont inclus dans la boîte, le manuel est clair. Achat validé à 100%.' },
    en: { text: 'The results are impressive. I tested it on a door scratched by a parking lot and it erased almost everything. The pads are included in the box, the manual is clear. 100% confirmed purchase.' }
  }
];

const PROBLEMS = [
  {
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="20" cy="20" r="16"/><path d="M12 20 Q16 12 20 20 Q24 28 28 20" stroke="var(--red)"/><line x1="20" y1="4" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="36"/></svg>`,
    fr: { problem: 'Habitacle sale, miettes partout, mauvaises odeurs', solution: 'Aspirateur sans fil + Lance à mousse', result: 'Propre en 5 minutes, sans effort' },
    en: { problem: 'Dirty interior, crumbs everywhere, bad odors', solution: 'Cordless vacuum + Foam lance', result: 'Clean in 5 minutes, effortlessly' }
  },
  {
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="20" cy="24" r="12"/><circle cx="20" cy="24" r="4" fill="var(--red)" stroke="var(--red)"/><path d="M20 8 L20 12 M8 14 L11 16 M32 14 L29 16" stroke="var(--red)"/></svg>`,
    fr: { problem: 'Pneu à plat ou sous-gonflé sans le savoir', solution: 'Système TPMS + Compresseur sans fil', result: 'Alertes temps réel, pression parfaite' },
    en: { problem: 'Flat or under-inflated tire without knowing', solution: 'TPMS system + Cordless compressor', result: 'Real-time alerts, perfect pressure' }
  },
  {
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="8" y="10" width="24" height="20" rx="2"/><path d="M14 30 L14 36 M26 30 L26 36"/><path d="M16 20 L20 16 L24 20" stroke="var(--red)"/><line x1="20" y1="16" x2="20" y2="26" stroke="var(--red)"/></svg>`,
    fr: { problem: 'Carrosserie rayée, terne et oxydée', solution: 'Machine à polir + Kit complet inclus', result: 'Finition showroom en 2 heures' },
    en: { problem: 'Scratched, dull, and oxidized bodywork', solution: 'Polishing machine + Complete kit included', result: 'Showroom finish in 2 hours' }
  },
  {
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="14" y="6" width="14" height="22" rx="2"/><line x1="18" y1="9" x2="22" y2="9"/><circle cx="21" cy="26" r="1.5" fill="currentColor"/><path d="M21 28 L21 36 L14 36 M21 36 L28 36" stroke="var(--red)"/></svg>`,
    fr: { problem: 'Téléphone qui tombe, pas de GPS disponible', solution: 'Support magnétique + Dashcam 4K', result: 'Navigation sécurisée, trajets documentés' },
    en: { problem: 'Phone falling, no GPS available', solution: 'Magnetic mount + 4K Dashcam', result: 'Safe navigation, journeys documented' }
  }
];

const CATEGORIES = [
  {
    id: 'nettoyage',
    coverImg: 'assets/images/categories/nettoyage.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 24 L12 8 h8 l4 16 Z"/><line x1="7" y1="20" x2="25" y2="20"/><path d="M12 8 Q16 4 20 8"/></svg>`,
    fr: { name: 'Nettoyage', count: 4 },
    en: { name: 'Cleaning', count: 4 }
  },
  {
    id: 'confort',
    coverImg: 'assets/images/categories/confort.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="8" y="10" width="16" height="14" rx="2"/><path d="M12 10 L12 8 L20 8 L20 10"/><line x1="16" y1="24" x2="16" y2="28"/><line x1="12" y1="28" x2="20" y2="28"/></svg>`,
    fr: { name: 'Confort', count: 2 },
    en: { name: 'Comfort', count: 2 }
  },
  {
    id: 'securite',
    coverImg: 'assets/images/categories/securite.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M16 4 L28 8 L28 18 Q28 26 16 30 Q4 26 4 18 L4 8 Z"/><path d="M11 16 L14 19 L21 12" stroke="var(--red)"/></svg>`,
    fr: { name: 'Sécurité', count: 2 },
    en: { name: 'Safety', count: 2 }
  },
  {
    id: 'technologie',
    coverImg: 'assets/images/categories/technologie.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="4" y="8" width="20" height="14" rx="2"/><circle cx="14" cy="15" r="4"/><circle cx="14" cy="15" r="1.5" fill="var(--red)" stroke="var(--red)"/><path d="M24 12 L28 10 L28 20 L24 18"/></svg>`,
    fr: { name: 'Technologie', count: 1 },
    en: { name: 'Technology', count: 1 }
  },
  {
    id: 'entretien',
    coverImg: 'assets/images/categories/entretien.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="16" cy="18" r="10"/><circle cx="16" cy="18" r="5" stroke="var(--red)"/><circle cx="16" cy="18" r="1.5" fill="var(--red)" stroke="var(--red)"/><path d="M16 8 L16 4 L20 4"/></svg>`,
    fr: { name: 'Entretien', count: 2 },
    en: { name: 'Maintenance', count: 2 }
  },
  {
    id: 'accessoires',
    coverImg: 'assets/images/categories/accessoires.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="20" r="5"/><circle cx="22" cy="20" r="5"/><path d="M6 18 Q6 8 16 8 Q26 8 26 18"/><path d="M6 18 L4 14 M26 18 L28 14"/></svg>`,
    fr: { name: 'Accessoires', count: 11 },
    en: { name: 'Accessories', count: 11 }
  }
];
