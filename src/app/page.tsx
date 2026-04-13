"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ShieldAlert, Stethoscope, Pill, User, ArrowRight } from "lucide-react";

export default function AccessPortal() {
  const portals = [
    {
      title: "ADMINISTRATION",
      icon: <ShieldAlert className="w-8 h-8 text-accent-green" />,
      description: "Gestion système & supervision",
      path: "/admin"
    },
    {
      title: "DOCTEUR",
      icon: <Stethoscope className="w-8 h-8 text-accent-green" />,
      description: "Consultations & prescriptions",
      path: "/doctor"
    },
    {
      title: "PHARMACIE",
      icon: <Pill className="w-8 h-8 text-accent-green" />,
      description: "Dispensation & stocks",
      path: "/pharmacy"
    },
    {
      title: "PATIENT",
      icon: <User className="w-8 h-8 text-accent-green" />,
      description: "Dossier & rendez-vous",
      path: "/patient"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 sm:p-24 bg-bg-main">
      <div className="w-full max-w-6xl space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-accent-green font-mono tracking-widest text-sm animate-pulse">
            SÉCURISÉ PAR SUPABASE
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            PORTAIL D&apos;ACCÈS
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Sélectionnez votre interface pour accéder à l&apos;écosystème MediFlux.
          </p>
        </div>

        {/* Grid Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {portals.map((portal, index) => (
            <motion.div
              key={portal.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Link href="/login">
                <PremiumCard className="h-64 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-accent-green/10 rounded-xl w-fit group-hover:bg-accent-green/20 transition-colors">
                      {portal.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {portal.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {portal.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-accent-green text-sm font-semibold group-hover:translate-x-2 transition-transform">
                    ACCÉDER <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </PremiumCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center space-y-4">
          <p className="text-gray-600 font-mono text-xs tracking-[0.2em]">
            POWERED BY SUPABASE ENGINE V1.0
          </p>
          <div className="flex space-x-4 opacity-50 grayscale hover:grayscale-0 transition-opacity">
            {/* Logo placeholders or small accents */}
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse delay-150" />
          </div>
        </div>
      </div>
    </div>
  );
}
// Force refresh Vercel
