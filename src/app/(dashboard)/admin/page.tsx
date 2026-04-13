"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PremiumInput } from "@/components/ui/PremiumInput";
import { UserPlus, Building, BarChart3, AlertTriangle, Users } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout role="admin" userName="Skander (Master)">
      <div className="space-y-8">
        {/* Rapid Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PremiumCard className="p-4 border-l-4 border-accent-green">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent-green/10 rounded-lg text-accent-green">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Total Utilisateurs</p>
                <p className="text-2xl font-bold">1,204</p>
              </div>
            </div>
          </PremiumCard>
          <PremiumCard className="p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Établissements</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </PremiumCard>
          <PremiumCard className="p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Volume Flux</p>
                <p className="text-2xl font-bold">+82%</p>
              </div>
            </div>
          </PremiumCard>
          <PremiumCard className="p-4 border-l-4 border-yellow-500">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Alertes Système</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creation Form */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">MASTER CONTROL : CRÉATION D&apos;ACCÈS</h2>
            <PremiumCard>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <PremiumInput 
                     label="Nom Complet" 
                     placeholder="Dr. Ahmed Ben Ali" 
                     icon={<UserPlus className="w-4 h-4" />}
                   />
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">Rôle Système</label>
                     <select className="w-full bg-black border-[0.5px] border-border-iron rounded-xl p-3.5 text-white focus:border-accent-green outline-none transition-all text-sm">
                       <option>doctor</option>
                       <option>pharmacy</option>
                       <option>clinic</option>
                       <option>admin</option>
                     </select>
                   </div>
                   <PremiumInput 
                     label="Email Pro" 
                     placeholder="contact@clinique.tn" 
                     icon={<Users className="w-4 h-4" />}
                   />
                   <PremiumInput 
                     label="Établissement Rattaché" 
                     placeholder="Clinique Ennasr" 
                     icon={<Building className="w-4 h-4" />}
                   />
                </div>
                
                <button className="bg-accent-green text-black px-10 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-glow transition-all hover:scale-[1.02] hover:shadow-glow-strong">
                  GÉNÉRER L&apos;ACCÈS SÉCURISÉ <UserPlus className="w-5 h-5" />
                </button>
              </form>
            </PremiumCard>
          </div>

          {/* Activity Feed */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">FLUX ACTIVITÉ</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start gap-4 hover:border-accent-green/20 transition-all cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-accent-green mt-2 animate-pulse" />
                  <div>
                    <p className="text-sm font-bold">Nouvel établissement créé</p>
                    <p className="text-xs text-gray-500">Pharmacie de Marsa • Il y a {i*10} mins</p>
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
