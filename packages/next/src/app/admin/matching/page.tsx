import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  Building,
  Users,
  Calendar
} from "lucide-react";

interface Application {
  id: string;
  status: string;
  match_score: number | null;
  created_at: string;
  applicants: {
    company_name: string | null;
    industry: string | null;
    team_size: number | null;
  } | null;
}

interface KanbanColumnProps {
  title: string;
  applications: Application[];
  status: string;
  color: string;
}

function KanbanCard({ application }: { application: Application }) {
  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-500";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm">
          {application.applicants?.company_name || "Unknown Company"}
        </h4>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500">
          <Building className="h-3 w-3 mr-1" />
          {application.applicants?.industry || "Not specified"}
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Users className="h-3 w-3 mr-1" />
          {application.applicants?.team_size || "?"} employees
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(application.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        <span className={`text-xs font-medium ${getScoreColor(application.match_score)}`}>
          {application.match_score ? `${application.match_score}/100` : "Pending"}
        </span>
        
        <div className="flex space-x-1">
          <Link href={`/admin/applications/${application.id}`}>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Eye className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

function KanbanColumn({ title, applications, status, color }: KanbanColumnProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {applications.length}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {applications.map((application) => (
          <KanbanCard key={application.id} application={application} />
        ))}
        
        {applications.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No applications in this stage
          </div>
        )}
      </div>
    </div>
  );
}

export default async function MatchingQueue({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';
  const industry = typeof params.industry === 'string' ? params.industry : '';

  let query = supabase
    .from("applications")
    .select(`
      *,
      applicants (
        company_name,
        industry,
        team_size
      )
    `)
    .order("created_at", { ascending: false });

  // Apply filters
  if (search) {
    query = query.or(`applicants.company_name.ilike.%${search}%,applicants.industry.ilike.%${search}%`);
  }

  if (industry) {
    query = query.eq("applicants.industry", industry);
  }

  const { data: applications } = await query;

  // Group applications by status
  const applicationsByStatus = {
    pending: applications?.filter((app: Application) => app.status === "pending") || [],
    reviewed: applications?.filter((app: Application) => app.status === "reviewed") || [],
    shortlisted: applications?.filter((app: Application) => app.status === "shortlisted") || [],
    accepted: applications?.filter((app: Application) => app.status === "accepted") || [],
    rejected: applications?.filter((app: Application) => app.status === "rejected") || []
  };

  const columns = [
    {
      title: "New Applications",
      status: "pending",
      applications: applicationsByStatus.pending,
      color: "bg-yellow-500"
    },
    {
      title: "Under Review", 
      status: "reviewed",
      applications: applicationsByStatus.reviewed,
      color: "bg-blue-500"
    },
    {
      title: "Shortlisted for Pixida",
      status: "shortlisted", 
      applications: applicationsByStatus.shortlisted,
      color: "bg-purple-500"
    },
    {
      title: "Accepted",
      status: "accepted",
      applications: applicationsByStatus.accepted,
      color: "bg-green-500"
    },
    {
      title: "Rejected",
      status: "rejected",
      applications: applicationsByStatus.rejected,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matching Queue</h1>
          <p className="text-gray-600">Drag and drop applications through the review process</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Bulk Actions</Button>
          <Button>Export Shortlist</Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search companies..."
                className="pl-10"
                defaultValue={search}
                name="search"
              />
            </div>
          </div>
          
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm" defaultValue={industry}>
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>

          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option value="">All Team Sizes</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="200+">200+ employees</option>
          </select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {columns.map((column) => (
          <Card key={column.status} className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
              <h3 className="font-medium text-gray-900 text-sm">{column.title}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{column.applications.length}</p>
            <p className="text-xs text-gray-500">
              {column.status === "pending" && "Need review"}
              {column.status === "reviewed" && "In progress"}
              {column.status === "shortlisted" && "High potential"}
              {column.status === "accepted" && "Success"}
              {column.status === "rejected" && "Not suitable"}
            </p>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            applications={column.applications}
            color={column.color}
          />
        ))}
      </div>

      {/* Bulk Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">0 applications selected</span>
            <Button variant="outline" size="sm" disabled>
              Bulk Shortlist
            </Button>
            <Button variant="outline" size="sm" disabled>
              Bulk Reject
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Export Current View
            </Button>
            <Button variant="outline" size="sm">
              Email Templates
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
