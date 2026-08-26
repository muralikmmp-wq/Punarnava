import React from 'react';
import { TabType } from '../types';
import { 
  Play, 
  Sparkles, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Scan, 
  Coins, 
  Truck, 
  BarChart3,
  Repeat
} from 'lucide-react';

interface DemoTourGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemoFlow1: () => void;
  onRunDemoFlow2: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const DemoTourGuide: React.FC<DemoTourGuideProps> = ({
  isOpen,
  onClose,
  onRunDemoFlow1,
  onRunDemoFlow2,
  setActiveTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-emerald-100 shadow-2xl space-y-6 text-left animate-fadeIn relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart India Hackathon 2026 Jury Presentation Mode</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-black text-slate-900">
            Interactive Ecosystem Demonstration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Choose an automated end-to-end user journey to demonstrate Punarnava's three core value creation loops.
          </p>
        </div>

        {/* Two Main Demo Journeys */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Demo 1: Source Segregation -> Marketplace -> Pickup -> Impact */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50/90 to-teal-50/50 border border-emerald-200 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">
                📸
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                DEMO JOURNEY 1
              </span>
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                AI Scan ➔ Scrap Bid ➔ Collection
              </h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1. AI visual scanning & polymer valuation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>2. Instant verified bids from certified buyers</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>3. Live GPS pickup tracking & wallet credit</span>
                </li>
              </ul>
            </div>

            <button
              id="btn-start-demo-journey-1"
              onClick={() => {
                onRunDemoFlow1();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Journey 1 (Scan & Sell)</span>
            </button>
          </div>

          {/* Demo 2: Digital Dung Bank -> Bioenergy AI Calc -> Biogas Match */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/90 to-emerald-50/50 border border-amber-200 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-lg font-bold">
                🐄
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                DEMO JOURNEY 2
              </span>
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                Dung Bank ➔ Bio-CBG ➔ Community
              </h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>1. Inspect regional Gaushala & Dairy map</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>2. Dynamic MNRE AI bioenergy calculation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>3. Match feedstock to nearby Biogas/CBG plant</span>
                </li>
              </ul>
            </div>

            <button
              id="btn-start-demo-journey-2"
              onClick={() => {
                onRunDemoFlow2();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Journey 2 (Bioenergy Match)</span>
            </button>
          </div>

        </div>

        {/* Quick section links */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>Jump to specific engine:</span>
          <div className="flex gap-2">
            <button 
              onClick={() => { setActiveTab('smart-bin'); onClose(); }}
              className="hover:text-emerald-700 underline"
            >
              IoT Smart Bin
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveTab('circular-loop'); onClose(); }}
              className="hover:text-emerald-700 underline"
            >
              The Circular Loop
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveTab('impact'); onClose(); }}
              className="hover:text-emerald-700 underline"
            >
              Impact Stats
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
