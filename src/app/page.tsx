"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { 
  Shield, 
  Stethoscope, 
  Pill, 
  Building2, 
  ChevronRight,
  Activity
} from "lucide-react";

export default function AccessPortal() {
  const portals = [
    {
      title: "Clinique & Admin",
      desc: "Gestion centrale des opérations",
      icon: <Building2 className="w-8 h-8" strokeWidth={1.5} />,
      href: "/login",
      color: "border-blue-500/30"
    },
    {
      title: "Espace Docteur",
      desc: "Consultations et prescriptions",
      icon: <Stethoscope className="w-8 h-8" strokeWidth={1.5} />,
      href: "/login",
      color: "border-accent-green/30"
    },
    {
      title: "Flux Pharmacie",
      desc: "Dispensation en temps réel",
      icon: <Pill className="w-8 h-8" strokeWidth={1.5} />,
      href: "/login",
      color: "border-purple-500/30"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-green/[0.03] blur-[150px] rounded-full animate-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-green/[0.02] blur-[120px] rounded-full animate-glow [animation-delay:2s]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 bg-[#0A0A0B] border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-glow"
          >
            <Shield className="w-12 h-12 text-accent-green" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-6xl font-black tracking-tighter text-white text-center">
            MEDIFLUX <span className="text-accent-green underline decoration-accent-green/30">OS</span>
          </h1>
          <div className="flex items-center gap-3 mt-4 px-4 py-2 bg-white/5 border border-white/5 rounded-full">
            <Activity className="w-3 h-3 text-accent-green animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-400">Accès Réseau Unifié • Tunisie</span>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={portal.href}>
                <PremiumCard className="h-full p-10 flex flex-col items-center text-center group">
                  <div className="p-5 bg-white/[0.03] rounded-3xl mb-6 group-hover:bg-accent-green/10 transition-colors">
                    <div className="text-gray-400 group-hover:text-accent-green transition-colors">
                      {portal.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{portal.title}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-8">{portal.desc}</p>
                  
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-accent-green opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    OUVRIR LA SESSION <ChevronRight className="w-4 h-4" />
                  </div>
                </PremiumCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Details */}
      <footer className="mt-20 z-10">
        <p className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.6em]">
          Secured by Digital Flux Encryption • © 2026
        </p>
      </footer>
    </div>
  );
}
