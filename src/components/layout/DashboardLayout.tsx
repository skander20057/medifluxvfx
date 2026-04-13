"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Pill, 
  Building2, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Bell,
  Search
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  role: string[];
}

const sidebarItems: SidebarItem[] = [
  { title: "Statistiques", icon: LayoutDashboard, href: "/admin", role: ["admin"] },
  { title: "Utilisateurs", icon: Users, href: "/admin/users", role: ["admin"] },
  { title: "Établissements", icon: Building2, href: "/admin/clinics", role: ["admin"] },
  { title: "Consultations", icon: Stethoscope, href: "/doctor", role: ["doctor"] },
  { title: "Flux Ordonnances", icon: Pill, href: "/pharmacy", role: ["pharmacy"] },
];

export const DashboardLayout = ({ 
  children, 
  role, 
  userName 
}: { 
  children: React.ReactNode; 
  role: string;
  userName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const currentRoleItems = sidebarItems.filter(item => item.role.includes(role));

  return (
    <div className="flex min-h-screen bg-black text-white font-inter selection:bg-accent-green/20">
      {/* Sidebar */}
      <aside 
        className={`
          ${isOpen ? "w-72" : "w-24"} 
          bg-[#0A0A0B] border-r border-white/5 
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          flex flex-col z-50 relative
        `}
      >
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-accent-green rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <span className="text-black font-black text-xl">M</span>
          </div>
          {isOpen && (
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold tracking-tighter"
            >
              MEDIFLUX <span className="text-[10px] font-mono text-accent-green block leading-none tracking-widest">v4.0 OS</span>
            </motion.h2>
          )}
        </div>

        {/* Separator Fade */}
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {currentRoleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative
                  ${isActive ? "bg-white/5 text-white" : "text-gray-500 hover:text-white hover:bg-white/[0.02]"}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon 
                  strokeWidth={isActive ? 2 : 1.5} 
                  className={`w-5 h-5 relative z-10 ${isActive ? "text-accent-green drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" : "group-hover:text-white"}`} 
                />
                {isOpen && <span className="font-semibold text-sm relative z-10 tracking-tight">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 mt-auto space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 w-full rounded-2xl text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 group"
          >
            <LogOut strokeWidth={1.5} className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            {isOpen && <span className="font-semibold text-sm">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000000] relative">
        {/* Header */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-3 bg-white/5 border border-white/5 hover:border-white/20 rounded-xl transition-all"
            >
              {isOpen ? <X strokeWidth={1.5} className="w-5 h-5" /> : <Menu strokeWidth={1.5} className="w-5 h-5" />}
            </button>
            
            <div className="relative hidden md:block w-80">
               <Search strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
               <input 
                 className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono focus:outline-none focus:border-accent-green/30"
                 placeholder="COMMAND PALETTE..." 
               />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all group">
              <Bell strokeWidth={1.5} className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-accent-green rounded-full shadow-[0_0_10px_rgba(0,255,136,1)] animate-pulse" />
            </button>
            
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold tracking-tight">{userName || "Dr. Skander"}</p>
                <p className="text-[10px] text-accent-green font-mono uppercase tracking-widest leading-none mt-1">Status: Authentifié</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group">
                <ShieldCheck strokeWidth={1.5} className="w-6 h-6 text-accent-green group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-10 relative custom-scrollbar">
           {/* Atmosphere Layer */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-green/5 blur-[150px] rounded-full pointer-events-none opacity-50" />
           
           <div className="relative z-10 w-full max-w-7xl mx-auto">
             <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {children}
              </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </main>
    </div>
  );
};
