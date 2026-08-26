import React, { useState } from 'react';
import { User, Wallet, Sparkles, Award, ArrowUpRight, CheckCircle2, X, Download, ShieldCheck, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  greenPoints: number;
  onWithdraw: (amount: number) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  greenPoints,
  onWithdraw,
}) => {
  const [upiId, setUpiId] = useState<string>('muralik@okhdfcbank');
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleWithdrawFunds = () => {
    if (walletBalance <= 0) return;
    onWithdraw(walletBalance);
    setWithdrawSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#F59E0B']
    });
  };

  const transactions = [
    { title: 'Scrap Metal Bidding Payout (Apex Circular)', date: 'Today, 3:45 PM', amount: '+₹3,100', type: 'credit' },
    { title: 'Dung Bank Feedstock (120kg to Urja Shakti)', date: 'Yesterday', amount: '+₹420', type: 'credit' },
    { title: 'PET Plastic Baled Lot (GreenLoop)', date: '3 days ago', amount: '+₹310', type: 'credit' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-emerald-100 shadow-2xl space-y-6 text-left animate-fadeIn relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-['Outfit',sans-serif] text-xl font-extrabold text-slate-900">
                Murali K.
              </h3>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">
              Verified Citizen Recycler • Member since 2026
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                🌱 Level: Seedling
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                {greenPoints} Green Points
              </span>
            </div>
          </div>
        </div>

        {/* Digital Wallet Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Punarnava Eco-Wallet
              </span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-700/60 px-2 py-0.5 rounded">
              UPI Connected
            </span>
          </div>

          <div>
            <span className="text-xs text-emerald-200/80 block">Withdrawable Balance</span>
            <span className="font-['Space_Grotesk',sans-serif] text-3xl font-black text-white block mt-0.5">
              ₹{walletBalance.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-700/60">
            <div className="text-[11px] text-emerald-200">
              Linked UPI: <strong className="text-white">{upiId}</strong>
            </div>

            <button
              onClick={handleWithdrawFunds}
              disabled={walletBalance <= 0}
              className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-700 text-emerald-950 font-extrabold text-xs transition-all cursor-pointer"
            >
              Withdraw to Bank
            </button>
          </div>
        </div>

        {withdrawSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Instant payout transferred to {upiId}!</span>
          </div>
        )}

        {/* Transaction History */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Recent Value Transactions
          </span>
          <div className="space-y-2">
            {transactions.map((tx, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-slate-800">{tx.title}</h5>
                  <span className="text-[10px] text-slate-400">{tx.date}</span>
                </div>
                <span className="font-['Space_Grotesk',sans-serif] font-bold text-emerald-700">
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
