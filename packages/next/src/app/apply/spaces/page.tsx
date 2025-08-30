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
import { APPLICATION_STEPS } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Building2, Check, MapPin, Users, Star, Wifi, Coffee, Car, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

const spaceSelectionSchema = z.object({
  selectedSpaces: z.array(z.string()).min(1, "Please select at least one space"),
  additionalNotes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

type SpaceSelectionFormData = z.infer<typeof spaceSelectionSchema>;

// Mock data for available spaces (in real app this would come from API)
const availableSpaces = [
  {
    id: "pixida-innovation-lab",
    name: "Innovation Lab Munich",
    provider: "Pixida GmbH",
    location: "Munich, Germany",
    capacity: "50+ professionals",
    matchScore: 95,
    description: "State-of-the-art innovation space designed for cutting-edge technology companies and startups.",
    amenities: ["High-speed WiFi", "Coffee & Kitchen", "Parking", "Fitness Center", "Meeting Rooms", "Event Space"],
    highlights: [
      "Perfect for AI/ML and tech companies",
      "Collaborative innovation environment",
      "Access to Pixida's tech expertise",
      "Regular networking events"
    ],
    images: ["/api/placeholder/400/300"],
    priceRange: "€€€",
    availability: "Available now",
  },
  {
    id: "pixida-creative-hub",
    name: "Creative Hub Munich",
    provider: "Pixida GmbH",
    location: "Munich, Germany",
    capacity: "30+ professionals",
    matchScore: 87,
    description: "Creative workspace focused on design, innovation, and collaborative projects.",
    amenities: ["High-speed WiFi", "Coffee & Kitchen", "Design Studio", "3D Printing", "Meeting Rooms"],
    highlights: [
      "Ideal for design and creative teams",
      "State-of-the-art design tools",
      "Cross-disciplinary collaboration",
      "Regular creative workshops"
    ],
    images: ["/api/placeholder/400/300"],
    priceRange: "€€",
    availability: "Available Q2 2024",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  "High-speed WiFi": <Wifi className="h-4 w-4" />,
  "Coffee & Kitchen": <Coffee className="h-4 w-4" />,
  "Parking": <Car className="h-4 w-4" />,
  "Fitness Center": <Dumbbell className="h-4 w-4" />,
  "Meeting Rooms": <Users className="h-4 w-4" />,
  "Event Space": <Building2 className="h-4 w-4" />,
  "Design Studio": <Building2 className="h-4 w-4" />,
  "3D Printing": <Building2 className="h-4 w-4" />,
};

export default function SpaceSelectionPage() {
  const router = useRouter();
  const { formData, updateSpaceSelection } = useApplication();
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(
    formData.spaceSelection.selectedSpaces || []
  );
  const [priorities, setPriorities] = useState<Record<string, number>>(
    formData.spaceSelection.priorities || {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SpaceSelectionFormData>({
    resolver: zodResolver(spaceSelectionSchema),
    defaultValues: {
      ...formData.spaceSelection,
      selectedSpaces,
    },
  });

  const toggleSpaceSelection = (spaceId: string) => {
    const newSelection = selectedSpaces.includes(spaceId)
      ? selectedSpaces.filter(id => id !== spaceId)
      : [...selectedSpaces, spaceId];
    
    setSelectedSpaces(newSelection);
    form.setValue("selectedSpaces", newSelection);
  };

  const setPriority = (spaceId: string, priority: number) => {
    const newPriorities = { ...priorities, [spaceId]: priority };
    setPriorities(newPriorities);
  };

  const submitApplication = async (data: SpaceSelectionFormData) => {
    setIsSubmitting(true);
    
    try {
      // Update form data
      updateSpaceSelection({
        ...data,
        selectedSpaces,
        priorities,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirect to confirmation page
      router.push("/apply/confirmation");
    } catch (error) {
      console.error("Failed to submit application:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator currentStep={4} totalSteps={4} steps={APPLICATION_STEPS} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-pink-600" />
            Space Selection
          </CardTitle>
          <CardDescription>
            Choose the workspaces you're interested in. We'll prioritize your application based on match scores and your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(submitApplication)} className="space-y-8">
            {/* Available Spaces */}
            <div className="space-y-6">
              <div>
                <Label>Available Spaces</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Select one or more spaces you'd like to apply for. Match scores are based on your profile.
                </p>
              </div>

              {availableSpaces.map((space) => {
                const isSelected = selectedSpaces.includes(space.id);
                const priority = priorities[space.id] || 0;

                return (
                  <div
                    key={space.id}
                    className={cn(
                      "relative border-2 rounded-lg p-6 transition-all cursor-pointer",
                      isSelected
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"
                    )}
                    onClick={() => toggleSpaceSelection(space.id)}
                  >
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-pink-500 text-white rounded-full p-2">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    )}

                    {/* Match Score */}
                    <div className="absolute top-4 right-16">
                      <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        <Star className="h-3 w-3 fill-current" />
                        {space.matchScore}% match
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Space Image */}
                      <div className="lg:col-span-1">
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                          <Building2 className="h-12 w-12 text-gray-400" />
                        </div>
                      </div>

                      {/* Space Details */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {space.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{space.provider}</p>
                          <p className="text-gray-700">{space.description}</p>
                        </div>

                        {/* Location and Capacity */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {space.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {space.capacity}
                          </div>
                          <div className="font-medium text-green-600">
                            {space.availability}
                          </div>
                        </div>

                        {/* Amenities */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {space.amenities.map((amenity) => (
                              <div
                                key={amenity}
                                className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                              >
                                {amenityIcons[amenity] || <Building2 className="h-4 w-4" />}
                                {amenity}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Why it's a great match</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {space.highlights.map((highlight, index) => (
                              <li key={index}>{highlight}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Priority Selection (if selected) */}
                        {isSelected && (
                          <div className="border-t pt-4 mt-4">
                            <Label className="text-sm font-medium">Priority Ranking</Label>
                            <div className="flex gap-2 mt-2">
                              {[1, 2, 3].map((level) => (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPriority(space.id, level);
                                  }}
                                  className={cn(
                                    "px-3 py-1 rounded-full text-sm transition-colors",
                                    priority === level
                                      ? "bg-pink-500 text-white"
                                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                  )}
                                >
                                  {level === 1 ? "1st Choice" : level === 2 ? "2nd Choice" : "3rd Choice"}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {form.formState.errors.selectedSpaces && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.selectedSpaces.message}
                </p>
              )}
            </div>

            {/* Additional Notes */}
            <div className="space-y-3">
              <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
              <Textarea
                id="additionalNotes"
                {...form.register("additionalNotes")}
                placeholder="Any additional information you'd like to share about your space preferences or requirements..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  {...form.register("termsAccepted")}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor="termsAccepted" className="text-sm">
                    I accept the{" "}
                    <a href="/terms" className="text-pink-600 hover:underline" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-pink-600 hover:underline" target="_blank">
                      Privacy Policy
                    </a>
                    . I understand that my application will be reviewed by the selected workspace providers.
                  </Label>
                  {form.formState.errors.termsAccepted && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.termsAccepted.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Spaces Summary */}
            {selectedSpaces.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Selected Spaces ({selectedSpaces.length})
                </h4>
                <div className="space-y-2">
                  {selectedSpaces.map((spaceId) => {
                    const space = availableSpaces.find(s => s.id === spaceId);
                    const priority = priorities[spaceId];
                    return space ? (
                      <div key={spaceId} className="flex justify-between items-center">
                        <span className="text-blue-800 font-medium">{space.name}</span>
                        {priority && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {priority === 1 ? "1st Choice" : priority === 2 ? "2nd Choice" : "3rd Choice"}
                          </span>
                        )}
                      </div>
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
                onClick={() => router.push("/apply/collaboration")}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button 
                type="submit" 
                className="bg-pink-600 hover:bg-pink-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
