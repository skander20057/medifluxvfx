"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PremiumInput } from "@/components/ui/PremiumInput";
import { prescriptionService } from "@/services/prescription.service";
import { createClient } from "@/lib/supabaseClient";
import { 
  ArrowLeft, 
  Send, 
  Pill, 
  User, 
  Plus, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Mail,
  FileText
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function NewPrescriptionPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [meds, setMeds] = useState([{ name: "", dose: "", timing: "" }]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMed = () => {
    setMeds([...meds, { name: "", dose: "", timing: "" }]);
  };

  const removeMed = (index: number) => {
    if (meds.length > 1) {
      setMeds(meds.filter((_, i) => i !== index));
    }
  };

  const updateMed = (index: number, field: string, value: string) => {
    const newMeds = [...meds];
    (newMeds[index] as any)[field] = value;
    setMeds(newMeds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      await prescriptionService.createPrescription({
        doctor_id: user.id,
        patient_name: patientName,
        patient_email: patientEmail,
        medications: meds,
        notes: notes,
        status: 'pending'
      });

      setSuccess(true);
      setTimeout(() => router.push("/dashboard/doctor"), 2000);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto shadow-glow">
            <CheckCircle className="w-12 h-12 text-accent-green" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-widest uppercase italic leading-none">Transmission Réussie</h2>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Le réseau pharmacie a été mis à jour</p>
        </motion.div>
      </div>
    );
  }

  return (
    <DashboardLayout role="doctor" userName="Dr. Skander">
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/doctor" className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Émettre Ordonnance</h2>
            <p className="text-gray-500 font-mono text-[10px] tracking-widest mt-2 uppercase">Interface de prescription certifiée</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <PremiumCard className="p-10 space-y-10 border-white/10">
            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PremiumInput 
                label="Nom du Patient"
                required
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                placeholder="Ex: Jean Dupont"
                icon={<User className="w-4 h-4" />}
              />
              <PremiumInput 
                label="Email Patient (Notification)"
                type="email"
                value={patientEmail}
                onChange={e => setPatientEmail(e.target.value)}
                placeholder="patient@mediflux.tn"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            {/* Medications List */}
            <div className="space-y-6">
              <h3 className="text-sm font-black flex items-center gap-3 tracking-widest uppercase text-gray-400">
                <Pill className="w-4 h-4 text-accent-green shadow-glow" /> Liste des Médicaments
              </h3>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {meds.map((med, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl relative group"
                    >
                      <div className="md:col-span-6">
                         <input
                           required
                           placeholder="Désignation du médicament"
                           value={med.name}
                           onChange={e => updateMed(index, "name", e.target.value)}
                           className="w-full bg-transparent text-white font-bold placeholder:text-gray-800 outline-none text-lg"
                         />
                      </div>
                      <div className="md:col-span-3">
                         <input
                           required
                           placeholder="Dose"
                           value={med.dose}
                           onChange={e => updateMed(index, "dose", e.target.value)}
                           className="w-full bg-transparent text-gray-500 text-sm outline-none font-mono"
                         />
                      </div>
                      <div className="md:col-span-3 flex items-center gap-4">
                         <input
                           placeholder="Timing"
                           value={med.timing}
                           onChange={e => updateMed(index, "timing", e.target.value)}
                           className="w-full bg-transparent text-gray-500 text-sm outline-none font-mono"
                         />
                         {meds.length > 1 && (
                           <button 
                             type="button" 
                             onClick={() => removeMed(index)}
                             className="p-2 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <button
                  type="button"
                  onClick={addMed}
                  className="w-full py-5 border-2 border-dashed border-white/5 rounded-3xl text-gray-600 hover:text-accent-green hover:border-accent-green/20 hover:bg-accent-green/[0.02] transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest"
                >
                  <Plus className="w-5 h-5" /> AJOUTER UN TRAITEMENT
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <label className="label-caps ml-1">Notes Cliniques & Instructions</label>
              <div className="relative group">
                <FileText className="absolute left-6 top-6 w-4 h-4 text-gray-700 group-focus-within:text-accent-green transition-colors" />
                <textarea
                  rows={4}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-white focus:outline-none focus:border-accent-green/30 focus:bg-white/[0.04] transition-all duration-500 resize-none font-medium"
                  placeholder="Recommandations particulières pour le patient..."
                />
              </div>
            </div>

            {error && (
              <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[1.5rem] flex items-center gap-4">
                <AlertCircle className="w-6 h-6" />
                <p className="text-sm font-bold uppercase tracking-tight">{error}</p>
              </div>
            )}

            <button
               type="submit"
               disabled={loading}
               className="btn-3d-neon w-full flex items-center justify-center gap-4"
            >
               {loading ? "TRANSMISSION SÉCURISÉE..." : (
                 <>SIGNER & TRANSMETTRE <Send className="w-6 h-6" strokeWidth={3} /></>
               )}
            </button>
          </PremiumCard>
        </form>
      </div>
    </DashboardLayout>
  );
}
