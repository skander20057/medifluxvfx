"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
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
  AlertCircle
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
      setTimeout(() => router.push("/doctor"), 2000);
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
          <div className="w-24 h-24 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-accent-green" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-widest uppercase italic">ORDONNANCE ENVOYÉE</h2>
          <p className="text-gray-500 font-mono">LA PHARMACIE A ÉTÉ NOTIFIÉE EN TEMPS RÉEL</p>
        </motion.div>
      </div>
    );
  }

  return (
    <DashboardLayout role="doctor" userName="Dr. Skander">
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <div className="flex items-center gap-4">
          <Link href="/doctor" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">ÉMISSION D&apos;ORDONNANCE</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PremiumCard className="p-8 space-y-8">
            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Patient</label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input
                     required
                     value={patientName}
                     onChange={e => setPatientName(e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent-green/50"
                     placeholder="Nom Complet"
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Email (Pour accès patient)</label>
                <input
                   type="email"
                   value={patientEmail}
                   onChange={e => setPatientEmail(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent-green/50"
                   placeholder="patient@email.com"
                />
              </div>
            </div>

            {/* Medications List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-accent-green" /> MÉDICAMENTS
                </h3>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {meds.map((med, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl relative group"
                    >
                      <div className="md:col-span-2 space-y-1">
                         <input
                           required
                           placeholder="Nom du médicament"
                           value={med.name}
                           onChange={e => updateMed(index, "name", e.target.value)}
                           className="w-full bg-transparent text-white font-bold placeholder:text-gray-700 outline-none"
                         />
                      </div>
                      <div className="space-y-1">
                         <input
                           required
                           placeholder="Dose (ex: 1000mg)"
                           value={med.dose}
                           onChange={e => updateMed(index, "dose", e.target.value)}
                           className="w-full bg-transparent text-gray-400 text-sm outline-none"
                         />
                      </div>
                      <div className="flex items-center gap-2">
                         <input
                           placeholder="Posologie (ex: 3x/j)"
                           value={med.timing}
                           onChange={e => updateMed(index, "timing", e.target.value)}
                           className="w-full bg-transparent text-gray-400 text-sm outline-none"
                         />
                         {meds.length > 1 && (
                           <button 
                             type="button" 
                             onClick={() => removeMed(index)}
                             className="p-1 text-red-500/50 hover:text-red-500 transition-colors"
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
                  className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-gray-600 hover:text-accent-green hover:border-accent-green/20 hover:bg-accent-green/[0.02] transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4" /> AJOUTER UNE LIGNE
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Notes Additionnelles</label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-accent-green/50 transition-all resize-none"
                placeholder="Instructions particulières..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            <button
               type="submit"
               disabled={loading}
               className="w-full py-5 bg-accent-green text-black font-black uppercase tracking-tighter rounded-2xl shadow-glow hover:shadow-glow-strong hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
               {loading ? "TRANSMISSION..." : (
                 <>SIGNER & TRANSMETTRE <Send className="w-5 h-5" /></>
               )}
            </button>
          </PremiumCard>
        </form>
      </div>
    </DashboardLayout>
  );
}
