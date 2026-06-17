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
        { value: 'jaune', display: 'Jaune', hex: '#f5c518', imageIndex: 2, outOfStock: true },
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
    price: 49.90,
    oldPrice: 69.90,
    discount: 29,
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
      name: 'Dashcam Full HD 1080P Double Objectif',
      tagline: 'Avant et arrière, en simultané',
      desc: 'Double enregistrement simultané avant + arrière en Full HD 1080P, grand angle 170°, vision nocturne, mode parking avec détection de mouvement. Allume-cigare inclus.',
      features: ['Double objectif avant/arrière', 'Full HD 1080P', 'Vision nocturne', 'Mode parking']
    },
    en: {
      name: 'Dual Lens Full HD 1080P Dashcam',
      tagline: 'Front and rear, simultaneously',
      desc: 'Simultaneous dual recording front + rear in Full HD 1080P, 170° wide angle, night vision, parking mode with motion detection. Cigarette lighter adapter included.',
      features: ['Dual lens front/rear', 'Full HD 1080P', 'Night vision', 'Parking mode']
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
      name: 'Machine à Polir Sans Fil Pour Voiture',
      tagline: 'Carrosserie impeccable en quelques gestes',
      desc: 'Polisseuse sans fil rechargeable avec 3 plateaux inclus pour cirer, polir et réparer les micro-rayures. Batterie lithium 2000mAh intégrée pour travailler en toute liberté. Résultat professionnel, carrosserie propre et protégée directement chez vous.',
      features: ['Sans fil rechargeable', '3 plateaux inclus', 'Répare micro-rayures', 'Cire + polissage']
    },
    en: {
      name: 'Cordless Car Polishing Machine',
      tagline: 'Perfect paintwork in minutes',
      desc: 'Rechargeable cordless polisher with 3 included pads for waxing, polishing and repairing light scratches. Built-in 2000mAh lithium battery for freedom of movement. Professional results at home.',
      features: ['Cordless rechargeable', '3 pads included', 'Repairs micro-scratches', 'Wax + polish']
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
      desc: 'Pulvérisateur à pompe manuelle avec buse fan 60° pour une couverture optimale de la carrosserie. Double embout inclus (mousse + arrosage), pression générée manuellement. Mousse épaisse pour un lavage sans contact professionnel à domicile.',
      features: ['Buse fan 60°', 'Double embout inclus', 'Pompe manuelle', 'Lavage sans contact']
    },
    en: {
      name: 'Foam Sprayer',
      tagline: 'Premium contactless wash',
      desc: 'Manual pump foam sprayer with 60° fan nozzle for optimal body coverage. Two nozzles included (foam + watering), manually pressurised. Thick foam for professional contactless car wash at home.',
      features: ['60° fan nozzle', 'Double nozzle included', 'Manual pump', 'Contactless wash']
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
      desc: 'Système TPMS solaire sans fil avec 4 capteurs externes étanches. Vissage rapide sur les valves sans démontage. Affichage LCD temps réel, alertes sonores et visuelles en cas de sous-gonflage ou surchauffe. Batterie capteurs 3-5 ans. Roulez en sécurité à tout moment.',
      features: ['Charge solaire', '4 capteurs étanches', 'Alertes instantanées', 'Installation 2 min']
    },
    en: {
      name: 'TPMS Tire Monitor',
      tagline: 'Safety starts with your tires',
      desc: 'Solar wireless TPMS with 4 external waterproof sensors. Quick screw-on installation, no tire removal needed. Real-time LCD display with audible and visual alerts for under-inflation or overheating. 3-5 year sensor battery life. Stay safe on every journey.',
      features: ['Solar charging', '4 waterproof sensors', 'Instant alerts', '2-min install']
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
        { value: 'gris',  display: 'Gris clair', hex: '#a8a5a0', imageIndex: 0 },
        { value: 'noir',  display: 'Noir',      hex: '#1a1a1a', imageIndex: 1 },
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
      desc: 'Plateau multifonction qui s\'accroche sur le volant. Surface antidérapante avec rangements latéraux intégrés. Idéal pour les pauses repas, le travail ou l\'organisation en voiture. Compatible tous véhicules.',
      features: ['Accroche volant', 'Surface antidérapante', 'Rangements latéraux', 'Universel']
    },
    en: {
      name: 'Steering Wheel Table',
      tagline: 'Your perfect mobile office',
      desc: 'Multifunction tray that hooks onto the steering wheel. Non-slip surface with integrated side compartments. Ideal for meal breaks, work or in-car organisation. Fits all vehicles.',
      features: ['Hooks on wheel', 'Non-slip surface', 'Side compartments', 'Universal']
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
      desc: 'Raclette rétractable de 21cm à 98cm pour nettoyer les deux rétroviseurs sans se déplacer. Lame caoutchouc souple sans rayures, restaure une vision nette sous la pluie et le brouillard. Compact, se range facilement dans la boîte à gants ou l\'accoudoir.',
      features: ['21 à 98cm réglable', 'Sans rayures', 'Pluie & brouillard', 'Compact & portable']
    },
    en: {
      name: 'Portable Retractable Mirror Wiper',
      tagline: 'Perfect visibility in any weather',
      desc: 'Retractable wiper from 21cm to 98cm to clean both mirrors without moving. Scratch-free soft rubber blade restores clear vision in rain and fog. Compact, fits easily in the glove box or armrest.',
      features: ['Retractable 98cm', 'Telescopic handle', 'Anti-frost', 'Black or Pink']
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
        { value: 'gris',  display: 'Gris clair', hex: '#a8a5a0', imageIndex: 2 },
        { value: 'noir',  display: 'Noir',       hex: '#1a1a1a', imageIndex: 3 },
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
    price: 99.90,
    oldPrice: 127.70,
    discount: 22,
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
      desc: 'Dashcam Full HD Double Objectif + TPMS surveillance pneus + Kit mains libres 360°. La sécurité complète pour chaque trajet. Économisez 27,80€ par rapport à l\'achat séparé.',
      features: ['Dashcam Full HD 1080P', 'TPMS 4 capteurs', 'Kit mains libres 360°', 'Économisez 27,80€']
    },
    en: {
      name: 'Safety & Comfort Pack',
      tagline: 'Serene Driving',
      desc: 'Dual lens Full HD dashcam + TPMS tire monitor + 360° hands-free kit. Complete safety for every journey. Save 27.80€ vs. buying separately.',
      features: ['Full HD dashcam', '4 TPMS sensors', '360° hands-free', 'Save 27.80€']
    }
  },
  {
    id: 'diffuseur-parfum',
    badge: 'NOUVEAU',
    badgeType: 'new',
    price: 29.90,
    oldPrice: 49.90,
    discount: 40,
    rating: 4.6,
    reviews: 234,
    category: 'accessoires',
    accentColor: '#1a0a1a',
    images: [
      'assets/images/products/diffuseur-parfum-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 38 Q18 26 24 24 Q30 26 30 38 Q30 42 24 42 Q18 42 18 38Z"/>
      <path d="M22 24 L22 18 L26 18 L26 24"/>
      <line x1="24" y1="18" x2="24" y2="15"/>
      <path d="M19 13 Q22 8 25 13 Q28 8 31 13" stroke="var(--red)" stroke-dasharray="2 2"/>
    </svg>`,
    fr: {
      name: 'Diffuseur Parfum Voiture',
      tagline: 'Habitacle frais à chaque trajet',
      desc: 'Diffuseur d\'arômes rechargeable par USB pour habitacle. Diffusion douce et continue par ventilation. Compatible huiles essentielles. Silencieux, sans condensation.',
      features: ['USB rechargeable', 'Compatible HE', 'Silencieux', 'Diffusion continue']
    },
    en: {
      name: 'Car Air Freshener Diffuser',
      tagline: 'Fresh cabin every journey',
      desc: 'USB rechargeable aroma diffuser for car interior. Gentle continuous diffusion via ventilation. Compatible with essential oils. Silent, no condensation.',
      features: ['USB rechargeable', 'Essential oils', 'Silent', 'Continuous diffusion']
    }
  },
  {
    id: 'support-magnetique',
    badge: 'NOUVEAU',
    badgeType: 'new',
    price: 24.90,
    oldPrice: 39.90,
    discount: 38,
    rating: 4.7,
    reviews: 412,
    category: 'technologie',
    accentColor: '#0a1a2a',
    images: [
      'assets/images/products/support-magnetique-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="15" y="8" width="18" height="28" rx="3"/>
      <line x1="21" y1="11" x2="27" y2="11"/>
      <circle cx="24" cy="22" r="3" fill="var(--red)" stroke="var(--red)"/>
      <path d="M14 20 Q9 22 9 28 Q9 34 14 34" stroke="var(--red)"/>
      <path d="M10 16 Q4 20 4 28 Q4 36 10 38" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Support Magnétique 15W',
      tagline: 'Recharge et navigation intégrées',
      desc: 'Support téléphone magnétique avec recharge sans fil 15W intégrée. Fixation grille d\'aération ou tableau de bord. Aimant puissant compatible MagSafe. Recharge rapide iPhone et Android récents.',
      features: ['Recharge 15W', 'Compatible MagSafe', 'Double fixation', 'iPhone & Android']
    },
    en: {
      name: '15W Magnetic Phone Mount',
      tagline: 'Charging and navigation combined',
      desc: 'Magnetic phone mount with built-in 15W wireless charging. Vent or dashboard mount. Powerful magnet, MagSafe compatible. Fast charge for recent iPhones & Android devices.',
      features: ['15W charging', 'MagSafe compatible', 'Dual mount', 'iPhone & Android']
    }
  },
  {
    id: 'kit-lavage',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 39.90,
    oldPrice: 59.90,
    discount: 33,
    rating: 4.6,
    reviews: 156,
    category: 'nettoyage',
    accentColor: '#0a1a0a',
    images: [
      'assets/images/products/kit-lavage-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20 L14 40 L34 40 L36 20 Z"/>
      <line x1="10" y1="20" x2="38" y2="20"/>
      <path d="M18 16 Q24 12 30 16"/>
      <circle cx="20" cy="13" r="2" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="28" cy="11" r="1.5" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="24" cy="10" r="1.5" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Kit Lavage Auto 12 Pièces',
      tagline: 'Tout le nécessaire en un kit',
      desc: 'Kit complet 12 accessoires pour l\'entretien extérieur et intérieur : gant microfibre, éponges, chiffons et applicateurs. Idéal pour entretien régulier à domicile.',
      features: ['12 accessoires', 'Gant microfibre', 'Int. & ext.', 'Kit complet']
    },
    en: {
      name: '12-Piece Car Wash Kit',
      tagline: 'Everything you need in one kit',
      desc: 'Complete 12-piece kit for interior and exterior car care: microfibre glove, sponges, cloths and applicators. Ideal for regular maintenance at home.',
      features: ['12 accessories', 'Microfibre glove', 'Int. & ext.', 'Full kit']
    }
  },
  {
    id: 'adaptateur-carplay',
    badge: 'NOUVEAU',
    badgeType: 'new',
    price: 54.90,
    oldPrice: 79.90,
    discount: 31,
    rating: 4.8,
    reviews: 567,
    category: 'technologie',
    accentColor: '#1a0a0a',
    images: [
      'assets/images/products/adaptateur-carplay-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="16" width="24" height="16" rx="3"/>
      <circle cx="18" cy="24" r="5" stroke="var(--red)"/>
      <circle cx="18" cy="24" r="2" fill="var(--red)" stroke="var(--red)"/>
      <path d="M30 22 L36 20 L36 28 L30 26"/>
      <line x1="36" y1="20" x2="42" y2="18"/>
      <circle cx="42" cy="18" r="2" fill="currentColor"/>
    </svg>`,
    fr: {
      name: 'Adaptateur CarPlay Sans Fil',
      tagline: 'CarPlay et Android Auto sans câble',
      desc: 'Transformez votre CarPlay filaire en sans fil en moins d\'une minute. Compatible iPhone (iOS 10+) et Android Auto. Connexion WiFi automatique à chaque démarrage. Aucun câble une fois configuré.',
      features: ['CarPlay sans fil', 'Android Auto', 'Connexion auto', 'iOS 10+ / Android']
    },
    en: {
      name: 'Wireless CarPlay Adapter',
      tagline: 'CarPlay and Android Auto, wireless',
      desc: 'Convert your wired CarPlay to wireless in under a minute. Compatible with iPhone (iOS 10+) and Android Auto. Automatic WiFi connection on every start. No cables once set up.',
      features: ['Wireless CarPlay', 'Android Auto', 'Auto connect', 'iOS 10+ / Android']
    }
  },
  {
    id: 'organisateur-coffre-grand',
    badge: '-20%',
    badgeType: 'promo',
    price: 39.90,
    oldPrice: 49.90,
    discount: 20,
    rating: 4.7,
    reviews: 389,
    category: 'accessoires',
    accentColor: '#1a1a0a',
    images: [
      'assets/images/products/organisateur-coffre-grand-1.jpg.png',
      'assets/images/products/organisateur-coffre-grand-2.jpg.png',
      'assets/images/products/organisateur-coffre-grand-3.jpg.png',
      'assets/images/products/organisateur-coffre-grand-4.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'noir',  display: 'Noir',  hex: '#1a1a1a', imageIndex: 0 },
        { value: 'gris',  display: 'Gris',  hex: '#8c8c8c', imageIndex: 1 },
        { value: 'rouge', display: 'Rouge', hex: '#c0392b', imageIndex: 2 },
        { value: 'bleu',  display: 'Bleu',  hex: '#2c3e7a', imageIndex: 3 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="18" width="36" height="24" rx="2"/>
      <line x1="6" y1="30" x2="42" y2="30"/>
      <line x1="24" y1="18" x2="24" y2="42"/>
      <rect x="10" y="13" width="28" height="5" rx="2" fill="var(--red)" stroke="var(--red)"/>
      <line x1="18" y1="13" x2="18" y2="10"/><line x1="30" y1="13" x2="30" y2="10"/>
    </svg>`,
    fr: {
      name: 'Organisateur Coffre Pliable Grand',
      tagline: 'Coffre ordonné, vie simplifiée',
      desc: 'Grand organisateur coffre pliable imperméable, 3 compartiments séparés avec renforts rigides. Tient debout même chargé. Se plie à plat quand vide. Disponible en 4 coloris.',
      features: ['3 compartiments', 'Imperméable', 'Pliable à plat', '4 coloris']
    },
    en: {
      name: 'Large Foldable Trunk Organizer',
      tagline: 'Tidy boot, simpler life',
      desc: 'Large waterproof foldable trunk organizer with 3 separate reinforced compartments. Stands upright when loaded. Folds flat when empty. Available in 4 colours.',
      features: ['3 compartments', 'Waterproof', 'Folds flat', '4 colours']
    }
  },
  {
    id: 'organisateur-coffre-compact',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 24.90,
    oldPrice: 34.90,
    discount: 29,
    rating: 4.6,
    reviews: 278,
    category: 'accessoires',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/organisateur-coffre-compact-1.jpg.png',
      'assets/images/products/organisateur-coffre-compact-2.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'noir', display: 'Noir', hex: '#1a1a1a', imageIndex: 0 },
        { value: 'gris', display: 'Gris', hex: '#8c8c8c', imageIndex: 1 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="20" width="28" height="20" rx="2"/>
      <line x1="10" y1="30" x2="38" y2="30"/>
      <line x1="24" y1="20" x2="24" y2="40"/>
      <rect x="14" y="15" width="20" height="5" rx="2" fill="var(--red)" stroke="var(--red)"/>
      <line x1="20" y1="15" x2="20" y2="12"/><line x1="28" y1="15" x2="28" y2="12"/>
    </svg>`,
    fr: {
      name: 'Organisateur Coffre Compact',
      tagline: 'L\'essentiel sans encombrer',
      desc: 'Organisateur coffre compact en toile Oxford résistante. Léger, rangeable à plat quand vide. Poignée de transport intégrée. Idéal pour le quotidien et les petites courses.',
      features: ['Toile Oxford', 'Pliable à plat', 'Poignée incluse', 'Léger']
    },
    en: {
      name: 'Compact Trunk Organizer',
      tagline: 'The essentials, without the bulk',
      desc: 'Compact trunk organizer in durable Oxford fabric. Lightweight, folds flat when empty. Integrated carry handle. Ideal for daily use and light shopping.',
      features: ['Oxford fabric', 'Folds flat', 'Carry handle', 'Lightweight']
    }
  },
  {
    id: 'booster-demarrage',
    badge: 'SÉCURITÉ',
    badgeType: 'security',
    price: 94.90,
    oldPrice: 149.90,
    discount: 37,
    rating: 4.8,
    reviews: 823,
    category: 'securite',
    accentColor: '#1a0505',
    images: [
      'assets/images/products/booster-demarrage-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="18" width="32" height="20" rx="3"/>
      <rect x="16" y="14" width="6" height="4" rx="1"/>
      <rect x="26" y="14" width="6" height="4" rx="1"/>
      <line x1="18" y1="25" x2="18" y2="31"/>
      <line x1="15" y1="28" x2="21" y2="28" stroke="var(--red)"/>
      <line x1="30" y1="25" x2="30" y2="31"/>
      <path d="M42 24 L38 28 L42 32" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Booster Démarrage Portable 1500A',
      tagline: 'Ne restez plus jamais en panne',
      desc: 'Booster de démarrage portable 1500A pour essence jusqu\'à 6L et diesel jusqu\'à 4L. Batterie lithium 12000mAh avec protections multi-niveaux. Powerbank double USB intégré + lampe LED. Compact, tient dans la boîte à gants.',
      features: ['1500A crêtes', 'Essence 6L / Diesel 4L', 'Powerbank 12000mAh', 'Lampe LED intégrée']
    },
    en: {
      name: '1500A Portable Jump Starter',
      tagline: 'Never get stranded again',
      desc: 'Portable 1500A jump starter for petrol up to 6L and diesel up to 4L. 12000mAh lithium battery with multi-level protections. Built-in dual USB powerbank + LED lamp. Compact, fits in the glove box.',
      features: ['1500A peak', 'Petrol 6L / Diesel 4L', '12000mAh powerbank', 'Built-in LED']
    }
  },
  {
    id: 'spray-antipluie',
    badge: 'POPULAIRE',
    badgeType: 'popular',
    price: 29.90,
    oldPrice: 44.90,
    discount: 33,
    rating: 4.5,
    reviews: 634,
    category: 'entretien',
    accentColor: '#0a1020',
    images: [
      'assets/images/products/spray-antipluie-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 40 L20 18 Q20 16 22 16 L28 16 Q30 16 30 18 L30 40 Q30 42 25 42 Q20 42 20 40Z"/>
      <path d="M24 16 L24 10 L28 10 L32 12 L32 16"/>
      <circle cx="10" cy="24" r="2" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="7" cy="32" r="2" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="13" cy="36" r="1.5" fill="var(--red)" stroke="var(--red)"/>
      <path d="M34 22 Q38 28 36 34" stroke="var(--red)" stroke-dasharray="3 2"/>
    </svg>`,
    fr: {
      name: 'Spray Anti-Pluie Vitres',
      tagline: 'Visibilité totale sous la pluie',
      desc: 'Traitement hydrophobe en spray pour vitres et rétroviseurs. Les gouttes d\'eau glissent immédiatement, même à basse vitesse. Application simple en 2 minutes, efficacité durable selon conditions.',
      features: ['Effet hydrophobe', 'Vitres & rétros', 'Visibilité accrue', 'Application rapide']
    },
    en: {
      name: 'Rain Repellent Windshield Spray',
      tagline: 'Full visibility in the rain',
      desc: 'Hydrophobic spray treatment for windows and mirrors. Water beads and slides off immediately, even at low speed. Easy 2-minute application, lasting effectiveness depending on conditions.',
      features: ['Hydrophobic effect', 'Windows & mirrors', 'Enhanced visibility', 'Quick apply']
    }
  },
  {
    id: 'spray-coating',
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    price: 9.90,
    rating: 4.7,
    reviews: 1205,
    category: 'entretien',
    accentColor: '#1a1005',
    images: [
      'assets/images/products/spray-coating-1.jpg.png',
    ],
    variants: [
      { label: 'Contenance', type: 'size', options: [
        { value: '30ml',  display: '30 ml',  price: 9.90,  default: true },
        { value: '50ml',  display: '50 ml',  price: 14.90 },
        { value: '100ml', display: '100 ml', price: 19.90 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 42 L18 16 Q18 14 21 14 L27 14 Q30 14 30 16 L30 42 Q30 44 24 44 Q18 44 18 42Z"/>
      <path d="M23 14 L23 9 L28 9 L32 11 L32 14"/>
      <path d="M36 18 Q40 22 40 28 Q40 34 36 36" stroke="var(--red)" stroke-dasharray="3 2"/>
      <path d="M38 16 Q44 22 44 28 Q44 36 38 40" stroke="var(--red)" stroke-dasharray="3 2" stroke-width="1.2"/>
    </svg>`,
    fr: {
      name: 'Spray Protection Carrosserie',
      tagline: 'Brillance et protection au quotidien',
      desc: 'Spray protection carrosserie multi-couche avec propriétés anti-rayures légères. Restaure la brillance et crée un effet hydrophobe. Compatible toutes finitions. Disponible en 3 formats.',
      features: ['Anti-rayures légères', 'Brillance restaurée', 'Effet hydrophobe', '3 formats']
    },
    en: {
      name: 'Car Body Protection Spray',
      tagline: 'Shine and protection every day',
      desc: 'Multi-layer car body protection spray with light anti-scratch properties. Restores shine and creates a hydrophobic effect. Compatible with all paint finishes. Available in 3 sizes.',
      features: ['Light anti-scratch', 'Restored shine', 'Hydrophobic effect', '3 sizes']
    }
  },
  {
    id: 'bandeau-led',
    badge: '-21%',
    badgeType: 'promo',
    price: 14.90,
    oldPrice: 18.90,
    discount: 21,
    rating: 4.6,
    reviews: 892,
    category: 'accessoires',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/bandeau-led-1.jpg.png',
    ],
    variants: [
      { label: 'Longueur', type: 'size', options: [
        { value: '2m', display: '2 mètres', price: 14.90, oldPrice: 18.90, default: true },
        { value: '3m', display: '3 mètres', price: 18.90, oldPrice: 23.90 },
        { value: '5m', display: '5 mètres', price: 22.90, oldPrice: 28.90 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 28 Q6 24 10 24 L38 24 Q42 24 42 28 L42 32 Q42 36 38 36 L10 36 Q6 36 6 32 Z"/>
      <circle cx="14" cy="30" r="2" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="22" cy="30" r="2" fill="currentColor" stroke="currentColor"/>
      <circle cx="30" cy="30" r="2" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="38" cy="30" r="2" fill="currentColor" stroke="currentColor"/>
      <line x1="10" y1="24" x2="10" y2="18"/><line x1="18" y1="24" x2="18" y2="16"/>
      <line x1="26" y1="24" x2="26" y2="18"/><line x1="34" y1="24" x2="34" y2="16"/>
    </svg>`,
    fr: {
      name: 'Bandeau LED RGB Habitacle',
      tagline: 'Ambiance lumineuse personnalisée',
      desc: 'Bandeau LED RGB flexible pour habitacle avec télécommande IR et contrôle via application. Millions de couleurs et effets programmables. Adhésif double-face, installation sans perçage. 3 longueurs disponibles.',
      features: ['RGB millions de couleurs', 'App + télécommande', 'Adhésif double-face', '3 longueurs']
    },
    en: {
      name: 'RGB Interior LED Strip',
      tagline: 'Your custom lighting ambiance',
      desc: 'Flexible RGB LED strip for car interior with IR remote and app control. Millions of colours and programmable effects. Double-sided tape for tool-free install. 3 lengths available.',
      features: ['RGB millions of colours', 'App + remote', 'Double-sided tape', '3 lengths']
    }
  },
  {
    id: 'chargeur-voiture',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 14.99,
    rating: 4.7,
    reviews: 1456,
    category: 'technologie',
    accentColor: '#1a1a1a',
    images: [
      'assets/images/products/chargeur-voiture-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="26" r="16"/>
      <rect x="17" y="19" width="14" height="14" rx="2"/>
      <line x1="20" y1="23" x2="28" y2="23" stroke="var(--red)"/>
      <line x1="20" y1="27" x2="28" y2="27" stroke="var(--red)"/>
      <line x1="20" y1="31" x2="28" y2="31" stroke="var(--red)"/>
      <path d="M24 10 L24 6"/>
    </svg>`,
    fr: {
      name: 'Chargeur Voiture 4 Ports USB-C',
      tagline: 'Tout le monde recharge en route',
      desc: 'Chargeur allume-cigare compact 4 ports : 2 USB-A + 2 USB-C Power Delivery. Compatible charge rapide QC 3.0. Idéal pour recharger plusieurs appareils simultanément. Le complément idéal dans votre panier.',
      features: ['4 ports USB', '2 USB-C PD', 'QC 3.0 rapide', 'Ultra compact']
    },
    en: {
      name: '4-Port USB-C Car Charger',
      tagline: 'Everyone charges on the road',
      desc: 'Compact 4-port cigarette lighter charger: 2 USB-A + 2 USB-C Power Delivery. QC 3.0 fast charge compatible. Ideal for charging multiple devices at once. The perfect cart add-on.',
      features: ['4 USB ports', '2 USB-C PD', 'QC 3.0 fast charge', 'Ultra compact']
    }
  },
  {
    id: 'mini-poubelle',
    badge: 'PRATIQUE',
    badgeType: 'practical',
    price: 19.90,
    oldPrice: 29.90,
    discount: 33,
    rating: 4.5,
    reviews: 445,
    category: 'accessoires',
    accentColor: '#0a0a0a',
    images: [
      'assets/images/products/mini-poubelle-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 20 L16 40 L32 40 L34 20 Z"/>
      <line x1="12" y1="20" x2="36" y2="20"/>
      <path d="M20 20 L20 16 L28 16 L28 20"/>
      <line x1="20" y1="26" x2="20" y2="36"/>
      <line x1="24" y1="26" x2="24" y2="36"/>
      <line x1="28" y1="26" x2="28" y2="36"/>
      <circle cx="33" cy="14" r="3" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Mini Poubelle Voiture',
      tagline: 'Habitacle propre, sans compromis',
      desc: 'Mini poubelle voiture à fixer sur appuie-tête ou accoudoir. Sac intérieur étanche amovible et lavable. Fermeture aimantée discrète. Capacité idéale pour les trajets quotidiens.',
      features: ['Sac étanche amovible', 'Fermeture aimantée', 'Fixation universelle', 'Lavable']
    },
    en: {
      name: 'Car Mini Trash Bin',
      tagline: 'Clean cabin, no compromise',
      desc: 'Car mini bin attaches to headrest or armrest. Removable waterproof inner bag, easy to clean. Discreet magnetic closure. Perfect capacity for daily journeys.',
      features: ['Removable liner', 'Magnetic closure', 'Universal mount', 'Washable']
    }
  },
  {
    id: 'organisateur-siege',
    badge: 'POPULAIRE',
    badgeType: 'popular',
    price: 29.90,
    oldPrice: 44.90,
    discount: 33,
    rating: 4.6,
    reviews: 523,
    category: 'accessoires',
    accentColor: '#1a0a05',
    images: [
      'assets/images/products/organisateur-siege-1.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 10 Q10 6 14 6 L34 6 Q38 6 38 10 L38 38 Q38 42 24 42 Q10 42 10 38 Z"/>
      <line x1="10" y1="16" x2="38" y2="16"/>
      <line x1="10" y1="26" x2="38" y2="26"/>
      <line x1="24" y1="16" x2="24" y2="42"/>
      <path d="M14 10 L14 16" stroke="var(--red)"/>
      <path d="M34 10 L34 16" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Organisateur Siège Arrière',
      tagline: 'L\'arrière organisé pour tous',
      desc: 'Organisateur multipoches pour dossier de siège en simili-cuir PU. 6 compartiments de tailles variées dont un rangement tablette. S\'installe en quelques secondes sur tous sièges standard.',
      features: ['6 compartiments', 'Simili-cuir PU', 'Rangement tablette', 'Universel']
    },
    en: {
      name: 'Back Seat Organizer',
      tagline: 'The back seat, organized for all',
      desc: 'Multi-pocket PU leather seat-back organizer. 6 compartments of various sizes including a tablet pocket. Fits all standard car seats in seconds.',
      features: ['6 compartments', 'PU leather', 'Tablet pocket', 'Universal fit']
    }
  },
  {
    id: 'coussin-lombaire',
    badge: 'CONFORT',
    badgeType: 'comfort',
    price: 44.90,
    oldPrice: 69.90,
    discount: 36,
    rating: 4.8,
    reviews: 312,
    category: 'confort',
    accentColor: '#1a0a0a',
    images: [
      'assets/images/products/coussin-lombaire-1.jpg.png',
      'assets/images/products/coussin-lombaire-2.jpg.png',
      'assets/images/products/coussin-lombaire-3.jpg.png',
    ],
    variants: [
      { label: 'Couleur', options: [
        { value: 'noir',  display: 'Noir',  hex: '#1a1a1a', imageIndex: 0 },
        { value: 'gris',  display: 'Gris',  hex: '#8c8c8c', imageIndex: 1 },
        { value: 'rouge', display: 'Rouge', hex: '#c0392b', imageIndex: 2 },
      ]}
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28 Q8 18 24 16 Q40 18 40 28 Q40 38 24 40 Q8 38 8 28Z"/>
      <path d="M8 28 Q8 22 24 20 Q40 22 40 28" stroke="var(--red)"/>
      <path d="M14 38 L14 44 M34 38 L34 44"/>
      <line x1="10" y1="44" x2="38" y2="44"/>
    </svg>`,
    fr: {
      name: 'Coussin Lombaire Memory Foam',
      tagline: 'Dos soutenu, trajet confortable',
      desc: 'Coussin soutien lombaire en mousse à mémoire de forme avec sangle de fixation universelle. Réduit la fatigue dorsale lors des longs trajets. Adapté aux conducteurs VTC, taxi et livreurs. Compatible tous sièges auto.',
      features: ['Mémoire de forme', 'Sangle universelle', 'Réduit fatigue dos', 'VTC & longs trajets']
    },
    en: {
      name: 'Memory Foam Lumbar Cushion',
      tagline: 'Supported back, comfortable journey',
      desc: 'Memory foam lumbar support cushion with universal attachment strap. Reduces back fatigue on long journeys. Suited to ride-share, taxi and delivery drivers. Fits all car seats.',
      features: ['Memory foam', 'Universal strap', 'Reduces back fatigue', 'All car seats']
    }
  },
  {
    id: 'tracker-gps',
    badge: 'NOUVEAU',
    badgeType: 'new',
    price: 39.90,
    oldPrice: 59.90,
    discount: 33,
    rating: 4.7,
    reviews: 318,
    category: 'securite',
    accentColor: '#0a1a2a',
    images: [
      'assets/images/products/tracker-gps-1.jpg.png',
      'assets/images/products/tracker-gps-2.jpg.png',
      'assets/images/products/tracker-gps-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4 C16 4 10 10 10 18 C10 30 24 44 24 44 C24 44 38 30 38 18 C38 10 32 4 24 4Z"/>
      <circle cx="24" cy="18" r="5" fill="var(--red)" stroke="var(--red)"/>
      <path d="M14 44 L34 44" stroke="var(--red)" stroke-width="1.2"/>
    </svg>`,
    fr: {
      name: 'Traceur GPS Voiture Nouvelle Génération',
      tagline: 'Localisez votre véhicule en temps réel',
      desc: 'Traceur GPS ultra-compact avec application mobile iOS/Android. Géolocalisation en temps réel, historique des trajets 90 jours, alertes de mouvement et de zones. Batterie longue durée 60 jours en veille. Idéal pour la protection anti-vol de votre véhicule.',
      features: ['Temps réel via app', 'Historique 90 jours', 'Alerte mouvement', 'Batterie 60 jours']
    },
    en: {
      name: 'Next-Gen Car GPS Tracker',
      tagline: 'Locate your vehicle in real time',
      desc: 'Ultra-compact GPS tracker with iOS/Android app. Real-time geolocation, 90-day route history, movement and zone alerts. Long-life battery lasting 60 days in standby. Ideal for vehicle anti-theft protection.',
      features: ['Real-time app', '90-day history', 'Motion alert', '60-day battery']
    }
  },
  {
    id: 'dashcam-4k-wifi',
    badge: '-31%',
    badgeType: 'promo',
    price: 89.90,
    oldPrice: 129.90,
    discount: 31,
    rating: 4.8,
    reviews: 427,
    category: 'technologie',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/dashcam-4k-wifi-1.jpg.png',
      'assets/images/products/dashcam-4k-wifi-2.jpg.png',
      'assets/images/products/dashcam-4k-wifi-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="14" width="30" height="20" rx="3"/>
      <circle cx="19" cy="24" r="6"/>
      <circle cx="19" cy="24" r="2.5" fill="var(--red)" stroke="var(--red)"/>
      <path d="M34 18 L42 15 L42 33 L34 30"/>
      <path d="M38 8 Q44 10 44 15" stroke="var(--red)" stroke-width="1.4"/>
      <path d="M36 10 Q40 12 40 16" stroke="var(--red)" stroke-width="1.4"/>
    </svg>`,
    fr: {
      name: 'Dashcam 4K WiFi Avant/Arrière Connectée',
      tagline: 'Contrôlez depuis votre smartphone',
      desc: 'Dashcam double objectif 4K Ultra HD avant + Full HD 1080P arrière. Application WiFi pour visualiser, télécharger et paramétrer depuis votre téléphone, tablette ou ordinateur. Grand angle 170°, vision nocturne Sony STARVIS, GPS intégré, mode parking automatique.',
      features: ['4K avant / HD arrière', 'App WiFi iOS & Android', 'GPS intégré', 'Mode parking auto']
    },
    en: {
      name: '4K WiFi Connected Front/Rear Dashcam',
      tagline: 'Control from your smartphone',
      desc: '4K Ultra HD front + Full HD 1080P rear dual-lens dashcam. WiFi app to view, download and configure from your phone, tablet or computer. 170° wide angle, Sony STARVIS night vision, built-in GPS, automatic parking mode.',
      features: ['4K front / HD rear', 'WiFi app iOS & Android', 'Built-in GPS', 'Auto parking mode']
    }
  },
  {
    id: 'dashcam-4g',
    badge: 'PRO',
    badgeType: 'new',
    price: 129.90,
    oldPrice: 179.90,
    discount: 28,
    rating: 4.7,
    reviews: 156,
    category: 'technologie',
    accentColor: '#0a1a0a',
    images: [
      'assets/images/products/dashcam-4g-1.jpg.png',
      'assets/images/products/dashcam-4g-2.jpg.png',
      'assets/images/products/dashcam-4g-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="14" width="30" height="20" rx="3"/>
      <circle cx="19" cy="24" r="6"/>
      <circle cx="19" cy="24" r="2.5" fill="var(--red)" stroke="var(--red)"/>
      <path d="M34 18 L42 15 L42 33 L34 30"/>
      <line x1="36" y1="6" x2="36" y2="10"/>
      <line x1="39" y1="7" x2="39" y2="10"/>
      <line x1="42" y1="5" x2="42" y2="10"/>
    </svg>`,
    fr: {
      name: 'Dashcam 4G/5G Surveillance Temps Réel',
      tagline: 'Surveillance à distance, même à l\'étranger',
      desc: 'Dashcam professionnelle 4G/5G avec surveillance en temps réel depuis n\'importe où dans le monde. Double objectif Full HD, SIM intégrée, alertes instantanées par notification, accès live via app. Idéale pour flotte, VTC, livreurs et conducteurs fréquents à l\'étranger.',
      features: ['4G/5G SIM intégrée', 'Live streaming mondial', 'Alertes instantanées', 'Double objectif HD']
    },
    en: {
      name: '4G/5G Real-Time Surveillance Dashcam',
      tagline: 'Remote monitoring, even abroad',
      desc: 'Professional 4G/5G dashcam with real-time monitoring from anywhere in the world. Dual Full HD lens, built-in SIM, instant push notifications, live access via app. Ideal for fleets, ride-share drivers, couriers and frequent travellers abroad.',
      features: ['4G/5G built-in SIM', 'Global live stream', 'Instant alerts', 'Dual HD lens']
    }
  },
  {
    id: 'scanner-obd2',
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    price: 24.90,
    oldPrice: 39.90,
    discount: 38,
    rating: 4.9,
    reviews: 1124,
    category: 'technologie',
    accentColor: '#1a1a0a',
    images: [
      'assets/images/products/scanner-obd2-1.jpg.png',
      'assets/images/products/scanner-obd2-2.jpg.png',
      'assets/images/products/scanner-obd2-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="24" height="32" rx="3"/>
      <path d="M20 8 L20 4 L28 4 L28 8"/>
      <rect x="16" y="14" width="16" height="8" rx="1" stroke="var(--red)"/>
      <line x1="16" y1="28" x2="32" y2="28"/>
      <line x1="16" y1="32" x2="26" y2="32"/>
      <circle cx="30" cy="32" r="2" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Scanner Diagnostic OBD2 Bluetooth',
      tagline: 'Lisez et effacez les codes erreur voiture',
      desc: 'Scanner OBD2 Bluetooth 5.0 compatible iOS et Android. Lisez plus de 3 000 codes d\'erreur, effacez le voyant moteur, suivez les données en temps réel (température, consommation, RPM). Compatible toutes marques depuis 2001. Application gratuite incluse.',
      features: ['3000+ codes erreur', 'Efface voyant moteur', 'Données temps réel', 'Toutes marques 2001+']
    },
    en: {
      name: 'OBD2 Bluetooth Diagnostic Scanner',
      tagline: 'Read and clear your car error codes',
      desc: 'Bluetooth 5.0 OBD2 scanner compatible with iOS and Android. Read over 3,000 error codes, clear the engine warning light, monitor live data (temperature, fuel consumption, RPM). Compatible with all brands since 2001. Free app included.',
      features: ['3000+ error codes', 'Clear engine light', 'Live data', 'All brands 2001+']
    }
  },
  {
    id: 'camera-recul',
    badge: '-36%',
    badgeType: 'promo',
    price: 34.90,
    oldPrice: 54.90,
    discount: 36,
    rating: 4.7,
    reviews: 589,
    category: 'securite',
    accentColor: '#0a1a0a',
    images: [
      'assets/images/products/camera-recul-1.jpg.png',
      'assets/images/products/camera-recul-2.jpg.png',
      'assets/images/products/camera-recul-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="12" width="20" height="16" rx="3"/>
      <circle cx="24" cy="20" r="5"/>
      <circle cx="24" cy="20" r="2" fill="var(--red)" stroke="var(--red)"/>
      <path d="M8 18 L14 15 L14 25 L8 22 Z"/>
      <path d="M10 30 L38 30 L34 38 L14 38 Z"/>
      <line x1="20" y1="30" x2="20" y2="38"/>
      <line x1="28" y1="30" x2="28" y2="38"/>
    </svg>`,
    fr: {
      name: 'Caméra de Recul Sans Fil HD',
      tagline: 'Reculez sans stress, voyez tout',
      desc: 'Caméra de recul sans fil étanche IP67, grand angle 170°, vision nocturne infrarouge. Transmission sans fil stable jusqu\'à 10m. Installation en 10 minutes sans perçage. Compatible avec tous les autoradios Android et écrans de recul. Image miroir activable.',
      features: ['Sans fil IP67', 'Grand angle 170°', 'Vision nocturne', 'Installation 10 min']
    },
    en: {
      name: 'Wireless HD Reversing Camera',
      tagline: 'Reverse stress-free, see everything',
      desc: 'IP67 waterproof wireless reversing camera, 170° wide angle, infrared night vision. Stable wireless transmission up to 10m. 10-minute installation without drilling. Compatible with all Android car radios and reversing screens. Mirror image toggle.',
      features: ['Wireless IP67', '170° wide angle', 'Night vision', '10-min install']
    }
  },
  {
    id: 'detecteur-angle-mort',
    badge: '-38%',
    badgeType: 'promo',
    price: 49.90,
    oldPrice: 79.90,
    discount: 38,
    rating: 4.6,
    reviews: 284,
    category: 'securite',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/detecteur-angle-mort-1.jpg.png',
      'assets/images/products/detecteur-angle-mort-2.jpg.png',
      'assets/images/products/detecteur-angle-mort-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="18" width="28" height="14" rx="2"/>
      <path d="M34 22 L44 18 L44 32 L34 28"/>
      <path d="M38 12 Q46 16 46 25" stroke="var(--red)" stroke-width="1.4" stroke-dasharray="2 2"/>
      <path d="M36 14 Q42 18 42 25" stroke="var(--red)" stroke-width="1.4" stroke-dasharray="2 2"/>
      <circle cx="10" cy="25" r="3" fill="var(--red)" stroke="var(--red)"/>
    </svg>`,
    fr: {
      name: 'Détecteur d\'Angle Mort Radar BSM',
      tagline: 'Changez de voie en toute sécurité',
      desc: 'Système de détection d\'angle mort (BSM) avec capteurs radar 24GHz. Alerte visuelle sur rétroviseurs et sonore au changement de voie. Détection jusqu\'à 3m de distance, vitesse min 30km/h. Installation sans perçage avec adhésif 3M inclus. Compatible tous véhicules.',
      features: ['Radar 24GHz', 'Alerte visuelle + sonore', 'Détection 3m', 'Sans perçage']
    },
    en: {
      name: 'Blind Spot Radar Detector BSM',
      tagline: 'Change lanes with total confidence',
      desc: '24GHz radar blind spot monitoring (BSM) system. Visual alert on mirrors and audible warning when changing lane. Detection up to 3m, minimum speed 30km/h. No-drill installation with 3M adhesive included. Compatible with all vehicles.',
      features: ['24GHz radar', 'Visual + audio alert', '3m detection', 'No-drill install']
    }
  },
  {
    id: 'chargeur-qi',
    badge: 'NOUVEAU',
    badgeType: 'new',
    price: 29.90,
    oldPrice: 44.90,
    discount: 33,
    rating: 4.7,
    reviews: 398,
    category: 'technologie',
    accentColor: '#0a0a1a',
    images: [
      'assets/images/products/chargeur-qi-1.jpg.png',
      'assets/images/products/chargeur-qi-2.jpg.png',
      'assets/images/products/chargeur-qi-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="8" width="20" height="32" rx="4"/>
      <path d="M20 22 L24 18 L24 24 L28 20" stroke="var(--red)" stroke-width="2"/>
      <path d="M8 24 Q8 18 14 16" stroke="var(--red)" stroke-width="1.4" stroke-dasharray="2 2"/>
      <path d="M40 24 Q40 18 34 16" stroke="var(--red)" stroke-width="1.4" stroke-dasharray="2 2"/>
      <path d="M20 40 L28 40"/>
    </svg>`,
    fr: {
      name: 'Chargeur Qi Voiture Sans Fil 15W',
      tagline: 'Posez, chargez, roulez',
      desc: 'Chargeur sans fil voiture 15W compatible Qi, MagSafe et charge rapide. Support auto-serrant s\'ouvre et se ferme automatiquement. Ventouse pare-brise ou grille d\'aération. Compatible iPhone 12/13/14/15 et Samsung Galaxy. Câble USB-C inclus.',
      features: ['15W charge rapide', 'Compatible MagSafe', 'Auto-serrant', 'Ventouse + grille']
    },
    en: {
      name: '15W Wireless Car Charger Qi',
      tagline: 'Place it, charge it, drive',
      desc: '15W Qi-compatible wireless car charger with MagSafe and fast charge support. Auto-clamping mount opens and closes automatically. Windscreen suction or air vent mounting. Compatible with iPhone 12/13/14/15 and Samsung Galaxy. USB-C cable included.',
      features: ['15W fast charge', 'MagSafe compatible', 'Auto-clamp', 'Suction + vent']
    }
  },
  {
    id: 'lampe-torche-aimantee',
    badge: '-33%',
    badgeType: 'promo',
    price: 19.90,
    oldPrice: 29.90,
    discount: 33,
    rating: 4.7,
    reviews: 463,
    category: 'securite',
    accentColor: '#1a1a00',
    images: [
      'assets/images/products/lampe-torche-aimantee-1.jpg.png',
      'assets/images/products/lampe-torche-aimantee-2.jpg.png',
      'assets/images/products/lampe-torche-aimantee-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8 L30 8 L34 20 L14 20 Z"/>
      <rect x="16" y="20" width="16" height="18" rx="2"/>
      <path d="M20 38 L20 44 L28 44 L28 38"/>
      <circle cx="24" cy="14" r="4" fill="var(--red)" stroke="var(--red)"/>
      <path d="M10 42 Q10 38 14 38 Q14 42 10 42 Z" fill="currentColor" stroke="none"/>
      <path d="M38 42 Q38 38 34 38 Q34 42 38 42 Z" fill="currentColor" stroke="none"/>
      <line x1="14" y1="26" x2="34" y2="26" stroke="var(--red)" stroke-width="1.2"/>
    </svg>`,
    fr: {
      name: 'Lampe Torche Multifonction Aimantée',
      tagline: 'Éclairage pro, mains libres',
      desc: 'Lampe torche rechargeable USB-C avec aimant puissant pour fixation sous capot ou sur carrosserie. Tête pivotante 180°, 3 modes d\'éclairage (fort, faible, SOS clignotant), 800 lumens. Autonomie 8h. Corps aluminium anti-choc. Idéale pour les pannes et interventions nocturnes.',
      features: ['Aimant puissant', 'Tête pivotante 180°', 'Mode SOS clignotant', 'Rechargeable USB-C']
    },
    en: {
      name: 'Magnetic Multifunction Torch',
      tagline: 'Pro lighting, hands-free',
      desc: 'USB-C rechargeable torch with powerful magnet for hands-free fixing under the bonnet or on bodywork. 180° pivoting head, 3 lighting modes (high, low, SOS flash), 800 lumens. 8h battery life. Anti-shock aluminium body. Ideal for breakdowns and night-time work.',
      features: ['Powerful magnet', '180° pivot head', 'SOS flash mode', 'USB-C rechargeable']
    }
  },
  {
    id: 'kit-securite-routiere',
    badge: 'ESSENTIEL',
    badgeType: 'bestseller',
    price: 29.90,
    oldPrice: 44.90,
    discount: 33,
    rating: 4.8,
    reviews: 876,
    category: 'securite',
    accentColor: '#1a0800',
    images: [
      'assets/images/products/kit-securite-routiere-1.jpg.png',
      'assets/images/products/kit-securite-routiere-2.jpg.png',
      'assets/images/products/kit-securite-routiere-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4 L40 10 L40 26 Q40 38 24 44 Q8 38 8 26 L8 10 Z"/>
      <path d="M14 24 L14 34 L34 34 L34 24 Z"/>
      <path d="M18 24 L18 20 Q18 16 24 16 Q30 16 30 20 L30 24"/>
      <path d="M16 30 L32 28" stroke="var(--red)" stroke-width="1.2"/>
      <path d="M16 32 L32 30" stroke="var(--red)" stroke-width="1.2"/>
    </svg>`,
    fr: {
      name: 'Kit Sécurité Routière Complet Homologué',
      tagline: 'Obligation légale, tranquillité assurée',
      desc: 'Kit sécurité routière complet conforme à la législation française et européenne. Inclus : gilet haute visibilité CE EN471 taille universelle, triangle de signalisation homologué, brise-glace + coupe-ceinture, trousse de secours 18 soins. Rangé dans une pochette compacte pour coffre.',
      features: ['Gilet CE EN471', 'Triangle homologué', 'Brise-glace + coupe-ceinture', 'Trousse 18 soins']
    },
    en: {
      name: 'Complete Approved Road Safety Kit',
      tagline: 'Legal requirement, total peace of mind',
      desc: 'Complete road safety kit compliant with French and European regulations. Includes: CE EN471 high-visibility vest (universal size), approved warning triangle, glass breaker + belt cutter, 18-piece first aid kit. Stored in a compact boot bag.',
      features: ['CE EN471 vest', 'Approved triangle', 'Glass breaker + belt cutter', '18-piece first aid']
    }
  },
  {
    id: 'plot-retractable',
    badge: '-30%',
    badgeType: 'promo',
    price: 34.90,
    oldPrice: 49.90,
    discount: 30,
    rating: 4.6,
    reviews: 198,
    category: 'securite',
    accentColor: '#1a0800',
    images: [
      'assets/images/products/plot-retractable-1.jpg.png',
      'assets/images/products/plot-retractable-2.jpg.png',
      'assets/images/products/plot-retractable-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8 L28 8 L34 36 L14 36 Z" fill="var(--red)" stroke="var(--red)" stroke-width="1"/>
      <path d="M16 36 L32 36 L34 42 L14 42 Z"/>
      <line x1="15" y1="18" x2="33" y2="18" stroke="white" stroke-width="2"/>
      <line x1="13" y1="28" x2="35" y2="28" stroke="white" stroke-width="2"/>
    </svg>`,
    fr: {
      name: 'Plot de Signalisation Rétractable Orange (Lot de 4)',
      tagline: 'Délimitez la zone, sécurisez les lieux',
      desc: 'Lot de 4 plots de signalisation pliables haute visibilité couleur orange. Design rétractable compact pour un rangement facile dans le coffre. Base lestée anti-renversement, bandes réfléchissantes. Idéals pour délimiter une zone de panne, un accident ou un stationnement temporaire.',
      features: ['Lot de 4 plots', 'Pliables compacts', 'Base lestée', 'Bandes réfléchissantes']
    },
    en: {
      name: 'Retractable Orange Safety Cone Set (Pack of 4)',
      tagline: 'Mark the zone, secure the scene',
      desc: 'Pack of 4 foldable high-visibility orange safety cones. Compact collapsible design for easy boot storage. Weighted anti-tip base, reflective strips. Ideal for marking breakdown zones, accidents or temporary parking areas.',
      features: ['Pack of 4', 'Collapsible compact', 'Weighted base', 'Reflective strips']
    }
  },
  {
    id: 'panneau-led',
    badge: 'TENDANCE',
    badgeType: 'new',
    price: 39.90,
    oldPrice: 59.90,
    discount: 33,
    rating: 4.7,
    reviews: 534,
    category: 'technologie',
    accentColor: '#00081a',
    images: [
      'assets/images/products/panneau-led-1.jpg.png',
      'assets/images/products/panneau-led-2.jpg.png',
      'assets/images/products/panneau-led-3.jpg.png',
    ],
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="40" height="24" rx="3"/>
      <rect x="8" y="16" width="32" height="16" rx="1" stroke="var(--red)"/>
      <circle cx="13" cy="24" r="1.5" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="18" cy="24" r="1.5" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="23" cy="24" r="1.5" fill="var(--red)" stroke="var(--red)"/>
      <circle cx="28" cy="24" r="1.5" fill="currentColor" stroke="currentColor"/>
      <circle cx="33" cy="24" r="1.5" fill="currentColor" stroke="currentColor"/>
      <line x1="13" y1="20" x2="28" y2="20" stroke="var(--red)" stroke-width="1"/>
      <line x1="13" y1="28" x2="23" y2="28" stroke="var(--red)" stroke-width="1"/>
    </svg>`,
    fr: {
      name: 'Panneau LED Intelligent Messagerie Voiture',
      tagline: 'Communiquez sur la route avec style',
      desc: 'Panneau LED intelligent à placer sur la plage arrière ou la lunette. Application Bluetooth pour personnaliser vos messages en temps réel : "En panne", "Pneu crevé", "Merci", emojis et messages libres. 32 messages prédéfinis, 5 niveaux de luminosité, animation scrolling. Alimente sur allume-cigare 12V.',
      features: ['App Bluetooth incluse', '32 messages prédéfinis', 'Messages personnalisés', '5 niveaux luminosité']
    },
    en: {
      name: 'Smart LED Car Message Board',
      tagline: 'Communicate on the road in style',
      desc: 'Smart LED panel for rear parcel shelf or window. Bluetooth app to customise messages in real time: "Broken down", "Flat tyre", "Thank you", emojis and free text. 32 preset messages, 5 brightness levels, scrolling animation. Powered via 12V car socket.',
      features: ['Bluetooth app', '32 preset messages', 'Custom messages', '5 brightness levels']
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
    fr: { text: 'Franchement nickel ce petit aspirateur. Ma voiture était dans un état... là c\'est fait en 10 min sans câble qui traîne. L\'aspiration est bonne pour la taille, la batterie tient bien. Reçu rapidement, bien emballé. Je l\'ai mis direct dans le coffre.' },
    en: { text: 'Honestly great little vacuum. My car was a state... done in 10 min without trailing cables. Good suction for its size, battery holds well. Arrived fast, well packaged. Went straight into my trunk.' }
  },
  {
    name: 'Sophie L.',
    city: 'Paris',
    rating: 5,
    product: 'Compresseur d\'Air Sans Fil',
    productId: 'compresseur-air',
    photos: ['assets/images/reviews/review-compresseur.jpg'],
    fr: { text: 'J\'avais peur que ce soit un gadget mais non. J\'ai eu un pneu légèrement à plat, réglé en 3 minutes. Il s\'arrête tout seul à la pression voulue. Compact, je le laisse dans la voiture en permanence. Bon achat.' },
    en: { text: 'I was afraid it\'d be a gimmick but no. Had a slightly flat tire, sorted in 3 minutes. Stops automatically at the set pressure. Compact, I leave it in the car permanently. Good purchase.' }
  },
  {
    name: 'Marc D.',
    city: 'Marseille',
    rating: 5,
    product: 'Dashcam Full HD 1080P',
    productId: 'dashcam-4k',
    photos: ['assets/images/reviews/review-dashcam.jpg'],
    fr: { text: 'Installation facile, image correcte même de nuit. J\'ai eu un accrochage en parking la semaine dernière, la vidéo était claire et exploitable. Le mode boucle tourne tout seul, pas besoin d\'y toucher. Satisfait.' },
    en: { text: 'Easy install, decent image quality even at night. Had a parking incident last week, the footage was clear and usable. Loop mode runs on its own, no fiddling needed. Satisfied.' }
  },
  {
    name: 'Julie R.',
    city: 'Bordeaux',
    rating: 5,
    product: 'Machine à Polir Sans Fil',
    productId: 'machine-polir',
    fr: { text: 'Je m\'attendais pas à ce résultat. J\'ai testé sur les rayures de ma Clio et ça a vraiment bien effacé. Le kit avec les disques est inclus, prise en main rapide. Petite batterie donc on travaille par zones, mais le rendu est là.' },
    en: { text: 'Didn\'t expect this result. Tested on my Clio\'s scratches and it really erased them well. Kit with pads included, quick to get started. Small battery so you work in sections, but the finish is there.' }
  },
  {
    name: 'Antoine B.',
    city: 'Toulouse',
    rating: 5,
    product: 'Kit Mains Libres 360°',
    productId: 'support-telephone',
    photos: ['assets/images/reviews/review-support-telephone.jpg'],
    fr: { text: 'J\'en ai essayé trois ou quatre avant celui-là. Le téléphone tient vraiment, même sur les mauvaises routes. Ça fait des mois, il n\'a jamais bougé. Fixation aimantée solide, bras stable. J\'en ai pris un deuxième pour ma femme.' },
    en: { text: 'Tried three or four before this one. The phone really holds, even on rough roads. Months later it hasn\'t moved once. Strong magnetic mount, stable arm. Got a second one for my wife.' }
  },
  {
    name: 'Camille F.',
    city: 'Nantes',
    rating: 5,
    product: 'TPMS Surveillance Pneus',
    productId: 'tpms',
    fr: { text: 'Pas le produit le plus glamour mais vraiment utile. Il m\'a alerté une fois sur un pneu qui perdait de l\'air, j\'aurais jamais vu ça à l\'oeil. Installation rapide sur les valves. Je recommande, surtout si vous roulez beaucoup.' },
    en: { text: 'Not the most glamorous product but genuinely useful. Alerted me to a slow leak I would never have spotted by eye. Quick install on the valves. I recommend it, especially if you drive a lot.' }
  },
  {
    name: 'Nicolas P.',
    city: 'Strasbourg',
    rating: 5,
    product: 'Table de Travail Volant',
    productId: 'table-volant',
    photos: ['assets/images/reviews/review-table-volant.jpg'],
    fr: { text: 'Représentant commercial, je passe mes journées dans la voiture. Cette table c\'est idéal pour remplir mes bons de commande ou déjeuner rapidement. Solide, ça ne bouge pas. J\'aurais eu besoin de ça depuis des années.' },
    en: { text: 'Sales rep, I spend my days in the car. This desk is ideal for filling order forms or eating quickly. Solid, doesn\'t budge. I could have used one of these for years.' }
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
    fr: { text: 'Reçu rapidement, bien emballé. J\'ai des enfants donc la voiture ramasse tout — là j\'aspire en 5 min sans sortir de câble. Bonne puissance pour la taille, charge en USB. Je le garde dans le coffre et j\'en ai besoin souvent. Content de cet achat.' },
    en: { text: 'Arrived quickly, well packaged. I have kids so the car collects everything — now I vacuum in 5 min without any cables. Good suction for its size, USB charging. Keeps in the trunk and I use it often. Happy with this purchase.' }
  },
  {
    name: 'Maykel.V',
    city: 'Paris',
    rating: 5,
    product: 'Dashcam Full HD 1080P',
    productId: 'dashcam-4k',
    photos: [
      'assets/images/reviews/review-maykel-dashcam-1.jpg',
      'assets/images/reviews/review-maykel-dashcam-2.jpg',
      'assets/images/reviews/review-maykel-dashcam-3.jpg'
    ],
    fr: { text: 'Installation en moins d\'une heure, l\'image est nette de jour comme de nuit. Je circule beaucoup dans Paris, ça me rassure d\'avoir les trajets enregistrés. Mode parking automatique, pas besoin d\'y toucher. Bonne qualité pour le prix.' },
    en: { text: 'Installed in under an hour, image is sharp day and night. I drive a lot in Paris, having journeys recorded is reassuring. Parking mode is automatic, no need to fiddle. Good quality for the price.' }
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
    fr: { text: 'J\'étais pas convaincu au départ mais je l\'utilise plusieurs fois par semaine. Entre deux rendez-vous, pour manger ou noter deux-trois trucs rapidement. Tient bien sur le volant, stable, s\'installe en quelques secondes. Bon produit pour ce prix.' },
    en: { text: 'Wasn\'t convinced at first but I use it several times a week. Between appointments, for eating or quickly jotting things down. Holds firm on the steering wheel, stable, sets up in seconds. Good product for the price.' }
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
    fr: { text: 'Posés il y a environ 6 semaines. Ça se clipse direct, pas de modification à faire. Sous la pluie la différence est visible, les rétros restent dégagés plus longtemps. Le produit correspond exactement aux photos. Satisfait.' },
    en: { text: 'Put on about 6 weeks ago. Clips on directly, no modification needed. In the rain the difference is noticeable, mirrors stay clear longer. Product matches the photos exactly. Satisfied.' }
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
    fr: { text: 'Pratique d\'avoir ça dans le coffre. J\'ai eu un pneu un peu mou un matin — deux minutes pour le regonfler et j\'étais parti. La pression se règle facilement, il se coupe tout seul quand c\'est bon. Compact, léger. À avoir dans sa voiture.' },
    en: { text: 'Handy to have in the trunk. Had a soft tire one morning — two minutes to top it up and I was off. Pressure is easy to set, cuts off automatically when done. Compact, lightweight. A must for your car.' }
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
    fr: { text: 'Résultat vraiment étonnant. J\'avais des rayures légères sur la carrosserie, j\'ai testé sur une zone et c\'était quasi effacé. Les disques sont bien inclus dans la boîte comme sur mes photos. Notice claire, batterie rechargeable. Je suis repassé dessus depuis, c\'est nickel.' },
    en: { text: 'Really surprising result. Had light scratches on the bodywork, tested on one area and they were nearly gone. Pads included in the box as shown in my photos. Clear instructions, rechargeable battery. Went back over more areas since, spotless.' }
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
    fr: { problem: 'Téléphone qui tombe, pas de GPS disponible', solution: 'Support magnétique + Dashcam Full HD', result: 'Navigation sécurisée, trajets documentés' },
    en: { problem: 'Phone falling, no GPS available', solution: 'Magnetic mount + Full HD Dashcam', result: 'Safe navigation, journeys documented' }
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
    fr: { name: 'Confort', count: 3 },
    en: { name: 'Comfort', count: 3 }
  },
  {
    id: 'securite',
    coverImg: 'assets/images/categories/securite.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M16 4 L28 8 L28 18 Q28 26 16 30 Q4 26 4 18 L4 8 Z"/><path d="M11 16 L14 19 L21 12" stroke="var(--red)"/></svg>`,
    fr: { name: 'Sécurité', count: 3 },
    en: { name: 'Safety', count: 3 }
  },
  {
    id: 'technologie',
    coverImg: 'assets/images/categories/technologie.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="4" y="8" width="20" height="14" rx="2"/><circle cx="14" cy="15" r="4"/><circle cx="14" cy="15" r="1.5" fill="var(--red)" stroke="var(--red)"/><path d="M24 12 L28 10 L28 20 L24 18"/></svg>`,
    fr: { name: 'Technologie', count: 4 },
    en: { name: 'Technology', count: 4 }
  },
  {
    id: 'entretien',
    coverImg: 'assets/images/categories/entretien.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="16" cy="18" r="10"/><circle cx="16" cy="18" r="5" stroke="var(--red)"/><circle cx="16" cy="18" r="1.5" fill="var(--red)" stroke="var(--red)"/><path d="M16 8 L16 4 L20 4"/></svg>`,
    fr: { name: 'Entretien', count: 4 },
    en: { name: 'Maintenance', count: 4 }
  },
  {
    id: 'accessoires',
    coverImg: 'assets/images/categories/accessoires.jpg',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="20" r="5"/><circle cx="22" cy="20" r="5"/><path d="M6 18 Q6 8 16 8 Q26 8 26 18"/><path d="M6 18 L4 14 M26 18 L28 14"/></svg>`,
    fr: { name: 'Accessoires', count: 6 },
    en: { name: 'Accessories', count: 6 }
  }
];
