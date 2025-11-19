"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MessageSquare,
  BookOpen,
  GraduationCap,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  // { href: '/learn/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  // { href: '/learn/chat', icon: MessageSquare, label: 'Assistant IA', count: 3 },
  // // { href: '/learn/courses', icon: BookOpen, label: 'Cours' },
  // // { href: '/learn/practice', icon: GraduationCap, label: 'Exercices' },
  // { href: '/learn/progress', icon: BarChart3, label: 'Progression' },
];

const bottomNavItems = [
//   { href: '/learn/simulations', icon: Bot, label: 'Simulations' },
{ href: '/learn/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
{ href: '/learn/chat', icon: MessageSquare, label: 'Assistant IA', count: 3 },
// { href: '/learn/courses', icon: BookOpen, label: 'Cours' },
// { href: '/learn/practice', icon: GraduationCap, label: 'Exercices' },
{ href: '/learn/progress', icon: BarChart3, label: 'Progression' },
  { href: '/learn/settings', icon: Settings, label: 'Paramètres' },
];

export default function LearnSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  const renderLink = (item: any) => {
    const isActive = pathname === item.href;
    const linkContent = (
      <>
        <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-indigo-600" : "text-slate-500 group-hover:text-indigo-600")} />
        <span className={cn(
          "text-sm font-medium transition-all duration-300",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 ml-3"
        )}>
          {item.label}
        </span>
        {!isCollapsed && item.count && (
          <Badge variant="secondary" className="ml-auto bg-indigo-100 text-indigo-600">{item.count}</Badge>
        )}
      </>
    );

    const linkClasses = cn(
      "flex items-center p-3 rounded-lg transition-colors group",
      isActive 
        ? "bg-indigo-50 text-indigo-600" 
        : "text-slate-700 hover:bg-slate-100",
      isCollapsed ? "justify-center" : ""
    );

    if (isCollapsed) {
      return (
        <TooltipProvider key={item.href} delayDuration={0}> {/* Key sur l'élément parent */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={item.href} className={linkClasses}>
                {linkContent}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return (
      <Link 
        key={item.href} // Key unique basée sur l'URL
        href={item.href} 
        className={linkClasses}
      >
        {linkContent}
      </Link>
    );
  }

  return (
    <aside className={cn(
      "fixed top-0 left-0 h-full bg-white flex flex-col z-40 transition-all duration-300 ease-in-out border-r border-slate-200",
      isCollapsed ? "w-[80px]" : "w-64"
    )}>
      <div className={cn(
        "flex items-center h-16 px-6 border-b border-slate-200",
        isCollapsed && "px-0 justify-center"
      )}>
        {isCollapsed ? (
          <div className='flex items-center justify-center h-full'>
            <GraduationCap className='h-8 w-8 text-indigo-600' />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <GraduationCap className='h-8 w-8 text-indigo-600' />
            <div>
              <h1 className="text-lg font-semibold text-slate-900">MediLearn</h1>
              <p className="text-xs text-slate-500">Espace Apprenant</p>
            </div>
          </div>
        )}
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => renderLink(item))} {/* Pas besoin d'index ici */}
      </nav>

      <div className="px-4 py-4 mt-auto border-t border-slate-200">
        <div className="space-y-2">
          {bottomNavItems.map((item) => renderLink(item))} {/* Pas besoin d'index ici */}
        </div>
      </div>
    </aside>
  );
}