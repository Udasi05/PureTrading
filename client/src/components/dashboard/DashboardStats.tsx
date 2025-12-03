import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, Target, Clock } from "lucide-react";

interface DashboardStatsProps {
  totalSignals: number;
  activeSignals: number;
  todaySignals: number;
}

export function DashboardStats({ totalSignals, activeSignals, todaySignals }: DashboardStatsProps) {
  const stats = [
    {
      icon: Zap,
      label: "Active Signals",
      value: activeSignals,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Clock,
      label: "Today's Signals",
      value: todaySignals,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: TrendingUp,
      label: "Total Signals",
      value: totalSignals,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Target,
      label: "Win Rate",
      value: "78%",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Zap,
      label: "Avg. Daily Signals",
      value: "15",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4" data-testid={`stat-card-${index}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
