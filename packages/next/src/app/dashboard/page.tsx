import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { 
  Building2, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Edit3, 
  Upload, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Camera,
  Globe,
  Linkedin,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import ApplicantDashboard from "@/components/dashboard/ApplicantDashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // If this is an applicant, show the dedicated applicant dashboard
  if (profile?.role === "applicant") {
    return <ApplicantDashboard />;
  }

  // For space providers, show the original dashboard
  // Get some basic stats
  const { count: spacesCount } = await supabase
    .from("spaces")
    .select("*", { count: "exact", head: true });

  const { count: applicationsCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true });

  const { count: providersCount } = await supabase
    .from("space_providers")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.email?.split("@")[0]}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your spaces and review applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{spacesCount || 0}</div>
            <p className="text-xs text-muted-foreground">Available workspaces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providersCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active providers</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and activities on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full" />
              <p className="text-sm text-gray-600">Platform launched successfully</p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-sm text-gray-600">Pixida GmbH workspace added</p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <p className="text-sm text-gray-600">Database schema initialized</p>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-gray-900">Add New Space</h3>
              <p className="text-sm text-gray-600">
                List a new workspace for companies to discover
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-gray-900">Review Applications</h3>
              <p className="text-sm text-gray-600">
                Check new applications from interested companies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
