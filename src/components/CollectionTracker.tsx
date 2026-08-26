import React, { useState, useEffect } from 'react';
import { CollectionOrder, TabType } from '../types';
import { 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Coins, 
  Clock, 
  ArrowRight,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CollectionTrackerProps {
  order: CollectionOrder;
  setActiveTab: (tab: TabType) => void;
  onOrderCompleted: (orderId: string, amount: number) => void;
}

export const CollectionTracker: React.FC<CollectionTrackerProps> = ({
  order,
  setActiveTab,
  onOrderCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(order.currentStepIndex || 2);
  const [etaMins, setEtaMins] = useState<number>(order.estimatedArrivalMins || 14);
  const [payoutReceived, setPayoutReceived] = useState<boolean>(false);

  const steps = [
    { title: 'Offer Accepted', desc: 'Price lock verified', icon: '✓' },
    { title: 'Recycler Assigned', desc: 'Apex Circular Commodities', icon: '👤' },
    { title: 'Pickup En Route', desc: 'Driver 2.4 km away', icon: '🚛' },
    { title: 'Material Collected', desc: 'Digital weight verified', icon: '⚖️' },
    { title: 'Payment Completed', desc: `₹${order.amountInr} credited`, icon: '💰' }
  ];

  // Advance simulation step
  const handleAdvanceStep = () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (nextStep === 4) {
        setPayoutReceived(true);
        onOrderCompleted(order.id, order.amountInr);

        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#10B981', '#F59E0B', '#34D399', '#3B82F6']
        });
      }
    }
  };

  return (
    <div id="collection-tracking-view" className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active Collection Dispatch</span>
          </div>
          <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-extrabold text-slate-900">
            Order #{order.trackingNumber}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Material: <strong className="text-slate-800">{order.scrapTitle}</strong> • Weight: <strong className="text-slate-800">{order.weightKg} kg</strong>
          </p>
        </div>

        <div className="text-left sm:text-right bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Payout</span>
          <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-emerald-900 block mt-0.5">
            ₹{order.amountInr.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] font-bold text-emerald-700">Instant UPI Direct Deposit</span>
        </div>
      </div>

      {/* 1. Horizontal Step Progress Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6 text-left">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold text-slate-900">
            COLLECTION STATUS
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Live Milestone Sync
          </span>
        </div>

        {/* Horizontal Tracker */}
        <div className="relative">
          
          {/* Connecting Track Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 rounded-full z-0 hidden md:block">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div 
                  key={idx} 
                  className={`flex md:flex-col items-center md:items-center text-left md:text-center p-3 md:p-2 rounded-2xl transition-all ${
                    isCurrent ? 'bg-emerald-50 md:bg-transparent border border-emerald-200 md:border-transparent' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs transition-all shrink-0 mr-3 md:mr-0 md:mb-2 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                        ? 'bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-950 font-black' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                      {step.title} {isCompleted && '✓'}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Advance Simulation Step Controller */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Demo Simulator: Step through collection lifecycle
          </span>
          <button
            onClick={handleAdvanceStep}
            disabled={currentStep >= 4}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>{currentStep >= 4 ? 'Order Fulfilled & Settled' : 'Advance Next Milestone →'}</span>
          </button>
        </div>

      </div>

      {/* 2. Live Map Route & Driver Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Live Route Map */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                Live GPS Routing View
              </h3>
              <p className="text-xs text-slate-500">Recycler vehicle en route to your doorstep</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>ETA: ~{etaMins} mins</span>
            </div>
          </div>

          {/* Stylized Animated Route Map */}
          <div className="relative w-full aspect-16/9 rounded-2xl bg-gradient-to-tr from-slate-100 via-emerald-50/50 to-teal-50/70 p-6 border border-slate-200 overflow-hidden shadow-inner flex items-center justify-between">
            
            {/* Background Roads SVG with animated dashes */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 60 120 C 140 40, 220 180, 320 80" 
                stroke="#CBD5E1" 
                strokeWidth="10" 
                fill="none" 
                strokeLinecap="round" 
              />
              <path 
                d="M 60 120 C 140 40, 220 180, 320 80" 
                stroke="#10B981" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round"
                className="animate-flow-line"
              />
            </svg>

            {/* Recycler Truck Pin (Moving) */}
            <div className="relative z-10 flex flex-col items-center animate-float">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center justify-center text-xl border-2 border-white ring-4 ring-emerald-300/60">
                🚛
              </div>
              <span className="text-[10px] font-black text-emerald-950 bg-white/95 px-2 py-0.5 rounded shadow mt-1">
                Recycler En Route
              </span>
            </div>

            {/* User House Destination Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center justify-center text-xl border-2 border-white ring-4 ring-slate-300">
                🏠
              </div>
              <span className="text-[10px] font-black text-slate-900 bg-white/95 px-2 py-0.5 rounded shadow mt-1">
                Your Location
              </span>
            </div>

          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
            <span>Pickup Address: <strong>{order.pickupAddress}</strong></span>
            <span className="font-mono text-emerald-700 font-bold">Verified Geo-Coordinates</span>
          </div>

        </div>

        {/* Driver & OTP Details Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-5 text-left">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
              Verified Collection Agent
            </h3>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-base flex items-center justify-center">
                AC
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{order.recyclerName}</h4>
                <p className="text-xs text-slate-500">Vehicle: {order.recyclerVehicle}</p>
              </div>
            </div>

            <a 
              href={`tel:${order.recyclerPhone}`}
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* OTP Verification Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300/80 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Handover Verification OTP
            </span>
            <div className="font-['Space_Grotesk',sans-serif] text-3xl font-black text-emerald-950 tracking-widest py-1">
              {order.otpCode}
            </div>
            <p className="text-[11px] text-slate-600">
              Share this code with the driver after scale weight confirmation.
            </p>
          </div>

          {/* Micro-interaction Value Transformation Banner */}
          {payoutReceived && (
            <div className="p-4 rounded-2xl bg-emerald-600 text-white space-y-1 text-center animate-bounce">
              <span className="text-2xl">♻️ ➔ ₹</span>
              <h4 className="font-black text-sm">Payment of ₹{order.amountInr} Credited!</h4>
              <p className="text-xs text-emerald-100">Transferred to your bank UPI wallet • +120 GP</p>
            </div>
          )}

          <button
            onClick={() => setActiveTab('impact')}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Updated Carbon & Wealth Impact →</span>
          </button>

        </div>

      </div>

    </div>
  );
};
