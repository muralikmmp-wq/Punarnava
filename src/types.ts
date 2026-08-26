export type TabType = 
  | 'home' 
  | 'smart-sort' 
  | 'smart-bin'
  | 'dung-bank' 
  | 'marketplace' 
  | 'impact' 
  | 'circular-loop'
  | 'gamification'
  | 'tracking'
  | 'profile';

export interface WasteAnalysisResult {
  id: string;
  itemName: string;
  category: 'Recyclable' | 'Organic / Biomass' | 'E-Waste' | 'Metal & Scrap' | 'Hazardous' | 'Dry Waste';
  material: string;
  confidence: number;
  recommendedBin: string;
  estimatedValueRange: string;
  minValue: number;
  maxValue: number;
  action: string;
  environmentalBenefit: string;
  co2SavedKg: number;
  waterSavedLiters: number;
  smartBinCompartment: number;
  smartBinName: string;
  tips: string;
  imageUrl?: string;
  detectedAt?: string;
}

export type WasteItem = {
  name: string;
  category: string;
  greenPoints: number;
  result?: WasteAnalysisResult;
};

export interface SampleWasteItem {
  id: string;
  name: string;
  category: string;
  material: string;
  image: string;
  defaultResult: WasteAnalysisResult;
}

export interface SmartBinComponentInfo {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'calibrated' | 'standby';
  description: string;
  icon: string;
  technicalSpecs: string;
}

export interface DungNode {
  id: string;
  name: string;
  type: 'gaushala' | 'dairy' | 'farm' | 'biogas_plant' | 'cbg_plant';
  dungAvailableKgPerDay: number;
  estimatedBiogasM3PerDay: string;
  potentialCbgKgPerDay: string;
  distanceKm: number;
  coordinates: { x: number; y: number }; // percentage on stylized map
  verified: boolean;
  contact: string;
  address: string;
  cattleCount?: number;
  capacityM3?: number;
}

export interface DungContributionRecord {
  id: string;
  sourceType: 'Gaushala' | 'Dairy' | 'Farm' | 'Household';
  quantityKg: number;
  moisturePercent: number;
  collectionFrequency: 'Daily' | 'Weekly' | 'Bi-Weekly';
  location: string;
  estimatedBiogasM3: number;
  estimatedEnergyKwh: number;
  estimatedCbgKg: number;
  estimatedBioFertilizerKg: number;
  estimatedValueInr: number;
  co2OffsetKg: number;
  status: 'Submitted' | 'Verified' | 'Collected' | 'Converted';
  timestamp: string;
}

export interface RecyclerBid {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  rating: number;
  reviewsCount: number;
  priceInr: number;
  pickupTimeline: string;
  badge?: 'BEST VALUE' | 'FASTEST PICKUP' | 'VERIFIED PRO';
  distanceKm: number;
  materialsAccepted: string[];
  completedOrders: number;
  avgResponseMins: number;
}

export interface ScrapListing {
  id: string;
  title: string;
  category: string;
  estimatedWeightKg: number;
  estimatedValueRange: string;
  photoUrl: string;
  location: string;
  distanceKm: number;
  status: 'active' | 'bid_accepted' | 'in_transit' | 'completed';
  bids: RecyclerBid[];
  selectedBid?: RecyclerBid;
  createdAt: string;
}

export interface CollectionOrder {
  id: string;
  trackingNumber: string;
  scrapTitle: string;
  weightKg: number;
  amountInr: number;
  recyclerName: string;
  recyclerPhone: string;
  recyclerVehicle: string;
  status?: 'offer_accepted' | 'recycler_assigned' | 'pickup_en_route' | 'material_collected' | 'payment_completed';
  currentStepIndex: number;
  estimatedArrivalMins: number;
  pickupAddress: string;
  otpCode: string;
  timeline?: { step: string; timestamp: string; completed: boolean }[];
}

export interface GamificationState {
  levelTitle: string;
  currentPoints: number;
  nextLevelPoints: number;
  plantGrowthStage: number; // 0 to 5
  streakDays: number;
  circularityScore: number;
  achievements: {
    id: string;
    icon: string;
    title: string;
    description: string;
    unlocked: boolean;
    points: number;
    unlockedAt?: string;
  }[];
  weeklyChallenge: {
    title: string;
    description: string;
    targetKg: number;
    currentKg: number;
    rewardPoints: number;
    daysRemaining: number;
  };
}

export interface CircularNodeDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  metric: string;
  metricLabel: string;
  details: string[];
}
