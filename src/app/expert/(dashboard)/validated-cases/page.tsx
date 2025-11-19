// app/expert/validated-cases/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, FileDown, ListFilter, ArrowUpDown, Bot, Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

// Importer les données et types
import { validatedCases } from "@/app/data/mockData";
import { ValidatedCase } from "@/app/types/dashboard";

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

type SortField = 'id' | 'pathology' | 'expertValidator' | 'validatedDate';
type SortDirection = 'asc' | 'desc';

export default function ValidatedCasesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [pathologyFilter, setPathologyFilter] = useState("all");
    const [validatorFilter, setValidatorFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");
    const [sortField, setSortField] = useState<SortField>('validatedDate');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const pathologies = Array.from(new Set(validatedCases.map(caseItem => caseItem.pathology)));
    const validators = Array.from(new Set(validatedCases.map(caseItem => caseItem.expertValidator)));

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedCases = useMemo(() => {
        let filtered = validatedCases.filter((caseItem: ValidatedCase) => {
            const matchesSearch = caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                caseItem.pathology.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPathology = pathologyFilter === "all" || caseItem.pathology === pathologyFilter;
            const matchesValidator = validatorFilter === "all" || caseItem.expertValidator === validatorFilter;
            const matchesDate = !dateFilter || caseItem.validatedDate === dateFilter;

            return matchesSearch && matchesPathology && matchesValidator && matchesDate;
        });

        // Tri des données
        filtered.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [searchTerm, pathologyFilter, validatorFilter, dateFilter, sortField, sortDirection]);

    const exportToCSV = () => {
        const headers = ["ID", "Pathologie", "Validé par", "Date de Validation"];
        const csvContent = [
            headers.join(","),
            ...filteredAndSortedCases.map(caseItem => [
                caseItem.id,
                caseItem.pathology,
                caseItem.expertValidator,
                caseItem.validatedDate
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cas-valides-${new Date().toISOString().split('T')[0]}.csv`;
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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cas Cliniques Validés</h1>
                    <p className="text-slate-500">Consultez et utilisez les cas approuvés qui composent le dataset.</p>
                </div>
                <Button variant="outline" onClick={exportToCSV} className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                    <FileDown className="h-4 w-4 mr-2" />Exporter CSV
                </Button>
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
                            <label className="text-sm font-medium text-slate-700">Validateur</label>
                            <Select value={validatorFilter} onValueChange={setValidatorFilter}>
                                <SelectTrigger className="focus:ring-indigo-200 focus:border-indigo-300">
                                    <SelectValue placeholder="Tous les validateurs" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les validateurs</SelectItem>
                                    {validators.map(validator => (
                                        <SelectItem key={validator} value={validator}>
                                            {validator}
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
                    <CardTitle className="text-slate-900">Dataset des cas validés</CardTitle>
                    <CardDescription className="text-slate-500">
                        {filteredAndSortedCases.length} cas sur {validatedCases.length} au total
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
                                        onSort={() => handleSort('expertValidator')}
                                        sortDirection={getSortDirection('expertValidator')}
                                    >
                                        Validé par
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-slate-700">
                                    <SortableHeader 
                                        onSort={() => handleSort('validatedDate')}
                                        sortDirection={getSortDirection('validatedDate')}
                                    >
                                        Date de Validation
                                    </SortableHeader>
                                </TableHead>
                                <TableHead className="text-right text-slate-700">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedCases.map((c: ValidatedCase) => (
                                <TableRow key={c.id} className="border-b border-slate-100 hover:bg-indigo-50/80 transition-colors duration-200">
                                    <TableCell className="font-medium text-indigo-600">{c.id}</TableCell>
                                    <TableCell className="text-slate-700">{c.pathology}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-xs bg-indigo-100 text-indigo-600">
                                                    {c.expertValidator.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-slate-700">{c.expertValidator}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600">{c.validatedDate}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                                            <Link href={`/expert/cases/simulation/${c.id}`}>
                                                <Bot className="h-4 w-4 mr-2"/>
                                                Lancer Simulation
                                            </Link>
                                        </Button>
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