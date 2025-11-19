"use client";

import { useState } from 'react';
import { useChat } from '@/app/learn/chat/components/ChatProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading, currentConversation } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const messageToSend = message.trim();
    setMessage('');
    await sendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!currentConversation) return null;

  return (
    <div className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question médicale..."
            className="min-h-[48px] resize-none border-slate-300 rounded-lg flex-1"
            disabled={isLoading}
            rows={1}
          />
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 h-[48px] px-4"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};