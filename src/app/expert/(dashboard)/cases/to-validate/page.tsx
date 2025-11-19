// app/expert/cases/to-validate/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileDown, ListFilter, ArrowUpDown, Check, X, Search } from "lucide-react";
import { useState, useMemo } from "react";

// Importer les données centralisées
import { pendingCases } from "@/app/data/mockData";
import { ClinicalCase } from "@/app/types/dashboard";

const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
        case 'Avancé': return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
        case 'Intermédiaire': return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
        case 'Débutant': return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const SortableHeader = ({ 
    children, 
    onSort, 
    sortDirection 
}: { 
    children: React.ReactNode; 
    onSort: () => void;
    sortDirection: 'asc' | 'desc' | null;
}) => (
    <Button variant="ghost" className="px-0 hover:bg-transparent font-semibold text-slate-700" onClick={onSort}>
        {children}
        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection ? 'text-indigo-600' : 'text-slate-400'}`} />
    </Button>
);

type SortField = 'id' | 'pathology' | 'difficulty' | 'generatedDate' | 'generatedBy';
type SortDirection = 'asc' | 'desc';

export default function CasesToValidatePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [pathologyFilter, setPathologyFilter] = useState("all");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");
    const [sortField, setSortField] = useState<SortField>('generatedDate');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const pathologies = Array.from(new Set(pendingCases.map(caseItem => caseItem.pathology)));
    const difficulties = Array.from(new Set(pendingCases.map(caseItem => caseItem.difficulty)));

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedCases = useMemo(() => {
        let filtered = pendingCases.filter((caseItem: ClinicalCase) => {
            const matchesSearch = caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                caseItem.pathology.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPathology = pathologyFilter === "all" || caseItem.pathology === pathologyFilter;
            const matchesDifficulty = difficultyFilter === "all" || caseItem.difficulty === difficultyFilter;
            const matchesDate = !dateFilter || caseItem.generatedDate === dateFilter;

            return matchesSearch && matchesPathology && matchesDifficulty && matchesDate;
        });

        // Tri des données
        filtered.sort((a, b) => {
            let aValue: any = a[sortField];
            let bValue: any = b[sortField];
            
            if (sortField === 'generatedBy') {
                aValue = a.generatedBy.name;
                bValue = b.generatedBy.name;
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [searchTerm, pathologyFilter, difficultyFilter, dateFilter, sortField, sortDirection]);

    const exportToCSV = () => {
        const headers = ["ID", "Pathologie", "Difficulté", "Date Génération", "Source"];
        const csvContent = [
            headers.join(","),
            ...filteredAndSortedCases.map(caseItem => [
                caseItem.id,
                caseItem.pathology,
                caseItem.difficulty,
                caseItem.generatedDate,
                caseItem.generatedBy.name
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cas-a-valider-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const getSortDirection = (field: SortField) => {
        return sortField === field ? sortDirection : null;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cas Cliniques à Valider</h1>
                    <p className="text-slate-500">Examinez les cas générés pour les ajouter au dataset d'entraînement.</p>
                </div>
                {/* <Button variant="outline" onClick={exportToCSV} className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                    <FileDown className="h-4 w-4 mr-2" />Exporter CSV
                </Button> */}
            </div>

            {/* Filtres */}
            <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-slate-700">
                        <ListFilter className="h-4 w-4" />
                        Filtres
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Recherche</label>
                            <Input
                                placeholder="ID, Pathologie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="focus:border-indigo-300 focus:ring-indigo-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Pathologie</label>
                            <Select value={pathologyFilter} onValueChange={setPathologyFilter}>
                                <SelectTrigger className="focus:ring-indigo-200 focus:border-indigo-300">
                                    <SelectValue placeholder="Toutes les pathologies" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les pathologies</SelectItem>
                                    {pathologies.map(pathology => (
                                        <SelectItem key={pathology} value={pathology}>
                                            {pathology}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Difficulté</label>
                            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                                <SelectTrigger className="focus:ring-indigo-200 focus:border-indigo-300">
                                    <SelectValue placeholder="Tous les niveaux" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les niveaux</SelectItem>
                                    {difficulties.map(difficulty => (
                                        <SelectItem key={difficulty} value={difficulty}>
                                            {difficulty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Date</label>
                            <Input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="focus:border-indigo-300 focus:ring-indigo-200"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-900">Liste des cas en attente</CardTitle>
                    <CardDescription className="text-slate-500">
                        {filteredAndSortedCases.length} cas sur {pendingCases.length} au total
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-slate-200 hover:bg-transparent">
                                <TableHead className="text-slate-700">
                                    <SortableHeader 
                                        onSort={() => handleSort('id')}
                                        sortDirection={getSortDirection('id')}
                                    >
                                        ID du Cas
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-slate-700">
                                    <SortableHeader 
                                        onSort={() => handleSort('pathology')}
                                        sortDirection={getSortDirection('pathology')}
                                    >
                                        Pathologie
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-slate-700">
                                    <SortableHeader 
                                        onSort={() => handleSort('difficulty')}
                                        sortDirection={getSortDirection('difficulty')}
                                    >
                                        Difficulté
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-slate-700">
                                    <SortableHeader 
                                        onSort={() => handleSort('generatedDate')}
                                        sortDirection={getSortDirection('generatedDate')}
                                    >
                                        Date Génération
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-slate-700">
                                    <SortableHeader 
                                        onSort={() => handleSort('generatedBy')}
                                        sortDirection={getSortDirection('generatedBy')}
                                    >
                                        Source
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-right text-slate-700">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedCases.map((c: ClinicalCase) => (
                                <TableRow key={c.id} className="border-b border-slate-100 hover:bg-indigo-50/80 transition-colors duration-200">
                                    <TableCell className="font-medium text-indigo-600">{c.id}</TableCell>
                                    <TableCell className="text-slate-700">{c.pathology}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`border ${getDifficultyBadge(c.difficulty)}`}>
                                            {c.difficulty}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-600">{c.generatedDate}</TableCell>
                                    <TableCell className="text-slate-600">{c.generatedBy.name}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-indigo-100">
                                                    <span className="sr-only">Ouvrir menu</span>
                                                    <MoreHorizontal className="h-4 w-4 text-slate-600" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem className="text-slate-700 hover:text-indigo-900">
                                                    <FileDown className="h-4 w-4 mr-2" />
                                                    Télécharger
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-slate-700 hover:text-indigo-900">
                                                    Examiner en détail
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                                    <Check className="h-4 w-4 mr-2"/>Valider le cas
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                    <X className="h-4 w-4 mr-2"/>Rejeter le cas
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}