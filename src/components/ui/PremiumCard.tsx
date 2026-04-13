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
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for the spotlight movement
  const springConfig = { damping: 25, stiffness: 200 };
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      className={`
        relative overflow-hidden group
        bg-[#0A0A0B] border border-white/[0.08] rounded-[2rem]
        backdrop-blur-xl shadow-2xl
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      {/* Liquid Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${smoothX}px ${smoothY}px,
              rgba(0, 255, 136, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Edge Highlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${smoothX}px ${smoothY}px,
              rgba(0, 255, 136, 0.2),
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
