import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
  onClick?: () => void;
}

export const PunarnavaLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'dark',
  onClick
}) => {
  const isDark = variant === 'dark';

  return (
    <div 
      id="punarnava-brand-logo"
      onClick={onClick}
      className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      {/* Visual Logo SVG matching image.png */}
      <div 
        className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#041a0e] border border-emerald-500/40 p-1.5 shadow-lg shadow-emerald-950/60 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all duration-300"
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Glowing Green Outer Circle */}
          <circle cx="20" cy="20" r="15" stroke="#34d399" strokeWidth="2" strokeDasharray="30 8" className="animate-spin-slow" />
          <circle cx="20" cy="20" r="15" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
          
          {/* Diagonal Sprout Leaf with Stem */}
          <path 
            d="M13 27 C15 21 21 15 27 13 C27 19 21 25 15 27 Z" 
            fill="#34d399" 
          />
          <path 
            d="M13 27 L27 13" 
            stroke="#022c19" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          <circle cx="27" cy="13" r="2" fill="#a7f3d0" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="font-['Outfit',sans-serif] text-xl font-black tracking-tight text-white leading-none">
            PUNARNAVA
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-[#062415] text-emerald-300 border border-emerald-500/40">
            AI + IOT
          </span>
        </div>
        <span className="font-semibold text-xs text-[#34d399] tracking-tight mt-0.5">
          Waste In. Value Out.
        </span>
      </div>
    </div>
  );
};
