"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if already logged in
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
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profile) {
        router.push(`/${profile.role}`);
      } else {
        // Fallback or create profile if missing? For now, go to patient
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

      if (data.user) {
        await handleRedirection(data.user.id);
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion");
      setLoading(false);
    }
  };

  if (initialLoading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-green/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-green/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <PremiumCard className="w-full max-w-md p-8 relative z-10 border-white/10 shadow-3d">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-accent-green/10 rounded-2xl mb-4">
            <LogIn className="w-8 h-8 text-accent-green" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Connexion</h1>
          <p className="text-gray-500 text-sm mt-1">Accédez à votre espace MediFlux</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-green/50 transition-colors"
                placeholder="nom@exemple.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-green/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 rounded-xl font-bold tracking-tight text-black
              bg-accent-green shadow-glow hover:shadow-glow-strong 
              transition-all duration-300 transform hover:-translate-y-1
              flex items-center justify-center gap-2
              ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                SE CONNECTER <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">
            Pas encore de compte ? Contactez votre administrateur clinic.
          </p>
        </div>
      </PremiumCard>
    </div>
  );
}
