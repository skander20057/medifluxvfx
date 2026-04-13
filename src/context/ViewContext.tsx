"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = 'admin' | 'doctor' | 'patient' | 'pharmacy' | 'clinic';

interface ViewContextType {
  simulatedRole: Role | null;
  setSimulatedRole: (role: Role | null) => void;
  isGhostMode: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [simulatedRole, setSimulatedRole] = useState<Role | null>(null);

  return (
    <ViewContext.Provider value={{ 
      simulatedRole, 
      setSimulatedRole, 
      isGhostMode: simulatedRole !== null 
    }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}
