"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { prescriptionService, Prescription } from "@/services/prescription.service";
import { createClient } from "@/lib/supabaseClient";
import { 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Stethoscope,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        try {
          const data = await prescriptionService.getDoctorPrescriptions(user.id);
          setPrescriptions(data);
        } catch (err) {
          console.error("error fetching prescriptions:", err);
        }
      }
      setLoading(false);
    };

    fetchData();

    // Real-time subscription
    const channel = prescriptionService.subscribeToPrescriptions(() => {
        fetchData(); // Refresh on any change
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const stats = [
    { label: "CONSULTATIONS", value: "12", icon: <Stethoscope className="w-5 h-5" />, color: "text-blue-400" },
    { label: "ORDONNANCES", value: prescriptions.length.toString(), icon: <FileText className="w-5 h-5" />, color: "text-accent-green" },
    { label: "ALERTES", value: "2", icon: <Activity className="w-5 h-5" />, color: "text-red-400" },
  ];

  return (
    <DashboardLayout role="doctor" userName="Dr. Skander">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Header with quick action */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">Command Center</h2>
            <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] mt-2 uppercase">Session: Clinique Ennasr • Active</p>
          </div>
          <Link href="/doctor/prescriptions/new" className="w-full lg:w-auto">
            <button className="btn-3d-neon w-full flex items-center justify-center gap-3">
              <Plus className="w-6 h-6" strokeWidth={3} /> NOUVELLE ORDONNANCE
            </button>
          </Link>
        </div>

        {/* Stats Grid - Responsive Column Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <PremiumCard key={i} className="p-8">
               <div className="flex items-center gap-6">
                  <div className={`p-4 bg-white/[0.03] rounded-2xl ${stat.color} border border-white/5`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="label-caps mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                  </div>
               </div>
            </PremiumCard>
          ))}
        </div>

        {/* Recent Prescriptions */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" /> FLUX RÉCENT
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
              ))
            ) : prescriptions.length > 0 ? (
              prescriptions.map((presc) => (
                <PremiumCard key={presc.id} className="p-6 flex items-center justify-between group cursor-pointer hover:border-accent-green/30">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{presc.patient_name}</h4>
                      <p className="text-xs text-gray-500">{new Date(presc.created_at!).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden md:block text-right">
                       <p className="text-[10px] font-mono text-gray-500 uppercase">Status</p>
                       <span className={`text-[10px] font-bold uppercase ${presc.status === 'picked_up' ? 'text-accent-green' : 'text-orange-400'}`}>
                         {presc.status === 'pending' ? 'EN ATTENTE' : 'PRÊT'}
                       </span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-green/10 group-hover:text-accent-green transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </PremiumCard>
              ))
            ) : (
              <div className="p-12 text-center text-gray-600 border-2 border-dashed border-white/5 rounded-3xl">
                AUCUNE ORDONNANCE POUR LE MOMENT
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
