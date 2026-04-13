"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { profileService } from "@/services/profile.service";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { LogIn, Shield, Lock, Fingerprint, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        handleRedirection(session.user.id);
      } else {
        setInitialLoading(false);
      }
    };
    checkUser();
  }, [supabase]);

  const handleRedirection = async (userId: string) => {
    try {
      const profile = await profileService.getProfile(userId);
      if (profile && profile.role) {
        router.push(`/${profile.role}`);
      } else {
        router.push("/patient");
      }
    } catch (err) {
      console.error("Redirection error:", err);
      router.push("/");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Dynamic mapping: If user types "skander", we map to his medical email
    let finalEmail = identifier;
    if (identifier.toLowerCase() === "skander") {
      finalEmail = "skander@mediflux.com"; // Default internal admin email
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: finalEmail.includes("@") ? finalEmail : `${finalEmail}@mediflux.pro`,
        password,
      });

      if (authError) throw authError;
      if (data.user) await handleRedirection(data.user.id);
    } catch (err: any) {
      setError("DÉTAILS D'ACCÈS INVALIDE");
      setLoading(false);
    }
  };

  if (initialLoading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden selection:bg-accent-green/30">
      <div className="atmosphere-mesh" />

      {/* Cyber Background Details */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-green/20 to-transparent" />
         <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent-green/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl z-20"
      >
        <PremiumCard className="p-12 md:p-16 border-white/[0.05] shadow-[0_100px_200px_rgba(0,0,0,0.9)]">
          {/* Pulsation Icon Header */}
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              animate={{
                scale: [1, 1.05, 1],
                filter: ["drop-shadow(0 0 10px rgba(0,255,136,0.3))", "drop-shadow(0 0 25px rgba(0,255,136,0.5))", "drop-shadow(0 0 10px rgba(0,255,136,0.3))"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 bg-[#0A0A0B] border border-accent-green/20 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-glow relative group"
            >
              <Shield className="w-12 h-12 text-accent-green group-hover:scale-110 transition-transform" strokeWidth={1} />
              <div className="absolute inset-[-10px] bg-accent-green/5 blur-2xl rounded-full opacity-50" />
            </motion.div>
            
            <h1 className="text-5xl font-black tracking-tighter text-white text-center leading-none">
              KERNEL<br/><span className="text-accent-green">ACCESS</span>
            </h1>
            <div className="flex items-center gap-3 mt-6">
              <Activity className="w-3 h-3 text-accent-green animate-pulse" />
              <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.6em]">System Authentication v5.0</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/[0.05] border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="label-caps italic ml-1 opacity-70">Identifiant Digital / Login</label>
                <div className="relative group">
                  <Fingerprint className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within:text-accent-green transition-all" strokeWidth={1.5} />
                  <input
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-[1.5rem] py-6 pl-16 pr-8 text-white placeholder:text-gray-800 outline-none focus:border-accent-green/30 focus:bg-white/[0.04] transition-all duration-500 text-lg font-bold"
                    placeholder="ex: skander"
                  />
                  <div className="absolute inset-0 rounded-[1.5rem] border border-accent-green/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label-caps italic ml-1 opacity-70">Clé de Déchiffrement</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within:text-accent-green transition-all" strokeWidth={1.5} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-[1.5rem] py-6 pl-16 pr-8 text-white placeholder:text-gray-800 outline-none focus:border-accent-green/30 focus:bg-white/[0.04] transition-all duration-500 text-lg font-bold"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-0 rounded-[1.5rem] border border-accent-green/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-6 bg-accent-green text-black font-black uppercase tracking-tighter rounded-[1.5rem] shadow-[0_0_40px_rgba(0,255,136,0.3)] hover:shadow-[0_0_60px_rgba(0,255,136,0.5)] hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
              {loading ? (
                <div className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>DÉVERROUILLER L&apos;ACCÈS <LogIn className="w-6 h-6" strokeWidth={2.5} /></>
              )}
            </button>
          </form>

          <footer className="mt-16 pt-10 border-t border-white/[0.05] flex flex-col items-center gap-4">
            <p className="text-gray-700 text-[9px] font-mono uppercase tracking-[0.5em] text-center">
              Restricted Area • Encryption AES-256 Active
            </p>
          </footer>
        </PremiumCard>
      </motion.div>
      
      {/* Scanline Effect overlay for that Pro look */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
    </div>
  );
}
