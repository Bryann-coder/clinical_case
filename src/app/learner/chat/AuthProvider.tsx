'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  token: string | null;
  user: any | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: { user: any; jwt: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données au démarrage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('jwt');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ FONCTION LOGIN (DÉCOMMENTÉE ET CORRIGÉE)
  const login = (data: { user: any; jwt: string }) => {
    // Sauvegarder dans localStorage
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Mettre à jour l'état
    setToken(data.jwt);
    setUser(data.user);
  };

  // ✅ FONCTION LOGOUT (DÉCOMMENTÉE ET CORRIGÉE)
  const logout = () => {
    // Supprimer de localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    
    // Réinitialiser l'état
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        isLoggedIn: !!token, 
        isLoading, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}