import { ChatInterface } from "@/app/components/simulation/ChatInterface";

// Cette page récupère l'ID du cas depuis l'URL et le passe à notre composant de chat.
export default function SimulationPage({ params }: { params: { caseId: string } }) {
  return (
    <div className="h-full w-full flex flex-col">
      <ChatInterface caseId={params.caseId} />
    </div>
  );
}