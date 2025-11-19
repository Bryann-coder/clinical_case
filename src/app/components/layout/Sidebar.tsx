"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileCheck2, 
  Archive, 
  Library, 
  BarChart2, 
  Settings, 
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Logo } from '@/app/components/shared/Logo'; // Assurez-vous que ce chemin est correct
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const navItems = [
  { href: '/expert/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/expert/cases/to-validate', icon: FileCheck2, label: 'Cas à valider', count: 25 },
  { href: '/expert/validated-cases', icon: Library, label: 'Cas validés' },
  { href: '/expert/rejected-cases', icon: Archive, label: 'Cas rejetés' },
  // { href: '/expert/stats', icon: BarChart2, label: 'Statistiques' },
];

const bottomNavItems = [
  { href: '/expert/fultang-dataset', icon: Database, label: 'Dataset FULTANG' },
  { href: '/expert/settings', icon: Settings, label: 'Paramètres' },
];

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={item.href} className={linkClasses}>{linkContent}</Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return <Link href={item.href} className={linkClasses}>{linkContent}</Link>;
  }

  return (
    <aside className={cn(
      "fixed top-0 left-0 h-full bg-white flex flex-col z-40 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-[80px]" : "w-64"
    )}>
      <div className={cn(
        "flex items-center h-16 px-6 border-b border-slate-200",
        isCollapsed && "px-0 justify-center"
      )}>
        {isCollapsed ? (
            <div className='flex items-center justify-center h-full'>
                 <LayoutDashboard className='h-8 w-8 text-indigo-600' />
            </div>
        ) : <Logo />}
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(renderLink)}
      </nav>

      <div className="px-4 py-4 mt-auto border-t border-slate-200">
         <div className="space-y-2">
            {bottomNavItems.map(renderLink)}
         </div>
      </div>
    </aside>
  );
}