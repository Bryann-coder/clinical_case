// app/components/dashboard/StatsOverview.tsx
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
}

interface StatsOverviewProps {
  stats: StatItem[];
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getIconBgColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'blue': 'bg-blue-100 text-blue-600',
      'green': 'bg-green-100 text-green-600',
      'orange': 'bg-orange-100 text-orange-600',
      'purple': 'bg-purple-100 text-purple-600',
      'red': 'bg-red-100 text-red-600',
    };
    return colorMap[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className={`flex items-center text-sm ${getTrendColor(stat.trend)}`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${getIconBgColor(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}