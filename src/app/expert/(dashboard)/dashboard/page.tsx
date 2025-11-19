import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle, Clock, XCircle, Percent } from "lucide-react";
import { ValidationTrendChart } from "@/app/components/charts/ValidationTrendChart"; // <-- Importer le graphique
import { PathologyDistributionChart } from "@/app/components/charts/PathologyDistributionChart"; // <-- Importer le graphique
import { RecentCasesList } from "@/app/components/dashboard/RecentCasesList"; // <-- NOUVEL IMPORT

// Sous-composant pour les cartes de statistiques pour garder le code propre
// Sous-composant pour les cartes de statistiques (NOUVEAU STYLE)
const StatCard = ({ title, value, percentage, icon: Icon, color }: any) => (
    <Card className="border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
            <Icon className={`h-5 w-5 ${color}`} />
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            <p className="text-xs text-slate-500 mt-1">{percentage}</p>
        </CardContent>
    </Card>
);

// Placeholder pour les graphiques
const ChartPlaceholder = ({ title }: { title: string }) => (
    <Card className="shadow-sm h-80">
        <CardHeader>
            <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full pb-16">
            <p className="text-slate-400">Emplacement du graphique</p>
        </CardContent>
    </Card>
);

const recentCases = [
    { id: 'C-7892', pathology: 'Cardiologie', difficulty: 'Avancé', date: '12 Juin 2024' },
    { id: 'C-7891', pathology: 'Dermatologie', difficulty: 'Intermédiaire', date: '12 Juin 2024' },
    { id: 'C-7890', pathology: 'Neurologie', difficulty: 'Débutant', date: '11 Juin 2024' },
    { id: 'C-7889', pathology: 'Pneumologie', difficulty: 'Intermédiaire', date: '11 Juin 2024' },
];

const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
        case 'Avancé': return 'bg-red-100 text-red-800';
        case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
        case 'Débutant': return 'bg-green-100 text-green-800';
        default: return 'bg-slate-100 text-slate-800';
    }
}

export default function ExpertDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Section Titre */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tableau de Bord</h1>
                <p className="text-slate-500">Bienvenue, Dr. Haque. Voici un aperçu de votre activité.</p>
            </div>

            {/* Cartes statistiques */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Cas en attente" value="25" percentage="+5 depuis hier" icon={Clock} color="text-yellow-500" />
                <StatCard title="Cas validés" value="187" percentage="+20 cette semaine" icon={CheckCircle} color="text-green-500" />
                <StatCard title="Cas rejetés" value="12" percentage="Stable" icon={XCircle} color="text-red-500" />
                <StatCard title="Taux validation" value="94%" percentage="+1.2% ce mois-ci" icon={Percent} color="text-indigo-500" />
            </div>

            {/* Graphiques */}
            <div className="grid gap-6 lg:grid-cols-3">
                 {/* Utiliser les vrais composants de graphiques ici */}
                <ValidationTrendChart />
                <PathologyDistributionChart />
            </div>
            {/* Liste rapide des derniers cas */}
            <div>
                {/* <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Derniers cas générés en attente</CardTitle>
                            <p className="text-sm text-slate-500">Examinez les cas les plus récents.</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Voir tous les cas <ArrowUpRight className="h-4 w-4 ml-2"/>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Pathologie</TableHead>
                                    <TableHead>Difficulté</TableHead>
                                    <TableHead>Date de génération</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentCases.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.id}</TableCell>
                                        <TableCell>{c.pathology}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`border-none ${getDifficultyBadge(c.difficulty)}`}>{c.difficulty}</Badge>
                                        </TableCell>
                                        <TableCell>{c.date}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Examiner</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card> */}
                            <RecentCasesList />
            </div>
        </div>
    );
}