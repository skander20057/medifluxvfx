"use client";

import React, { useState, useEffect } from "react";
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
  Search,
  User
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { useView } from "@/context/ViewContext";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  role: string[];
}

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin", role: ["admin"] },
  { title: "Accès Pro", icon: Users, href: "/dashboard/admin/access-management", role: ["admin"] },
  { title: "Consultations", icon: Stethoscope, href: "/dashboard/doctor", role: ["doctor"] },
  { title: "Flux Pharma", icon: Pill, href: "/dashboard/pharmacy", role: ["pharmacy"] },
  { title: "Profil", icon: User, href: "/dashboard/profile", role: ["doctor", "pharmacy", "clinic", "patient"] },
];

export const DashboardLayout = ({ 
  children, 
  role: originalRole, 
  userName 
}: { 
  children: React.ReactNode; 
  role: string;
  userName?: string;
}) => {
  const { simulatedRole } = useView();
  const role = simulatedRole || originalRole;
  
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const currentRoleItems = sidebarItems.filter(item => item.role.includes(role));

  return (
    <div className="flex min-h-screen bg-black text-white font-inter selection:bg-accent-green/20 overflow-x-hidden">
      
      {/* PC SIDEBAR (Desktop Only) */}
      {!isMobile && (
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
                MEDIFLUX <span className="text-[10px] font-mono text-accent-green block leading-none tracking-widest">v5.0 MASTER</span>
              </motion.h2>
            )}
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-8">
            {currentRoleItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`}>
                  {isActive && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10" />}
                  <Icon strokeWidth={isActive ? 2 : 1.5} className={`w-5 h-5 relative z-10 ${isActive ? "text-accent-green drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" : ""}`} />
                  {isOpen && <span className="font-semibold text-sm relative z-10">{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 mt-auto">
            <button onClick={handleLogout} className="flex items-center gap-4 p-4 w-full rounded-2xl text-gray-500 hover:text-red-500 transition-all">
              <LogOut strokeWidth={1.5} className="w-5 h-5" />
              {isOpen && <span className="font-semibold text-sm">Déconnexion</span>}
            </button>
          </div>
        </aside>
      )}

      {/* MOBILE BOTTOM NAV (Mobile Only) */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 h-20 mobile-nav-blur z-[100] flex items-center justify-around px-6 pb-2">
          {currentRoleItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
                <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-accent-green/10 text-accent-green" : "text-gray-500"}`}>
                   <Icon strokeWidth={isActive ? 2 : 1.5} className="w-6 h-6" />
                </div>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? "text-accent-green" : "text-gray-500"}`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
          <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-500/50">
             <div className="p-2"><LogOut className="w-6 h-6" /></div>
             <span className="text-[8px] font-bold uppercase tracking-widest">OFF</span>
          </button>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000000] relative">
        {/* Responsive Header */}
        <header className="h-20 md:h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4 md:gap-6">
            {!isMobile && (
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-3 bg-white/5 border border-white/5 rounded-xl"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            {isMobile && (
               <div className="w-10 h-10 bg-accent-green rounded-xl flex items-center justify-center shadow-glow">
                 <span className="text-black font-black">M</span>
               </div>
            )}
            <h1 className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest truncate max-w-[150px] md:max-w-none">
               OS / <span className="text-white">{role}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 group">
              <Bell strokeWidth={1.5} className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent-green rounded-full shadow-[0_0_10px_rgba(0,255,136,1)]" />
            </button>
            
            <div className="flex items-center gap-3 md:gap-4 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold tracking-tight truncate max-w-[100px]">{userName || "User"}</p>
                <p className="text-[10px] text-accent-green font-mono uppercase tracking-widest leading-none mt-1">Online</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-accent-green" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className={`flex-1 overflow-y-auto p-6 md:p-10 relative ${isMobile ? 'pb-32' : ''}`}>
           <div className="atmosphere-mesh opacity-30" />
           <div className="relative z-10 w-full max-w-7xl mx-auto">
             <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
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
