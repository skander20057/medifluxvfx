"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="relative">
        {/* Deep Gaussian Glow Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-accent-green blur-[60px] rounded-full opacity-30"
        />

        {/* Pulsating Icon */}
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <Image
            src="/icon.png"
            alt="MediFlux OS"
            width={120}
            height={120}
            className="filter drop-shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-[10px] font-mono uppercase tracking-[0.5em] text-gray-600 animate-pulse"
      >
        Initialisation du système...
      </motion.p>
    </div>
  );
};
