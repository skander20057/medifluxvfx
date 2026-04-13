"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Stethoscope, 
  Pill, 
  Building2,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccessManagementPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "doctor" as 'doctor' | 'pharmacy' | 'clinic'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Here we would call the API route that uses the Service Role Key
      const response = await fetch("/api/admin/create-account", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Échec de la création");
      }

      setSuccess(true);
      setFormData({ email: "", password: "", full_name: "", role: "doctor" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: "doctor", label: "Docteur", icon: <Stethoscope className="w-5 h-5" /> },
    { id: "pharmacy", label: "Pharmacie", icon: <Pill className="w-5 h-5" /> },
    { id: "clinic", label: "Clinique", icon: <Building2 className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout role="admin" userName="Skander">
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Gérer les Accès Pros</h2>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-2">MediFlux Network Administration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-neon">
          {/* Creation Form */}
          <div className="lg:col-span-2">
            <PremiumCard className="p-10 border-white/10 relative overflow-hidden">
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-accent-green" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tighter">UTILISATEUR CRÉÉ</h3>
                    <p className="text-gray-500 font-mono text-[10px]">Identifiants prêts pour connexion</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-caps">Nom Complet</label>
                      <input 
                        required
                        className="glass-input w-full" 
                        placeholder="Dr. Ahmed Ben Salah"
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-caps">Rôle Système</label>
                      <div className="grid grid-cols-3 gap-2">
                        {roles.map(r => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setFormData({...formData, role: r.id as any})}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.role === r.id ? 'bg-accent-green/10 border-accent-green text-accent-green' : 'bg-white/5 border-white/5 hover:border-white/20 text-gray-500'}`}
                          >
                            {r.icon}
                            <span className="text-[8px] font-bold uppercase">{r.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-caps">Email d&apos;accès</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="email"
                          required
                          className="glass-input w-full pl-12" 
                          placeholder="doctor@mediflux.com"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="label-caps">Mot de passe temporaire</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text"
                          required
                          className="glass-input w-full pl-12" 
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <button 
                  disabled={loading}
                  className="neon-glow-btn w-full flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? "INITIALISATION..." : "GÉNÉRER L'ACCÈS PRO"} <UserPlus className="w-5 h-5" />
                </button>
              </form>
            </PremiumCard>
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            <PremiumCard className="p-8">
              <ShieldCheck className="w-8 h-8 text-accent-green mb-4" />
              <h4 className="text-lg font-bold uppercase tracking-tight mb-2">SÉCURITÉ ADMIN</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Tout compte créé ici a un accès complet aux modules professionnels. Assurez-vous d&apos;utiliser des emails vérifiés.
              </p>
            </PremiumCard>
            
            <div className="p-8 bg-accent-green/5 border border-accent-green/20 rounded-[2.5rem] space-y-4">
              <h4 className="text-xs font-mono text-accent-green uppercase tracking-[0.2em]">En attente de déploiement</h4>
              <div className="space-y-3">
                 {[1,2].map(i => (
                    <div key={i} className="flex items-center justify-between text-[10px] text-gray-500 group cursor-pointer hover:text-white transition-colors">
                       <span className="flex items-center gap-2 italic"> <Plus className="w-3 h-3"/> Nouveau Client</span>
                       <ArrowRight className="w-3 h-3"/>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
