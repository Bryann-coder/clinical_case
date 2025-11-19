import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MessageSquare, Settings } from 'lucide-react';

export function ChatSidebar() {
  // Données factices
  const history = [
    { id: '1', title: 'Cas de douleur thoracique' },
    { id: '2', title: 'Patient avec céphalées' },
  ];

  return (
    <div className="bg-white h-full p-2 flex flex-col border-r">
      <Button variant="outline" className="w-full justify-start gap-2 h-10 mb-2">
        <Plus size={16}/> Nouvelle Simulation
      </Button>
      <div className="flex-1 mt-2 space-y-1 overflow-y-auto">
        {history.map(conv => (
          <Button key={conv.id} variant="ghost" className="w-full justify-start gap-3 h-9 text-sm">
            <MessageSquare size={16} className="text-slate-500"/>
            <span className="truncate flex-1 text-left">{conv.title}</span>
          </Button>
        ))}
      </div>
      <div className="mt-auto border-t pt-2">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-sm flex-1 truncate">John Doe</p>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Settings size={16}/></Button>
        </div>
      </div>
    </div>
  );
}