"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { User, Mail, Lock, Shield, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
            role: 'patient' // Default role for self-registration
          }
        }
      });

      if (authError) throw authError;
      if (data.user) router.push("/patient");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      <div className="atmosphere-mesh" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10"
      >
        <PremiumCard className="p-10 md:p-14">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-accent-green/[0.08] border border-accent-green/20 rounded-[2rem] flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-accent-green" strokeWidth={1} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Créer un Compte</h1>
            <p className="text-gray-500 font-mono text-[9px] mt-2 uppercase tracking-[0.4em]">Espace Patient MediFlux</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="label-caps ml-1">Nom Complet</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent-green transition-colors" />
                  <input
                    required
                    className="glass-input w-full pl-14"
                    placeholder="Jean Dupont"
                    value={formData.full_name}
                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="label-caps ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent-green transition-colors" />
                  <input
                    type="email"
                    required
                    className="glass-input w-full pl-14"
                    placeholder="jean@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="label-caps ml-1">Mot de Passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent-green transition-colors" />
                  <input
                    type="password"
                    required
                    className="glass-input w-full pl-14"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button
               type="submit"
               disabled={loading}
               className="neon-glow-btn w-full flex items-center justify-center gap-3"
            >
               {loading ? "CRÉATION..." : <>S&apos;INSCRIRE MAINTENANT <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <footer className="mt-10 pt-8 border-t border-white/5 text-center">
            <Link href="/login" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-accent-green transition-colors">
              Déjà inscrit ? Se connecter
            </Link>
          </footer>
        </PremiumCard>
      </motion.div>
    </div>
  );
}
