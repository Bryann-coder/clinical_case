// MessageList.tsx
"use client";

import { useChat } from './ChatProvider';
import { ChatMessages } from './ChatMessages';
import { Button } from '@/components/ui/button';
import { Bot, User, BrainCircuit, Loader2 } from 'lucide-react';

export const MessageList = () => {
  const { currentConversation, isLoading } = useChat();

  if (!currentConversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <BrainCircuit className="h-16 w-16 text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Bienvenue dans votre espace d'apprentissage
        </h3>
        <p className="text-slate-500 max-w-md">
          Commencez une nouvelle consultation pour apprendre les techniques de diagnostic et de prise en charge médicale.
        </p>
      </div>
    );
  }

  if (currentConversation.messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Bot className="h-16 w-16 text-indigo-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {currentConversation.title}
        </h3>
        <p className="text-slate-500 max-w-md">
          Posez votre première question pour commencer la consultation simulée.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* En-tête de la conversation */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <h2 className="text-lg font-semibold text-slate-900">
          {currentConversation.title}
        </h2>
        <p className="text-sm text-slate-500">
          Consultation médicale simulée
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages messages={currentConversation.messages} />
        
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="flex items-center space-x-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Le tuteur médical réfléchit...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};