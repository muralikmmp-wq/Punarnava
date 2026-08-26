import React, { useState } from 'react';
import { TabType, ScrapListing, RecyclerBid, CollectionOrder, WasteItem } from './types';
import { initialUserStats, mockCollectionOrder } from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { SmartSortScanner } from './components/SmartSortScanner';
import { SmartBinSimulator } from './components/SmartBinSimulator';
import { DigitalDungBank } from './components/DigitalDungBank';
import { ScrapMarketplace } from './components/ScrapMarketplace';
import { CollectionTracker } from './components/CollectionTracker';
import { ImpactDashboard } from './components/ImpactDashboard';
import { CircularLoopVisualizer } from './components/CircularLoopVisualizer';
import { GamificationCenter } from './components/GamificationCenter';
import { PunaAIAssistant } from './components/PunaAIAssistant';
import { DemoTourGuide } from './components/DemoTourGuide';
import { UserProfileModal } from './components/UserProfileModal';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [greenPoints, setGreenPoints] = useState<number>(740);
  const [walletBalance, setWalletBalance] = useState<number>(1840);
  const [userStats, setUserStats] = useState(initialUserStats);
  const [activeOrder, setActiveOrder] = useState<CollectionOrder>(mockCollectionOrder);
  
  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Callback when user accepts a marketplace bid
  const handleOfferAccepted = (listing: ScrapListing, bid: RecyclerBid) => {
    const newOrder: CollectionOrder = {
      id: 'order-' + Date.now(),
      trackingNumber: 'PNR10284',
      scrapTitle: listing.title,
      weightKg: listing.estimatedWeightKg,
      amountInr: bid.priceInr,
      recyclerName: bid.buyerName,
      recyclerPhone: '+91 98450 12849',
      recyclerVehicle: 'Eco-Electric Van (KA 01 EK 8892)',
      pickupAddress: '42, 14th Main, Koramangala 4th Block, Bengaluru',
      currentStepIndex: 2,
      estimatedArrivalMins: 14,
      otpCode: '8492'
    };

    setActiveOrder(newOrder);
    setActiveTab('tracking');
    showToast(`Offer accepted from ${bid.buyerName} for ₹${bid.priceInr}! Collection dispatched.`);
  };

  // Callback when collection order completes
  const handleOrderCompleted = (orderId: string, amount: number) => {
    setWalletBalance((prev) => prev + amount);
    setGreenPoints((prev) => prev + 120);
    setUserStats((prev) => ({
      ...prev,
      wasteDivertedKg: prev.wasteDivertedKg + 4.5,
      co2AvoidedKg: Number((prev.co2AvoidedKg + 1.8).toFixed(1)),
      valueGeneratedInr: prev.valueGeneratedInr + amount
    }));
    showToast(`Order fulfilled! ₹${amount} deposited to your Eco-Wallet (+120 Green Points)`);
  };

  // Callback when waste is scanned
  const handleWasteScanned = (item: WasteItem) => {
    setGreenPoints((prev) => prev + item.greenPoints);
    setUserStats((prev) => ({
      ...prev,
      wasteDivertedKg: Number((prev.wasteDivertedKg + 0.3).toFixed(1)),
      co2AvoidedKg: Number((prev.co2AvoidedKg + 0.1).toFixed(1))
    }));
    showToast(`Sorted ${item.name}! +${item.greenPoints} GP added to your account.`);
  };

  // Callback when dung is contributed
  const handleDungContributed = (kg: number, valueInr: number) => {
    setGreenPoints((prev) => prev + Math.round(kg * 0.5));
    setWalletBalance((prev) => prev + valueInr);
    setUserStats((prev) => ({
      ...prev,
      dungContributedKg: prev.dungContributedKg + kg,
      co2AvoidedKg: Number((prev.co2AvoidedKg + (kg * 0.08)).toFixed(1)),
      valueGeneratedInr: prev.valueGeneratedInr + valueInr
    }));
    showToast(`Deposited ${kg} kg cattle manure! +₹${valueInr} credited.`);
  };

  const handleWalletWithdraw = (amount: number) => {
    setWalletBalance(0);
    showToast(`Withdrawn ₹${amount} to linked UPI account.`);
  };

  // Demo Flow 1: Automated Scan -> Marketplace -> Tracking
  const runDemoFlow1 = () => {
    setActiveTab('smart-sort');
    showToast('Demo Journey 1 Initiated: Analyzing recyclable waste sample...');
  };

  // Demo Flow 2: Automated Dung Bank -> Bioenergy Match
  const runDemoFlow2 = () => {
    setActiveTab('dung-bank');
    showToast('Demo Journey 2 Initiated: Aggregating cattle biomass into digital bank...');
  };

  return (
    <div className={`min-h-screen font-['Plus_Jakarta_Sans',sans-serif] flex flex-col transition-colors duration-300 ${
      activeTab === 'home' 
        ? 'bg-[#020e07] text-white selection:bg-emerald-400 selection:text-emerald-950' 
        : 'bg-[#FBFDFB] text-slate-800 selection:bg-emerald-200 selection:text-emerald-900'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        greenPoints={greenPoints}
        walletBalance={walletBalance}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-emerald-950/95 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/40 backdrop-blur-md flex items-center gap-3 text-xs font-bold animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white ml-1 cursor-pointer">✕</button>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${
        activeTab === 'home' 
          ? 'p-0 max-w-none flex flex-col' 
          : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-16'
      }`}>
        
        {activeTab === 'home' && (
          <HomeDashboard
            setActiveTab={setActiveTab}
            onOpenDemo={() => setIsDemoModalOpen(true)}
            userStats={userStats}
            greenPoints={greenPoints}
            walletBalance={walletBalance}
          />
        )}

        {activeTab === 'smart-sort' && (
          <SmartSortScanner
            onWasteScanned={handleWasteScanned}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'smart-bin' && (
          <SmartBinSimulator
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dung-bank' && (
          <DigitalDungBank
            onDungContributed={handleDungContributed}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'marketplace' && (
          <ScrapMarketplace
            onOfferAccepted={handleOfferAccepted}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'tracking' && (
          <CollectionTracker
            order={activeOrder}
            setActiveTab={setActiveTab}
            onOrderCompleted={handleOrderCompleted}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactDashboard
            setActiveTab={setActiveTab}
            userStats={userStats}
          />
        )}

        {activeTab === 'circular-loop' && (
          <CircularLoopVisualizer />
        )}

        {activeTab === 'gamification' && (
          <GamificationCenter
            greenPoints={greenPoints}
            setActiveTab={setActiveTab}
          />
        )}

      </main>

      {/* Floating Puna AI Assistant */}
      <PunaAIAssistant setActiveTab={setActiveTab} />

      {/* Bottom Navigation for Mobile Devices */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Presentation Demo Modal */}
      <DemoTourGuide
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onRunDemoFlow1={runDemoFlow1}
        onRunDemoFlow2={runDemoFlow2}
        setActiveTab={setActiveTab}
      />

      {/* User Profile & Wallet Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        walletBalance={walletBalance}
        greenPoints={greenPoints}
        onWithdraw={handleWalletWithdraw}
      />

      {/* Footer */}
      <footer className={`hidden md:block py-6 text-center text-xs transition-colors ${
        activeTab === 'home'
          ? 'border-t border-emerald-500/20 bg-[#03130a] text-emerald-300/70'
          : 'border-t border-emerald-100 bg-white text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Space_Grotesk',sans-serif] font-black text-emerald-400 tracking-wider">
              PUNARNAVA
            </span>
            <span>• Decentralized Waste-to-Wealth Ecosystem</span>
          </div>
          <p>
            🌱 Clean + 🌿 Natural + ♻️ Smart + 🤖 AI + ⚡ Futuristic + 💚 Trustworthy
          </p>
          <div className="flex items-center gap-4 text-emerald-400 font-semibold">
            <button onClick={() => setActiveTab('smart-sort')} className="hover:underline cursor-pointer">Smart Sort</button>
            <button onClick={() => setActiveTab('dung-bank')} className="hover:underline cursor-pointer">Dung Bank</button>
            <button onClick={() => setActiveTab('marketplace')} className="hover:underline cursor-pointer">Marketplace</button>
            <button onClick={() => setIsDemoModalOpen(true)} className="hover:underline cursor-pointer">Demo Flow</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
