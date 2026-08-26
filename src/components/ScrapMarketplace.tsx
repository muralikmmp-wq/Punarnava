import React, { useState } from 'react';
import { mockScrapListings, sampleWasteImages } from '../data/mockData';
import { ScrapListing, RecyclerBid, TabType } from '../types';
import { 
  Coins, 
  Upload, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Award, 
  MapPin, 
  PhoneCall, 
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScrapMarketplaceProps {
  onOfferAccepted: (listing: ScrapListing, bid: RecyclerBid) => void;
  setActiveTab: (tab: TabType) => void;
}

export const ScrapMarketplace: React.FC<ScrapMarketplaceProps> = ({
  onOfferAccepted,
  setActiveTab,
}) => {
  const [listings, setListings] = useState<ScrapListing[]>(mockScrapListings);
  const [selectedListingId, setSelectedListingId] = useState<string>(mockScrapListings[0].id);
  const [selectedRecyclerModal, setSelectedRecyclerModal] = useState<RecyclerBid | null>(null);
  const [uploadTitle, setUploadTitle] = useState<string>('Baled Cardboard & Kraft Pulp');
  const [uploadWeight, setUploadWeight] = useState<number>(8.5);
  const [uploadCategory, setUploadCategory] = useState<string>('Paper & Pulp');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const currentListing = listings.find((l) => l.id === selectedListingId) || listings[0];

  const handleAcceptBid = (bid: RecyclerBid) => {
    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#F59E0B', '#34D399']
    });

    onOfferAccepted(currentListing, bid);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    setTimeout(() => {
      const newListing: ScrapListing = {
        id: 'scrap-' + Date.now(),
        title: uploadTitle,
        category: uploadCategory,
        estimatedWeightKg: uploadWeight,
        estimatedValueRange: `₹${Math.round(uploadWeight * 25)} – ₹${Math.round(uploadWeight * 35)}`,
        photoUrl: sampleWasteImages.cardboardBox,
        location: 'Koramangala 4th Block',
        distanceKm: 1.5,
        status: 'active',
        createdAt: 'Just now',
        bids: [
          {
            id: 'bid-new-1',
            buyerName: 'Swachh Scrap Enterprises',
            buyerAvatar: 'SS',
            rating: 4.8,
            reviewsCount: 160,
            priceInr: Math.round(uploadWeight * 28),
            pickupTimeline: 'Today by 5:00 PM',
            badge: 'FASTEST PICKUP',
            distanceKm: 1.5,
            materialsAccepted: ['Paper', 'Plastic', 'Metals'],
            completedOrders: 980,
            avgResponseMins: 6
          },
          {
            id: 'bid-new-2',
            buyerName: 'GreenLoop Polymers & Pulp',
            buyerAvatar: 'GL',
            rating: 4.9,
            reviewsCount: 340,
            priceInr: Math.round(uploadWeight * 32),
            pickupTimeline: 'Today by 6:30 PM',
            badge: 'BEST VALUE',
            distanceKm: 2.1,
            materialsAccepted: ['Paper', 'Cardboard', 'Plastics'],
            completedOrders: 1840,
            avgResponseMins: 4
          }
        ]
      };

      setListings([newListing, ...listings]);
      setSelectedListingId(newListing.id);
      setIsUploading(false);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }, 600);
  };

  return (
    <div id="scrap-marketplace-view" className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white p-6 sm:p-10 border border-emerald-200/80 shadow-xs relative overflow-hidden text-left">
        
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pillar 3 • Fair-Value Scrap Marketplace</span>
          </div>

          <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Your Scrap. Your Price.
          </h1>

          <p className="text-sm sm:text-base text-slate-600">
            Upload it. Get verified offers. Choose the best value. Eliminate middleman exploitation with transparent real-time bidding from certified recycling aggregators.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Certified Recyclers</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Avg. 8 Min Response</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Instant Digital Wallet Settlement</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scrap Photo Upload & Active Listings Selector */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upload Card */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                List New Scrap Lot
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                AI Valuation Ready
              </span>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3">
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Scrap Material / Item Title
                </label>
                <input 
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-emerald-500"
                  placeholder="e.g. Copper Wire, Aluminum Cans, PET bottles"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-emerald-500"
                  >
                    <option value="Copper Scrap">Copper & Alloys</option>
                    <option value="Plastics">Plastics & Polymers</option>
                    <option value="Aluminum">Aluminum Cans</option>
                    <option value="Paper & Pulp">Paper & Cardboard</option>
                    <option value="E-Waste">Electronics & PCBs</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Weight (kg)
                  </label>
                  <input 
                    type="number"
                    step="0.5"
                    value={uploadWeight}
                    onChange={(e) => setUploadWeight(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Upload CTA */}
              <button
                type="submit"
                id="btn-upload-scrap-lot"
                disabled={isUploading}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Requesting Instant Bids...' : '📸 Post Lot & Request Bids'}</span>
              </button>

            </form>
          </div>

          {/* Active Listings Selector */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-3 text-left">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Active Marketplace Listings ({listings.length})
            </span>

            <div className="space-y-2">
              {listings.map((item) => {
                const isSelected = selectedListingId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedListingId(item.id)}
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-300/60 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200/80 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.photoUrl} alt={item.title} className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-slate-100" />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          {item.estimatedWeightKg} kg • {item.bids.length} verified bids
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-['Space_Grotesk',sans-serif] text-xs sm:text-sm font-bold text-emerald-800 block">
                        {item.estimatedValueRange}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{item.location}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Listing Details & Live Recycler Bids */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Selected Listing Card */}
          <div 
            id="current-listing-detail-card"
            className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-xs space-y-6 text-left"
          >
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={currentListing.photoUrl} 
                  alt={currentListing.title} 
                  className="w-16 h-16 rounded-2xl object-contain bg-emerald-50 p-2 border border-emerald-200 shrink-0" 
                />
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase mb-1">
                    <Tag className="w-3 h-3" />
                    <span>{currentListing.category}</span>
                  </div>
                  <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-extrabold text-slate-900">
                    {currentListing.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Location: {currentListing.location} ({currentListing.distanceKm} km) • Posted {currentListing.createdAt}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  AI Estimated Value
                </span>
                <span className="font-['Space_Grotesk',sans-serif] text-lg sm:text-xl font-extrabold text-emerald-900 block mt-0.5">
                  {currentListing.estimatedValueRange}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Est. Weight: {currentListing.estimatedWeightKg} kg
                </span>
              </div>
            </div>

            {/* Recycler Bids Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>VERIFIED BUYERS & REAL-TIME OFFERS</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {currentListing.bids.length} Offers Available
                </span>
              </div>

              {/* Bids List */}
              <div className="space-y-3">
                {currentListing.bids.map((bid) => {
                  const isBestValue = bid.badge === 'BEST VALUE';

                  return (
                    <div
                      key={bid.id}
                      id={`bid-card-${bid.id}`}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                        isBestValue
                          ? 'bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-white border-2 border-emerald-400 shadow-md ring-2 ring-emerald-300/40'
                          : 'bg-white hover:bg-slate-50/80 border-slate-200/90'
                      }`}
                    >
                      {/* Best Value Ribbon */}
                      {isBestValue && (
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-300" />
                          <span>🏆 BEST VALUE</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        {/* Recycler Info */}
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm border border-emerald-200">
                            {bid.buyerAvatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                                {bid.buyerName}
                              </h4>
                              <span className="text-emerald-700 text-xs" title="Certified Verified Buyer">
                                <ShieldCheck className="w-4 h-4 inline" />
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center text-amber-700 font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                                {bid.rating} ({bid.reviewsCount})
                              </span>
                              <span>•</span>
                              <span>{bid.completedOrders} pickups</span>
                              <span>•</span>
                              <span className="text-teal-700 font-medium">{bid.avgResponseMins}m response</span>
                            </div>

                            <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>Pickup: <strong className="text-slate-800">{bid.pickupTimeline}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          
                          <div className="text-left sm:text-right">
                            <span className="font-['Space_Grotesk',sans-serif] text-2xl font-black text-emerald-950 block">
                              ₹{bid.priceInr.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 uppercase">
                              Guaranteed Payout
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Inspect Profile */}
                            <button
                              onClick={() => setSelectedRecyclerModal(bid)}
                              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                            >
                              Profile
                            </button>

                            {/* Accept Offer Button */}
                            <button
                              id={`btn-accept-bid-${bid.id}`}
                              onClick={() => handleAcceptBid(bid)}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                                isBestValue
                                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                                  : 'bg-slate-900 hover:bg-slate-800 text-white'
                              }`}
                            >
                              <span>Accept Offer</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Recycler Profile Modal */}
      {selectedRecyclerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-emerald-100 shadow-2xl space-y-5 text-left animate-fadeIn">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-lg flex items-center justify-center">
                  {selectedRecyclerModal.buyerAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                      {selectedRecyclerModal.buyerName}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs text-slate-500">Certified Municipal Circular Partner</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecyclerModal(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-emerald-50 text-center">
                <span className="text-xs text-slate-400 font-semibold block">Rating</span>
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-slate-900 block mt-0.5">
                  ⭐ {selectedRecyclerModal.rating}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 text-center">
                <span className="text-xs text-slate-400 font-semibold block">Collections</span>
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-slate-900 block mt-0.5">
                  {selectedRecyclerModal.completedOrders}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 text-center">
                <span className="text-xs text-slate-400 font-semibold block">Avg Response</span>
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-slate-900 block mt-0.5">
                  {selectedRecyclerModal.avgResponseMins} min
                </span>
              </div>
            </div>

            {/* Materials Accepted */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Materials Accepted for Certified Processing:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedRecyclerModal.materialsAccepted.map((mat, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-emerald-900 block">Trust & Verification Badges</span>
              <p>✓ CPCB Registered • ✓ Real-time calibrated digital scale • ✓ Instant UPI escrow payout</p>
            </div>

            <button
              onClick={() => {
                handleAcceptBid(selectedRecyclerModal);
                setSelectedRecyclerModal(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              Accept Offer of ₹{selectedRecyclerModal.priceInr} →
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
