"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { profileService } from "@/services/profile.service";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { LogIn, Mail, Lock, AlertCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
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

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (data.user) await handleRedirection(data.user.id);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion");
      setLoading(false);
    }
  };

  if (initialLoading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-[#000000] flex items-center justify-center p-6 overflow-hidden selection:bg-accent-green/30">
      {/* Dynamic Digital Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-green/[0.03] blur-[150px] rounded-full animate-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-green/[0.02] blur-[120px] rounded-full animate-glow [animation-delay:2s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg z-10"
      >
        <PremiumCard className="p-10 md:p-14 border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center mb-12">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="w-20 h-20 bg-accent-green/[0.08] border border-accent-green/20 rounded-[2rem] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,136,0.1)]"
            >
              <Shield className="w-10 h-10 text-accent-green drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]" strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter text-white">ACCESS PORTAL</h1>
            <p className="text-gray-500 font-mono text-[10px] mt-2 uppercase tracking-[0.4em]">MediFlux Secure OS v4.0</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/[0.08] border border-red-500/20 text-red-500 text-sm font-bold"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">Digital Identifier</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-accent-green" strokeWidth={1.5} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-accent-green/30 transition-all duration-300"
                    placeholder="name@mediflux.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">Cryptographic Key</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-accent-green" strokeWidth={1.5} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-accent-green/30 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neon-glow-btn w-full flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>AUTHENTIFICATION <LogIn className="w-5 h-5" strokeWidth={2.5} /></>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/[0.05] text-center">
            <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">
              Restricted Area • Unified Medical Network Tunisia
            </p>
          </div>
        </PremiumCard>
      </motion.div>
    </div>
  );
}
