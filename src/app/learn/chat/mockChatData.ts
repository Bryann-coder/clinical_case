export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Consultation cardiologie',
    messages: [
      {
        id: '1-1',
        content: "Bonjour, je voudrais apprendre les bases de la consultation en cardiologie",
        role: 'user',
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: '1-2',
        content: "Je vais vous guider à travers les étapes clés d'une consultation cardiologique. Commençons par l'anamnèse...",
        role: 'assistant',
        timestamp: new Date('2024-01-15T10:32:00')
      }
    ],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:32:00')
  },
  {
    id: '2',
    title: 'Examen neurologique',
    messages: [
      {
        id: '2-1',
        content: "Comment effectuer un examen neurologique complet ?",
        role: 'user',
        timestamp: new Date('2024-01-14T14:20:00')
      }
    ],
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T14:20:00')
  }
];