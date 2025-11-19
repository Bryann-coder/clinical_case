"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock,  Eye, EyeOff  } from 'lucide-react';
import { useState } from 'react'; // Importer useState
import { useRouter } from 'next/navigation'; // Importer useRouter pour la redirection
import axios from 'axios'; // Importer axios


export function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- NOUVEL ÉTAT
  const router = useRouter();

  const handleLogin = async () => {
    setError(''); // Réinitialiser les erreurs
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, 
        {
          username: username,
          password: password
        }
      );

      // L'API a répondu avec succès
      const { token, user_id, role, must_change_password } = response.data;
      
      // Stocker le token de manière sécurisée (localStorage est simple pour commencer)
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify({ user_id, role, username }));

      // Rediriger en fonction de la réponse
      if (must_change_password) {
        router.push('/auth/change-password'); // On créera cette page juste après
      } else {
        // Ici, vous pourriez rediriger en fonction du rôle
        // if (role === 'EXPERT') {
          router.push('/expert/cases/to-validate');
        // } else {
        //   // rediriger vers le tableau de bord admin
        //   router.push('/expert/cases/simulation/[caseId]'); 
        // }
      }

    } catch (err: any) {
      // Gérer les erreurs de l'API
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Les identifiants sont incorrects.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      {/* Email Input */}
      <div className="relative">
        <User 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18} 
          strokeWidth={2}
        />
        <Input 
          type="text" 
          placeholder="Username" 
          className="pl-12 pr-4 py-6 bg-medimind-light border-none rounded-xl text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-medimind-primary/20 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <Lock 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18}
          strokeWidth={2}
        />
        <Input 
          type={showPassword ? "text" : "password"} // <-- TYPE DYNAMIQUE
          placeholder="Password" 
          className="pl-12 pr-4 py-6 bg-medimind-light border-none rounded-xl text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-medimind-primary/20 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        {/* --- BOUTON POUR VOIR LE MOT DE PASSE --- */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {/* -------------------------------------- */}
      </div>

            {/* Affichage de l'erreur */}
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Forgot Password */}
      <div className="text-left">
        <Link 
          href="/auth/forgot-password" 
          className="text-sm text-medimind-primary hover:text-medimind-primary/80 transition-colors font-medium inline-block"
        >
          Forgot password ?
        </Link>
      </div>

      {/* Login Button */}
      <Button 
        onClick={handleLogin}
        className="w-full bg-medimind-primary hover:bg-medimind-primary/90 text-white font-semibold py-6 rounded-xl shadow-sm hover:shadow-md transition-all text-base"
      >
        Login Now
      </Button>

      {/* Divider */}
      <div className="relative flex py-4 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">
          Login with Others
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Google Login */}
      <Button 
        variant="outline" 
        className="w-full py-6 rounded-xl border-gray-200 hover:bg-gray-50 transition-all text-base font-medium"
      >
        <Image 
          src="/google.svg" 
          alt="Google logo" 
          width={20} 
          height={20} 
          className="mr-3" 
        />
        Login with google
      </Button>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-500 pt-2">
        Don't have an account yet?{' '}
        <Link 
          href="/auth/register" 
          className="font-semibold text-medimind-primary hover:text-medimind-primary/80 transition-colors"
        >
          Register now
        </Link>
      </p>
    </div>
  );
}