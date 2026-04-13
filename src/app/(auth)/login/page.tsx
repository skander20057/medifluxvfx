"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { profileService } from "@/services/profile.service";
import { 
  Fingerprint, 
  Lock, 
  LogIn, 
  ShieldCheck, 
  AlertCircle,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recognition Logic for Skander
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // MASTER BYPASS: Skander / 3333
    if (identifier.toLowerCase() === "skander" && password === "3333") {
      let email = "skander@mediflux.com";
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: "3333", 
      });

      if (!authError && data.user) {
         router.push("/dashboard/admin");
         return;
      }
    }

    // Normal Login Flow
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: identifier.includes("@") ? identifier : `${identifier}@mediflux.pro`,
        password,
      });

      if (authError) throw authError;
      
      if (data.user) {
        const profile = await profileService.getProfile(data.user.id);
        router.push(`/dashboard/${profile?.role || 'patient'}`);
      }
    } catch (err: any) {
      setError("ACCÈS REFUSÉ. VÉRIFIEZ VOS PARAMÈTRES.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden selection:bg-accent-green/30">
      <div className="atmosphere-mesh" />

      {/* Luxury Background Details */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-green/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg z-10"
      >
        <div className="glass-card p-10 md:p-14 relative overflow-hidden">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-8">
              <motion.div 
                animate={{ 
                  scale: loading ? [1, 1.1, 1] : 1,
                  opacity: loading ? [1, 0.5, 1] : 1
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-20 h-20 bg-black border border-accent-green/20 rounded-[2rem] flex items-center justify-center shadow-glow animate-logo-pulse"
              >
                <ShieldCheck className="w-10 h-10 text-accent-green" strokeWidth={1.5} />
              </motion.div>
              {loading && (
                <div className="absolute inset-0 rounded-[2rem] border-2 border-accent-green animate-ping opacity-20" />
              )}
            </div>
            
            <h1 className="text-xs font-mono text-accent-green uppercase tracking-[0.5em] mb-3">System Access</h1>
            <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">Connexion Sécurisée</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/[0.03] border border-red-500/40 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest"
                >
                  <AlertCircle className="w-4 h-4" /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1 italic">Internal Identifier</label>
                <div className="relative group">
                  <Fingerprint className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within:text-accent-green transition-colors" />
                  <input
                    required
                    className="neon-input pl-16 font-bold"
                    placeholder="skander"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1 italic">Security Code</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within:text-accent-green transition-colors" />
                  <input
                    type="password"
                    required
                    className="neon-input pl-16 font-bold"
                    placeholder="••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="btn-master"
            >
              {loading ? (
                <Activity className="w-6 h-6 animate-spin" />
              ) : (
                <>SE CONNECTER <LogIn className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-12 flex items-center justify-between border-t border-white/[0.03] pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-green rounded-full shadow-glow animate-pulse" />
              <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest">Server: Tunisia Active</span>
            </div>
            <p className="text-[9px] font-mono text-gray-800 uppercase tracking-widest italic">MediFlux Master OS</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
