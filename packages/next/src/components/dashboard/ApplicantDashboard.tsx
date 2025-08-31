"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { 
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
  Mail,
  Save,
  X,
  Building2,
  Users,
  Target,
  Image as ImageIcon,
  MessageSquare,
  Bell,
  TrendingUp
} from "lucide-react";
import { Database } from "@/types/database.types";

type Applicant = Database["public"]["Tables"]["applicants"]["Row"];
type Application = Database["public"]["Tables"]["applications"]["Row"];
type Space = Database["public"]["Tables"]["spaces"]["Row"];
type SpaceProvider = Database["public"]["Tables"]["space_providers"]["Row"];

interface EditableSection {
  isEditing: boolean;
  data: any;
}

interface EditStates {
  companyInfo: {
    isEditing: boolean;
    data: {
      company_name?: string;
      company_stage?: string;
      team_size?: number;
      industry?: string;
      description?: string;
      founded_date?: string;
      funding_status?: string;
      tech_stack?: string[];
    };
  };
  collaboration: {
    isEditing: boolean;
    data: {
      looking_for?: string;
      can_offer?: string;
      ideal_neighbors?: string;
      collaboration_interests?: string[];
    };
  };
  preferences: {
    isEditing: boolean;
    data: {
      preferred_location?: string;
      budget_range?: string;
      space_requirements?: string;
    };
  };
  contact: {
    isEditing: boolean;
    data: {
      website?: string;
      linkedin?: string;
    };
  };
}

export default function ApplicantDashboard() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [applicantData, setApplicantData] = useState<Applicant | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [providers, setProviders] = useState<SpaceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit states for different sections
  const [editStates, setEditStates] = useState<EditStates>({
    companyInfo: { isEditing: false, data: {} },
    collaboration: { isEditing: false, data: {} },
    preferences: { isEditing: false, data: {} },
    contact: { isEditing: false, data: {} }
  });

  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        // Fetch applicant data
        const { data: applicant } = await supabase
          .from("applicants")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        setApplicantData(applicant);

        // Fetch applications
        const { data: userApplications } = await supabase
          .from("applications")
          .select("*")
          .eq("applicant_id", currentUser.id);

        setApplications(userApplications || []);

        // Fetch all spaces for browsing
        const { data: allSpaces } = await supabase
          .from("spaces")
          .select("*");

        setSpaces(allSpaces || []);

        // Fetch providers for space details
        const { data: allProviders } = await supabase
          .from("space_providers")
          .select("*");

        setProviders(allProviders || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (section: keyof EditStates) => {
    setEditStates(prev => ({
      ...prev,
      [section]: {
        isEditing: true,
        data: getDataForSection(section)
      }
    }));
  };

  const cancelEditing = (section: keyof EditStates) => {
    setEditStates(prev => ({
      ...prev,
      [section]: {
        isEditing: false,
        data: {}
      }
    }));
  };

  const getDataForSection = (section: keyof EditStates) => {
    if (!applicantData) return {};
    
    switch (section) {
      case 'companyInfo':
        return {
          company_name: applicantData.company_name || "",
          company_stage: applicantData.company_stage || "",
          team_size: applicantData.team_size || "",
          industry: applicantData.industry || "",
          description: applicantData.description || "",
          founded_date: applicantData.founded_date || "",
          funding_status: applicantData.funding_status || "",
          tech_stack: applicantData.tech_stack || []
        };
      case 'collaboration':
        return {
          looking_for: applicantData.looking_for || "",
          can_offer: applicantData.can_offer || "",
          ideal_neighbors: applicantData.ideal_neighbors || "",
          collaboration_interests: applicantData.collaboration_interests || []
        };
      case 'contact':
        return {
          website: applicantData.website || "",
          linkedin: applicantData.linkedin || ""
        };
      default:
        return {};
    }
  };

  const saveSection = async (section: keyof EditStates) => {
    if (!user || !editStates[section].data) return;

    try {
      const { error } = await supabase
        .from("applicants")
        .upsert({
          id: user.id,
          ...editStates[section].data,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Refresh data
      fetchUserData();
      
      // Stop editing
      cancelEditing(section);
    } catch (error) {
      console.error(`Error saving ${section}:`, error);
    }
  };

  const updateEditData = (section: keyof EditStates, field: string, value: any) => {
    setEditStates(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        data: {
          ...prev[section].data,
          [field]: value
        }
      }
    }));
  };

  const handleImageUpload = async () => {
    if (!imageUpload || !user) return;

    setUploadingImages(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < imageUpload.length; i++) {
        const file = imageUpload[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}_${i}.${fileExt}`;

        // For now, we'll use placeholder URLs since storage setup isn't available
        const mockUrl = `https://via.placeholder.com/300x200?text=Company+Image+${i + 1}`;
        uploadedUrls.push(mockUrl);
      }

      // Update applicant with new images
      const currentImages = applicantData?.images || [];
      const newImages = [...currentImages, ...uploadedUrls];

      const { error } = await supabase
        .from("applicants")
        .upsert({
          id: user.id,
          images: newImages,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      fetchUserData();
      setImageUpload(null);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploadingImages(false);
    }
  };

  const getProfileCompleteness = () => {
    if (!applicantData) return 0;
    
    const fields = [
      applicantData.company_name,
      applicantData.industry,
      applicantData.team_size,
      applicantData.description,
      applicantData.looking_for,
      applicantData.can_offer,
      applicantData.website || applicantData.linkedin
    ];
    
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const removeImage = async (imageUrl: string) => {
    if (!user) return;

    try {
      const currentImages = applicantData?.images || [];
      const newImages = currentImages.filter(img => img !== imageUrl);

      const { error } = await supabase
        .from("applicants")
        .upsert({
          id: user.id,
          images: newImages,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      fetchUserData();
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'reviewed':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'shortlisted':
        return <Star className="h-4 w-4 text-purple-500" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {applicantData?.company_name || "Welcome to your Dashboard"}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and track your workspace applications
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <Camera className="h-4 w-4 mr-2" />
            Add Photos
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Browse Spaces
          </Button>
        </div>
      </div>

      {/* Application Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['pending', 'reviewed', 'shortlisted', 'accepted'].map((status) => {
          const count = applications.filter(app => app.status === status).length;
          const percentage = applications.length > 0 ? Math.round((count / applications.length) * 100) : 0;
          
          return (
            <Card key={status} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                    {applications.length > 0 && (
                      <p className="text-xs text-gray-500">{percentage}% of total</p>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    {getStatusIcon(status)}
                    {count > 0 && (
                      <div className="w-8 h-1 bg-gray-200 rounded-full mt-2">
                        <div 
                          className={`h-1 rounded-full transition-all duration-300 ${
                            status === 'pending' ? 'bg-yellow-500' :
                            status === 'reviewed' ? 'bg-blue-500' :
                            status === 'shortlisted' ? 'bg-purple-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Company Information
                </CardTitle>
                <CardDescription>Basic details about your company</CardDescription>
              </div>
              {!editStates.companyInfo.isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing('companyInfo')}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelEditing('companyInfo')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection('companyInfo')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="group">
              {editStates.companyInfo.isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input
                        id="company_name"
                        value={editStates.companyInfo.data.company_name || ""}
                        onChange={(e) => updateEditData('companyInfo', 'company_name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={editStates.companyInfo.data.industry || ""}
                        onChange={(e) => updateEditData('companyInfo', 'industry', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="team_size">Team Size</Label>
                      <Input
                        id="team_size"
                        type="number"
                        value={editStates.companyInfo.data.team_size || ""}
                        onChange={(e) => updateEditData('companyInfo', 'team_size', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company_stage">Company Stage</Label>
                      <select
                        id="company_stage"
                        value={editStates.companyInfo.data.company_stage || ""}
                        onChange={(e) => updateEditData('companyInfo', 'company_stage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select stage</option>
                        <option value="idea">Idea</option>
                        <option value="mvp">MVP</option>
                        <option value="growth">Growth</option>
                        <option value="scale">Scale</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      value={editStates.companyInfo.data.description || ""}
                      onChange={(e) => updateEditData('companyInfo', 'description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Company Name</p>
                      <p className="text-gray-900">{applicantData?.company_name || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Industry</p>
                      <p className="text-gray-900">{applicantData?.industry || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Team Size</p>
                      <p className="text-gray-900">{applicantData?.team_size ? `${applicantData.team_size} people` : "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Stage</p>
                      <p className="text-gray-900 capitalize">{applicantData?.company_stage || "Not specified"}</p>
                    </div>
                  </div>
                  {applicantData?.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-gray-900">{applicantData.description}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Collaboration Profile */}
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Collaboration Profile
                </CardTitle>
                <CardDescription>What you're looking for and what you can offer</CardDescription>
              </div>
              {!editStates.collaboration.isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing('collaboration')}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelEditing('collaboration')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection('collaboration')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="group">
              {editStates.collaboration.isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="looking_for">What we're looking for</Label>
                    <Textarea
                      id="looking_for"
                      value={editStates.collaboration.data.looking_for || ""}
                      onChange={(e) => updateEditData('collaboration', 'looking_for', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="can_offer">What we can offer</Label>
                    <Textarea
                      id="can_offer"
                      value={editStates.collaboration.data.can_offer || ""}
                      onChange={(e) => updateEditData('collaboration', 'can_offer', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ideal_neighbors">Ideal workspace neighbors</Label>
                    <Textarea
                      id="ideal_neighbors"
                      value={editStates.collaboration.data.ideal_neighbors || ""}
                      onChange={(e) => updateEditData('collaboration', 'ideal_neighbors', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Tech Stack</Label>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {(editStates.collaboration.data.collaboration_interests || []).map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tech}
                            <button
                              onClick={() => {
                                const newTech = (editStates.collaboration.data.collaboration_interests || []).filter((_: string, i: number) => i !== index);
                                updateEditData('collaboration', 'collaboration_interests', newTech);
                              }}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add technology (e.g., React, Python, AI)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              const value = input.value.trim();
                              if (value) {
                                const currentTech = editStates.collaboration.data.collaboration_interests || [];
                                updateEditData('collaboration', 'collaboration_interests', [...currentTech, value]);
                                input.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">What we're looking for</p>
                    <p className="text-gray-900">{applicantData?.looking_for || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">What we can offer</p>
                    <p className="text-gray-900">{applicantData?.can_offer || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ideal workspace neighbors</p>
                    <p className="text-gray-900">{applicantData?.ideal_neighbors || "Not specified"}</p>
                  </div>
                  {applicantData?.collaboration_interests && applicantData.collaboration_interests.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tech Stack & Interests</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {applicantData.collaboration_interests.map((interest, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Company Images
              </CardTitle>
              <CardDescription>Showcase your team and workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Add company images
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => setImageUpload(e.target.files)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {imageUpload && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-800">
                      {imageUpload.length} image(s) selected
                    </span>
                    <Button
                      size="sm"
                      onClick={handleImageUpload}
                      disabled={uploadingImages}
                    >
                      {uploadingImages ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                )}

                {/* Current Images */}
                {applicantData?.images && applicantData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {applicantData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Company image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(image)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Application History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Application History
              </CardTitle>
              <CardDescription>Track your applications and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.length > 0 ? (
                  applications.map((application) => {
                    const provider = providers.find(p => p.id === application.provider_id);
                    return (
                      <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{provider?.company_name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(application.status)}`}>
                                {application.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Applied on {new Date(application.submitted_at).toLocaleDateString()}
                            </p>
                            {application.match_score && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-medium">{application.match_score}% match</span>
                              </div>
                            )}
                            {application.notes && (
                              <p className="text-sm text-gray-600 mt-2">{application.notes}</p>
                            )}
                          </div>
                          {getStatusIcon(application.status)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by browsing available spaces</p>
                    <div className="mt-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Browse Spaces
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completeness */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile</span>
                  <span className="text-sm text-gray-500">{getProfileCompleteness()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getProfileCompleteness()}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  Complete your profile to get better matches
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.slice(0, 3).map((application) => {
                  const provider = providers.find(p => p.id === application.provider_id);
                  return (
                    <div key={application.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{provider?.company_name}</p>
                        <p className={`text-xs px-2 py-1 rounded-full ${getStatusColor(application.status)}`}>
                          {application.status}
                        </p>
                      </div>
                      {getStatusIcon(application.status)}
                    </div>
                  );
                })}
                {applications.length === 0 && (
                  <p className="text-sm text-gray-500">No applications yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Contact Information</CardTitle>
              {!editStates.contact.isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing('contact')}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelEditing('contact')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection('contact')}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {editStates.contact.isEditing ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={editStates.contact.data.website || ""}
                      onChange={(e) => updateEditData('contact', 'website', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={editStates.contact.data.linkedin || ""}
                      onChange={(e) => updateEditData('contact', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  {applicantData?.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a 
                        href={applicantData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {applicantData.website}
                      </a>
                    </div>
                  )}
                  {applicantData?.linkedin && (
                    <div className="flex items-center space-x-2">
                      <Linkedin className="h-4 w-4 text-gray-400" />
                      <a 
                        href={applicantData.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Spaces Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Spaces</CardTitle>
              <CardDescription>Spaces that match your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {spaces.slice(0, 2).map((space) => {
                  const provider = providers.find(p => p.id === space.provider_id);
                  return (
                    <div key={space.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{space.name}</h4>
                          <p className="text-xs text-gray-500">{provider?.company_name}</p>
                          <p className="text-xs text-gray-600 mt-1">{space.description?.slice(0, 80)}...</p>
                          {space.monthly_price && (
                            <div className="flex items-center mt-2">
                              <DollarSign className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">
                                €{space.monthly_price}/month
                              </span>
                            </div>
                          )}
                        </div>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>
                  );
                })}
                <Button variant="outline" size="sm" className="w-full">
                  View All Spaces
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.length > 0 ? (
                  applications.slice(0, 3).map((application) => {
                    const provider = providers.find(p => p.id === application.provider_id);
                    const isRecent = new Date(application.updated_at || application.submitted_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    
                    return (
                      <div key={application.id} className="flex items-center space-x-3">
                        {getStatusIcon(application.status)}
                        <div className="flex-1">
                          <p className="text-sm">
                            Application to <span className="font-medium">{provider?.company_name}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {isRecent ? 'Recent update' : new Date(application.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                        {isRecent && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-4">
                    <Bell className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  Have questions about your applications or need assistance?
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
