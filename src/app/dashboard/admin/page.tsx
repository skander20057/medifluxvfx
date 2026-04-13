"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { useView } from "@/context/ViewContext";
import { 
  Users, 
  Building, 
  BarChart3, 
  Activity, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Pill,
  User
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { simulatedRole, setSimulatedRole, isGhostMode } = useView();

  const ghostRoles = [
    { id: 'doctor', label: 'Scanner Vue Docteur', icon: <Stethoscope className="w-5 h-5"/>, color: 'text-blue-400' },
    { id: 'pharmacy', label: 'Scanner Vue Pharmacie', icon: <Pill className="w-5 h-5"/>, color: 'text-purple-400' },
    { id: 'patient', label: 'Scanner Vue Patient', icon: <User className="w-5 h-5"/>, color: 'text-orange-400' },
  ];

  return (
    <DashboardLayout role="admin" userName="Skander (Master)">
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Master Control Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-5xl font-black tracking-tighter uppercase italic">Master Control</h2>
            <div className="flex items-center gap-3 mt-2 text-accent-green font-mono text-[10px] tracking-[0.3em]">
               <ShieldCheck className="w-4 h-4 shadow-glow" /> PRIVILÈGES MAXIMUM : ACTIFS
            </div>
          </div>

          {/* Ghost Mode Switcher */}
          <div className="flex flex-wrap gap-4">
            {ghostRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSimulatedRole(simulatedRole === role.id ? null : role.id as any)}
                className={`
                  flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-500
                  ${simulatedRole === role.id 
                    ? 'bg-accent-green text-black border-accent-green shadow-glow' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}
                `}
              >
                {simulatedRole === role.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-[10px] font-black uppercase tracking-widest">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ghost Mode Status Banner */}
        {isGhostMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="p-4 bg-accent-green/10 border border-accent-green/30 rounded-3xl flex items-center justify-center gap-4 text-accent-green overflow-hidden"
          >
             <div className="w-2 h-2 bg-accent-green rounded-full animate-ping" />
             <p className="text-xs font-mono uppercase tracking-[0.2em] font-bold">
               MODE FANTÔME ACTIF : VOUS SIMULEZ LE RÔLE {simulatedRole?.toUpperCase()}
             </p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PremiumCard className="p-6">
              <p className="label-caps">Total Utilisateurs</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-black">1.4k</span>
                <Users className="w-6 h-6 text-accent-green/50" />
              </div>
          </PremiumCard>
          <PremiumCard className="p-6">
              <p className="label-caps">Établissements</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-black">58</span>
                <Building className="w-6 h-6 text-blue-400/50" />
              </div>
          </PremiumCard>
          <PremiumCard className="p-6">
              <p className="label-caps">Volume Prescriptions</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-black">+124%</span>
                <BarChart3 className="w-6 h-6 text-purple-400/50" />
              </div>
          </PremiumCard>
          <PremiumCard className="p-6">
              <p className="label-caps">Uptime Réseau</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-3xl font-black">99.9%</span>
                <Activity className="w-6 h-6 text-accent-green/50" />
              </div>
          </PremiumCard>
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <Link href="/dashboard/admin/access-management">
              <PremiumCard className="p-10 group cursor-pointer hover:border-accent-green/40">
                 <div className="flex items-center justify-between">
                    <div className="space-y-4">
                       <div className="p-4 bg-accent-green/20 rounded-2xl w-fit text-accent-green shadow-glow">
                          <Users className="w-8 h-8" />
                       </div>
                       <h3 className="text-3xl font-black uppercase tracking-tighter">Gestion des Accès</h3>
                       <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                          Créez des comptes pour les cliniques, docteurs et pharmacies de votre réseau.
                       </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-full group-hover:bg-accent-green group-hover:text-black transition-all">
                       <ArrowRight className="w-6 h-6" />
                    </div>
                 </div>
              </PremiumCard>
           </Link>

           <div className="space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                 <Activity className="w-5 h-5 text-gray-500" /> Flux d&apos;activité Réseau
              </h3>
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                    <PremiumCard key={i} className="p-4 flex items-center justify-between bg-[#0A0A0B]/30">
                       <div className="flex items-center gap-4 text-sm">
                          <div className="w-2 h-2 bg-accent-green rounded-full shadow-glow" />
                          <span className="text-white font-bold">Nouvelle Ordonnance Émise</span>
                          <span className="text-gray-600 font-mono text-[10px]">Tunis-D1</span>
                       </div>
                       <span className="text-gray-600 text-[10px] font-mono">IL Y A {i*5}M</span>
                    </PremiumCard>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
