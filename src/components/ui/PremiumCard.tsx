"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
}

export const PremiumCard = ({ children, className = "" }: PremiumCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`
        relative overflow-hidden group
        bg-[#0A0A0B]/60 border border-white/5 rounded-[2.5rem]
        backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]
        transition-all duration-700
        ${className}
      `}
    >
      {/* Liquid Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${smoothX}px ${smoothY}px,
              rgba(0, 255, 136, 0.05),
              transparent 70%
            )
          `,
        }}
      />

      {/* Internal Glass Shine */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* Edge Glow Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${smoothX}px ${smoothY}px,
              rgba(0, 255, 136, 0.15),
              transparent 80%
            )
          `,
          maskImage: "linear-gradient(white, white), linear-gradient(white, white)",
          maskComposite: "exclude",
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
