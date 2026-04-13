"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const PremiumInput = ({ label, icon, error, ...props }: PremiumInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2 w-full group">
      <div className="flex justify-between items-center ml-1">
        <label className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${isFocused ? 'text-accent-green' : 'text-gray-500'}`}>
          {label}
        </label>
        {error && (
            <motion.span 
              initial={{ opacity: 0, x: 5 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1"
            >
               <AlertCircle className="w-3 h-3" /> {error}
            </motion.span>
        )}
      </div>

      <div className="relative">
        {icon && (
          <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-accent-green' : 'text-gray-600'}`}>
             {icon}
          </div>
        )}
        
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full bg-[#0A0A0B]/40 border border-white/5 rounded-2xl py-5 pr-6 transition-all duration-500
            ${icon ? 'pl-14' : 'pl-6'}
            ${isFocused ? 'border-accent-green/40 bg-white/[0.04] shadow-[0_0_25px_rgba(0,255,136,0.1)]' : 'hover:border-white/10'}
            ${error ? 'border-red-500/30 bg-red-500/[0.02]' : ''}
            text-white placeholder:text-gray-800 outline-none font-medium
          `}
        />

        {/* Dynamic Bottom Line Glow */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              layoutId="input-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent-green/50 to-transparent"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
