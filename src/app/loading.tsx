"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black">
      <div className="relative">
        {/* Outer Glow Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ scale: 1.2, opacity: 0.1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-[-40px] bg-accent-green rounded-full blur-3xl"
        />
        
        {/* Pulsing Logo */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <img 
            src="/icon.png" 
            alt="MediFlux Pulsation" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,255,136,0.6)]"
          />
          
          {/* Internal neon scan line */}
          <motion.div
            animate={{
              top: ["-20%", "120%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-[3px] bg-accent-green/40 blur-md z-20 pointer-events-none"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <h3 className="text-white font-bold tracking-[0.2em] text-sm uppercase">
          Initialisation du Système
        </h3>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-accent-green rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
