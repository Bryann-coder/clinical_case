// ChatProvider.tsx - Version améliorée
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'tutor';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  category?: 'cardiology' | 'pediatrics' | 'emergency' | 'general';
  isPinned?: boolean;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  searchTerm: string;
  
  // Actions
  setCurrentConversation: (conversation: Conversation) => void;
  createNewConversation: () => Conversation;
  sendMessage: (content: string) => Promise<void>;
  toggleSidebar: () => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  togglePinConversation: (id: string) => void;
  setSearchTerm: (term: string) => void;
  duplicateConversation: (id: string) => void;
  clearAllConversations: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Données mockées plus réalistes pour la médecine
const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Consultation cardiologie - Douleur thoracique',
    messages: [
      {
        id: '1-1',
        content: "Bonjour, je voudrais apprendre à diagnostiquer une douleur thoracique typique",
        role: 'user',
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: '1-2',
        content: "Excellent sujet ! Commençons par l'anamnèse. Quels sont les caractéristiques de la douleur thoracique que vous suspectez être d'origine cardiaque ?",
        role: 'tutor',
        timestamp: new Date('2024-01-15T10:32:00')
      }
    ],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:32:00'),
    category: 'cardiology',
    isPinned: true
  },
  {
    id: '2',
    title: 'Examen pédiatrique - Enfant 5 ans',
    messages: [
      {
        id: '2-1',
        content: "Comment procéder à un examen complet chez un enfant de 5 ans ?",
        role: 'user',
        timestamp: new Date('2024-01-14T15:20:00')
      }
    ],
    createdAt: new Date('2024-01-14T15:20:00'),
    updatedAt: new Date('2024-01-14T15:20:00'),
    category: 'pediatrics'
  }
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les conversations au montage
  useEffect(() => {
    setConversations(mockConversations);
    setCurrentConversation(mockConversations[0]);
  }, []);

  const createNewConversation = useCallback((): Conversation => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nouvelle consultation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      category: 'general'
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    return newConversation;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    let targetConversation = currentConversation;
    
    if (!targetConversation) {
      targetConversation = createNewConversation();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Mettre à jour la conversation
    const updatedConversation = {
      ...targetConversation,
      messages: [...targetConversation.messages, userMessage],
      updatedAt: new Date(),
      title: targetConversation.messages.length === 0 ? 
        content.substring(0, 40) + (content.length > 40 ? '...' : '') : 
        targetConversation.title
    };

    setConversations(prev => 
      prev.map(conv => 
        conv.id === targetConversation.id ? updatedConversation : conv
      )
    );
    setCurrentConversation(updatedConversation);

    // Simulation de réponse IA
    setIsLoading(true);
    setTimeout(() => {
      const tutorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateTutorResponse(content, targetConversation!.category),
        role: 'tutor',
        timestamp: new Date()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, tutorMessage],
        updatedAt: new Date()
      };

      setConversations(prev => 
        prev.map(conv => 
          conv.id === targetConversation!.id ? finalConversation : conv
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
      setCurrentConversation(conversations.find(conv => conv.id !== id) || null);
    }
  }, [currentConversation, conversations]);

  const renameConversation = useCallback((id: string, newTitle: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, title: newTitle } : conv
      )
    );
    if (currentConversation?.id === id) {
      setCurrentConversation(prev => prev ? { ...prev, title: newTitle } : null);
    }
  }, [currentConversation]);

  const togglePinConversation = useCallback((id: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, isPinned: !conv.isPinned } : conv
      )
    );
  }, []);

  const duplicateConversation = useCallback((id: string) => {
    const original = conversations.find(conv => conv.id === id);
    if (original) {
      const duplicated: Conversation = {
        ...original,
        id: Date.now().toString(),
        title: `${original.title} (Copie)`,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: original.messages.map(msg => ({
          ...msg,
          id: `${Date.now()}-${msg.id}`
        }))
      };
      setConversations(prev => [duplicated, ...prev]);
      setCurrentConversation(duplicated);
    }
  }, [conversations]);

  const clearAllConversations = useCallback(() => {
    setConversations([]);
    setCurrentConversation(null);
  }, []);

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      isSidebarOpen,
      isLoading,
      searchTerm,
      setCurrentConversation,
      createNewConversation,
      sendMessage,
      toggleSidebar,
      deleteConversation,
      renameConversation,
      togglePinConversation,
      setSearchTerm,
      duplicateConversation,
      clearAllConversations
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// Fonction pour générer des réponses contextuelles
const generateTutorResponse = (userMessage: string, category?: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('douleur thoracique') || category === 'cardiology') {
    return "Très bien. Pour une douleur thoracique, évaluez d'abord les signes de gravité : dyspnée, sudation, irradiation. Puis vérifiez les facteurs de risque cardiovasculaires. Souhaitez-vous que nous détaillions l'examen clinique ?";
  }
  
  if (lowerMessage.includes('enfant') || category === 'pediatrics') {
    return "Excellent ! En pédiatrie, l'approche doit être adaptée à l'âge. Commencez par observer l'enfant à distance, puis établissez un contact verbal avant l'examen physique. Voulez-vous aborder des techniques spécifiques pour cet âge ?";
  }
  
  if (lowerMessage.includes('urgence')) {
    return "En situation d'urgence, priorisez l'ABCD : Airway, Breathing, Circulation, Disability. Quelle situation spécifique souhaitez-vous simuler ?";
  }
  
  return `Je vois que vous vous intéressez à "${userMessage}". En tant que tuteur médical, je vais vous guider à travers les principes fondamentaux et les bonnes pratiques. Commençons par les bases théoriques avant de passer aux aspects pratiques.`;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};