import { Card } from "@/components/ui/card";
import { MessageSquare, CheckCircle, Clock, Users } from "lucide-react";
import complaintsData from "@/data/complaints.json";

export function DashboardStats() {
  const totalComplaints = complaintsData.length;
  const resolvedComplaints = complaintsData.filter(c => c.status === "Resolved").length;
  const pendingComplaints = complaintsData.filter(c => c.status === "Pending").length;
  const totalUsers = new Set(complaintsData.map(c => c.user)).size;

  const stats = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      icon: MessageSquare,
      gradient: "bg-gradient-info",
      change: "+12%",
      changeType: "increase" as const
    },
    {
      title: "Resolved",
      value: resolvedComplaints,
      icon: CheckCircle,
      gradient: "bg-gradient-success",
      change: "+8%",
      changeType: "increase" as const
    },
    {
      title: "Pending",
      value: pendingComplaints,
      icon: Clock,
      gradient: "bg-gradient-warning",
      change: "-5%",
      changeType: "decrease" as const
    },
    {
      title: "Active Users",
      value: totalUsers,
      icon: Users,
      gradient: "bg-gradient-primary",
      change: "+15%",
      changeType: "increase" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card 
            key={index} 
            className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border hover:shadow-glow transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.changeType === 'increase' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}