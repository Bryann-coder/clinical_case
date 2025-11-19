"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Conversation, Message, mockConversations } from '@/app/learn/chat/mockChatData';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  
  // Actions
  setCurrentConversation: (conversation: Conversation) => void;
  createNewConversation: () => void;
  sendMessage: (content: string) => Promise<void>;
  toggleSidebar: () => void;
  deleteConversation: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nouvelle conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversation) {
      createNewConversation();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Mettre à jour la conversation actuelle
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      updatedAt: new Date(),
      title: currentConversation.messages.length === 0 ? 
        content.substring(0, 50) + (content.length > 50 ? '...' : '') : 
        currentConversation.title
    };

    setConversations(prev => 
      prev.map(conv => 
        conv.id === currentConversation.id ? updatedConversation : conv
      )
    );
    setCurrentConversation(updatedConversation);

    // Simuler la réponse du LLM
    setIsLoading(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Je vais vous aider avec votre question sur "${content}". En tant qu'assistant médical, je peux vous guider à travers les étapes de consultation...`,
        role: 'assistant',
        timestamp: new Date()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage],
        updatedAt: new Date()
      };

      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversation.id ? finalConversation : conv
        )
      );
      setCurrentConversation(finalConversation);
      setIsLoading(false);
    }, 1500);
  }, [currentConversation, createNewConversation]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  }, [currentConversation]);

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      isSidebarOpen,
      isLoading,
      setCurrentConversation,
      createNewConversation,
      sendMessage,
      toggleSidebar,
      deleteConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};