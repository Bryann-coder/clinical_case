"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Cardiologie', value: 400 },
  { name: 'Dermatologie', value: 300 },
  { name: 'Neurologie', value: 300 },
  { name: 'Pneumologie', value: 200 },
];

const COLORS = ['#4f46e5', '#6366f1', '#a5b4fc', '#c7d2fe'];

export function PathologyDistributionChart() {
  return (
     <Card className="border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Répartition par pathologie</CardTitle>
        <CardDescription>Pour les cas validés</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name) => [`${value} cas`, name]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
              }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: "12px", paddingTop: "20px"}} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}