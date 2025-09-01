import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle,
  BarChart3,
  PieChart,
  Download
} from "lucide-react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button variant="ghost" size="sm">
          <BarChart3 className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </Card>
  );
}

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Fetch analytics data
  const [
    { data: applications },
    { data: monthlyStats },
    { data: industryStats },
    { data: scoreDistribution }
  ] = await Promise.all([
    supabase.from("applications").select(`
      *,
      applicants (industry, team_size)
    `),
    supabase.rpc('get_monthly_application_stats').then(res => ({ data: res.data || [] })),
    supabase.from("applications").select(`
      applicants!inner(industry)
    `),
    supabase.from("applications").select("match_score").not("match_score", "is", null)
  ]);

  // Calculate metrics
  const totalApplications = applications?.length || 0;
  const acceptedApplications = applications?.filter(app => app.status === "accepted").length || 0;
  const pendingApplications = applications?.filter(app => app.status === "pending").length || 0;
  const averageMatchScore = scoreDistribution && scoreDistribution.length > 0 
    ? Math.round(scoreDistribution.reduce((sum, app) => sum + (app.match_score || 0), 0) / scoreDistribution.length)
    : 0;

  // Industry breakdown
  const industryBreakdown = industryStats?.reduce((acc: any, app: any) => {
    const industry = app.applicants?.industry || "Other";
    acc[industry] = (acc[industry] || 0) + 1;
    return acc;
  }, {}) || {};

  // Score distribution
  const scoreRanges = {
    "80-100": scoreDistribution?.filter(app => app.match_score >= 80).length || 0,
    "60-79": scoreDistribution?.filter(app => app.match_score >= 60 && app.match_score < 80).length || 0,
    "40-59": scoreDistribution?.filter(app => app.match_score >= 40 && app.match_score < 60).length || 0,
    "0-39": scoreDistribution?.filter(app => app.match_score < 40).length || 0,
  };

  // Success rate
  const successRate = totalApplications > 0 
    ? Math.round((acceptedApplications / totalApplications) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track application performance and matching success</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
              <p className="text-sm text-green-600 font-medium">+15% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">{successRate}%</p>
              <p className="text-sm text-green-600 font-medium">+3% improvement</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Match Score</p>
              <p className="text-3xl font-bold text-gray-900">{averageMatchScore}</p>
              <p className="text-sm text-green-600 font-medium">+5% this week</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-gray-900">{pendingApplications}</p>
              <p className="text-sm text-yellow-600 font-medium">Needs attention</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Breakdown */}
        <ChartCard title="Applications by Industry">
          <div className="space-y-4">
            {Object.entries(industryBreakdown).map(([industry, count]) => {
              const percentage = totalApplications > 0 ? ((count as number) / totalApplications) * 100 : 0;
              return (
                <div key={industry} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{industry}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{String(count)}</span>
                  </div>
                </div>
              );
            })}
            {Object.keys(industryBreakdown).length === 0 && (
              <div className="text-center py-8 text-gray-500">No data available</div>
            )}
          </div>
        </ChartCard>

        {/* Match Score Distribution */}
        <ChartCard title="Match Score Distribution">
          <div className="space-y-4">
            {Object.entries(scoreRanges).map(([range, count]) => {
              const percentage = scoreDistribution && scoreDistribution.length > 0 ? ((count as number) / scoreDistribution.length) * 100 : 0;
              const getColor = (range: string) => {
                if (range === "80-100") return "bg-green-500";
                if (range === "60-79") return "bg-yellow-500";
                if (range === "40-59") return "bg-orange-500";
                return "bg-red-500";
              };
              
              return (
                <div key={range} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getColor(range)}`}></div>
                    <span className="text-sm font-medium text-gray-700">{range} points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getColor(range)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        {/* Application Status Breakdown */}
        <ChartCard title="Application Status Overview">
          <div className="space-y-4">
            {['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'].map(status => {
              const count = applications?.filter(app => app.status === status).length || 0;
              const percentage = totalApplications > 0 ? (count / totalApplications) * 100 : 0;
              
              const getStatusColor = (status: string) => {
                const colors = {
                  pending: "bg-yellow-500",
                  reviewed: "bg-blue-500",
                  shortlisted: "bg-purple-500",
                  accepted: "bg-green-500",
                  rejected: "bg-red-500"
                };
                return colors[status as keyof typeof colors];
              };

              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(status)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        {/* Performance Metrics */}
        <ChartCard title="Performance Trends">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Application Volume</span>
                <span className="text-sm text-green-600">↑ 15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Match Accuracy</span>
                <span className="text-sm text-green-600">↑ 8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Response Time</span>
                <span className="text-sm text-green-600">↓ 12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Satisfaction Score</span>
                <span className="text-sm text-green-600">↑ 5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">High Match Scores</h4>
            <p className="text-sm text-blue-700">
              {scoreRanges["80-100"]} applications scored 80+ points, indicating strong alignment with Pixida's requirements.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Industry Trends</h4>
            <p className="text-sm text-green-700">
              Technology sector applications increased by 25% this month, showing strong market interest.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Review Efficiency</h4>
            <p className="text-sm text-yellow-700">
              Average review time decreased to 2.3 days, improving the candidate experience significantly.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
