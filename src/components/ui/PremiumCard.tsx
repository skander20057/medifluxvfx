"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const PremiumCard = ({ children, className = "", onClick }: PremiumCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the spotlight movement
  const springConfig = { damping: 20, stiffness: 300 };
  const spotX = useSpring(mouseX, springConfig);
  const spotY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        bg-[#0A0A0B]/60 backdrop-blur-[20px]
        border-[1px] border-white/[0.03] rounded-2xl
        transition-all duration-500
        hover:border-accent-green/20
        ${className}
      `}
    >
      {/* Dynamic Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at ${spotX}px ${spotY}px, rgba(0, 255, 136, 0.08), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Internal Content */}
      <div className="relative z-10 p-6 h-full">
        {children}
      </div>

      {/* Subtle Bottom Glow Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-green/10 to-transparent" />
    </div>
  );
};
