"use client";

import React from "react";

export const AppLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative group">
        {/* Neon Pulse Rings */}
        <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute inset-[-10px] border border-accent-green/30 rounded-full animate-ping [animation-duration:2s]" />
        
        {/* Central Logo Symbol */}
        <div className="w-20 h-20 bg-bg-surface border-2 border-accent-green rounded-3xl flex items-center justify-center relative z-10 overflow-hidden shadow-glow">
          <div className="w-10 h-10 bg-accent-green rounded-full opacity-80 animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute inset-x-0 h-1 bg-accent-green/50 blur-sm animate-[scan_2s_linear_infinite]" />
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-accent-green font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">Synchronisation</span>
        <h3 className="text-white font-bold tracking-tighter text-lg">MEDIFLUX OS</h3>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};
