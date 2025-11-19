"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, Heart, Brain, Bone, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const recentCases = [
    { id: 'C-7892', pathology: 'Cardiologie', difficulty: 'Avancé', date: '12 Juin 2024', icon: Heart, href: "/expert/cases/C-7892" },
    { id: 'C-7891', pathology: 'Dermatologie', difficulty: 'Intermédiaire', date: '12 Juin 2024', icon: Activity, href: "/expert/cases/C-7891" },
    { id: 'C-7890', pathology: 'Neurologie', difficulty: 'Débutant', date: '11 Juin 2024', icon: Brain, href: "/expert/cases/C-7890" },
    { id: 'C-7889', pathology: 'Orthopédie', difficulty: 'Intermédiaire', date: '11 Juin 2024', icon: Bone, href: "/expert/cases/C-7889" },
];

const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
        case 'Avancé': return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
        case 'Intermédiaire': return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200';
        case 'Débutant': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200';
        default: return 'bg-slate-100 text-slate-800';
    }
}

// Variants pour l'animation de la liste
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export function RecentCasesList() {
    return (
        <Card className="border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200/60">
                <div>
                    <CardTitle>Derniers cas en attente</CardTitle>
                    <CardDescription>Examinez les cas les plus récents pour validation.</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild className="bg-white">
                    <Link href="/expert/cases/to-validate">
                        Voir tous les cas <ArrowUpRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <motion.ul 
                    className="divide-y divide-slate-200/60"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {recentCases.map((c, index) => {
                        const Icon = c.icon;
                        return (
                            <motion.li key={c.id} variants={itemVariants}>
                                <Link href={c.href} className="group block hover:bg-slate-50/80 transition-colors duration-200">
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
                                                <Icon className="h-5 w-5"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 flex items-center">
                                                    {c.id} - {c.pathology}
                                                    {index === 0 && (
                                                        <span className="relative flex h-2 w-2 ml-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-slate-500">{c.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant="outline" className={`border ${getDifficultyBadge(c.difficulty)}`}>{c.difficulty}</Badge>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-indigo-600 font-medium">
                                                <span className="hidden md:inline">Examiner</span>
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </CardContent>
        </Card>
    );
}