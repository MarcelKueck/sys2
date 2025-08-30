"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useApplication } from "@/lib/application-context";
import { APPLICATION_STEPS, COLLABORATION_OPTIONS } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const collaborationSchema = z.object({
  lookingFor: z.string().min(100, "Please provide at least 100 characters"),
  canOffer: z.string().min(100, "Please provide at least 100 characters"),
  idealNeighbors: z.string().min(100, "Please provide at least 100 characters"),
  collaborationInterests: z.array(z.string()).min(1, "Please select at least one collaboration interest"),
});

type CollaborationFormData = z.infer<typeof collaborationSchema>;

export default function CollaborationPage() {
  const router = useRouter();
  const { formData, updateCollaborationProfile } = useApplication();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    formData.collaborationProfile.collaborationInterests || []
  );

  const form = useForm<CollaborationFormData>({
    resolver: zodResolver(collaborationSchema),
    defaultValues: {
      ...formData.collaborationProfile,
      collaborationInterests: selectedInterests,
    },
  });

  const toggleInterest = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    
    setSelectedInterests(newInterests);
    form.setValue("collaborationInterests", newInterests);
  };

  const onSubmit = (data: CollaborationFormData) => {
    updateCollaborationProfile({
      ...data,
      collaborationInterests: selectedInterests,
    });
    router.push("/apply/spaces");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator currentStep={3} totalSteps={4} steps={APPLICATION_STEPS} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="h-6 w-6 text-pink-600" />
            Collaboration Profile
          </CardTitle>
          <CardDescription>
            Help us understand how you'd like to collaborate with other companies in the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* What are you looking for */}
            <div className="space-y-3">
              <Label htmlFor="lookingFor">
                What are you looking for in a workspace? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="lookingFor"
                {...form.register("lookingFor")}
                placeholder="Describe what you hope to find in your ideal workspace. Consider aspects like community, amenities, location, atmosphere, networking opportunities, etc."
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {form.formState.errors.lookingFor && (
                    <span className="text-red-500">{form.formState.errors.lookingFor.message}</span>
                  )}
                </span>
                <span>{form.watch("lookingFor")?.length || 0} / 100 minimum</span>
              </div>
            </div>

            {/* What can you offer */}
            <div className="space-y-3">
              <Label htmlFor="canOffer">
                What can you offer to other tenants? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="canOffer"
                {...form.register("canOffer")}
                placeholder="Share what your company can contribute to the workspace community. This could include your expertise, services, resources, or unique perspectives."
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {form.formState.errors.canOffer && (
                    <span className="text-red-500">{form.formState.errors.canOffer.message}</span>
                  )}
                </span>
                <span>{form.watch("canOffer")?.length || 0} / 100 minimum</span>
              </div>
            </div>

            {/* Ideal neighbors */}
            <div className="space-y-3">
              <Label htmlFor="idealNeighbors">
                Describe your ideal neighbors <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="idealNeighbors"
                {...form.register("idealNeighbors")}
                placeholder="What kind of companies or professionals would you most like to work alongside? Consider industry, company size, values, work style, etc."
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {form.formState.errors.idealNeighbors && (
                    <span className="text-red-500">{form.formState.errors.idealNeighbors.message}</span>
                  )}
                </span>
                <span>{form.watch("idealNeighbors")?.length || 0} / 100 minimum</span>
              </div>
            </div>

            {/* Collaboration Interests */}
            <div className="space-y-4">
              <div>
                <Label>
                  Collaboration Interests <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Select all the ways you'd be interested in collaborating with other workspace tenants.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLLABORATION_OPTIONS.map((option) => {
                  const isSelected = selectedInterests.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInterest(option.id)}
                      className={cn(
                        "relative p-4 rounded-lg border-2 text-left transition-all hover:border-pink-300",
                        isSelected
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {option.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-pink-500 text-white rounded-full p-1">
                              <Check className="h-3 w-3" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {form.formState.errors.collaborationInterests && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.collaborationInterests.message}
                </p>
              )}
            </div>

            {/* Selected Summary */}
            {selectedInterests.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Selected Collaboration Interests:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.map((interestId) => {
                    const option = COLLABORATION_OPTIONS.find(opt => opt.id === interestId);
                    return option ? (
                      <span
                        key={interestId}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{option.icon}</span>
                        {option.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/apply/about")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                Continue to Space Selection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
