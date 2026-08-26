import React from 'react';
import { PunarnavaLogo } from './PunarnavaLogo';
import { TabType } from '../types';
import { 
  Home, 
  Scan, 
  Eye,
  Trash2,
  ShoppingCart, 
  BarChart3, 
  MapPin, 
  Sparkles, 
  Repeat, 
  Sprout
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  greenPoints?: number;
  points?: number;
  walletBalance?: number;
  onOpenDemoModal?: () => void;
  onOpenDemo?: () => void;
  onOpenProfileModal?: () => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  greenPoints,
  points,
  onOpenDemoModal,
  onOpenDemo,
  onOpenProfileModal,
  onOpenProfile,
}) => {
  const currentPoints = greenPoints ?? points ?? 740;
  const handleOpenDemo = onOpenDemoModal || onOpenDemo || (() => {});
  const handleOpenProfile = onOpenProfileModal || onOpenProfile || (() => {});

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'smart-sort', label: 'Smart Sort', icon: Sparkles },
    { id: 'smart-sort', label: 'AI Vision', icon: Eye },
    { id: 'smart-bin', label: 'IoT Bin', icon: Trash2 },
    { id: 'dung-bank', label: 'Dung Bank', icon: Sparkles },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'circular-loop', label: 'The Loop', icon: Repeat },
    { id: 'impact', label: 'Impact', icon: BarChart3 },
    { id: 'tracking', label: 'Tracking', icon: MapPin },
  ];

  return (
    <header 
      id="punarnava-main-navbar"
      className="sticky top-0 z-40 w-full bg-[#020d06]/40 backdrop-blur-xl border-b border-emerald-500/15 shadow-xl shadow-black/40 text-white transition-all duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <PunarnavaLogo 
          size="md" 
          variant="dark"
          onClick={() => setActiveTab('home')} 
        />

        {/* Center: Desktop Navigation Bar Pill */}
        <nav 
          id="desktop-navigation-links"
          className="hidden xl:flex items-center gap-1 bg-[#051f12]/90 px-3 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-inner"
        >
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isHomeActive = activeTab === 'home' && item.id === 'home';
            const isActive = !isHomeActive && activeTab === item.id && (item.id !== 'smart-sort' || idx === 1);
            
            return (
              <button
                key={`${item.id}-${idx}`}
                id={`nav-link-${item.id}-${idx}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 select-none cursor-pointer ${
                  isHomeActive
                    ? 'bg-[#10b981] text-[#021f11] shadow-[0_0_15px_rgba(16,185,129,0.5)] font-bold'
                    : isActive
                    ? 'bg-[#0e3a22] text-[#34d399] border border-emerald-500/40 font-bold'
                    : 'text-emerald-100/75 hover:text-white hover:bg-emerald-900/30 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isHomeActive ? 'text-[#021f11]' : 'text-emerald-400/85'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          
          {/* SIH Hackathon Demo Mode Button */}
          <button
            id="btn-trigger-demo-tour"
            onClick={handleOpenDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#062415] hover:bg-[#0c3822] text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-sm hover:border-emerald-400 hover:scale-102 cursor-pointer"
            title="Interactive Smart India Hackathon Demo Flows"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[9px] text-emerald-400/80 uppercase font-black tracking-wider">SIH</span>
              <span className="text-xs">Demo Mode</span>
            </div>
          </button>

          {/* Green Points Score Pill */}
          <div 
            id="user-green-points-pill"
            onClick={handleOpenProfile}
            className="cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#062415] border border-emerald-500/40 text-white text-xs font-bold shadow-sm hover:border-emerald-400 transition-all"
          >
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-200/90 font-medium">Score:</span>
            <span className="text-[#34d399] font-black">{currentPoints} GP</span>
          </div>

          {/* Prominent Neon Green "Scan Waste" CTA Button */}
          <button
            id="btn-prominent-scan-waste"
            onClick={() => setActiveTab('smart-sort')}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#34d399] text-[#021f11] font-black text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-98 transition-all cursor-pointer"
          >
            <Scan className="w-4 h-4 text-[#021f11]" />
            <span>Scan Waste</span>
          </button>

        </div>
      </div>
    </header>
  );
};
