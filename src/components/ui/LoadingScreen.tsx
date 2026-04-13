"use client";

import React from "react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-main">
      <div className="relative flex flex-col items-center gap-6">
        {/* Pulsing Logo Animation */}
        <div className="relative">
          <div className="w-16 h-16 bg-accent-green rounded-full animate-ping opacity-20 absolute inset-0" />
          <div className="w-16 h-16 bg-accent-green rounded-full blur-xl opacity-40 absolute inset-0" />
          <div className="w-16 h-16 bg-bg-surface border-2 border-accent-green/50 rounded-full flex items-center justify-center relative z-10 shadow-glow">
            <div className="w-8 h-8 bg-accent-green rounded-sm rotate-45 animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <h2 className="text-white font-bold tracking-widest text-xl mb-1">MEDIFLUX</h2>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-accent-green rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-1 bg-accent-green rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-1 bg-accent-green rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
