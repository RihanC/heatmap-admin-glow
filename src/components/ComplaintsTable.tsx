import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, Clock } from "lucide-react";
import complaintsData from "@/data/complaints.json";

interface Complaint {
  id: number;
  user: string;
  type: string;
  status: "Pending" | "Resolved";
  lat: number;
  lng: number;
}

export function ComplaintsTable() {
  const [complaints, setComplaints] = useState<Complaint[]>(complaintsData as Complaint[]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComplaints = complaints.filter(complaint =>
    complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resolveComplaint = (id: number) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === id 
          ? { ...complaint, status: "Resolved" as const }
          : complaint
      )
    );
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-dashboard-surface to-dashboard-surface/80 border-dashboard-border">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dashboard-bg/50 border-dashboard-border focus:border-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dashboard-border">
              <th className="text-left py-3 px-4 font-medium text-foreground">ID</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">User</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Location</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr 
                key={complaint.id} 
                className="border-b border-dashboard-border/50 hover:bg-dashboard-bg/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-muted-foreground">#{complaint.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {complaint.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{complaint.user}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className="border-dashboard-border text-foreground">
                    {complaint.type}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge 
                    variant={complaint.status === "Resolved" ? "default" : "secondary"}
                    className={
                      complaint.status === "Resolved"
                        ? "bg-success/10 text-success border-success/20 hover:bg-success/20"
                        : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"
                    }
                  >
                    {complaint.status === "Resolved" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {complaint.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground font-mono">
                    {complaint.lat.toFixed(4)}, {complaint.lng.toFixed(4)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-dashboard-bg/50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {complaint.status === "Pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => resolveComplaint(complaint.id)}
                        className="text-success hover:text-success hover:bg-success/10"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredComplaints.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No complaints found matching your search.</p>
        </div>
      )}
    </Card>
  );
}