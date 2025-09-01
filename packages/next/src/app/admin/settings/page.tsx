import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Users, 
  Mail, 
  Database,
  Bell,
  Shield,
  Save
} from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              <a href="#general" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                <Settings className="h-4 w-4 mr-3" />
                General Settings
              </a>
              <a href="#users" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <Users className="h-4 w-4 mr-3" />
                User Management
              </a>
              <a href="#email" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <Mail className="h-4 w-4 mr-3" />
                Email Templates
              </a>
              <a href="#matching" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <Database className="h-4 w-4 mr-3" />
                Match Algorithm
              </a>
              <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <Bell className="h-4 w-4 mr-3" />
                Notifications
              </a>
              <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <Shield className="h-4 w-4 mr-3" />
                Security
              </a>
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card className="p-6" id="general">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input 
                    id="platform-name"
                    defaultValue="Workspace Matching Platform" 
                  />
                </div>
                <div>
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input 
                    id="admin-email"
                    type="email"
                    defaultValue="admin@workspacematching.com" 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea 
                  id="platform-description"
                  rows={3}
                  defaultValue="A comprehensive platform for connecting innovative companies with perfect workspace partners."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-applications">Max Applications per Company</Label>
                  <Input 
                    id="max-applications"
                    type="number"
                    defaultValue="5" 
                  />
                </div>
                <div>
                  <Label htmlFor="review-deadline">Review Deadline (days)</Label>
                  <Input 
                    id="review-deadline"
                    type="number"
                    defaultValue="7" 
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Match Algorithm Settings */}
          <Card className="p-6" id="matching">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Match Algorithm Configuration</h3>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900">Scoring Weights</Label>
                <p className="text-sm text-gray-500 mb-4">Adjust the importance of different factors in match scoring</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="industry-weight">Industry Alignment</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="industry-weight"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue="25"
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="size-weight">Team Size Compatibility</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="size-weight"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue="25"
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="collaboration-weight">Collaboration Potential</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="collaboration-weight"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue="25"
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="innovation-weight">Innovation Focus</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="innovation-weight"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue="25"
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="min-score">Minimum Score for Auto-Review</Label>
                <Input 
                  id="min-score"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-32"
                />
                <p className="text-sm text-gray-500 mt-1">Applications above this score will be automatically flagged for review</p>
              </div>
            </div>
          </Card>

          {/* Email Templates */}
          <Card className="p-6" id="email">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Templates</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="welcome-template">Welcome Email Template</Label>
                <Textarea 
                  id="welcome-template"
                  rows={4}
                  defaultValue="Welcome to the Workspace Matching Platform! We're excited to help you find the perfect workspace partnership."
                />
              </div>

              <div>
                <Label htmlFor="shortlist-template">Shortlist Notification Template</Label>
                <Textarea 
                  id="shortlist-template"
                  rows={4}
                  defaultValue="Congratulations! Your application has been shortlisted for review by Pixida GmbH. We'll be in touch soon with next steps."
                />
              </div>

              <div>
                <Label htmlFor="rejection-template">Rejection Email Template</Label>
                <Textarea 
                  id="rejection-template"
                  rows={4}
                  defaultValue="Thank you for your interest in workspace partnership. While we won't be moving forward at this time, we encourage you to apply for future opportunities."
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6" id="notifications">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">New Application Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when new applications are submitted</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">High Score Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified for applications with high match scores</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Daily Summary</Label>
                  <p className="text-sm text-gray-500">Receive daily summary of application activity</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Receive weekly analytics reports</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6" id="security">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input 
                  id="session-timeout"
                  type="number"
                  defaultValue="480"
                  className="w-32"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500 mb-2">Require 2FA for admin accounts</p>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Enable 2FA requirement</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Password Requirements</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Minimum 8 characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Require uppercase letters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Require numbers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Require special characters</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
