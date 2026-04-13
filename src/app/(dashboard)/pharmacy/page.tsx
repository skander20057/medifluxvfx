"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Pill, AlertCircle, CheckCircle2, Package, Search } from "lucide-react";

export default function PharmacyDashboard() {
  return (
    <DashboardLayout role="pharmacy" userName="Pharmacie Pasteur">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">FLUX DES ORDONNANCES</h2>
          <div className="flex gap-4">
             <div className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold">
               <AlertCircle className="w-4 h-4" /> 2 PRIORITÉS
             </div>
             <button className="bg-accent-green text-black px-6 py-3 rounded-xl font-bold hover:shadow-glow transition-all flex items-center gap-2">
               <Package className="w-5 h-5" /> REÇU DE STOCK
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Prescription Card Example */}
           {[
             { patient: "Yassine Dridi", doctor: "Dr. Mansour", items: "3 médicaments", urgent: true },
             { patient: "Mariem Kilani", doctor: "Dr. Ben Ali", items: "1 médicament", urgent: false },
             { patient: "Zied Toumi", doctor: "Dr. Mansour", items: "5 médicaments", urgent: false },
           ].map((ord, i) => (
             <PremiumCard key={i} className={`p-6 space-y-4 hover:scale-[1.01] transition-transform ${ord.urgent ? "border-red-500/30 bg-red-500/[0.02]" : ""}`}>
               <div className="flex justify-between items-start">
                  <div className="p-3 bg-accent-green/10 rounded-xl">
                    <Pill className="text-accent-green w-6 h-6" />
                  </div>
                  {ord.urgent && <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest animate-pulse">URGENT</span>}
               </div>

               <div>
                 <h3 className="text-lg font-bold">{ord.patient}</h3>
                 <p className="text-xs text-gray-500 mb-2">Prescrit par {ord.doctor}</p>
                 <div className="h-px bg-white/5 my-3" />
                 <p className="text-sm text-gray-400 font-mono tracking-tighter">{ord.items}</p>
               </div>

               <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-accent-green text-black font-bold py-2.5 rounded-lg text-xs transition-all hover:bg-white hover:text-black">DÉLIVRER</button>
                  <button className="p-2.5 bg-white/5 rounded-lg border border-white/5 hover:border-white/20"><Search className="w-4 h-4" /></button>
               </div>
             </PremiumCard>
           ))}
        </div>

        {/* Deliveries Status */}
        <div className="pt-8 space-y-6">
           <h3 className="text-xs text-gray-500 uppercase tracking-widest font-mono">ENVOIS RÉCENTS</h3>
           <div className="overflow-hidden rounded-2xl border border-white/5 bg-bg-surface/50">
             <table className="w-full text-left text-sm">
                <thead className="bg-white/5 border-b border-white/5 text-gray-500 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Heure</th>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Médicament Principal</th>
                    <th className="p-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono text-gray-500">10:{i}4</td>
                      <td className="p-4 font-bold">Patient #{i}02</td>
                      <td className="p-4 italic">Amoxicilline 500mg</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-accent-green">
                          <CheckCircle2 className="w-4 h-4" /> Livré
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
