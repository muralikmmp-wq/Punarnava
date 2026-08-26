import { SampleWasteItem, DungNode, ScrapListing, GamificationState, CircularNodeDetail } from '../types';

// High-quality SVG Data URIs for realistic demo visual previews
export const sampleWasteImages = {
  petBottle: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="24" fill="%23E6F7F0"/><rect x="86" y="24" width="28" height="14" rx="3" fill="%23059669"/><rect x="92" y="38" width="16" height="16" fill="%2334D399"/><path d="M78 60 C78 54 86 54 92 54 L108 54 C114 54 122 54 122 60 L126 150 C126 162 116 172 104 172 L96 172 C84 172 74 162 74 150 Z" fill="%236EE7B7" opacity="0.6" stroke="%23059669" stroke-width="3"/><line x1="74" y1="90" x2="126" y2="90" stroke="%23059669" stroke-width="2" stroke-dasharray="4 2"/><line x1="74" y1="125" x2="126" y2="125" stroke="%23059669" stroke-width="2" stroke-dasharray="4 2"/><text x="100" y="112" font-family="sans-serif" font-weight="bold" font-size="12" fill="%23047857" text-anchor="middle">PET #1</text></svg>',
  copperWire: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="24" fill="%23FEF3C7"/><path d="M40 100 C 60 40, 140 40, 160 100 C 140 160, 60 160, 40 100 Z" fill="none" stroke="%23D97706" stroke-width="12" stroke-linecap="round"/><path d="M55 100 C 70 60, 130 60, 145 100 C 130 140, 70 140, 55 100 Z" fill="none" stroke="%23B45309" stroke-width="8" stroke-linecap="round"/><circle cx="100" cy="100" r="18" fill="%23F59E0B"/><text x="100" y="105" font-family="sans-serif" font-weight="bold" font-size="11" fill="%2378350F" text-anchor="middle">Cu 99%</text></svg>',
  aluminumCans: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="24" fill="%23EFF6FF"/><rect x="65" y="45" width="70" height="110" rx="14" fill="%2393C5FD" stroke="%232563EB" stroke-width="3"/><ellipse cx="100" cy="45" rx="35" ry="10" fill="%23DBEAFE" stroke="%232563EB" stroke-width="3"/><ellipse cx="100" cy="50" rx="10" ry="4" fill="%2360A5FA"/><text x="100" y="105" font-family="sans-serif" font-weight="bold" font-size="14" fill="%231E40AF" text-anchor="middle">ALU CAN</text></svg>',
  cardboardBox: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="24" fill="%23FFFBEB"/><path d="M100 35 L160 65 L100 95 L40 65 Z" fill="%23D97706" stroke="%2392400E" stroke-width="2"/><path d="M40 65 L100 95 L100 165 L40 135 Z" fill="%23B45309" stroke="%2392400E" stroke-width="2"/><path d="M100 95 L160 65 L160 135 L100 165 Z" fill="%23F59E0B" stroke="%2392400E" stroke-width="2"/><text x="100" y="135" font-family="sans-serif" font-weight="bold" font-size="11" fill="%23FFFFFF" text-anchor="middle">KRAFT CORR</text></svg>',
  cowDungBiomass: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="24" fill="%23F0FDF4"/><circle cx="100" cy="115" r="45" fill="%2378350F" opacity="0.85"/><circle cx="85" cy="95" r="28" fill="%2392400E" opacity="0.9"/><circle cx="120" cy="100" r="24" fill="%23B45309" opacity="0.9"/><path d="M100 40 Q 115 55 100 70 Q 85 55 100 40 Z" fill="%2310B981"/><path d="M100 25 L100 35" stroke="%2310B981" stroke-width="3" stroke-linecap="round"/><text x="100" y="130" font-family="sans-serif" font-weight="bold" font-size="11" fill="%23FEF3C7" text-anchor="middle">BIOMASS ⚡</text></svg>',
  eWastePcb: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="24" fill="%23ECFDF5"/><rect x="45" y="45" width="110" height="110" rx="10" fill="%23047857" stroke="%23065F46" stroke-width="3"/><rect x="80" y="80" width="40" height="40" rx="4" fill="%231F2937"/><circle cx="100" cy="100" r="10" fill="%23F59E0B"/><path d="M60 60 L80 60 L80 80 M140 60 L120 60 L120 80 M60 140 L80 140 L80 120 M140 140 L120 140 L120 120" stroke="%2334D399" stroke-width="3" stroke-linecap="round"/></svg>'
};

export const sampleWastePresets: SampleWasteItem[] = [
  {
    id: 'sample-pet-bottle',
    name: 'Plastic Water Bottle',
    category: 'Recyclable',
    material: 'PET (Polyethylene Terephthalate - #1)',
    image: sampleWasteImages.petBottle,
    defaultResult: {
      id: 'res-pet',
      itemName: 'Plastic Water Bottle',
      category: 'Recyclable',
      material: 'PET Grade 1 Polymer',
      confidence: 96.8,
      recommendedBin: 'Blue Dry Recyclables Bin',
      estimatedValueRange: '₹4 – ₹7 / kg',
      minValue: 4,
      maxValue: 7,
      action: 'Send to Recycler / Smart Granulator',
      environmentalBenefit: 'Saves 0.42 kg CO₂ and prevents 450 years of landfill degradation',
      co2SavedKg: 0.42,
      waterSavedLiters: 2.8,
      smartBinCompartment: 1,
      smartBinName: 'PET & Rigid Plastics (Compartment 1)',
      tips: 'Crush flat and keep cap attached to maximize baling density.'
    }
  },
  {
    id: 'sample-copper-wire',
    name: 'Mixed Copper Electrical Wire',
    category: 'Metal & Scrap',
    material: 'High-Purity Copper (Cu 99%)',
    image: sampleWasteImages.copperWire,
    defaultResult: {
      id: 'res-copper',
      itemName: 'Mixed Copper Wiring Scrap',
      category: 'Metal & Scrap',
      material: 'Industrial Copper Grade A',
      confidence: 98.4,
      recommendedBin: 'Yellow Scrap & Metal Vault',
      estimatedValueRange: '₹620 – ₹710 / kg',
      minValue: 620,
      maxValue: 710,
      action: 'List on Fair-Value Marketplace',
      environmentalBenefit: 'Conserves 85% energy compared to primary copper mining',
      co2SavedKg: 4.8,
      waterSavedLiters: 18.0,
      smartBinCompartment: 3,
      smartBinName: 'Valuable Metals & Alloys (Compartment 3)',
      tips: 'Strip outer PVC casing if possible for an extra 15% marketplace premium.'
    }
  },
  {
    id: 'sample-aluminum-cans',
    name: 'Beverage Aluminum Can',
    category: 'Recyclable',
    material: 'Aluminum 3004 Alloy',
    image: sampleWasteImages.aluminumCans,
    defaultResult: {
      id: 'res-alu',
      itemName: 'Aluminum Beverage Cans',
      category: 'Recyclable',
      material: 'Recyclable Aluminum Alloy',
      confidence: 97.2,
      recommendedBin: 'Yellow Metal Bin',
      estimatedValueRange: '₹140 – ₹165 / kg',
      minValue: 140,
      maxValue: 165,
      action: 'Send to Smelting Aggregator',
      environmentalBenefit: 'Saves 95% of the energy needed to create new aluminum from bauxite',
      co2SavedKg: 1.9,
      waterSavedLiters: 9.5,
      smartBinCompartment: 3,
      smartBinName: 'Metal & Canister Bay (Compartment 3)',
      tips: 'Rinse residual sugary beverages to prevent insect contamination.'
    }
  },
  {
    id: 'sample-cardboard',
    name: 'Corrugated Cardboard Packaging',
    category: 'Dry Waste',
    material: 'Unbleached Kraft Pulp Paper',
    image: sampleWasteImages.cardboardBox,
    defaultResult: {
      id: 'res-cardboard',
      itemName: 'Corrugated Shipping Box',
      category: 'Dry Waste',
      material: 'Kraft Cellulose Fibers',
      confidence: 95.5,
      recommendedBin: 'Blue Paper & Pulp Bay',
      estimatedValueRange: '₹11 – ₹15 / kg',
      minValue: 11,
      maxValue: 15,
      action: 'Bundle for Paper Mill Repulping',
      environmentalBenefit: 'Saves 17 mature trees and 26,000 liters of water per ton',
      co2SavedKg: 0.85,
      waterSavedLiters: 14.0,
      smartBinCompartment: 2,
      smartBinName: 'Dry Paper & Pulp (Compartment 2)',
      tips: 'Flatten boxes completely and remove plastic tape if convenient.'
    }
  },
  {
    id: 'sample-dung-biomass',
    name: 'Cattle Dung / Organic Biomass',
    category: 'Organic / Biomass',
    material: 'High-Methanogenic Organic Matter',
    image: sampleWasteImages.cowDungBiomass,
    defaultResult: {
      id: 'res-dung',
      itemName: 'Fresh Bovine Biomass (Cattle Dung)',
      category: 'Organic / Biomass',
      material: 'Cellulose-Rich Organic Inoculant',
      confidence: 99.1,
      recommendedBin: 'Green Biomass & Dung Collector',
      estimatedValueRange: '₹2.5 – ₹4.0 / kg (Biogas + CBG value)',
      minValue: 2.5,
      maxValue: 4.0,
      action: 'Deposit to Digital Dung Bank for Bioenergy',
      environmentalBenefit: 'Prevents fugitive atmospheric methane emission; generates renewable clean cooking fuel & bio-fertilizer',
      co2SavedKg: 2.3,
      waterSavedLiters: 0.0,
      smartBinCompartment: 4,
      smartBinName: 'Organic Biomass Digestion Hopper (Compartment 4)',
      tips: 'Direct feeding to anaerobic biodigester within 24 hours yields peak biogas efficiency.'
    }
  },
  {
    id: 'sample-e-waste',
    name: 'Circuit Board (PCB) Scrap',
    category: 'E-Waste',
    material: 'FR4 substrate + Precious Metal traces (Au, Ag, Cu)',
    image: sampleWasteImages.eWastePcb,
    defaultResult: {
      id: 'res-ewaste',
      itemName: 'Electronic PCB Waste',
      category: 'E-Waste',
      material: 'Printed Circuit Board & Chips',
      confidence: 98.9,
      recommendedBin: 'Red Secure E-Waste Locker',
      estimatedValueRange: '₹280 – ₹450 / kg',
      minValue: 280,
      maxValue: 450,
      action: 'Certified E-Waste Hydrometallurgical Extraction',
      environmentalBenefit: 'Extracts precious rare earth metals without toxic open-pit excavation',
      co2SavedKg: 7.2,
      waterSavedLiters: 35.0,
      smartBinCompartment: 5,
      smartBinName: 'Hazardous / E-Waste Vault (Compartment 5)',
      tips: 'Never burn or expose to open flame; toxic bromine retardants require certified processing.'
    }
  }
];

export const mockDungNodes: DungNode[] = [
  {
    id: 'node-1',
    name: 'Green Valley Gaushala',
    type: 'gaushala',
    dungAvailableKgPerDay: 420,
    estimatedBiogasM3PerDay: '18 – 24 m³/day',
    potentialCbgKgPerDay: '8.2 – 11.0 kg/day',
    distanceKm: 3.2,
    coordinates: { x: 28, y: 35 },
    verified: true,
    contact: '+91 98450 12841',
    address: 'Sector 14 Rural Belt, Peri-urban Zone',
    cattleCount: 85
  },
  {
    id: 'node-2',
    name: 'Surabhi Dairy Cooperative',
    type: 'dairy',
    dungAvailableKgPerDay: 680,
    estimatedBiogasM3PerDay: '30 – 38 m³/day',
    potentialCbgKgPerDay: '13.5 – 17.2 kg/day',
    distanceKm: 5.8,
    coordinates: { x: 62, y: 22 },
    verified: true,
    contact: '+91 97110 88392',
    address: 'National Highway 48 Feeder Rd',
    cattleCount: 140
  },
  {
    id: 'node-3',
    name: 'Ananda Agri-Farm Hub',
    type: 'farm',
    dungAvailableKgPerDay: 290,
    estimatedBiogasM3PerDay: '12 – 16 m³/day',
    potentialCbgKgPerDay: '5.5 – 7.5 kg/day',
    distanceKm: 4.1,
    coordinates: { x: 45, y: 68 },
    verified: true,
    contact: '+91 94220 77103',
    address: 'Kisan Marg, Agro-Cluster #4',
    cattleCount: 52
  },
  {
    id: 'node-4',
    name: 'Urja Shakti Community Biogas Plant',
    type: 'biogas_plant',
    dungAvailableKgPerDay: 0,
    estimatedBiogasM3PerDay: 'Capacity: 120 m³/day',
    potentialCbgKgPerDay: 'Energy Out: 190 kWh/day',
    distanceKm: 2.7,
    coordinates: { x: 40, y: 44 },
    verified: true,
    contact: '+91 98230 44551',
    address: 'Green Energy Park, Zone B',
    capacityM3: 120
  },
  {
    id: 'node-5',
    name: 'National Bio-CBG Refinery & Fuel Station',
    type: 'cbg_plant',
    dungAvailableKgPerDay: 0,
    estimatedBiogasM3PerDay: 'Feedstock Demand: 2,500 kg/day',
    potentialCbgKgPerDay: 'CBG Dispenser: 100 kg/day',
    distanceKm: 7.4,
    coordinates: { x: 78, y: 55 },
    verified: true,
    contact: '+91 80090 11223',
    address: 'Clean Fuels Corridor, Industrial Gate 2',
    capacityM3: 500
  }
];

export const mockScrapListings: ScrapListing[] = [
  {
    id: 'scrap-01',
    title: 'Mixed Copper Wire & Windings',
    category: 'Copper Scrap',
    estimatedWeightKg: 4.5,
    estimatedValueRange: '₹2,700 – ₹3,100',
    photoUrl: sampleWasteImages.copperWire,
    location: 'Indiranagar 4th Block',
    distanceKm: 2.4,
    status: 'active',
    createdAt: '12 mins ago',
    bids: [
      {
        id: 'bid-1',
        buyerName: 'EcoMetal Recyclers Pvt Ltd',
        buyerAvatar: 'EM',
        rating: 4.8,
        reviewsCount: 142,
        priceInr: 2950,
        pickupTimeline: 'Today by 4:00 PM',
        distanceKm: 3.1,
        materialsAccepted: ['Copper', 'Brass', 'Aluminum'],
        completedOrders: 940,
        avgResponseMins: 6
      },
      {
        id: 'bid-2',
        buyerName: 'Swachh Scrap Enterprises',
        buyerAvatar: 'SS',
        rating: 4.7,
        reviewsCount: 88,
        priceInr: 3020,
        pickupTimeline: 'Tomorrow 10:00 AM',
        distanceKm: 4.5,
        materialsAccepted: ['Metal', 'E-Waste', 'Batteries'],
        completedOrders: 620,
        avgResponseMins: 11
      },
      {
        id: 'bid-3',
        buyerName: 'Apex Circular Commodities',
        buyerAvatar: 'AC',
        rating: 4.9,
        reviewsCount: 215,
        priceInr: 3100,
        pickupTimeline: 'Today by 5:30 PM',
        badge: 'BEST VALUE',
        distanceKm: 2.4,
        materialsAccepted: ['Copper', 'Alloys', 'PCB', 'Alu'],
        completedOrders: 1284,
        avgResponseMins: 8
      }
    ]
  },
  {
    id: 'scrap-02',
    title: 'Clean Baled PET Bottles (50 pcs)',
    category: 'Plastics',
    estimatedWeightKg: 12.0,
    estimatedValueRange: '₹240 – ₹320',
    photoUrl: sampleWasteImages.petBottle,
    location: 'Koramangala 6th Block',
    distanceKm: 1.8,
    status: 'active',
    createdAt: '45 mins ago',
    bids: [
      {
        id: 'bid-201',
        buyerName: 'GreenLoop Polymers',
        buyerAvatar: 'GL',
        rating: 4.9,
        reviewsCount: 310,
        priceInr: 310,
        pickupTimeline: 'Today by 6:00 PM',
        badge: 'BEST VALUE',
        distanceKm: 1.8,
        materialsAccepted: ['PET', 'HDPE', 'LDPE', 'PP'],
        completedOrders: 2100,
        avgResponseMins: 5
      },
      {
        id: 'bid-202',
        buyerName: 'Urban Recycler Hub',
        buyerAvatar: 'UR',
        rating: 4.6,
        reviewsCount: 74,
        priceInr: 280,
        pickupTimeline: 'Tomorrow morning',
        distanceKm: 3.2,
        materialsAccepted: ['Plastic', 'Paper'],
        completedOrders: 430,
        avgResponseMins: 15
      }
    ]
  }
];

export const initialGamification: GamificationState = {
  levelTitle: 'Seedling',
  currentPoints: 740,
  nextLevelPoints: 1000,
  plantGrowthStage: 3, // out of 5
  streakDays: 6,
  circularityScore: 78,
  achievements: [
    {
      id: 'ach-1',
      icon: '🏆',
      title: 'First Recycler',
      description: 'Completed your first verified waste segregation scan.',
      unlocked: true,
      points: 100,
      unlockedAt: 'Unlocked 3 days ago'
    },
    {
      id: 'ach-2',
      icon: '🌿',
      title: 'Waste Warrior',
      description: 'Diverted over 30 kg of municipal waste from landfill.',
      unlocked: true,
      points: 200,
      unlockedAt: 'Unlocked yesterday'
    },
    {
      id: 'ach-3',
      icon: '🐄',
      title: 'Dung Contributor',
      description: 'Logged your first dung contribution to the bioenergy bank.',
      unlocked: true,
      points: 150,
      unlockedAt: 'Unlocked 4 days ago'
    },
    {
      id: 'ach-4',
      icon: '♻️',
      title: '50kg Recycled',
      description: 'Hit 50kg total circular material recovery milestone.',
      unlocked: false,
      points: 250
    },
    {
      id: 'ach-5',
      icon: '⚡',
      title: 'Energy Maker',
      description: 'Generated 25+ kWh equivalent of clean bio-power.',
      unlocked: false,
      points: 300
    }
  ],
  weeklyChallenge: {
    title: 'Segregate 5 kg of recyclable waste',
    description: 'Scan and direct at least 5 kg of PET, Metal, or Paper this week.',
    targetKg: 5,
    currentKg: 3.8,
    rewardPoints: 100,
    daysRemaining: 2
  }
};

export const initialUserStats = {
  wasteDivertedKg: 42.6,
  co2AvoidedKg: 18.4,
  recyclablesRecoveredKg: 28.2,
  dungContributedKg: 14.4,
  valueGeneratedInr: 1840,
  circularityScore: 78
};

export const mockCollectionOrder: import('../types').CollectionOrder = {
  id: 'order-10284',
  trackingNumber: 'PNR10284',
  scrapTitle: 'Mixed Copper Electrical Wire (4.5 kg)',
  weightKg: 4.5,
  amountInr: 3100,
  recyclerName: 'Apex Circular Commodities',
  recyclerPhone: '+91 98450 12849',
  recyclerVehicle: 'Eco-Electric Van (KA 01 EK 8892)',
  pickupAddress: '42, 14th Main, Koramangala 4th Block, Bengaluru',
  currentStepIndex: 2,
  estimatedArrivalMins: 14,
  otpCode: '8492'
};

export const circularLoopNodes: CircularNodeDetail[] = [
  {
    id: 'node-household',
    title: 'Households & Dairies',
    subtitle: 'Source of Raw Resources',
    icon: '🏠',
    color: '#059669',
    description: 'Citizens, commercial kitchens, dairy owners and gaushalas generate everyday organic and recyclable waste.',
    metric: '1,284+',
    metricLabel: 'Active Generators',
    details: ['Zero open-dumping habit', 'Earn monetary rewards per kg', 'Real-time bag tagging with QR codes']
  },
  {
    id: 'node-sorting',
    title: 'AI Smart Sorting',
    subtitle: 'IoT Vision & Sensor Gate',
    icon: '🤖',
    color: '#10B981',
    description: 'High-speed computer vision + moisture + capacitive sensors classify waste stream in under 300ms.',
    metric: '98.4%',
    metricLabel: 'Segregation Accuracy',
    details: ['Servo-driven carousel routing', 'Prevents wet-dry cross contamination', 'Instant monetary valuation']
  },
  {
    id: 'node-recycling',
    title: 'Scrap Marketplace',
    subtitle: 'Fair Market Value',
    icon: '💰',
    color: '#047857',
    description: 'Valuable metals, paper and polymers are auctioned directly to certified industrial re-processors.',
    metric: '₹4.8L',
    metricLabel: 'Value Disbursed',
    details: ['Competitive real-time bidding', 'Instant UPI/Wallet settlement', 'Transparent live weight verification']
  },
  {
    id: 'node-dungbank',
    title: 'Digital Dung Bank',
    subtitle: 'Biomass Aggregator',
    icon: '🐄',
    color: '#D97706',
    description: 'Bovine dung and agricultural residues are aggregated and routed to high-efficiency anaerobic digesters.',
    metric: '38.6 T',
    metricLabel: 'Dung Aggregated',
    details: ['Eliminates fugitive methane', 'Moisture and C:N ratio monitoring', 'Cooperative incentive payouts']
  },
  {
    id: 'node-bioenergy',
    title: 'Biogas & Bio-CBG',
    subtitle: 'Clean Renewable Power',
    icon: '⚡',
    color: '#0284C7',
    description: 'Anaerobic biodigesters convert organic slurry into purified Compressed Bio-Gas (CBG) and electricity.',
    metric: '1,240 m³',
    metricLabel: 'Methane Captured',
    details: ['Displaces fossil LPG & diesel', 'Generates green base-load electricity', 'High-purity vehicle fuel']
  },
  {
    id: 'node-compost',
    title: 'Bio-Fertilizer',
    subtitle: 'Organic Soil Nutrients',
    icon: '🌱',
    color: '#16A34A',
    description: 'Nutrient-dense fermented organic slurry (PROM) returns to farm soil, regenerating natural micro-flora.',
    metric: '18.2 T',
    metricLabel: 'Organic Slurry Produced',
    details: ['Replaces chemical NPK fertilizer', 'Restores organic soil carbon', 'Supplied back to local farmers']
  },
  {
    id: 'node-community',
    title: 'Community Wealth',
    subtitle: 'Closed Loop Value',
    icon: '💚',
    color: '#059669',
    description: 'Clean energy, high-grade recycled goods, and cash returns directly empower the local circular community.',
    metric: '100%',
    metricLabel: 'Circular Loop Retention',
    details: ['Lower municipal landfill burden', 'Cleaner air & groundwater', 'Self-sustaining decentralized economy']
  }
];
