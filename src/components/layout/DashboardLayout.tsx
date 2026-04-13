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
  Bell
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  role: string[];
}

const sidebarItems: SidebarItem[] = [
  { title: "Statistiques", icon: <LayoutDashboard className="w-5 h-5" />, href: "/admin", role: ["admin"] },
  { title: "Utilisateurs", icon: <Users className="w-5 h-5" />, href: "/admin/users", role: ["admin"] },
  { title: "Établissements", icon: <Building2 className="w-5 h-5" />, href: "/admin/clinics", role: ["admin"] },
  { title: "Consultations", icon: <Stethoscope className="w-5 h-5" />, href: "/doctor", role: ["doctor"] },
  { title: "Ordonnances", icon: <Pill className="w-5 h-5" />, href: "/pharmacy", role: ["pharmacy"] },
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
    <div className="flex min-h-screen bg-bg-main text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          ${isOpen ? "w-64" : "w-20"} 
          bg-bg-surface border-r border-white/5 
          transition-all duration-300 ease-in-out
          flex flex-col z-50
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {isOpen ? (
            <h2 className="text-xl font-bold tracking-tighter text-accent-green">MEDIFLUX</h2>
          ) : (
            <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">M</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {currentRoleItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                flex items-center gap-4 p-3 rounded-xl transition-all group
                ${pathname === item.href ? "bg-accent-green/10 text-accent-green border border-accent-green/20" : "hover:bg-white/5 text-gray-400"}
              `}
            >
              <div className={pathname === item.href ? "text-accent-green shadow-glow" : "group-hover:text-white"}>
                {item.icon}
              </div>
              {isOpen && <span className="font-medium">{item.title}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 w-full rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000000] relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-bg-main/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-white/5 rounded-lg">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <h1 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Dashboard / <span className="text-white">{role}</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-green rounded-full shadow-glow" />
            </button>
            <div className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center border border-accent-green/30">
                <ShieldCheck className="w-4 h-4 text-accent-green" />
              </div>
              <div className="text-sm">
                <p className="font-bold leading-none">{userName || "Utilisateur"}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Background Mesh for Atmosphere */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-green/5 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="relative z-10 w-full max-w-7xl mx-auto">
            {children}
           </div>
        </div>
      </main>
    </div>
  );
};
