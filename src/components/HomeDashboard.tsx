import React, { useState } from 'react';
import { TabType } from '../types';
import { CinematicHeroBackground } from './CinematicHeroBackground';
import { 
  Leaf, 
  Recycle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  ChevronDown
} from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: TabType) => void;
  onOpenDemo?: () => void;
  userStats?: {
    wasteDivertedKg: number;
    co2AvoidedKg: number;
    recyclablesRecoveredKg: number;
    dungContributedKg: number;
    valueGeneratedInr: number;
    circularityScore: number;
  };
  greenPoints?: number;
  walletBalance?: number;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  userStats,
  greenPoints = 740,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const loopNodes = [
    {
      id: 'households',
      name: 'Households',
      subtitle: 'Segregate at source',
      tab: 'smart-sort' as TabType,
      pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-3 sm:-translate-y-4',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'ai-sorting',
      name: 'AI Sorting',
      subtitle: 'Smart classification',
      tab: 'smart-sort' as TabType,
      pos: 'top-[16%] right-[2%] translate-x-1 sm:translate-x-2',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
          <path d="M6 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2" />
          <path d="M18 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" />
        </svg>
      )
    },
    {
      id: 'dung-bank',
      name: 'Dung Bank',
      subtitle: 'Biomass aggregation',
      tab: 'dung-bank' as TabType,
      pos: 'bottom-[16%] right-[2%] translate-x-1 sm:translate-x-2',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
          <path d="M26 12c-1.1 0-2 .9-2 2v1h-5v-3c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3H7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h1v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h8v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h1c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2z" />
        </svg>
      )
    },
    {
      id: 'bioenergy',
      name: 'Bioenergy',
      subtitle: 'Biogas / CBG',
      tab: 'circular-loop' as TabType,
      pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-3 sm:translate-y-4',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
        </svg>
      )
    },
    {
      id: 'fair-value',
      name: 'Fair Value',
      subtitle: 'Transparent pricing',
      tab: 'marketplace' as TabType,
      pos: 'bottom-[16%] left-[2%] -translate-x-1 sm:-translate-x-2',
      icon: (
        <span className="text-sm sm:text-base font-black text-white">₹</span>
      )
    },
    {
      id: 'community',
      name: 'Community',
      subtitle: 'Clean tomorrow',
      tab: 'impact' as TabType,
      pos: 'top-[16%] left-[2%] -translate-x-1 sm:-translate-x-2',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  return (
    <div 
      id="punarnava-homepage-root"
      className="relative w-full bg-[#020b05] text-white selection:bg-emerald-400 selection:text-emerald-950 flex flex-col"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO VIEWPORT (100% BACKGROUND IMAGE) */}
      {/* ========================================================================= */}
      <section 
        id="hero-cinematic-stage"
        className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden"
      >
        {/* Exact User Cinematic Background Asset */}
        <CinematicHeroBackground />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 flex-1 flex flex-col justify-between">
          
          {/* Main Grid: Left Headline | Center Open Vortex | Right Transparent HUD Loop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT: PUNARNAVA HERO MESSAGE (Over waste region) */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 lg:pr-4">
              
              {/* Smart India Hackathon 2026 Innovation Badge */}
              <div 
                id="sih-2026-badge"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-emerald-400/30 backdrop-blur-md shadow-md"
              >
                <Leaf className="w-3.5 h-3.5 text-[#34d399]" />
                <span className="text-xs font-semibold tracking-wide text-emerald-100/90">
                  Smart India Hackathon 2026 Innovation
                </span>
                <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399] animate-pulse" />
              </div>

              {/* Display Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit',sans-serif] tracking-tight leading-[1.06] text-white">
                  FROM WASTE TODAY,
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit',sans-serif] tracking-tight leading-[1.06] text-[#34d399] drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                  GREEN TOMORROW.
                </h1>
              </div>

              {/* Sub-Headline Mission Copy */}
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-lg">
                Punarnava connects <span className="text-[#34d399] font-semibold">waste</span>,{' '}
                <span className="text-[#34d399] font-semibold">people</span>,{' '}
                <span className="text-[#34d399] font-semibold">recyclers</span> and{' '}
                <span className="text-[#34d399] font-semibold">bioenergy</span> into one intelligent circular ecosystem.
              </p>

              {/* Real-time Quick Pulse Stats */}
              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-emerald-200/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>AI Sorting Active</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Biogas Yield: 0.58 m³/kg</span>
                </div>
              </div>

            </div>

            {/* ------------------------------------------------------------------- */}
            {/* CENTER: UN-OBSCURED TRANSFORMATION VORTEX & RECYCLING SYMBOL */}
            {/* ------------------------------------------------------------------- */}
            <div className="hidden lg:block lg:col-span-2 pointer-events-none" aria-hidden="true">
              {/* Intentionally left open so the central glowing green vortex in the background shines through */}
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT: FLOATING ELEGANT GLASSMORPHY "THE LOOP" HUD OVERLAY */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end py-4">
              
              <div 
                id="hud-the-loop-container"
                className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center"
              >
                {/* Thin Glowing Green HUD Orbit Rings */}
                <div className="absolute inset-0 rounded-full border border-emerald-400/20 pointer-events-none" />
                <div className="absolute inset-3 sm:inset-4 rounded-full border border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.12)] pointer-events-none" />
                <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-[#4ade80]/40 pointer-events-none animate-spin-slow" />

                {/* Thin SVG Orbit Direction Rays */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-70" viewBox="0 0 380 380">
                  <polygon points="260,45 270,38 258,32" fill="#4ade80" />
                  <polygon points="340,160 345,172 336,174" fill="#4ade80" />
                  <polygon points="308,305 300,315 308,320" fill="#4ade80" />
                  <polygon points="165,340 152,338 156,328" fill="#4ade80" />
                  <polygon points="48,230 45,218 54,215" fill="#4ade80" />
                  <polygon points="90,85 102,78 95,70" fill="#4ade80" />
                </svg>

                {/* Center Floating Glass Orb: THE LOOP */}
                <div 
                  id="hud-center-loop-core"
                  onClick={() => setActiveTab('circular-loop')}
                  className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-black/45 hover:bg-emerald-950/60 border border-[#34d399]/60 hover:border-[#34d399] backdrop-blur-md shadow-[0_0_35px_rgba(52,211,153,0.35)] flex flex-col items-center justify-center text-center p-3 cursor-pointer group transition-all duration-300 transform hover:scale-105"
                >
                  <Recycle className="w-6 h-6 sm:w-7 sm:h-7 text-[#34d399] group-hover:rotate-180 transition-transform duration-700 drop-shadow-[0_0_8px_#34d399]" />
                  
                  <span className="font-['Outfit',sans-serif] font-black text-xs sm:text-sm text-white tracking-widest uppercase mt-1">
                    THE LOOP
                  </span>
                  
                  <span className="text-[8px] sm:text-[9px] text-emerald-200/80 font-medium tracking-tight">
                    Circular Flow
                  </span>
                </div>

                {/* 6 Elegant Transparent Nodes around the Orbit */}
                {loopNodes.map((node) => (
                  <div 
                    key={node.id}
                    className={`absolute ${node.pos} flex flex-col items-center text-center cursor-pointer group z-20`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setActiveTab(node.tab)}
                  >
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-emerald-900/60 border border-emerald-400/50 hover:border-[#34d399] backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.25)] flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                      {node.icon}
                    </div>
                    <div className="mt-1 flex flex-col items-center">
                      <span className="font-bold text-[10px] sm:text-xs text-white group-hover:text-[#34d399] transition-colors whitespace-nowrap drop-shadow-md">
                        {node.name}
                      </span>
                      <span className="hidden sm:block text-[8px] sm:text-[9px] text-emerald-200/70 font-normal whitespace-nowrap">
                        {node.subtitle}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Bottom Viewport Indicator: Subtle Scroll Hint */}
          <div className="flex justify-center pt-2">
            <a 
              href="#impact-ecosystem-section"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-emerald-500/20 text-[11px] text-emerald-300/80 hover:text-white backdrop-blur-sm transition-all"
            >
              <span>Explore Circular Architecture</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECONDARY SECTION: ARCHITECTURE & IMPACT METRICS (Below Hero Fold) */}
      {/* ========================================================================= */}
      <section 
        id="impact-ecosystem-section"
        className="relative z-20 w-full bg-gradient-to-b from-[#020b05] via-[#03150b] to-[#020b05] border-t border-emerald-500/15 py-14 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-[1600px] mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-500/20 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Punarnava Circular Ecosystem</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] text-white">
                Closing the Loop on Every Gram of Waste
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-md">
              From automated robotic segregation to high-caloric methane generation and fair-value scrap liquidation.
            </p>
          </div>

          {/* 4 Architectural Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Pillar 1 */}
            <div 
              onClick={() => setActiveTab('smart-sort')}
              className="p-5 rounded-2xl bg-[#041d10]/60 hover:bg-[#072c18]/80 border border-emerald-500/25 hover:border-emerald-400 backdrop-blur-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Recycle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300">
                AI Vision & Smart Sort
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed mb-3">
                Identifies polymer grades (PET, HDPE, PP), metals, and e-waste in under 500ms using camera stream.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <span>Try Scanner</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div 
              onClick={() => setActiveTab('dung-bank')}
              className="p-5 rounded-2xl bg-[#041d10]/60 hover:bg-[#072c18]/80 border border-emerald-500/25 hover:border-emerald-400 backdrop-blur-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300">
                Biomass to Bio-CBG
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed mb-3">
                Aggregates cattle manure into digital credits, feeding industrial digesters for clean bio-methane.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <span>View Dung Bank</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div 
              onClick={() => setActiveTab('marketplace')}
              className="p-5 rounded-2xl bg-[#041d10]/60 hover:bg-[#072c18]/80 border border-emerald-500/25 hover:border-emerald-400 backdrop-blur-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300">
                Fair-Price Marketplace
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed mb-3">
                Live commodity pricing index for recyclables with instant pickup dispatch and verified recyclers.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <span>Trade Recyclables</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 4 */}
            <div 
              onClick={() => setActiveTab('impact')}
              className="p-5 rounded-2xl bg-[#041d10]/60 hover:bg-[#072c18]/80 border border-emerald-500/25 hover:border-emerald-400 backdrop-blur-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300">
                Verified ESG Ledger
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed mb-3">
                Transparent carbon avoidance tracking, green points scoring, and circularity audits.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <span>Check Impact</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="p-6 rounded-3xl bg-[#041a0e]/70 border border-emerald-500/25 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {(userStats?.wasteDivertedKg ?? 24.8).toFixed(1)} kg
              </div>
              <div className="text-xs text-emerald-200/75 mt-0.5">Waste Diverted</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#34d399] font-['Outfit']">
                {(userStats?.co2AvoidedKg ?? 12.4).toFixed(1)} kg
              </div>
              <div className="text-xs text-emerald-200/75 mt-0.5">CO₂ Emissions Avoided</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {greenPoints} GP
              </div>
              <div className="text-xs text-emerald-200/75 mt-0.5">Green Points Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#34d399] font-['Outfit']">
                100%
              </div>
              <div className="text-xs text-emerald-200/75 mt-0.5">Circular Transparency</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
