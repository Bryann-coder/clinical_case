// // ChatHeader.tsx - Nouveau header unifié
// "use client";

// import { useChat } from '@/app/learn/chat/components/ChatProvider';
// import { Button } from '@/components/ui/button';
// import { GraduationCap, PanelLeftOpen, User } from 'lucide-react';

// export const ChatHeader = () => {
//   const { currentConversation, toggleSidebar, isSidebarOpen } = useChat();

//   return (
//     <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
//       {/* Partie gauche avec logo et bouton sidebar */}
//       <div className="flex items-center gap-4">
//         {/* Bouton pour ouvrir/fermer la sidebar - TOUJOURS visible */}
//         {/* <Button
//           variant="ghost"
//           size="icon"
//           onClick={toggleSidebar}
//           className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
//         >
//           <PanelLeftOpen className="h-5 w-5" />
//         </Button> */}

//         {/* Logo et nom de l'application - visible seulement quand la sidebar est fermée
//         {!isSidebarOpen && (
//           <div className="flex items-center gap-3">
//             <GraduationCap className='h-8 w-8 text-indigo-600' />
//             <div>
//               <h1 className="text-lg font-semibold text-slate-900">MediLearn</h1>
//               <p className="text-xs text-slate-500">Espace Apprenant</p>
//             </div>
//           </div>
//         )} */}

//         {/* Titre de la conversation actuelle */}
//         {currentConversation && (
//           <div className="flex items-center gap-3 ml-4">
//             <div className="w-px h-6 bg-slate-300"></div>
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 {currentConversation.title}
//               </h2>
//               <p className="text-sm text-slate-500">
//                 Consultation médicale simulée
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Partie droite avec infos utilisateur */}
//       <div className="flex items-center gap-3">
//         <div className="text-right">
//           <p className="text-sm font-medium text-slate-900">Dr. Apprenant</p>
//           <p className="text-xs text-slate-500">Étudiant en médecine</p>
//         </div>
//         <div className="bg-slate-100 p-2 rounded-full">
//           <User className="h-5 w-5 text-slate-600" />
//         </div>
//       </div>
//     </header>
//   );
// };