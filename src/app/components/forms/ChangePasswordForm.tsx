"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from 'lucide-react'; // <-- Importer Eye et EyeOff

export function ChangePasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // <-- NOUVEL ÉTAT
    const router = useRouter();

    const handleChangePassword = async () => {
        setError('');
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password/`,
                { new_password: newPassword },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            alert("Mot de passe changé avec succès ! Vous allez être redirigé vers le tableau de bord.");
            router.push('/expert/dashboard');
        } catch (err: any) {
            setError("Erreur lors du changement de mot de passe.");
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Changer votre mot de passe</h1>
            <p className="text-center text-gray-500 mb-8">C'est votre première connexion. Veuillez définir un nouveau mot de passe.</p>
            <div className="space-y-6">
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        type={showPassword ? "text" : "password"} // <-- TYPE DYNAMIQUE
                        placeholder="Nouveau mot de passe"
                        className="pl-12 pr-12 py-6 bg-medimind-light border-none rounded-xl"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                 {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <Button onClick={handleChangePassword} className="w-full py-6 rounded-xl">
                    Enregistrer
                </Button>
            </div>
        </div>
    );
}