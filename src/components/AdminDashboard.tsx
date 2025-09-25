import { useState } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  AlertTriangle,
  FileText,
  Activity,
  Menu,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "./DashboardStats";
import { ComplaintsTable } from "./ComplaintsTable";
import { HeatmapChart } from "./HeatmapChart";
import { cn } from "@/lib/utils";

type Section = 'dashboard' | 'complaints' | 'users' | 'analytics' | 'security' | 'reports' | 'settings';

const sidebarItems = [
  { id: 'dashboard' as Section, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'complaints' as Section, label: 'Complaints', icon: MessageSquare },
  { id: 'users' as Section, label: 'Users', icon: Users },
  { id: 'analytics' as Section, label: 'Analytics', icon: BarChart3 },
  { id: 'security' as Section, label: 'Security', icon: Shield },
  { id: 'reports' as Section, label: 'Reports', icon: FileText },
  { id: 'settings' as Section, label: 'Settings', icon: Settings },
];

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your admin panel metrics and activities</p>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Real-time data</span>
              </div>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Activity Heatmap
                </h3>
                <HeatmapChart />
              </Card>
              <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Recent Alerts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-dashboard-bg/50 border border-dashboard-border">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">High priority complaint received</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-dashboard-bg/50 border border-dashboard-border">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-dashboard-bg/50 border border-dashboard-border">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Complaint resolved</p>
                      <p className="text-xs text-muted-foreground">12 minutes ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'complaints':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Complaints Management</h1>
              <p className="text-muted-foreground">View and manage all user complaints</p>
            </div>
            <ComplaintsTable />
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Users Management</h1>
            <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
              <p className="text-muted-foreground">User management interface coming soon...</p>
            </Card>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Insights</h1>
            <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
              <p className="text-muted-foreground">Advanced analytics coming soon...</p>
            </Card>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Security Center</h1>
            <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
              <p className="text-muted-foreground">Security monitoring tools coming soon...</p>
            </Card>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Export</h1>
            <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
              <p className="text-muted-foreground">Report generation tools coming soon...</p>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
            <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
              <p className="text-muted-foreground">System configuration panel coming soon...</p>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-gradient-to-b from-dashboard-surface to-dashboard-surface/80 border-r border-dashboard-border transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {!sidebarCollapsed && (
              <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Panel
              </h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-muted-foreground hover:text-foreground hover:bg-dashboard-bg/50"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20 shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-dashboard-bg/50",
                    sidebarCollapsed && "justify-center"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}