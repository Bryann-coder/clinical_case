"use client";

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, ChevronDown, Search, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Ajouter cet import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';




interface HeaderProps {
    onToggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

export default function Header({ onToggleSidebar, isSidebarCollapsed }: HeaderProps) {

  const router = useRouter(); // Initialiser le router

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    router.push('/auth/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm h-16 flex items-center justify-between px-6 sticky top-0 z-30 border-b border-slate-200">
      <div className="flex items-center space-x-4">
        <Button onClick={onToggleSidebar} variant="ghost" size="icon" className="text-slate-600">
            {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Recherche globale..." 
            className="pl-10 bg-slate-100 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all rounded-full"
          />
        </div>
        
        <DropdownMenu>
          {/* ... Votre code pour le dropdown de notifications ... */}
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 cursor-pointer p-1 rounded-lg hover:bg-slate-100">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Dr. Haque" />
                <AvatarFallback className="bg-indigo-500 text-white">AH</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">Dr. Amirul Haque</p>
                <p className="text-xs text-slate-500">Expert Médical</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500 hidden sm:block" />
            </div>
          </DropdownMenuTrigger>
           {/* ... Votre code pour le dropdown de profil ... */}
           <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600 focus:bg-red-50">
                Déconnexion
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}