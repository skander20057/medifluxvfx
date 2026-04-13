"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Lock, 
  Globe, 
  Cpu,
  Fingerprint
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 lg:p-24 overflow-hidden selection:bg-accent-green/30">
      <div className="atmosphere-mesh" />

      {/* Cyber Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-green/40 to-transparent" />
         <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent-green/40 to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl space-y-16 z-10"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6">
           <motion.div 
             animate={{ scale: [1, 1.05, 1] }} 
             transition={{ duration: 4, repeat: Infinity }}
             className="w-16 h-16 bg-black border border-accent-green/30 rounded-2xl flex items-center justify-center shadow-glow mb-4"
           >
              <ShieldCheck className="w-8 h-8 text-accent-green" />
           </motion.div>
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
              MEDIFLUX<br/>
              <span className="text-accent-green drop-shadow-[0_0_30px_rgba(0,255,136,0.3)]">OS MASTER</span>
           </h1>
           <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.5em] flex items-center gap-4">
              <Activity className="w-4 h-4 text-accent-green animate-pulse" /> Tunisa Medical Data Network v6.1
           </p>
        </div>

        {/* Bento Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[400px]">
           <Link href="/login" className="md:col-span-8 group">
              <div className="h-full glass-card p-10 flex flex-col justify-between group-hover:border-accent-green/30 group-hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Fingerprint className="w-40 h-40 text-accent-green" strokeWidth={1} />
                 </div>
                 <div className="space-y-4">
                    <div className="p-3 bg-accent-green/10 rounded-xl w-fit text-accent-green">
                       <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">Accès Sécurisé</h3>
                    <p className="text-gray-500 max-w-sm text-sm uppercase font-mono tracking-widest leading-relaxed">
                       Authentification biométrique et cryptage AES-256 pour les professionnels de santé.
                    </p>
                 </div>
                 <div className="flex items-center gap-4 text-accent-green font-black uppercase tracking-widest text-xs group-hover:gap-6 transition-all">
                    Entrer dans le système <ArrowRight className="w-5 h-5" />
                 </div>
              </div>
           </Link>

           <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <div className="glass-card p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all group">
                 <div className="flex items-center justify-between">
                    <Globe className="w-8 h-8 text-blue-500 group-hover:animate-spin-slow" />
                    <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">Global</span>
                 </div>
                 <div>
                    <h4 className="text-xl font-bold uppercase italic">Réseau Tun</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-mono mt-1 tracking-widest">Connecté à 14 Cliniques</p>
                 </div>
              </div>
              <div className="glass-card p-8 flex flex-col justify-between hover:border-purple-500/30 transition-all group">
                 <div className="flex items-center justify-between">
                    <Cpu className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
                    <div className="w-4 h-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                       <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xl font-bold uppercase italic">V6 Kernel</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-mono mt-1 tracking-widest">Uptime: 99.98%</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-700 text-[9px] font-mono uppercase tracking-[0.4em] pt-8 border-t border-white/[0.03]">
           <p>© 2026 DIGITAL FLUX / MEDIFLUX TECHNOLOGY</p>
           <div className="flex items-center gap-8 mt-4 md:mt-0">
              <span className="hover:text-accent-green cursor-pointer">Security Protocol Layer</span>
              <span className="hover:text-accent-green cursor-pointer">API Docs</span>
              <span className="hover:text-accent-green cursor-pointer text-white">Master Status: Online</span>
           </div>
        </div>
      </motion.div>

      {/* Background Grid Scanline */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.05]" />
    </div>
  );
}
