"use client";

import { cn } from "@/lib/utils";
import { User, Stethoscope, BrainCircuit, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  sender: 'Apprenant' | 'Patient' | 'Tuteur';
  content: string;
};

// Map pour associer chaque rôle à une icône et un style
const senderConfig = {
  Apprenant: {
    icon: User,
    avatarClass: "bg-indigo-500 text-white",
    bubbleClass: "bg-indigo-500 text-white",
    align: "justify-end",
    name: "Vous (Apprenant)"
  },
  Patient: {
    icon: Stethoscope,
    avatarClass: "bg-slate-300 text-slate-800",
    bubbleClass: "bg-white",
    align: "justify-start",
    name: "Patient (Simulé)"
  },
  Tuteur: {
    icon: BrainCircuit,
    avatarClass: "bg-amber-400 text-white",
    bubbleClass: "bg-amber-50 border-amber-300 border",
    align: "justify-start",
    name: "Tuteur Pédagogique"
  },
};

export function ChatMessage({ message, isLoading = false }: { message: Message, isLoading?: boolean }) {
  const config = senderConfig[message.sender];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-end gap-3", config.align)}>
      {message.sender !== 'Apprenant' && (
        <Avatar className="h-9 w-9">
          <AvatarFallback className={config.avatarClass}>
            <Icon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col gap-1 max-w-[75%]">
         <span className={cn("text-xs text-slate-500", message.sender === 'Apprenant' ? 'text-right' : 'text-left', 'px-2')}>
             {config.name}
         </span>
        <div className={cn(
          "p-4 rounded-2xl", 
          config.bubbleClass,
          message.sender === 'Apprenant' ? 'rounded-br-none' : 'rounded-bl-none',
          "shadow-sm"
        )}>
          {isLoading ? (
            <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400"/>
                <span className="text-sm text-slate-400">réfléchit...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>
      </div>

      {message.sender === 'Apprenant' && (
        <Avatar className="h-9 w-9">
          <AvatarFallback className={config.avatarClass}>
            <Icon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}