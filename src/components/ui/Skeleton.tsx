"use client";

import { motion } from "framer-motion";

export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`overflow-hidden rounded-xl bg-[#0A0A0B] border border-[#1F1F22] ${className}`}>
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="h-full w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
      />
    </div>
  );
};
