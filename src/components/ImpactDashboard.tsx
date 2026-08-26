import React, { useState } from 'react';
import { TabType } from '../types';
import { 
  BarChart3, 
  Leaf, 
  Zap, 
  Coins, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Download, 
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ImpactDashboardProps {
  setActiveTab: (tab: TabType) => void;
  userStats: {
    wasteDivertedKg: number;
    co2AvoidedKg: number;
    recyclablesRecoveredKg: number;
    dungContributedKg: number;
    valueGeneratedInr: number;
    circularityScore: number;
  };
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  setActiveTab,
  userStats,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'30D' | '6M' | '1Y' | 'ALL'>('ALL');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const monthlyRecoveryData = [
    { month: 'Mar', wasteKg: 1200, dungKg: 2800, value: 34000 },
    { month: 'Apr', wasteKg: 1850, dungKg: 4200, value: 52000 },
    { month: 'May', wasteKg: 2400, dungKg: 5600, value: 71000 },
    { month: 'Jun', wasteKg: 3100, dungKg: 7800, value: 98000 },
    { month: 'Jul', wasteKg: 4300, dungKg: 9100, value: 114000 },
    { month: 'Aug', wasteKg: 5200, dungKg: 11400, value: 142000 },
  ];

  const categoryDistribution = [
    { label: 'Organic & Cattle Dung', percentage: 42, color: 'bg-emerald-600', val: '5,376 kg', icon: '🐄' },
    { label: 'PET & Rigid Polymers', percentage: 28, color: 'bg-teal-500', val: '3,584 kg', icon: '🧴' },
    { label: 'Scrap Metals & Wire', percentage: 18, color: 'bg-amber-500', val: '2,304 kg', icon: '⚡' },
    { label: 'Paper & Cardboard', percentage: 12, color: 'bg-blue-500', val: '1,536 kg', icon: '📦' },
  ];

  const handleDownloadCertificate = () => {
    setShowCertificate(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#F59E0B']
    });
  };

  return (
    <div id="impact-dashboard-view" className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Macro ESG & Circular Economy Analytics</span>
          </div>
          <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-emerald-950">
            Punarnava Impact
          </h1>
          <p className="text-sm text-slate-600">
            Real-time telemetry measuring ecological diversion, clean power generated, and wealth returned to citizens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Timeframe selector */}
          <div className="flex bg-white p-1 rounded-2xl border border-emerald-100 shadow-2xs">
            {(['30D', '6M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTimeframe === tf
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-extrabold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>ESG Certificate</span>
          </button>
        </div>
      </div>

      {/* 6 Key Macro Animated Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Metric 1: Waste Diverted */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs text-left relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-3">
            ♻️
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">Waste Diverted</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-emerald-950 block mt-1">
            12.8 <span className="text-xs font-bold text-emerald-700">Tons</span>
          </span>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
            <ArrowUpRight className="w-3 h-3" />
            <span>+24% this month</span>
          </div>
        </div>

        {/* Metric 2: CO2 Avoided */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs text-left relative overflow-hidden group hover:border-teal-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-lg mb-3">
            🌱
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">CO₂ Avoided</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-teal-950 block mt-1">
            5.4 <span className="text-xs font-bold text-teal-700">Tons</span>
          </span>
          <div className="flex items-center gap-1 text-[10px] text-teal-600 font-bold mt-2">
            <ArrowUpRight className="w-3 h-3" />
            <span>Verified carbon credits</span>
          </div>
        </div>

        {/* Metric 3: Dung Aggregated */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs text-left relative overflow-hidden group hover:border-amber-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-3">
            🐄
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">Dung Aggregated</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-amber-950 block mt-1">
            38.6 <span className="text-xs font-bold text-amber-700">Tons</span>
          </span>
          <div className="flex items-center gap-1 text-[10px] text-amber-700 font-bold mt-2">
            <ArrowUpRight className="w-3 h-3" />
            <span>14 Gaushalas linked</span>
          </div>
        </div>

        {/* Metric 4: Bioenergy Potential */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs text-left relative overflow-hidden group hover:border-blue-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg mb-3">
            ⚡
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">Bioenergy Generated</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-blue-950 block mt-1">
            1,240 <span className="text-xs font-bold text-blue-700">m³</span>
          </span>
          <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold mt-2">
            <ArrowUpRight className="w-3 h-3" />
            <span>2,230 kWh green power</span>
          </div>
        </div>

        {/* Metric 5: Value Created */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs text-left relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg mb-3">
            💰
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">Value Created</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-emerald-900 block mt-1">
            ₹4.8 <span className="text-xs font-bold text-emerald-700">Lakhs</span>
          </span>
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-2">
            <ArrowUpRight className="w-3 h-3" />
            <span>Disbursed to citizens</span>
          </div>
        </div>

        {/* Metric 6: People Connected */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs text-left relative overflow-hidden group hover:border-purple-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg mb-3">
            👥
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">People Connected</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-extrabold text-purple-950 block mt-1">
            1,284
          </span>
          <div className="flex items-center gap-1 text-[10px] text-purple-700 font-bold mt-2">
            <ArrowUpRight className="w-3 h-3" />
            <span>Active participants</span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Monthly Waste Recovery & Dung Trend Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6 text-left">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                Monthly Waste & Biomass Aggregation Trend
              </h3>
              <p className="text-xs text-slate-500">Kilograms diverted across Smart Sort and Digital Dung Bank</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500" />
                <span className="text-slate-600">Dung Feedstock (kg)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-teal-400" />
                <span className="text-slate-600">Recyclables (kg)</span>
              </div>
            </div>
          </div>

          {/* Stylized Visual Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 px-2 border-b border-slate-100">
            {monthlyRecoveryData.map((item, idx) => {
              const maxDung = 12000;
              const dungHeightPercent = (item.dungKg / maxDung) * 100;
              const wasteHeightPercent = (item.wasteKg / maxDung) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] p-2 rounded-xl text-center shadow-lg pointer-events-none mb-1 font-mono">
                    <div>🐄 {item.dungKg} kg</div>
                    <div>♻️ {item.wasteKg} kg</div>
                    <div className="text-emerald-400 font-bold">₹{(item.value / 1000).toFixed(1)}k value</div>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-44">
                    {/* Recyclables Bar */}
                    <div 
                      className="w-1/2 rounded-t-lg bg-teal-400 group-hover:bg-teal-300 transition-all"
                      style={{ height: `${wasteHeightPercent}%` }}
                    />
                    {/* Dung Bar */}
                    <div 
                      className="w-1/2 rounded-t-lg bg-emerald-600 group-hover:bg-emerald-500 transition-all"
                      style={{ height: `${dungHeightPercent}%` }}
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-600 mt-1">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Pill */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
            <span>Cumulative Diversion: <strong className="text-emerald-950">51,400 kg aggregated</strong></span>
            <span>Total Methane Prevented: <strong className="text-emerald-950">2,720 m³</strong></span>
          </div>

        </div>

        {/* Right Column: Waste Category Distribution */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6 text-left">
          
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
              Category Distribution
            </h3>
            <p className="text-xs text-slate-500">Breakdown of materials processed</p>
          </div>

          {/* Category Progress Bars */}
          <div className="space-y-4">
            {categoryDistribution.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] font-bold text-emerald-950">
                    {cat.percentage}% ({cat.val})
                  </span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Circularity Highlight Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-emerald-800 text-[10px] font-extrabold uppercase shadow-2xs">
              Ecosystem Circularity
            </div>
            <div className="font-['Space_Grotesk',sans-serif] text-3xl font-black text-emerald-950">
              78% Score
            </div>
            <p className="text-xs text-slate-600">
              Only 22% residual inert waste enters municipal secondary treatment; 78% is converted to wealth!
            </p>
          </div>

        </div>

      </div>

      {/* Downloadable ESG Impact Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border-4 border-emerald-400 shadow-2xl text-center space-y-6 animate-fadeIn relative">
            
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-md">
              🌿
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-widest block">
                SMART INDIA HACKATHON 2026 • OFFICIAL SUSTAINABILITY CERTIFICATE
              </span>
              <h2 className="font-['Outfit',sans-serif] text-2xl font-black text-emerald-950">
                PUNARNAVA CIRCULARITY BADGE
              </h2>
              <p className="text-xs text-slate-500">
                Issued to: <strong>PUNARNAVA PILOT PARTICIPANT</strong> • ID: #PNR-ESG-2026
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Waste Diverted</span>
                <span className="font-['Space_Grotesk',sans-serif] text-base font-bold text-emerald-950">{userStats.wasteDivertedKg} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">CO₂ Offset</span>
                <span className="font-['Space_Grotesk',sans-serif] text-base font-bold text-teal-950">{userStats.co2AvoidedKg} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Wealth Generated</span>
                <span className="font-['Space_Grotesk',sans-serif] text-base font-bold text-amber-950">₹{userStats.valueGeneratedInr}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic">
              "This certifies verified compliance with decentralized source segregation and bio-methanation protocols."
            </p>

            <button
              onClick={() => {
                alert('Certificate downloaded to device as Punarnava_ESG_Certificate_2026.pdf');
                setShowCertificate(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              📥 Download Verified PDF Certificate
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
