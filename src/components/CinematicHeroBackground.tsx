import React from 'react';

/**
 * CinematicHeroBackground
 * 
 * Renders the user-provided cinematic background image:
 * Left: Real waste, plastics, scrap conveyor entering robotic intake vault.
 * Center: Radiant emerald transformation vortex with 3D recycling emblem.
 * Right: Green biophilic eco-city, wind turbines, solar panels, and Biogas / CBG Plant.
 * 
 * Includes only a feather-light transparent vignette for pristine typography contrast.
 */
export const CinematicHeroBackground: React.FC = () => {
  return (
    <div 
      id="cinematic-hero-bg-wrapper"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030906]"
    >
      {/* Direct Photographic Background Image Asset */}
      <img
        src="/image.png"
        alt="Punarnava Waste to Green Transformation"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center transform scale-[1.01]"
      />

      {/* Very light, transparent dark gradient on the left for text readability, keeping the image fully visible */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-gradient-to-r from-black/70 via-black/35 to-transparent pointer-events-none" />

      {/* Top and bottom soft fade to integrate with navbar and bottom content */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020b05]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
