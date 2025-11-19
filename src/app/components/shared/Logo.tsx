import { BrainCircuit } from 'lucide-react'; // Ou une autre icône de votre choix

export const Logo = () => (
  <div className="flex items-center space-x-2">
    <BrainCircuit className="h-8 w-8 text-medimind-primary" />
    <span className="text-2xl font-bold text-gray-800">Medimind</span>
  </div>
);