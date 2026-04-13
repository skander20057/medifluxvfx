"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const PremiumInput = ({ label, icon, error, className = "", ...props }: PremiumInputProps) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
        {label}
      </label>
      
      <div className="relative group">
        {/* Background Layer with internal glow on focus */}
        <div className="absolute inset-0 rounded-xl bg-black transition-all group-focus-within:shadow-[inset_0_0_10px_rgba(0,255,136,0.05)]" />
        
        {/* Border Layer */}
        <div className={`
          relative flex items-center
          border-[0.5px] rounded-xl overflow-hidden
          transition-all duration-300
          ${error ? 'border-red-500/50' : 'border-[#1F1F22] group-focus-within:border-accent-green'}
        `}>
          {icon && (
            <div className="pl-4 text-gray-500 group-focus-within:text-accent-green transition-colors">
              {icon}
            </div>
          )}
          
          <input
            {...props}
            className={`
              w-full bg-transparent p-3.5 outline-none text-white text-sm
              placeholder:text-gray-700
              ${className}
            `}
          />
        </div>
      </div>

      {/* Error Message with Micro-animation */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            className="text-[11px] text-red-500 mt-1 ml-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
