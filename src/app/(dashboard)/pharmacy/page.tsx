"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { prescriptionService, Prescription } from "@/services/prescription.service";
import { createClient } from "@/lib/supabaseClient";
import { 
  Pill, 
  Search, 
  Bell, 
  User, 
  Calendar,
  CheckCircle2,
  Clock,
  Package,
  Activity
} from "lucide-react";

export default function PharmacyDashboard() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  const fetchPrescriptions = async () => {
    try {
      // For pharmacy, we want all 'pending' prescriptions they can fulfill
      const { data, error } = await supabase
        .from("prescriptions")
        .select(`
           *,
           doctor:doctor_id (
             full_name
           )
        `)
        .neq('status', 'picked_up')
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (err) {
      console.error("error fetching pharmacy prescriptions:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrescriptions();

    // Real-time subscription for instant alerts
    const channel = prescriptionService.subscribeToPrescriptions((payload) => {
        console.log("Real-time update:", payload);
        fetchPrescriptions();
        // Optionnel: Jouer un son ici pour la notification pharmacy
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const filtered = prescriptions.filter(p => 
    p.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="pharmacy" userName="Pharmacie Centrale">
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h2 className="text-4xl font-bold tracking-tighter uppercase italic">FLUX DE DISPENSATION</h2>
              <div className="flex gap-4 mt-2">
                 <div className="flex items-center gap-2 text-[10px] font-mono text-accent-green animate-pulse">
                    <Activity className="w-3 h-3" /> TEMPS RÉEL ACTIF
                 </div>
              </div>
           </div>
           
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="RECHERCHER UN PATIENT..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-accent-green/50"
              />
           </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <PremiumCard className="p-4 border-l-4 border-accent-green">
              <p className="text-[10px] text-gray-500 font-mono">EN ATTENTE</p>
              <p className="text-2xl font-bold">{prescriptions.filter(p => p.status === 'pending').length}</p>
           </PremiumCard>
           <PremiumCard className="p-4 border-l-4 border-orange-400">
              <p className="text-[10px] text-gray-500 font-mono">URGENT</p>
              <p className="text-2xl font-bold">1</p>
           </PremiumCard>
           <PremiumCard className="p-4 border-l-4 border-blue-400">
              <p className="text-[10px] text-gray-500 font-mono">STOCK CRITIQUE</p>
              <p className="text-2xl font-bold">4</p>
           </PremiumCard>
           <PremiumCard className="p-4 border-l-4 border-purple-400">
              <p className="text-[10px] text-gray-500 font-mono">REVENU JOUR</p>
              <p className="text-2xl font-bold">1.4k DT</p>
           </PremiumCard>
        </div>

        {/* Prescription Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                 <Clock className="w-5 h-5 text-gray-500" /> FILE D&apos;ATTENTE NÉON
              </h3>
              
              {loading ? (
                <div className="h-40 glass-card animate-pulse rounded-3xl" />
              ) : filtered.length > 0 ? (
                filtered.map((presc) => (
                  <PremiumCard key={presc.id} className={`p-6 space-y-4 hover:scale-[1.01] transition-transform ${presc.status === 'pending' ? 'neon-border' : ''}`}>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-accent-green/10 rounded-xl text-accent-green">
                             <User className="w-5 h-5" />
                          </div>
                          <div>
                             <h4 className="font-bold text-white uppercase">{presc.patient_name}</h4>
                             <p className="text-[10px] text-gray-500 font-mono">EMIS PAR : {(presc as any).doctor?.full_name || 'Dr. Anonyme'}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 font-mono">
                             {new Date(presc.created_at!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pl-2 border-l border-white/10">
                       {presc.medications.map((m, i) => (
                         <div key={i} className="flex justify-between text-sm">
                            <span className="text-white font-medium">{m.name}</span>
                            <span className="text-gray-500">{m.dose} • {m.timing}</span>
                         </div>
                       ))}
                    </div>

                    <div className="flex gap-4 pt-2">
                       <button className="flex-1 py-3 bg-accent-green text-black font-bold rounded-xl text-xs hover:shadow-glow transition-all">
                          PRÉPARER LE COLIS
                       </button>
                       <button className="px-4 py-3 bg-white/5 text-white font-bold rounded-xl text-xs hover:bg-white/10">
                          MARQUER PRÊT
                       </button>
                    </div>
                  </PremiumCard>
                ))
              ) : (
                <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl text-gray-600">
                    VIDE D&apos;ORDONNANCES
                </div>
              )}
           </div>

           <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                 <Package className="w-5 h-5 text-gray-500" /> INVENTAIRE SÉCURISÉ
              </h3>
              <PremiumCard className="p-6">
                 <div className="space-y-6">
                    {["Doliprane 1000", "Augmentin", "Clamoxyl"].map((med, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                         <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                               <Package className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-white">{med}</span>
                         </div>
                         <span className="text-xs font-mono text-accent-green">42 UNITÉS</span>
                      </div>
                    ))}
                 </div>
              </PremiumCard>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
