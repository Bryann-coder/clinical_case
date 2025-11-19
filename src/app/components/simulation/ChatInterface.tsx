"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, BrainCircuit, Stethoscope, User, Loader2 } from "lucide-react";
import { ChatMessage } from './ChatMessage'; // Nous créerons ce composant juste après
import { Badge } from '@/components/ui/badge';

// Définition des types pour les messages et les détails du cas
type Message = {
  sender: 'Apprenant' | 'Patient' | 'Tuteur';
  content: string;
};

type CaseDetails = {
  title: string;
  summary: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
};

// Mode de simulation basé sur le cahier des charges
type SimulationMode = 'formative' | 'summative';

export function ChatInterface({ caseId }: { caseId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [mode, setMode] = useState<SimulationMode>('formative'); // Par défaut en mode formatif

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fonction pour faire défiler la conversation vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Charger les détails du cas au démarrage
  useEffect(() => {
    // TODO: Remplacer par un véritable appel API pour obtenir les détails du cas
    // Exemple : const response = await axios.get(`/api/cases/${caseId}`);
    setIsLoading(true);
    setTimeout(() => { // Simule un appel réseau
      setCaseDetails({
        title: `Cas Clinique #${caseId} - Cardiologie`,
        summary: "Patient de 58 ans présentant une douleur thoracique aiguë et des difficultés respiratoires.",
        difficulty: 'Intermédiaire',
      });
      setMessages([
        { sender: 'Patient', content: "Bonjour Docteur... Je ne me sens pas très bien." }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [caseId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { sender: 'Apprenant', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // --- C'EST ICI QUE VOUS APPELEZ VOTRE API LLM ---
      // L'endpoint est à créer dans votre backend Django/FastAPI
      // Il doit recevoir l'historique de la conversation, l'ID du cas et le mode
      /*
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/llm/chat/`, {
        case_id: caseId,
        history: [...messages, userMessage],
        mode: mode,
      });

      const newMessagesFromAPI = response.data.messages; // L'API doit retourner un tableau de messages
      setMessages(prev => [...prev, ...newMessagesFromAPI]);
      */

      // Simulation de la réponse de l'API pour l'instant
      setTimeout(() => {
        const patientResponse: Message = { sender: 'Patient', content: "Hmm, ma douleur est dans la poitrine, comme si quelque chose serrait très fort." };
        setMessages(prev => [...prev, patientResponse]);

        // Si le mode est formatif, le tuteur peut intervenir
        if (mode === 'formative' && inputValue.toLowerCase().includes("âge")) {
           const tutorHint: Message = { sender: 'Tuteur', content: "Bonne question sur l'âge. Pensez aussi à demander les antécédents familiaux." };
           setMessages(prev => [...prev, tutorHint]);
        }
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Erreur lors de la communication avec l'API de simulation", error);
      const errorMessage: Message = { sender: 'Tuteur', content: "Désolé, une erreur technique est survenue." };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  if (!caseDetails) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Colonne de gauche : Infos sur le cas */}
      <Card className="w-1/3 min-w-[350px] flex flex-col border-r rounded-none">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Stethoscope className="h-6 w-6 text-indigo-600" />
            <CardTitle className="text-xl">{caseDetails.title}</CardTitle>
          </div>
          <CardDescription>{caseDetails.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-semibold text-sm">Niveau de difficulté :</span>
            <Badge variant="outline" className="ml-2">{caseDetails.difficulty}</Badge>
          </div>
          <div>
            <span className="font-semibold text-sm">Mode de simulation :</span>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant={mode === 'formative' ? 'default' : 'outline'} onClick={() => setMode('formative')}>Formatif (avec aide)</Button>
              <Button size="sm" variant={mode === 'summative' ? 'default' : 'outline'} onClick={() => setMode('summative')}>Sommatif (sans aide)</Button>
            </div>
          </div>
           <Button className="w-full" variant="destructive">Terminer la Simulation & Evaluer</Button>
        </CardContent>
      </Card>

      {/* Colonne de droite : Chat */}
      <div className="w-2/3 flex flex-col bg-slate-50">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && <ChatMessage message={{sender: 'Patient', content: ""}} isLoading={true} />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question au patient..."
              className="flex-1 py-6"
              disabled={isLoading}
            />
            <Button type="submit" size="lg" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}