import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, BrainCircuit } from 'lucide-react';
import type { Message } from '@/app/learner/chat/page'; // Importer le type

const MessageBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.role === 'user';
  const isTutor = msg.role === 'tutor';

  const icon = isUser ? <User size={20}/> : isTutor ? <BrainCircuit size={20}/> : <Bot size={20}/>;
  const avatarFallbackClass = isUser ? "bg-slate-200 text-slate-600" : isTutor ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600";
  const messageBubbleClass = isUser ? "bg-indigo-600 text-white rounded-br-none" : isTutor ? "bg-amber-50 border border-amber-200 rounded-bl-none" : "bg-white text-slate-800 rounded-bl-none";

  return (
    <div className={cn("flex items-start gap-4", isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-8 w-8"><AvatarFallback className={avatarFallbackClass}>{icon}</AvatarFallback></Avatar>
      )}
      <div className={cn("max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm", messageBubbleClass)}>
        <p className="whitespace-pre-wrap">{msg.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8"><AvatarFallback className={avatarFallbackClass}>{icon}</AvatarFallback></Avatar>
      )}
    </div>
  );
};

export function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-6">
      {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)}
    </div>
  );
}