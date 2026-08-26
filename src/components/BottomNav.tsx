import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Scan, 
  Sparkles, 
  Coins, 
  BarChart3, 
  Truck
} from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const items = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'smart-sort' as TabType, label: 'Sort', icon: Scan, isSpecial: true },
    { id: 'dung-bank' as TabType, label: 'Dung Bank', icon: Sparkles },
    { id: 'marketplace' as TabType, label: 'Market', icon: Coins },
    { id: 'impact' as TabType, label: 'Impact', icon: BarChart3 },
    { id: 'tracking' as TabType, label: 'Orders', icon: Truck },
  ];

  return (
    <nav 
      id="punarnava-mobile-bottom-nav"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-emerald-100 px-2 py-2 flex items-center justify-around shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        if (item.isSpecial) {
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className="-mt-5 flex flex-col items-center justify-center p-2 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold mt-0.5">Scan</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-emerald-700 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className="text-[11px] mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
