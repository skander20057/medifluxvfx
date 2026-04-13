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
  Activity,
  ArrowRight,
  Database,
  Cpu
} from "lucide-react";

export default function AccessPortal() {
  const portals = [
    {
      title: "HOSPITAL OS",
      desc: "CENTRE DE CONTRÔLE CLINIQUE",
      icon: <Building2 className="w-10 h-10" strokeWidth={1} />,
      href: "/login",
      status: "SYNCED"
    },
    {
      title: "DOCTOR OS",
      desc: "INTERFACE DE DIAGNOSTIC",
      icon: <Stethoscope className="w-10 h-10" strokeWidth={1} />,
      href: "/login",
      status: "ACTIVE"
    },
    {
      title: "PHARMA OS",
      desc: "RESEAU DE DISPENSATION",
      icon: <Pill className="w-10 h-10" strokeWidth={1} />,
      href: "/login",
      status: "ONLINE"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden selection:bg-accent-green/20">
      {/* OS Background Details */}
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-accent-green" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Kernel: v4.1-emerald</span>
        </div>
        <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-accent-green" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Node: Tunis-A1</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-7xl z-10"
      >
        {/* Massive OS Header */}
        <div className="flex flex-col items-center mb-24">
          <motion.div 
            initial={{ scale: 0.8, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-20 h-20 bg-accent-green/[0.08] border border-accent-green/20 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(0,255,136,0.1)] relative"
          >
            <Shield className="w-10 h-10 text-accent-green" strokeWidth={1} />
            <div className="absolute inset-0 rounded-[2.5rem] border border-accent-green/20 animate-ping opacity-20 duration-[4000ms]" />
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white text-center leading-none">
            MEDI<span className="text-accent-green drop-shadow-[0_0_25px_rgba(0,255,136,0.4)]">FLUX</span>
          </h1>
          
          <div className="mt-8 flex items-center gap-6 px-8 py-3 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,136,1)]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-gray-400">Réseau Médical de Haute Disponibilité</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] font-bold text-accent-green">TUNISIA 2026</span>
          </div>
        </div>

        {/* Premium Bento Grid Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, i) => (
            <Link key={i} href={portal.href} className="group h-full">
              <PremiumCard className="h-full p-12 flex flex-col relative group">
                {/* Tech Corner Details */}
                <div className="absolute top-8 right-8 text-[8px] font-mono text-gray-700 tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Access_LVL: {i + 1}
                </div>

                <div className="w-20 h-20 bg-white/[0.03] border border-white/5 rounded-3xl mb-8 flex items-center justify-center group-hover:bg-accent-green/10 group-hover:border-accent-green/20 transition-all duration-500">
                   <div className="text-gray-500 group-hover:text-accent-green transform group-hover:scale-110 transition-all duration-500">
                     {portal.icon}
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-black text-white group-hover:text-accent-green transition-colors leading-none">{portal.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">{portal.desc}</p>
                </div>

                <div className="mt-16 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                      <div className="w-1.5 h-1.5 bg-accent-green rounded-full shadow-[0_0_5px_rgba(0,255,136,1)]" />
                      {portal.status}
                   </div>
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent-green group-hover:border-accent-green transition-all duration-500">
                      <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                   </div>
                </div>
              </PremiumCard>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Futuristic Background Scanline */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}
