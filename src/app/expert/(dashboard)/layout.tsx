"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation'; // Importer useRouter
import { Loader2 } from 'lucide-react'; // Pour un meilleur affichage pendant la vérification


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Nouvel état pour gérer l'authentification
  const router = useRouter();



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Si pas de token, on redirige vers la page de connexion
      router.push('/auth/login');
    }else {
      // Si un token existe, on autorise l'affichage
      setIsAuthenticated(true);
    }
  }, [router]); // L'effet se déclenchera au montage du composant

  // On peut ajouter un loader ici pour éviter un flash du contenu
  // Pour l'instant on retourne null si on n'est pas authentifié


  // if (!localStorage.getItem('authToken')) {
  //     return null; 
  // }


  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }



  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
      />
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-[80px]" : "ml-64"
      )}>
        <Header 
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="flex-1 p-12 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}