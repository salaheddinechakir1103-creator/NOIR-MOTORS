import { Vehicle, BookingExtra, Booking } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'ferrari-f8-tributo',
    name: 'Ferrari F8 Tributo',
    brand: 'Ferrari',
    model: 'F8 Tributo',
    category: 'Supercar',
    year: 2024,
    pricePerDayMAD: 14000,
    depositMAD: 80000,
    powerHP: 720,
    acceleration0to100: 2.9,
    topSpeedKmH: 340,
    engine: 'V8 3.9L Bi-Turbo',
    transmission: 'F1 Double Débrayage 7 rapports',
    seats: 2,
    luggageCount: 2,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat', 'Tanger'],
    status: 'Disponible',
    badge: 'Coup de Cœur',
    image: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    gallery: [
      '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
      '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg'
    ],
    colorsAvailable: [
      { name: 'Rosso Corsa', hex: '#d40000' },
      { name: 'Nero Daytona', hex: '#0a0a0c' },
      { name: 'Giallo Modena', hex: '#f6b800' }
    ],
    description: 'La Ferrari F8 Tributo incarne le summum du moteur V8 de Maranello. Avec 720 chevaux et une aérodynamique sculptée issue de la Formule 1, chaque accélération sur les corniches marocaines procure une émotion inaltérable.',
    highlights: [
      'Échappement sport en titane à clapet actif',
      'Freins carbone-céramique Brembo 398mm',
      'Cockpit F1 avec volant carbone et LED de passage',
      'Système Side Slip Control (SSC) 6.1'
    ]
  },
  {
    id: 'mclaren-720s-spider',
    name: 'McLaren 720S Spider',
    brand: 'McLaren',
    model: '720S Spider',
    category: 'Cabriolet',
    year: 2024,
    pricePerDayMAD: 15500,
    depositMAD: 85000,
    powerHP: 720,
    acceleration0to100: 2.8,
    topSpeedKmH: 341,
    engine: 'V8 4.0L Bi-Turbo M840T',
    transmission: 'SSG 7 rapports',
    seats: 2,
    luggageCount: 2,
    availableCities: ['Marrakech', 'Casablanca', 'Tanger'],
    status: 'Disponible',
    badge: 'Exclusivité',
    image: '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
    gallery: [
      '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'Papaya Spark', hex: '#ff6700' },
      { name: 'Onyx Black', hex: '#0f0f11' },
      { name: 'Silica White', hex: '#e8e8ea' }
    ],
    description: 'Une supercar à toit rétractable en verre électrochrome. La 720S Spider conjugue la pureté du châssis en fibre de carbone Monocage II-S avec une vue imprenable sur le ciel de la Palmeraie de Marrakech.',
    highlights: [
      'Toit rigide escamotable en seulement 11 secondes',
      'Portes dièdres emblématiques à ouverture verticale',
      'Suspension Proactive Chassis Control II',
      'Écran d\'instruments repliable pour mode circuit'
    ]
  },
  {
    id: 'rolls-royce-cullinan',
    name: 'Rolls-Royce Cullinan Black Badge',
    brand: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    category: 'SUV Prestige',
    year: 2024,
    pricePerDayMAD: 22000,
    depositMAD: 120000,
    powerHP: 600,
    acceleration0to100: 4.9,
    topSpeedKmH: 250,
    engine: 'V12 6.75L Bi-Turbo',
    transmission: 'Automatique ZF 8 rapports guidée par satellite',
    seats: 5,
    luggageCount: 4,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat'],
    status: 'Disponible',
    badge: 'Exclusivité',
    image: '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
    gallery: [
      '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'Obsidian Black', hex: '#0a0a0c' },
      { name: 'Imperial Dark Silver', hex: '#222327' }
    ],
    description: 'L\'incarnation absolue du luxe tout-terrain. Le Cullinan Black Badge offre le légendaire tapis volant "Magic Carpet Ride" avec un habitacle sur-mesure garni de cuir pleine fleur et ciel de toit étoilé en fibre optique.',
    highlights: [
      'Ciel de toit Starlight avec étoiles filantes animées',
      'Portes arrière antagonistes à fermeture électrique',
      'Système audio haute-fidélité Bespoke 18 haut-parleurs',
      'Compartiment réfrigéré avec flûtes en cristal gravées'
    ]
  },
  {
    id: 'lamborghini-huracan-evo',
    name: 'Lamborghini Huracán EVO Spyder',
    brand: 'Lamborghini',
    model: 'Huracán EVO Spyder',
    category: 'Supercar',
    year: 2024,
    pricePerDayMAD: 16000,
    depositMAD: 90000,
    powerHP: 640,
    acceleration0to100: 3.1,
    topSpeedKmH: 325,
    engine: 'V10 5.2L Atmosphérique',
    transmission: 'LDF 7 rapports double embrayage',
    seats: 2,
    luggageCount: 1,
    availableCities: ['Casablanca', 'Marrakech', 'Tanger', 'Agadir'],
    status: 'Disponible',
    badge: 'Nouveauté',
    image: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    gallery: [
      '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
      '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg'
    ],
    colorsAvailable: [
      { name: 'Arancio Xanto', hex: '#e64900' },
      { name: 'Verde Mantis', hex: '#16a34a' },
      { name: 'Nero Noctis', hex: '#111215' }
    ],
    description: 'Le chant viscéral du V10 atmosphérique de 640 ch montant jusqu\'à 8 500 tr/min. Avec ses 4 roues directrices et son système LDVI prédictif, l\'Huracán EVO transforme chaque trajet en montée d\'adrénaline pure.',
    highlights: [
      'Moteur V10 atmosphérique à sonorité légendaire',
      'Système dynamique prédictif Lamborghini Dinamica Veicolo Integrata',
      'Capote textile ultra-légère manœuvrable en roulant',
      'Interface tactile centrale 8,4 pouces avec télémétrie'
    ]
  },
  {
    id: 'porsche-911-gt3-rs',
    name: 'Porsche 911 GT3 RS (992)',
    brand: 'Porsche',
    model: '911 GT3 RS',
    category: 'Supercar',
    year: 2024,
    pricePerDayMAD: 14500,
    depositMAD: 80000,
    powerHP: 525,
    acceleration0to100: 3.2,
    topSpeedKmH: 296,
    engine: 'Flat-6 4.0L Atmosphérique',
    transmission: 'PDK 7 rapports sport',
    seats: 2,
    luggageCount: 1,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat'],
    status: 'Disponible',
    badge: 'Exclusivité',
    image: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    gallery: [
      '/src/assets/images/experience_atlas_drive_1792768237978.jpg'
    ],
    colorsAvailable: [
      { name: 'Blanc GT & Rouge Pyros', hex: '#f0f0f2' },
      { name: 'Gris Arctique', hex: '#52575d' }
    ],
    description: 'Un monstre d\'appui aérodynamique avec son aileron actif à commande DRS inspiré de la F1. 860 kg d\'appui à 285 km/h et une précision chirurgicale qui sublime les virages les plus exigeants.',
    highlights: [
      'Système DRS (Drag Reduction System) actif au volant',
      'Arceau de sécurité en titane (Pack Weissach)',
      'Réglage compression/détente de suspension depuis le volant',
      'Jantes magnésium forgées ultra-légères'
    ]
  },
  {
    id: 'mercedes-amg-g63',
    name: 'Mercedes-AMG G63 Brabus 800',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG Brabus',
    category: 'SUV Prestige',
    year: 2024,
    pricePerDayMAD: 11000,
    depositMAD: 60000,
    powerHP: 800,
    acceleration0to100: 4.1,
    topSpeedKmH: 240,
    engine: 'V8 4.0L Bi-Turbo Brabus Tuned',
    transmission: 'AMG SPEEDSHIFT TCT 9G',
    seats: 5,
    luggageCount: 4,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Agadir'],
    status: 'Disponible',
    badge: 'Coup de Cœur',
    image: '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
    gallery: [
      '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'Noir Mat Magno', hex: '#18181b' },
      { name: 'Gris Sélénite', hex: '#4b5563' }
    ],
    description: 'L\'emblème de la puissance et de la présence statutaire. Équipé du pack carrosserie large en carbone et des échappements latéraux à valve modulable crachant des flammes, il domine la route royale.',
    highlights: [
      'Échappements latéraux AMG Sport à valves éclairées',
      'Pack carrosserie Brabus Widestar en carbone',
      'Sellerie cuir designo bicolore avec surpiqûres en losange',
      'Trois différentiels blocables à 100%'
    ]
  },
  {
    id: 'lamborghini-urus-performante',
    name: 'Lamborghini Urus Performante',
    brand: 'Lamborghini',
    model: 'Urus Performante',
    category: 'SUV Prestige',
    year: 2024,
    pricePerDayMAD: 15000,
    depositMAD: 75000,
    powerHP: 666,
    acceleration0to100: 3.3,
    topSpeedKmH: 306,
    engine: 'V8 4.0L Bi-Turbo',
    transmission: 'Automatique 8 rapports sport',
    seats: 5,
    luggageCount: 4,
    availableCities: ['Casablanca', 'Marrakech', 'Tanger'],
    status: 'Disponible',
    badge: 'Nouveauté',
    image: '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
    gallery: [
      '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg'
    ],
    colorsAvailable: [
      { name: 'Giallo Auge', hex: '#eab308' },
      { name: 'Nero Noctis', hex: '#111215' }
    ],
    description: 'Le Super SUV affûté pour les performances extrêmes. Capot en fibre de carbone apparente, échappement Akrapovič en titane de série et mode Rallye exclusif pour glisser avec style.',
    highlights: [
      'Ligne complète Akrapovič en titane avec sorties noir mat',
      'Mode de conduite RALLY exclusif sur piste meuble',
      'Abaissement de châssis de 20mm avec voies élargies',
      'Intérieur Alcantara Sportivo avec broderies contrastées'
    ]
  },
  {
    id: 'bentley-continental-gt',
    name: 'Bentley Continental GT Speed V8',
    brand: 'Bentley',
    model: 'Continental GT',
    category: 'Grand Tourer',
    year: 2024,
    pricePerDayMAD: 12500,
    depositMAD: 70000,
    powerHP: 550,
    acceleration0to100: 4.0,
    topSpeedKmH: 318,
    engine: 'V8 4.0L Twin-Turbo',
    transmission: 'Double embrayage 8 rapports',
    seats: 4,
    luggageCount: 3,
    availableCities: ['Casablanca', 'Rabat', 'Tanger'],
    status: 'Disponible',
    image: '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg',
    gallery: [
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'British Racing Green', hex: '#0f3823' },
      { name: 'Beluga Black', hex: '#0a0a0b' }
    ],
    description: 'Le Grand Tourisme aristocratique par excellence. Alliance subtile de placages précieux en bois verni, de métal guilloché façon horlogerie et d\'une réserve de puissance phénoménale.',
    highlights: [
      'Écran rotatif Bentley à 3 faces (tactile, cadrans analogiques, bois)',
      'Cuir matelassé "Diamond-in-Diamond" fait main',
      'Système audio Naim for Bentley 2 200 Watts',
      'Suspension pneumatique active à trois chambres'
    ]
  },
  {
    id: 'aston-martin-dbs',
    name: 'Aston Martin DBS Superleggera',
    brand: 'Aston Martin',
    model: 'DBS Superleggera',
    category: 'Grand Tourer',
    year: 2024,
    pricePerDayMAD: 16500,
    depositMAD: 85000,
    powerHP: 725,
    acceleration0to100: 3.4,
    topSpeedKmH: 340,
    engine: 'V12 5.2L Bi-Turbo',
    transmission: 'ZF 8 rapports monté à l\'arrière',
    seats: 4,
    luggageCount: 2,
    availableCities: ['Casablanca', 'Marrakech'],
    status: 'Disponible',
    image: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    gallery: [
      '/src/assets/images/experience_atlas_drive_1792768237978.jpg'
    ],
    colorsAvailable: [
      { name: 'Hyper Red', hex: '#b91c1c' },
      { name: 'Xenon Grey', hex: '#374151' }
    ],
    description: 'La quintessence du tempérament britannique. 900 Nm de couple délivrés par un V12 impérieux dans une robe en fibre de carbone à la beauté sculpturale.',
    highlights: [
      'Carrosserie intégrale en fibre de carbone haute résistance',
      'Aeroblade II produisant 180 kg d\'appui aérodynamique',
      'Habitacle tapissé de cuir Bridge of Weir sur mesure',
      'Freins carbone-céramique ventilés de compétition'
    ]
  },
  {
    id: 'ferrari-roma',
    name: 'Ferrari Roma Coupé',
    brand: 'Ferrari',
    model: 'Roma',
    category: 'Grand Tourer',
    year: 2024,
    pricePerDayMAD: 11500,
    depositMAD: 65000,
    powerHP: 620,
    acceleration0to100: 3.4,
    topSpeedKmH: 320,
    engine: 'V8 3.9L Bi-Turbo',
    transmission: '8 rapports double débrayage',
    seats: 4,
    luggageCount: 2,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat'],
    status: 'Disponible',
    image: '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
    gallery: [
      '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg'
    ],
    colorsAvailable: [
      { name: 'Grigio Silverstone', hex: '#4b5563' },
      { name: 'Blu Pozzi', hex: '#1e3a8a' }
    ],
    description: 'La Dolce Vita contemporaine. Des lignes pures et fluides qui rendent hommage aux coupés GT Ferrari des années 60, combinées à une technologie numérique de pointe.',
    highlights: [
      'Cockpit enveloppant à double cellule conducteur/passager',
      'Aileron arrière mobile rétractable à 3 positions',
      'Écran conducteur tout numérique 16 pouces incurvé',
      'Manettino Ferrari 5 positions avec mode Race'
    ]
  },
  {
    id: 'porsche-taycan-turbo-s',
    name: 'Porsche Taycan Turbo S',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    category: 'Berline Élite',
    year: 2024,
    pricePerDayMAD: 9500,
    depositMAD: 50000,
    powerHP: 761,
    acceleration0to100: 2.8,
    topSpeedKmH: 260,
    engine: 'Deux moteurs synchrones à aimants permanents',
    transmission: 'Boîte 2 rapports sur essieu arrière',
    seats: 4,
    luggageCount: 3,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat', 'Tanger'],
    status: 'Disponible',
    image: '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg',
    gallery: [
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'Noir Intense Métallisé', hex: '#0f1013' },
      { name: 'Bleu Neptune', hex: '#0284c7' }
    ],
    description: 'La foudre électrique sous le blason de Stuttgart. Une accélération instantanée de 0 à 100 en 2,8s dans un silence olympien, avec le réseau de recharge ultra-rapide partenaire au Maroc.',
    highlights: [
      'Architecture 800V permettant une recharge de 5 à 80% en 22 min',
      'Porsche Electric Sport Sound acoustique studio',
      'Châssis 4D avec contrôle dynamique du roulis PDCC Sport',
      'Toit panoramique à occultation sélective à cristaux liquides'
    ]
  },
  {
    id: 'range-rover-sv',
    name: 'Range Rover SV Long Wheelbase',
    brand: 'Land Rover',
    model: 'Range Rover SV',
    category: 'SUV Prestige',
    year: 2024,
    pricePerDayMAD: 13500,
    depositMAD: 75000,
    powerHP: 530,
    acceleration0to100: 4.6,
    topSpeedKmH: 261,
    engine: 'V8 4.4L Twin-Turbo',
    transmission: 'Automatique ZF 8 rapports',
    seats: 5,
    luggageCount: 5,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Agadir'],
    status: 'Disponible',
    image: '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
    gallery: [
      '/src/assets/images/service_vip_chauffeur_1792768236202.jpg'
    ],
    colorsAvailable: [
      { name: 'Santorini Black', hex: '#111216' },
      { name: 'Charente Grey', hex: '#374151' }
    ],
    description: 'Le sanctuaire mobile des dignitaires et voyageurs d\'affaires. Empattement long offrant un espace royal aux passagers arrière avec sièges massants aux pierres chaudes.',
    highlights: [
      'Sièges arrière Executive Class Comfort-Plus massants',
      'Tablettes de travail à déploiement électro-mécanique',
      'Réduction active du bruit de roulement dans les appuie-tête',
      'Direction intégrale à 4 roues directrices à 7 degrés'
    ]
  },
  {
    id: 'maserati-mc20-cielo',
    name: 'Maserati MC20 Cielo Spyder',
    brand: 'Maserati',
    model: 'MC20 Cielo',
    category: 'Cabriolet',
    year: 2024,
    pricePerDayMAD: 14500,
    depositMAD: 80000,
    powerHP: 630,
    acceleration0to100: 2.9,
    topSpeedKmH: 325,
    engine: 'V6 3.0L Nettuno Twin-Turbo F1 Tech',
    transmission: 'Double embrayage 8 rapports',
    seats: 2,
    luggageCount: 1,
    availableCities: ['Marrakech', 'Casablanca'],
    status: 'Disponible',
    image: '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg',
    gallery: [
      '/src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg'
    ],
    colorsAvailable: [
      { name: 'Acquamarina', hex: '#0ea5e9' },
      { name: 'Nero Enigma', hex: '#18181b' }
    ],
    description: 'Le retour triomphal du Trident en compétition. Son moteur breveté Nettuno à préchambre de combustion F1 offre une vivacité et un son rauque inimitables.',
    highlights: [
      'Moteur Nettuno breveté à double injection et préchambre F1',
      'Toit en verre intelligent PDLC à transparence variable',
      'Portes papillon papillonantes spectaculaires',
      'Châssis monocoque en carbone développé avec Dallara'
    ]
  },
  {
    id: 'bmw-m8-competition',
    name: 'BMW M8 Competition Gran Coupé',
    brand: 'BMW',
    model: 'M8 Competition',
    category: 'Berline Élite',
    year: 2024,
    pricePerDayMAD: 8500,
    depositMAD: 45000,
    powerHP: 625,
    acceleration0to100: 3.2,
    topSpeedKmH: 305,
    engine: 'V8 4.4L M TwinPower Turbo',
    transmission: 'M Steptronic 8 rapports avec Drivelogic',
    seats: 5,
    luggageCount: 3,
    availableCities: ['Casablanca', 'Rabat', 'Tanger'],
    status: 'Disponible',
    image: '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg',
    gallery: [
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'Frozen Marina Bay Blue', hex: '#1d4ed8' },
      { name: 'Black Sapphire', hex: '#0f172a' }
    ],
    description: 'La berline grand tourisme la plus musclée de BMW Motorsport. Transmission intégrale M xDrive commutable en pure propulsion arrière pour les puristes du pilotage.',
    highlights: [
      'Transmission intégrale M xDrive commutable 2WD propulsion',
      'Système audio Bowers & Wilkins Diamond Surround 1400W',
      'Toit carbone M allégeant le centre de gravité',
      'Pack M Driver débridant la vitesse à 305 km/h'
    ]
  },
  {
    id: 'audi-rs6-avant',
    name: 'Audi RS6 Avant Performance',
    brand: 'Audi',
    model: 'RS6 Avant',
    category: 'Grand Tourer',
    year: 2024,
    pricePerDayMAD: 8900,
    depositMAD: 45000,
    powerHP: 630,
    acceleration0to100: 3.4,
    topSpeedKmH: 305,
    engine: 'V8 4.0L TFSI Mild-Hybrid',
    transmission: 'Tiptronic 8 rapports quattro',
    seats: 5,
    luggageCount: 5,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat', 'Tanger'],
    status: 'Disponible',
    image: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    gallery: [
      '/src/assets/images/experience_atlas_drive_1792768237978.jpg'
    ],
    colorsAvailable: [
      { name: 'Gris Nardo', hex: '#64748b' },
      { name: 'Noir Mythic', hex: '#111827' }
    ],
    description: 'L\'icône absolue des breaks de super-chasse. Silhouette d\'une agressivité ravageuse avec voies élargies de 80mm et motricité légendaire quattro permanente.',
    highlights: [
      'Différentiel arrière quattro sport actif',
      'Phares Matrix LED laser avec signature animée RS',
      'Système d\'échappement RS Sport à double sortie ovale',
      'Coffre gigantesque de 565 litres idéal pour les voyages'
    ]
  },
  {
    id: 'mercedes-maybach-s680',
    name: 'Mercedes-Maybach S 680 4MATIC V12',
    brand: 'Mercedes-Benz',
    model: 'Maybach S 680',
    category: 'Berline Élite',
    year: 2024,
    pricePerDayMAD: 25000,
    depositMAD: 140000,
    powerHP: 612,
    acceleration0to100: 4.5,
    topSpeedKmH: 250,
    engine: 'V12 6.0L Bi-Turbo',
    transmission: '9G-TRONIC 4MATIC',
    seats: 4,
    luggageCount: 4,
    availableCities: ['Casablanca', 'Marrakech', 'Rabat'],
    status: 'Disponible',
    badge: 'Exclusivité',
    image: '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
    gallery: [
      '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
      '/src/assets/images/showroom_morocco_lounge_1792768237075.jpg'
    ],
    colorsAvailable: [
      { name: 'Bicolore Noir Obsidienne & Argent High-Tech', hex: '#1e293b' },
      { name: 'Noir Onyx Intégral', hex: '#090a0f' }
    ],
    description: 'Le palace roulant doté du légendaire douze cylindres en V. Conçu pour les délégations officielles, mariages royaux et personnalités exigeant le confort suprême.',
    highlights: [
      'Peinture bicolore polie à la main avec filet de séparation',
      'Portes confort arrière à fermeture motorisée automatique',
      'Sièges Première Classe inclinables à 43,5 degrés avec repose-mollets',
      'Système audio 4D Burmester High-End à 31 haut-parleurs'
    ]
  }
];

export const BOOKING_EXTRAS: BookingExtra[] = [
  {
    id: 'chauffeur-vip',
    name: 'Chauffeur VIP Privé',
    description: 'Chauffeur bilingue de sécurité protocolaire en tenue d\'apparat (service 10h/jour)',
    pricePerDayMAD: 1200,
    iconName: 'UserCheck'
  },
  {
    id: 'assurance-zero-franchise',
    name: 'Assurance Tous Risques Zéro Franchise',
    description: 'Protection totale carrosserie, bris de glace, jantes et rachat complet de caution',
    pricePerDayMAD: 950,
    iconName: 'ShieldCheck'
  },
  {
    id: 'livraison-aeroport',
    name: 'Livraison VIP Aéroport / Villa',
    description: 'Accueil personnalisé au salon VIP des aéroports (Menara, Mohammed V, Ibn Battouta) ou villa privée',
    pricePerDayMAD: 600,
    iconName: 'Plane'
  },
  {
    id: 'kit-gopro-drone',
    name: 'Pack Média Souvenir (GoPro 4K & Drone)',
    description: 'Caméra embarquée 4K installée sur le véhicule pour immortaliser vos routes dans l\'Atlas',
    pricePerDayMAD: 450,
    iconName: 'Camera'
  },
  {
    id: 'siege-enfant-cuir',
    name: 'Siège Enfant Cuir Isomount',
    description: 'Siège auto ergonomique homologué habillé de cuir nappa assorti à l\'habitacle',
    pricePerDayMAD: 250,
    iconName: 'Baby'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1082',
    referenceCode: 'NOIR-2026-8812',
    vehicleId: 'ferrari-f8-tributo',
    vehicleName: 'Ferrari F8 Tributo',
    vehicleImage: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    customerName: 'Yassine Benjelloun',
    customerEmail: 'y.benjelloun@finance.ma',
    customerPhone: '+212 661 14 25 36',
    city: 'Marrakech',
    pickupLocation: 'Aéroport Marrakech Menara (VIP Terminal)',
    dropoffLocation: 'Hôtel La Mamounia, Marrakech',
    startDate: '2026-10-25',
    endDate: '2026-10-28',
    totalDays: 3,
    basePriceMAD: 42000,
    discountMAD: 4200, // 10% discount for 3+ days
    extrasMAD: 3600, // Chauffeur
    totalPriceMAD: 41400,
    depositMAD: 80000,
    selectedExtras: ['chauffeur-vip'],
    status: 'Confirmée',
    createdAt: '2026-10-22T14:30:00Z',
    specialRequests: 'Véhicule lustré et bouteille d\'eau minérale fraîche à bord.'
  },
  {
    id: 'bk-1083',
    referenceCode: 'NOIR-2026-8813',
    vehicleId: 'rolls-royce-cullinan',
    vehicleName: 'Rolls-Royce Cullinan Black Badge',
    vehicleImage: '/src/assets/images/service_vip_chauffeur_1792768236202.jpg',
    customerName: 'Kenza Tazi El Alami',
    customerEmail: 'kenza.tazi@groupealami.com',
    customerPhone: '+212 662 48 90 12',
    city: 'Casablanca',
    pickupLocation: 'Four Seasons Hotel Casablanca',
    dropoffLocation: 'Boulevard d\'Anfa, Casablanca',
    startDate: '2026-10-26',
    endDate: '2026-10-27',
    totalDays: 1,
    basePriceMAD: 22000,
    discountMAD: 0,
    extrasMAD: 1800,
    totalPriceMAD: 23800,
    depositMAD: 120000,
    selectedExtras: ['chauffeur-vip', 'livraison-aeroport'],
    status: 'Confirmée',
    createdAt: '2026-10-23T06:15:00Z',
    specialRequests: 'Transfert dîner de gala officiel.'
  },
  {
    id: 'bk-1084',
    referenceCode: 'NOIR-2026-8814',
    vehicleId: 'porsche-911-gt3-rs',
    vehicleName: 'Porsche 911 GT3 RS (992)',
    vehicleImage: '/src/assets/images/experience_atlas_drive_1792768237978.jpg',
    customerName: 'Marc Delvaux',
    customerEmail: 'm.delvaux@luxaviation.ch',
    customerPhone: '+41 79 450 82 11',
    city: 'Tanger',
    pickupLocation: 'Port Tanger Med VIP / Marina Bay',
    dropoffLocation: 'Port Tanger Med VIP',
    startDate: '2026-11-02',
    endDate: '2026-11-05',
    totalDays: 3,
    basePriceMAD: 43500,
    discountMAD: 4350,
    extrasMAD: 2850,
    totalPriceMAD: 42000,
    depositMAD: 80000,
    selectedExtras: ['assurance-zero-franchise'],
    status: 'En attente',
    createdAt: '2026-10-23T07:45:00Z',
    specialRequests: 'Roadtrip le long de la côte méditerranéenne vers Al Hoceima.'
  }
];
