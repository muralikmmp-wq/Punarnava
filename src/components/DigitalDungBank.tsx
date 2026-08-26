import React, { useState } from 'react';
import { mockDungNodes } from '../data/mockData';
import { DungNode, DungContributionRecord, TabType } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Flame, 
  Leaf, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  Droplets,
  Fuel
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DigitalDungBankProps {
  onContributionAdded?: (record: DungContributionRecord) => void;
  onDungContributed?: (kg: number, valueInr: number) => void;
  setActiveTab: (tab: TabType) => void;
}

export const DigitalDungBank: React.FC<DigitalDungBankProps> = ({
  onContributionAdded,
  onDungContributed,
  setActiveTab,
}) => {
  // Form State
  const [sourceType, setSourceType] = useState<'Gaushala' | 'Dairy' | 'Farm' | 'Household'>('Gaushala');
  const [quantityKg, setQuantityKg] = useState<number>(120);
  const [moisturePercent, setMoisturePercent] = useState<number>(78);
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | 'Bi-Weekly'>('Daily');
  const [locationName, setLocationName] = useState<string>('Green Valley Gaushala, Sector 14');
  const [selectedNode, setSelectedNode] = useState<DungNode>(mockDungNodes[0]);
  const [isCalculated, setIsCalculated] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [matchingPlant, setMatchingPlant] = useState<DungNode | null>(null);

  // Bioenergy conversion formulas based on Indian Ministry of New and Renewable Energy (MNRE) standards:
  // 1 kg bovine dung yields ~0.045 - 0.060 m³ biogas
  // 1 m³ biogas generates ~1.6 - 2.0 kWh electricity or ~0.45 kg CBG (Compressed Bio-Gas)
  // 1 kg dung produces ~0.4 kg nutrient-rich organic bio-slurry fertilizer (PROM)
  const estBiogasMin = (quantityKg * 0.046).toFixed(1);
  const estBiogasMax = (quantityKg * 0.060).toFixed(1);
  const estBiogasAvg = (quantityKg * 0.053);
  const estEnergyKwh = (estBiogasAvg * 1.8).toFixed(1);
  const estCbgKg = (estBiogasAvg * 0.45).toFixed(1);
  const estBioFertilizerKg = Math.round(quantityKg * 0.4);
  const estValueInr = Math.round(quantityKg * 3.5); // Average ~₹3.5/kg aggregated value
  const co2OffsetKg = Math.round(quantityKg * 2.3);

  const handleContributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: DungContributionRecord = {
      id: 'dung-' + Date.now(),
      sourceType,
      quantityKg,
      moisturePercent,
      collectionFrequency: frequency,
      location: locationName,
      estimatedBiogasM3: Number(estBiogasAvg.toFixed(1)),
      estimatedEnergyKwh: Number(estEnergyKwh),
      estimatedCbgKg: Number(estCbgKg),
      estimatedBioFertilizerKg: estBioFertilizerKg,
      estimatedValueInr: estValueInr,
      co2OffsetKg,
      status: 'Submitted',
      timestamp: new Date().toLocaleTimeString()
    };

    onContributionAdded?.(record);
    onDungContributed?.(quantityKg, estValueInr);
    setIsSubmitted(true);

    // Find nearest matching bioenergy plant
    const plant = mockDungNodes.find((n) => n.type === 'biogas_plant' || n.type === 'cbg_plant') || mockDungNodes[3];
    setMatchingPlant(plant);

    // Micro-interaction: Dung to Energy celebration!
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#34D399', '#D97706']
    });
  };

  return (
    <div id="digital-dung-bank-view" className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-emerald-50/70 to-teal-50/50 p-6 sm:p-10 border border-amber-200/80 shadow-xs relative overflow-hidden">
        
        <div className="max-w-2xl space-y-3 relative z-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Pillar 2 • Decentralized Bio-Methanation & CBG</span>
          </div>

          <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-950 tracking-tight">
            Your Dung Has Value.
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Turn distributed cattle dung into measurable bioenergy potential. Monetize agricultural biomass, eradicate open-dump methane emissions, and generate clean cooking gas & organic soil nutrients.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>~0.05 m³ Biogas / kg</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>1.8 kWh Green Power / m³</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-teal-200">
              <Fuel className="w-4 h-4 text-teal-600" />
              <span>Bio-CBG Vehicle Fuel</span>
            </div>
          </div>
        </div>

        {/* Micro-interaction visual transformation watermark */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-amber-200 shadow-md">
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-bounce">🐄</span>
            <span className="text-[10px] font-bold text-amber-900 mt-1">CATTLE DUNG</span>
          </div>
          <div className="text-emerald-600 font-extrabold text-xl animate-pulse">
            ➔ ⚡ ➔
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-pulse">💡</span>
            <span className="text-[10px] font-bold text-emerald-900 mt-1">CLEAN POWER</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Regional Map & Contribution Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Regional Supply-Demand Map */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                  Surrounding Bio-Grid Map
                </h3>
                <p className="text-xs text-slate-500">Live geo-tagged Gaushalas, Dairies & Biogas Hubs</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                5 Active Nodes in 8km Radius
              </span>
            </div>

            {/* Stylized Interactive Map Canvas */}
            <div className="relative w-full aspect-4/3 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-amber-50/50 p-4 border-2 border-emerald-200/60 overflow-hidden shadow-inner select-none">
              
              {/* Map grid lines & roads */}
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 50 Q 150 80 400 30" stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="4 4" />
                <path d="M 100 0 Q 140 180 250 300" stroke="#059669" strokeWidth="4" fill="none" />
                <path d="M 0 220 C 120 180 280 260 400 210" stroke="#34D399" strokeWidth="2.5" fill="none" />
                <circle cx="200" cy="150" r="80" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeDasharray="6 4" />
              </svg>

              {/* Geo Markers */}
              {mockDungNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isPlant = node.type === 'biogas_plant' || node.type === 'cbg_plant';

                return (
                  <button
                    key={node.id}
                    id={`map-marker-${node.id}`}
                    onClick={() => {
                      setSelectedNode(node);
                      setLocationName(node.name + ', ' + node.address);
                    }}
                    style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 transform ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-20'
                    }`}
                  >
                    <div className={`p-2 rounded-2xl shadow-lg flex items-center justify-center border-2 transition-all ${
                      isSelected 
                        ? 'bg-amber-400 border-amber-900 text-amber-950 ring-4 ring-amber-300/60' 
                        : isPlant 
                          ? 'bg-blue-600 border-white text-white' 
                          : 'bg-emerald-600 border-white text-white'
                    }`}>
                      <span className="text-base">
                        {node.type === 'gaushala' ? '🐄' :
                         node.type === 'dairy' ? '🥛' :
                         node.type === 'farm' ? '🚜' :
                         node.type === 'biogas_plant' ? '⚡' : '🏭'}
                      </span>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-slate-900 text-white text-[10px] whitespace-nowrap shadow pointer-events-none">
                      {node.name} ({node.distanceKm} km)
                    </div>
                  </button>
                );
              })}

              {/* Map Legend */}
              <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs p-2 rounded-xl border border-emerald-200 text-[10px] space-y-1 text-slate-700 shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>🐄 Gaushala / Dairy Supply</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>⚡ Biogas & CBG Plant Demand</span>
                </div>
              </div>

            </div>

            {/* Selected Node Details Card */}
            {selectedNode && (
              <div 
                id="selected-gaushala-card"
                className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-emerald-50/40 border border-amber-200/90 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold uppercase mb-1">
                      {selectedNode.type.replace('_', ' ')}
                    </div>
                    <h4 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                      {selectedNode.name}
                    </h4>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{selectedNode.address} • {selectedNode.distanceKm} km away</span>
                    </p>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200">
                    Verified ✓
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                  <div className="p-2.5 rounded-xl bg-white border border-amber-100">
                    <span className="text-[10px] text-slate-400 font-semibold block">Dung Available</span>
                    <span className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-slate-900 block mt-0.5">
                      {selectedNode.dungAvailableKgPerDay > 0 ? `${selectedNode.dungAvailableKgPerDay} kg/day` : 'Demand Sink'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100">
                    <span className="text-[10px] text-slate-400 font-semibold block">Estimated Biogas</span>
                    <span className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-emerald-800 block mt-0.5">
                      {selectedNode.estimatedBiogasM3PerDay}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100">
                    <span className="text-[10px] text-slate-400 font-semibold block">Potential CBG</span>
                    <span className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-teal-800 block mt-0.5">
                      {selectedNode.potentialCbgKgPerDay}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuantityKg(selectedNode.dungAvailableKgPerDay || 120);
                    setLocationName(selectedNode.name);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Use as Feedstock in Dung Contribution Form</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Dung Contribution Flow & AI Bioenergy Estimate */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  🐄
                </div>
                <div>
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                    ADD DUNG & BIOMASS
                  </h3>
                  <p className="text-xs text-slate-500">Log organic feedstock for smart collection & energy credit</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Step 1 of 2
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleContributeSubmit} className="space-y-4 text-left">
              
              {/* Source Type Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Source Entity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Gaushala', 'Dairy', 'Farm', 'Household'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSourceType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        sourceType === type
                          ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider / Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Quantity of Dung (kg)
                  </label>
                  <span className="font-['Space_Grotesk',sans-serif] font-black text-amber-900 text-base bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    {quantityKg} kg
                  </span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="1500" 
                  step="10"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>20 kg (Household)</span>
                  <span>500 kg (Mid-Dairy)</span>
                  <span>1,500 kg (Gaushala)</span>
                </div>
              </div>

              {/* Moisture & Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Moisture */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Moisture Content</span>
                    <span className="text-teal-700 font-bold">{moisturePercent}%</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-teal-600" />
                    <input 
                      type="range"
                      min="60"
                      max="90"
                      value={moisturePercent}
                      onChange={(e) => setMoisturePercent(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">Optimal methanogenesis: 75–80%</span>
                </div>

                {/* Collection Frequency */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Collection Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['Daily', 'Weekly', 'Bi-Weekly'] as const).map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFrequency(freq)}
                        className={`py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                          frequency === freq
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Location Input */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Location / Gaushala Facility
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <input 
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-transparent focus:outline-none font-medium"
                    placeholder="Enter location or facility name"
                  />
                </div>
              </div>

              {/* AI Bioenergy Calculation Output Card */}
              <div 
                id="ai-bioenergy-estimate-box"
                className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-amber-50/40 to-teal-50/60 border-2 border-emerald-200 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>AI BIOENERGY ESTIMATE</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    MNRE Model v2.4
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                  
                  {/* Dung */}
                  <div className="p-2 rounded-xl bg-white/90 border border-emerald-100">
                    <span className="text-[10px] text-slate-400 font-semibold block">Dung Feedstock</span>
                    <span className="font-['Space_Grotesk',sans-serif] font-bold text-slate-900 text-sm block mt-0.5">
                      {quantityKg} kg
                    </span>
                  </div>

                  {/* Biogas */}
                  <div className="p-2 rounded-xl bg-white/90 border border-emerald-100">
                    <span className="text-[10px] text-slate-400 font-semibold block">Estimated Biogas</span>
                    <span className="font-['Space_Grotesk',sans-serif] font-bold text-emerald-700 text-sm block mt-0.5">
                      {estBiogasMin}–{estBiogasMax} m³
                    </span>
                  </div>

                  {/* Energy Kwh */}
                  <div className="p-2 rounded-xl bg-white/90 border border-emerald-100">
                    <span className="text-[10px] text-slate-400 font-semibold block">Energy Equiv.</span>
                    <span className="font-['Space_Grotesk',sans-serif] font-bold text-teal-700 text-sm block mt-0.5">
                      {estEnergyKwh} kWh
                    </span>
                  </div>

                  {/* Estimated Value */}
                  <div className="p-2 rounded-xl bg-amber-100/80 border border-amber-300">
                    <span className="text-[10px] text-amber-900 font-bold block">Estimated Value</span>
                    <span className="font-['Space_Grotesk',sans-serif] font-extrabold text-amber-950 text-sm block mt-0.5">
                      ₹{estValueInr}
                    </span>
                  </div>

                </div>

                {/* Additional offsets */}
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 pt-1">
                  <span>🌿 CO₂ Offset: <strong className="text-emerald-800">{co2OffsetKg} kg</strong></span>
                  <span>🌱 Bio-Fertilizer: <strong className="text-emerald-800">{estBioFertilizerKg} kg</strong></span>
                  <span>⛽ CBG Yield: <strong className="text-teal-800">{estCbgKg} kg</strong></span>
                </div>

              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="btn-add-to-dung-bank"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-md shadow-amber-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Add to Digital Dung Bank</span>
              </button>

            </form>

            {/* Submission / Matching Success Banner */}
            {isSubmitted && matchingPlant && (
              <div className="p-4 rounded-2xl bg-emerald-600 text-white space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span className="font-bold text-sm">Dung Logged & Matched!</span>
                  </div>
                  <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded font-mono">Matched Demand</span>
                </div>
                <p className="text-xs text-emerald-100">
                  Your <strong>{quantityKg} kg</strong> feedstock is routed to <strong>{matchingPlant.name}</strong> ({matchingPlant.distanceKm} km away). Tanker pickup dispatched.
                </p>
                <div className="pt-1 flex items-center justify-between text-xs font-bold text-emerald-200">
                  <span>Credit: ₹{estValueInr} pending pickup verification</span>
                  <span>+150 GP</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
