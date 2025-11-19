// ChatInterface.tsx
"use client";

import { ChatProvider, useChat } from './ChatProvider';
import { ConversationSidebar } from './ConversationSidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

const ChatContent = () => {
  const { currentConversation, isSidebarOpen } = useChat();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <ConversationSidebar />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'ml-80' : 'ml-0'
      }`}>
        <div className="flex-1 overflow-hidden flex flex-col">
          <MessageList />
          {currentConversation && <MessageInput />}
        </div>
      </div>
    </div>
  );
};

export const ChatInterface = () => {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
};