"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Search, PlusCircle, Clock, FileText, User } from "lucide-react";

export default function DoctorDashboard() {
  return (
    <DashboardLayout role="doctor" userName="Dr. Mansour">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">CONSULTATIONS EN COURS</h2>
          <button className="bg-accent-green text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-glow transition-all">
            <PlusCircle className="w-5 h-5" /> NOUVELLE CONSULTATION
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Queue */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-accent-green/50 outline-none transition-all" placeholder="Rechercher un patient par nom ou CIN..." />
            </div>

            <div className="space-y-4">
              {[
                { name: "Sami Ben Rejeb", time: "09:30", status: "En attente", age: "42 ans" },
                { name: "Ines Mahmoud", time: "10:00", status: "En examen", age: "28 ans" },
                { name: "Fares Gharbi", time: "10:30", status: "Terminé", age: "55 ans" },
              ].map((patient, i) => (
                <PremiumCard key={i} className="flex items-center justify-between hover:border-accent-green/40 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center border border-accent-green/30">
                        <User className="text-accent-green w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white tracking-tight">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.age} • RDV : {patient.time}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                        patient.status === 'En examen' ? 'bg-accent-green text-black' : 'bg-white/10 text-gray-400'
                      }`}>
                        {patient.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><FileText className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-accent-green/10 rounded-lg text-accent-green"><PlusCircle className="w-5 h-5" /></button>
                      </div>
                   </div>
                </PremiumCard>
              ))}
            </div>
          </div>

          {/* Stats & Schedule */}
          <div className="space-y-6">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest font-mono">STATISTIQUES JOURNÉE</h3>
            <PremiumCard className="p-6 space-y-4 bg-accent-green/[0.02]">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Total Patients</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Terminés</span>
                <span className="font-bold text-accent-green text-lg">8</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Temps Moyen</span>
                <span className="font-bold">15 min</span>
              </div>
            </PremiumCard>

            <h3 className="text-xs text-gray-500 uppercase tracking-widest font-mono">AGENDA</h3>
            <div className="space-y-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-4 items-center p-3 bg-white/5 border border-white/5 rounded-xl">
                   <Clock className="w-4 h-4 text-accent-green" />
                   <div className="text-xs">
                     <p className="font-bold">Staff Meeting</p>
                     <p className="text-gray-500">14:00 - 15:00</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
