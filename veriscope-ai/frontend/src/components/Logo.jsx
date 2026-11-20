import React from 'react';

export default function Logo({ size = 'md', showTagline = false }) {
  const sizeMap = {
    sm: 'w-7 h-7 text-lg',
    md: 'w-9 h-9 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-cyan rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
        
        {/* Logo Shield & Scope SVG */}
        <div className="relative w-10 h-10 rounded-xl bg-[#10121A] border border-white/10 flex items-center justify-center p-2 shadow-inner">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-brand-blue"
          >
            {/* Outer Verification Shield */}
            <path
              d="M16 2L5 6.5V14C5 21.2 9.7 27.8 16 30C22.3 27.8 27 21.2 27 14V6.5L16 2Z"
              stroke="url(#shield-grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />
            {/* Scope / Radar Reticle */}
            <circle
              cx="16"
              cy="15"
              r="6.5"
              stroke="#48D8E8"
              strokeWidth="1.8"
              strokeDasharray="2 2"
            />
            {/* AI Focus Center Node */}
            <circle cx="16" cy="15" r="2.5" fill="#4385FF" />
            <path
              d="M16 10V12M16 18V20M11 15H13M19 15H21"
              stroke="#F5F6FA"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="shield-grad" x1="5" y1="2" x2="27" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4385FF" />
                <stop offset="0.5" stopColor="#9065FF" />
                <stop offset="1" stopColor="#48D8E8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-tight text-white text-xl">
            Veri<span className="text-brand-cyan">Scope</span>
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-brand-blue/20 text-brand-blue border border-brand-blue/30 rounded">
            AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-text-secondary tracking-wide">
            Beyond Headlines. Discover the Truth.
          </span>
        )}
      </div>
    </div>
  );
}
