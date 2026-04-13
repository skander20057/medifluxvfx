"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Building2, Bed, Users, Siren, Activity } from "lucide-react";

export default function ClinicDashboard() {
  return (
    <DashboardLayout role="clinic" userName="Clinique Ennasr">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">GESTION DE L&apos;ÉTABLISSEMENT</h2>
          <div className="flex gap-4">
             <div className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold animate-pulse">
               <Siren className="w-4 h-4" /> URGENCE : 85% CAPACITÉ
             </div>
          </div>
        </div>

        {/* Operational Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <PremiumCard className="p-6 border-t-2 border-accent-green">
              <Activity className="w-8 h-8 text-accent-green mb-4" />
              <h4 className="text-xs text-gray-500 uppercase font-mono mb-1">Occupation Lits</h4>
              <p className="text-3xl font-bold">142 / 180</p>
              <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent-green" style={{ width: '78%' }} />
              </div>
           </PremiumCard>

           <PremiumCard className="p-6">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-xs text-gray-500 uppercase font-mono mb-1">Personnel Présent</h4>
              <p className="text-3xl font-bold">28 Staff</p>
           </PremiumCard>

           <PremiumCard className="p-6">
              <Bed className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="text-xs text-gray-500 uppercase font-mono mb-1">Blocs Opératoires</h4>
              <p className="text-3xl font-bold">4 / 6</p>
           </PremiumCard>

           <PremiumCard className="p-6">
              <Building2 className="w-8 h-8 text-gray-400 mb-4" />
              <h4 className="text-xs text-gray-500 uppercase font-mono mb-1">Ambulances</h4>
              <p className="text-3xl font-bold">3 Disp.</p>
           </PremiumCard>
        </div>

        {/* Personnel & Beds Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <PremiumCard className="p-6">
              <h3 className="text-xl font-bold mb-6">MOUVEMENTS RÉCENTS (LITS)</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex gap-4 items-center">
                       <span className="text-xs font-mono text-gray-500 uppercase">Lit #0{i}5</span>
                       <span className="font-bold">Admission Patient</span>
                    </div>
                    <span className="text-accent-green text-xs font-bold">ACTIF</span>
                  </div>
                ))}
              </div>
           </PremiumCard>

           <PremiumCard className="p-6">
              <h3 className="text-xl font-bold mb-6">ÉQUIPES DE GARDE</h3>
              <div className="space-y-4">
                 {[
                   { name: "Dr. Ben Salem", role: "Chirurgien", status: "Au Bloc" },
                   { name: "Mme. Fatma", role: "Infirmière Majore", status: "Disponible" },
                   { name: "Dr. Gharbi", role: "Réanimateur", status: "En pause" },
                 ].map((staff, i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                      <div>
                        <p className="font-bold">{staff.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">{staff.role}</p>
                      </div>
                      <span className={`text-[10px] font-bold ${staff.status === 'Au Bloc' ? 'text-red-400' : 'text-accent-green'}`}>{staff.status}</span>
                   </div>
                 ))}
              </div>
           </PremiumCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
