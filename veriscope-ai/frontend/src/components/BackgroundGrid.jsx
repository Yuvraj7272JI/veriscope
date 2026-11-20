import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary Radial Glow from Top */}
      <div 
        className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #4385FF 0%, #9065FF 40%, transparent 70%)'
        }}
      />

      {/* Secondary Cyan Accent Orb Right */}
      <div 
        className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #48D8E8 0%, transparent 70%)'
        }}
      />

      {/* Purple Accent Orb Left */}
      <div 
        className="absolute top-[75%] -left-[10%] w-[650px] h-[650px] rounded-full blur-[170px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #9065FF 0%, transparent 70%)'
        }}
      />

      {/* Subtle Matrix / Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Vignette Gradient */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#08090D] via-transparent to-transparent opacity-80" />
      
      {/* Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-90" />
    </div>
  );
}
