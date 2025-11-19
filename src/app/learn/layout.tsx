// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Loader2 } from 'lucide-react';
// import LearnSidebar from '@/app/learn/chat/components/LearnSidebar';
// import LearnHeader from '@/app/learn/chat/components/LearnHeader';

// export default function LearnLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       router.push('/auth/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router]);

//   if (!isAuthenticated) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center bg-slate-50">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-slate-50 text-slate-800">
//       {/* <LearnSidebar isCollapsed={isSidebarCollapsed} /> */}
//       <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
//         isSidebarCollapsed ? "ml-[80px]" : "ml-64"
//       }`}>
//         <LearnHeader 
//           isSidebarCollapsed={isSidebarCollapsed}
//           onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
//         />
//         <main className="flex-1 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


// layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import LearnHeader from '@/app/learn/chat/components/LearnHeader';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      <div className="flex flex-col flex-1">
        <LearnHeader 
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}