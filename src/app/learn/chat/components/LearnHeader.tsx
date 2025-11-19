"use client";
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, ChevronDown, Search, PanelLeftClose, PanelLeftOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LearnHeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function LearnHeader({ onToggleSidebar, isSidebarCollapsed }: LearnHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    router.push('/auth/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm h-16 flex items-center justify-between px-6 sticky top-0 z-30 border-b border-slate-200">
      {/* Left section with toggle and branding */}
      <div className="flex items-center gap-4">
        {/* <Button 
          onClick={onToggleSidebar} 
          variant="ghost" 
          size="icon" 
          className="text-slate-600 hover:text-indigo-600"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button> */}
        
        <div className="flex items-center gap-3">
          <GraduationCap className='h-7 w-7 text-indigo-600' />
          <div className="hidden sm:block">
            <h1 className="text-base font-semibold text-slate-900 leading-tight">MediLearn</h1>
            <p className="text-xs text-slate-500">Espace Apprenant</p>
          </div>
        </div>
      </div>

      {/* Right section with search and user menu */}
      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Rechercher une consultation..." 
            className="pl-10 bg-slate-100 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all rounded-full"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-600">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="space-y-1">
                <p className="text-sm font-medium">Nouvelle consultation disponible</p>
                <p className="text-xs text-slate-500">Il y a 5 minutes</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 cursor-pointer p-1 rounded-lg hover:bg-slate-100">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Étudiant" />
                <AvatarFallback className="bg-indigo-500 text-white">ET</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">Étudiant en Médecine</p>
                <p className="text-xs text-slate-500">Apprenant</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500 hidden sm:block" />
            </div>
          </DropdownMenuTrigger>
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

export default LearnHeader;