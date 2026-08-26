import React, { useState } from 'react';
import { initialGamification } from '../data/mockData';
import { GamificationState, TabType } from '../types';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Leaf, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Droplets,
  Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamificationCenterProps {
  greenPoints: number;
  setActiveTab: (tab: TabType) => void;
}

export const GamificationCenter: React.FC<GamificationCenterProps> = ({
  greenPoints,
  setActiveTab,
}) => {
  const [gamification, setGamification] = useState<GamificationState>({
    ...initialGamification,
    currentPoints: greenPoints,
  });

  const [wateredCount, setWateredCount] = useState<number>(0);
  const [challengeClaimed, setChallengeClaimed] = useState<boolean>(false);

  // Plant Stages visual representations
  const plantStages = [
    { stage: 1, name: 'Sprout', icon: '🌱', req: 0 },
    { stage: 2, name: 'Seedling', icon: '🌿', req: 500 },
    { stage: 3, name: 'Sapling', icon: '🪴', req: 1000 },
    { stage: 4, name: 'Young Tree', icon: '🌳', req: 2500 },
    { stage: 5, name: 'Sacred Banyan', icon: '🌲', req: 5000 },
  ];

  const handleWaterPlant = () => {
    setWateredCount((prev) => prev + 1);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#38BDF8', '#34D399', '#10B981']
    });
  };

  const handleClaimChallenge = () => {
    setChallengeClaimed(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#F59E0B', '#34D399']
    });
  };

  return (
    <div id="gamification-center-view" className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sustainability Rewards & Virtual Garden</span>
          </div>
          <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-emerald-950">
            Green Points & Impact Rewards
          </h1>
          <p className="text-sm text-slate-600">
            Every kilogram of waste segregated, dung aggregated, or scrap traded nurtures your virtual circular tree.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
          <div>
            <span className="font-['Space_Grotesk',sans-serif] text-base font-black text-amber-950 block">
              6 Days Streak!
            </span>
            <span className="text-[10px] text-amber-800 font-bold">1.5x Point Multiplier</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Virtual Plant & Weekly Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Virtual Garden Tree */}
        <div className="lg:col-span-6 bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-xs space-y-6 text-center relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3 text-left">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Current Stage
              </span>
              <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                Level: 🌱 {gamification.levelTitle}
              </h3>
            </div>

            <div className="text-right">
              <span className="font-['Space_Grotesk',sans-serif] text-2xl font-black text-emerald-900">
                {greenPoints}
              </span>
              <span className="text-xs text-slate-500 block">/ 1,000 GP</span>
            </div>
          </div>

          {/* Plant Visual Centerpiece */}
          <div className="relative py-8 flex flex-col items-center justify-center">
            
            {/* Sun Rays */}
            <div className="absolute top-2 right-8 text-3xl animate-spin-slow text-amber-400 opacity-80">
              ☀️
            </div>

            {/* Glowing Aura Ring */}
            <div className="w-44 h-44 rounded-full bg-radial from-emerald-200/60 to-transparent flex items-center justify-center animate-pulse-leaf">
              <div className="text-7xl transform hover:scale-125 transition-transform duration-300 cursor-pointer select-none">
                🌿
              </div>
            </div>

            {/* Soil Base */}
            <div className="w-40 h-5 rounded-full bg-gradient-to-r from-amber-800/70 via-amber-900/80 to-amber-800/70 blur-2xs mt-2" />

            <p className="text-xs text-slate-600 max-w-sm mt-4 font-medium">
              "Your plant has absorbed <strong>18.6 kg of CO₂</strong> equivalent this week from your verified sorting activities."
            </p>
          </div>

          {/* Micro-interaction Water & Nurture buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleWaterPlant}
              className="py-3 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center gap-2 border border-blue-200 transition-all cursor-pointer"
            >
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>Water Tree ({wateredCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('smart-sort')}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Leaf className="w-4 h-4" />
              <span>Scan Waste for +50 GP</span>
            </button>
          </div>

        </div>

        {/* Right Column: Weekly Challenge & Badges */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Weekly Challenge Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-xs space-y-4 text-left relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <Award className="w-4 h-4 text-amber-500" />
                <span>THIS WEEK'S CHALLENGE</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                2 Days Left
              </span>
            </div>

            <div>
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                "{gamification.weeklyChallenge.title}"
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {gamification.weeklyChallenge.description}
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Progress: 3.8 / 5.0 kg</span>
                <span className="text-emerald-700">76% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-3/4 transition-all" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-amber-800">
                Reward: <strong>+100 Green Points</strong>
              </span>

              <button
                onClick={handleClaimChallenge}
                disabled={challengeClaimed}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 text-white font-bold text-xs transition-all cursor-pointer"
              >
                {challengeClaimed ? 'Claimed ✓' : 'Claim +100 GP'}
              </button>
            </div>
          </div>

          {/* Achievement Badges Grid */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4 text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Unlocked Achievements ({gamification.achievements.filter(a => a.unlocked).length}/{gamification.achievements.length})
            </span>

            <div className="space-y-3">
              {gamification.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    ach.unlocked
                      ? 'bg-emerald-50/60 border-emerald-200/90'
                      : 'bg-slate-50/60 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-xl">
                      {ach.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                        <span>{ach.title}</span>
                        {ach.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </h4>
                      <p className="text-[11px] text-slate-500">{ach.description}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-xl border border-emerald-200">
                    +{ach.points} GP
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
