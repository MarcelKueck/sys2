import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  Eye,
  UserCheck,
  X
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
          {trend && (
            <p className="text-sm text-green-600 font-medium mt-1">{trend}</p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch statistics
  const [
    { count: totalApplications },
    { count: pendingApplications },
    { count: acceptedApplications },
    { data: applications }
  ] = await Promise.all([
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "accepted"),
    supabase
      .from("applications")
      .select(`
        *,
        applicants (
          company_name,
          industry,
          team_size
        )
      `)
      .order("created_at", { ascending: false })
      .limit(10)
  ]);

  // Calculate average match score
  const { data: matchScores } = await supabase
    .from("applications")
    .select("match_score")
    .not("match_score", "is", null);

  const averageMatchScore = matchScores && matchScores.length > 0
    ? Math.round(matchScores.reduce((sum, app) => sum + (app.match_score || 0), 0) / matchScores.length)
    : 0;

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewed: "bg-blue-100 text-blue-800",
      shortlisted: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return `px-2 py-1 text-xs rounded-full font-medium ${colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor and manage workspace applications</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Applications"
          value={totalApplications || 0}
          description="All time applications"
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          trend="+12% from last month"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingApplications || 0}
          description="Awaiting review"
          icon={<Clock className="h-6 w-6 text-yellow-600" />}
        />
        <StatCard
          title="Average Match Score"
          value={`${averageMatchScore}/100`}
          description="AI matching accuracy"
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          trend="+5% this week"
        />
        <StatCard
          title="Accepted Applications"
          value={acceptedApplications || 0}
          description="Successfully matched"
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        />
      </div>

      {/* Recent Applications */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <Link href="/admin/applications">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {applications && applications.length > 0 ? (
              applications.map((application: any) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {application.applicants?.company_name || "Unknown Company"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.applicants?.industry} • {application.applicants?.team_size} employees
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Match Score: {application.match_score || "N/A"}/100
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <span className={getStatusBadge(application.status)}>
                      {application.status}
                    </span>

                    <div className="flex space-x-2">
                      <Link href={`/admin/applications/${application.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {application.status === "pending" && (
                        <>
                          <Button size="sm" variant="outline" className="text-green-600">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No applications found
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/applications" className="block">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Review Applications
              </Button>
            </Link>
            <Link href="/admin/matching" className="block">
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="h-4 w-4 mr-2" />
                Matching Queue
              </Button>
            </Link>
            <Link href="/admin/analytics" className="block">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm text-green-600">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Match Algorithm</span>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Service</span>
              <span className="text-sm text-green-600">Operational</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">New application from TechStart AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Application reviewed for DataFlow Inc</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Application shortlisted for GreenTech Solutions</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
