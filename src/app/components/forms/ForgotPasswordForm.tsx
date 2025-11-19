"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from 'lucide-react';

export function ForgotPasswordForm() {
  return (
    <div className="space-y-6">
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

      {/* Reset Button */}
      <Button 
        className="w-full bg-medimind-primary hover:bg-medimind-primary/90 text-white font-semibold py-6 rounded-xl shadow-sm hover:shadow-md transition-all text-base"
      >
        Reset password
      </Button>

      {/* Back to Login */}
      <div className="text-center pt-4">
        <Link 
          href="/auth/login" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-medimind-primary transition-colors font-medium"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}