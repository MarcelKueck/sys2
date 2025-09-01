import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building, 
  Users, 
  Calendar,
  Globe,
  Linkedin,
  Star,
  CheckCircle,
  XCircle,
  Download,
  Mail
} from "lucide-react";

interface ApplicationDetailProps {
  params: {
    id: string;
  };
}

export default async function ApplicationDetail({ params }: ApplicationDetailProps) {
  const supabase = await createClient();

  const { data: application, error } = await supabase
    .from("applications")
    .select(`
      *,
      applicants (*),
      space_providers (*)
    `)
    .eq("id", params.id)
    .single();

  if (error || !application) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-50",
      reviewed: "text-blue-600 bg-blue-50",
      shortlisted: "text-purple-600 bg-purple-50", 
      accepted: "text-green-600 bg-green-50",
      rejected: "text-red-600 bg-red-50"
    };
    return colors[status as keyof typeof colors] || "text-gray-600 bg-gray-50";
  };

  const getScoreBreakdown = (score: number | null) => {
    if (!score) return null;
    
    return {
      industry: Math.min(25, Math.round(score * 0.25)),
      size: Math.min(25, Math.round(score * 0.25)),
      collaboration: Math.min(25, Math.round(score * 0.25)),
      innovation: Math.min(25, Math.round(score * 0.25))
    };
  };

  const scoreBreakdown = getScoreBreakdown(application.match_score);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/applications">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {application.applicants?.company_name || "Unknown Company"}
            </h1>
            <p className="text-gray-600">Application #{application.id.slice(0, 8)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Profile */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{application.applicants?.company_name || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-medium">{application.applicants?.team_size || "Not specified"} employees</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="font-medium">
                        {application.applicants?.founded_date 
                          ? new Date(application.applicants.founded_date).getFullYear()
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      {application.applicants?.website ? (
                        <a 
                          href={application.applicants.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          {application.applicants.website}
                        </a>
                      ) : (
                        <p className="font-medium">Not specified</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      {application.applicants?.linkedin ? (
                        <a 
                          href={application.applicants.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Profile
                        </a>
                      ) : (
                        <p className="font-medium">Not specified</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{application.applicants?.industry || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>

            {application.applicants?.description && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Company Description</p>
                <p className="text-gray-700">{application.applicants.description}</p>
              </div>
            )}

            {application.applicants?.tech_stack && application.applicants.tech_stack.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {application.applicants.tech_stack.map((tech: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Match Score Breakdown */}
          {scoreBreakdown && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Match Score Breakdown</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Industry Alignment</span>
                  <span className="text-sm font-medium text-gray-900">{scoreBreakdown.industry}/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(scoreBreakdown.industry / 25) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Size Compatibility</span>
                  <span className="text-sm font-medium text-gray-900">{scoreBreakdown.size}/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(scoreBreakdown.size / 25) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Collaboration Potential</span>
                  <span className="text-sm font-medium text-gray-900">{scoreBreakdown.collaboration}/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(scoreBreakdown.collaboration / 25) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Innovation Focus</span>
                  <span className="text-sm font-medium text-gray-900">{scoreBreakdown.innovation}/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full" 
                    style={{ width: `${(scoreBreakdown.innovation / 25) * 100}%` }}
                  ></div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">Total Match Score</span>
                    <span className="text-xl font-bold text-blue-600">{application.match_score}/100</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Collaboration Interests */}
          {application.applicants?.collaboration_interests && application.applicants.collaboration_interests.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Collaboration Interests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {application.applicants.collaboration_interests.map((interest: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">{interest}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              {application.status === "pending" && (
                <>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Shortlist for Pixida
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Request More Info
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Application
                  </Button>
                </>
              )}
              
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export to PDF
              </Button>
            </div>
          </Card>

          {/* Manual Scoring */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Override</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="override-score">Override Match Score</Label>
                <Input 
                  id="override-score"
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder="Enter score (0-100)"
                  defaultValue={application.match_score || ""}
                />
              </div>
              
              <div>
                <Label htmlFor="internal-notes">Internal Notes</Label>
                <Textarea 
                  id="internal-notes"
                  placeholder="Add internal notes..."
                  rows={3}
                  defaultValue={application.notes || ""}
                />
              </div>
              
              <Button className="w-full">Save Changes</Button>
            </div>
          </Card>

          {/* Application Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                  <p className="text-xs text-gray-500">
                    {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {application.reviewed_at && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Reviewed</p>
                    <p className="text-xs text-gray-500">
                      {new Date(application.reviewed_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Status</p>
                  <p className="text-xs text-gray-500 capitalize">{application.status}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Pixida Requirements Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pixida Fit Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tech Industry</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medium Team Size</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Innovation Focus</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Collaboration Ready</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
