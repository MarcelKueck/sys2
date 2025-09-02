"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApplication } from "@/lib/application-context";
import { 
  CheckCircle, 
  Mail, 
  Calendar, 
  Users, 
  ArrowRight, 
  Building2,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage() {
  const { formData, clearForm } = useApplication();
  const [applicationId] = useState(() => 
    `APP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  );

  // Clear the form data after successful submission
  useEffect(() => {
    // In a real app, you might want to delay this or only clear after API confirmation
    const timer = setTimeout(() => {
      clearForm();
    }, 5000);

    return () => clearTimeout(timer);
  }, [clearForm]);

  const selectedSpaceNames = formData.spaceSelection.selectedSpaces.map(spaceId => {
    // Mock data mapping (in real app this would come from API)
    const spaceMap: Record<string, string> = {
      "pixida-collaboration-lab": "Collaboration Lab Munich",
      "pixida-creative-hub": "Creative Hub Munich",
    };
    return spaceMap[spaceId] || spaceId;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Submitted Successfully!
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to the ShareYourSpace Collaboration Ecosystem
        </p>
      </div>

      {/* Application Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-pink-600" />
            Application Summary
          </CardTitle>
          <CardDescription>
            Your application ID: <span className="font-mono font-medium">{applicationId}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Company Details</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Company:</span> {formData.basicInfo.companyName}</p>
                <p><span className="font-medium">Contact:</span> {formData.basicInfo.name}</p>
                <p><span className="font-medium">Email:</span> {formData.basicInfo.email}</p>
                <p><span className="font-medium">Team Size:</span> {formData.basicInfo.teamSize}</p>
                <p><span className="font-medium">Stage:</span> {formData.basicInfo.companyStage}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Business Info</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Industry:</span> {formData.aboutBusiness.industry}</p>
                <p><span className="font-medium">Location:</span> {formData.aboutBusiness.currentLocation}</p>
                <p><span className="font-medium">Funding:</span> {formData.aboutBusiness.fundingStatus}</p>
                <p><span className="font-medium">Tech Stack:</span> {formData.aboutBusiness.techStack.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Selected Spaces */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Selected Workspaces</h3>
            <div className="space-y-2">
              {selectedSpaceNames.map((spaceName, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {spaceName}
                  {formData.spaceSelection.priorities[formData.spaceSelection.selectedSpaces[index]] && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Priority #{formData.spaceSelection.priorities[formData.spaceSelection.selectedSpaces[index]]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-medium">Email Confirmation</h3>
            </div>
            <p className="text-sm text-gray-600">
              You'll receive a confirmation email within the next few minutes with your application details.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <h3 className="font-medium">Review Process</h3>
            </div>
            <p className="text-sm text-gray-600">
              Workspace providers will review your application within 3-5 business days.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-medium">Meet & Greet</h3>
            </div>
            <p className="text-sm text-gray-600">
              If selected, you'll be invited for a virtual or in-person meeting to discuss details.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What Happens Next */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-pink-600" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-pink-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Immediate Confirmation</h4>
                <p className="text-sm text-gray-600">
                  Your application is now in our system and workspace providers have been notified.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-pink-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">AI-Powered Matching</h4>
                <p className="text-sm text-gray-600">
                  Our algorithm analyzes your profile and matches you with compatible workspace communities.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-pink-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Provider Review</h4>
                <p className="text-sm text-gray-600">
                  Workspace providers review your application and may reach out for additional information.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-pink-600">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Meet & Connect</h4>
                <p className="text-sm text-gray-600">
                  If there's mutual interest, you'll be invited to visit the workspace and meet the community.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="px-8">
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
        <Button asChild className="bg-pink-600 hover:bg-pink-700 px-8">
          <Link href="/">
            Return to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Help Section */}
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Our team is here to support you throughout the matching process.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
          <Link href="/contact" className="text-pink-600 hover:underline">
            Contact Support
          </Link>
          <span className="hidden sm:inline text-gray-400">•</span>
          <Link href="/faq" className="text-pink-600 hover:underline">
            View FAQ
          </Link>
          <span className="hidden sm:inline text-gray-400">•</span>
          <Link href="/how-it-works" className="text-pink-600 hover:underline">
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}
