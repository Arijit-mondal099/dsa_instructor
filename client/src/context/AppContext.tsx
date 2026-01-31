"use client";

import { createContext, useContext, useState } from "react";

interface IAppContext {
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  sidebarOpen: boolean;
  login: (name: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
}

const AuthContext = createContext<IAppContext | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>("sjsisiwiiw");
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const login = (name: string) => setUser(name);
  const logout = () => setUser(null);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        sidebarOpen,
        toggleSidebar,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
