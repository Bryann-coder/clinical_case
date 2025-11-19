"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, KeyRound, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false); // <-- NOUVEL ÉTAT
  
  return (
    <div className="space-y-5">
      {/* Name Input */}
      <div className="relative">
        <User 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18}
          strokeWidth={2}
        />
        <Input 
          type="text" 
          placeholder="Name" 
          className="pl-12 pr-4 py-6 bg-medimind-light border-none rounded-xl text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-medimind-primary/20 transition-all"
        />
      </div>

      {/* Surname Input */}
      <div className="relative">
        <User 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18}
          strokeWidth={2}
        />
        <Input 
          type="text" 
          placeholder="Surname" 
          className="pl-12 pr-4 py-6 bg-medimind-light border-none rounded-xl text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-medimind-primary/20 transition-all"
        />
      </div>

      {/* Email Input */}
      <div className="relative">
        <Mail 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18}
          strokeWidth={2}
        />
        <Input 
          type="email" 
          placeholder="Email" 
          className="pl-12 pr-4 py-6 bg-medimind-light border-none rounded-xl text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-medimind-primary/20 transition-all"
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

      {/* Confirm Password Input */}
      <div className="relative">
        <KeyRound 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18}
          strokeWidth={2}
        />
        <Input 
          type={showPassword ? "text" : "password"} // <-- TYPE DYNAMIQUE
          placeholder="Confirm password" 
          className="pl-12 pr-4 py-6 bg-medimind-light border-none rounded-xl text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-medimind-primary/20 transition-all"
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

      {/* Register Button */}
      <Button 
        className="w-full bg-medimind-primary hover:bg-medimind-primary/90 text-white font-semibold py-6 rounded-xl shadow-sm hover:shadow-md transition-all text-base mt-6"
      >
        Register Now
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-500 pt-2">
        Already have an account?{' '}
        <Link 
          href="/auth/login" 
          className="font-semibold text-medimind-primary hover:text-medimind-primary/80 transition-colors"
        >
          Login
        </Link>
      </p>
    </div>
  );
}