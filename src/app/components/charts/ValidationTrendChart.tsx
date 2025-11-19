"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { date: '15 Mai', Validations: 4 },
  { date: '18 Mai', Validations: 3 },
  { date: '21 Mai', Validations: 8 },
  { date: '24 Mai', Validations: 5 },
  { date: '27 Mai', Validations: 9 },
  { date: '30 Mai', Validations: 7 },
  { date: '02 Juin', Validations: 11 },
  { date: '05 Juin', Validations: 14 },
  { date: '08 Juin', Validations: 12 },
  { date: '11 Juin', Validations: 15 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded-lg shadow-lg">
        <p className="label font-semibold">{`${label}`}</p>
        <p className="intro text-indigo-600">{`Validations : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


export function ValidationTrendChart() {
  return (
    <Card className="border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow duration-300 col-span-2">
      <CardHeader>
        <CardTitle>Évolution des validations</CardTitle>
        <CardDescription>30 derniers jours</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValidations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Validations" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorValidations)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}