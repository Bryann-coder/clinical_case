import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidationTrendChart } from "@/app/components/charts/ValidationTrendChart";
import { PathologyDistributionChart } from "@/app/components/charts/PathologyDistributionChart";
import { CheckCircle, Clock, XCircle, Percent, Activity } from "lucide-react";

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

export default function StatsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Statistiques Détaillées</h1>
                <p className="text-slate-500">Analyse de la performance du générateur de cas et de l'activité des experts.</p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Cas en attente" value="25" percentage="+5 depuis hier" icon={Clock} color="text-yellow-500" />
                <StatCard title="Cas validés" value="187" percentage="+20 cette semaine" icon={CheckCircle} color="text-green-500" />
                <StatCard title="Cas rejetés" value="12" percentage="Stable" icon={XCircle} color="text-red-500" />
                <StatCard title="Taux validation" value="94%" percentage="+1.2% ce mois-ci" icon={Percent} color="text-indigo-500" />
                <StatCard title="Votre activité" value="32 validations" percentage="cette semaine" icon={Activity} color="text-sky-500" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <ValidationTrendChart />
                <PathologyDistributionChart />
            </div>
        </div>
    );
}