"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useApplication } from "@/lib/application-context";
import { APPLICATION_STEPS, INDUSTRIES, FUNDING_STATUS_OPTIONS, COMMON_TECH_STACK } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Building2, Upload, X, Plus } from "lucide-react";

const aboutBusinessSchema = z.object({
  description: z.string().min(500, "Description must be at least 500 characters"),
  industry: z.string().min(1, "Please select an industry"),
  foundedDate: z.string().min(1, "Please enter founding date"),
  fundingStatus: z.string().min(1, "Please select funding status"),
  currentLocation: z.string().min(1, "Please enter your current location"),
  techStack: z.array(z.string()).min(1, "Please add at least one technology"),
});

type AboutBusinessFormData = z.infer<typeof aboutBusinessSchema>;

export default function AboutBusinessPage() {
  const router = useRouter();
  const { formData, updateAboutBusiness } = useApplication();
  const [techStack, setTechStack] = useState<string[]>(formData.aboutBusiness.techStack || []);
  const [newTech, setNewTech] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const form = useForm<AboutBusinessFormData>({
    resolver: zodResolver(aboutBusinessSchema),
    defaultValues: {
      ...formData.aboutBusiness,
      techStack,
    },
  });

  const addTech = (tech: string) => {
    if (tech && !techStack.includes(tech)) {
      const newStack = [...techStack, tech];
      setTechStack(newStack);
      form.setValue("techStack", newStack);
      setNewTech("");
    }
  };

  const removeTech = (tech: string) => {
    const newStack = techStack.filter(t => t !== tech);
    setTechStack(newStack);
    form.setValue("techStack", newStack);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (uploadedImages.length + files.length <= 4) { // Logo + 3 atmosphere photos
      setUploadedImages(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: AboutBusinessFormData) => {
    updateAboutBusiness({
      ...data,
      techStack,
      companyImages: uploadedImages,
    });
    router.push("/apply/collaboration");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator currentStep={2} totalSteps={4} steps={APPLICATION_STEPS} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-pink-600" />
            About Your Business
          </CardTitle>
          <CardDescription>
            Tell us more about your company, industry, and what makes you unique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Company Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Describe your company, mission, products/services, and what makes you unique. This helps us find the perfect workspace match for your team culture and goals."
                rows={6}
                className="resize-none"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {form.formState.errors.description && (
                    <span className="text-red-500">{form.formState.errors.description.message}</span>
                  )}
                </span>
                <span>{form.watch("description")?.length || 0} / 500 minimum</span>
              </div>
            </div>

            {/* Industry and Founded Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">
                  Industry/Vertical <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => form.setValue("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.industry && (
                  <p className="text-sm text-red-500">{form.formState.errors.industry.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="foundedDate">
                  Founded Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="foundedDate"
                  type="date"
                  {...form.register("foundedDate")}
                />
                {form.formState.errors.foundedDate && (
                  <p className="text-sm text-red-500">{form.formState.errors.foundedDate.message}</p>
                )}
              </div>
            </div>

            {/* Funding Status and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fundingStatus">
                  Funding Status <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => form.setValue("fundingStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding status" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUNDING_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.fundingStatus && (
                  <p className="text-sm text-red-500">{form.formState.errors.fundingStatus.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentLocation">
                  Current Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="currentLocation"
                  {...form.register("currentLocation")}
                  placeholder="e.g., Munich, Germany"
                />
                {form.formState.errors.currentLocation && (
                  <p className="text-sm text-red-500">{form.formState.errors.currentLocation.message}</p>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <Label>
                Tech Stack <span className="text-red-500">*</span>
              </Label>
              
              {/* Selected Technologies */}
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="hover:bg-pink-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add Technology */}
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add a technology (e.g., React, Python, AWS)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech(newTech);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addTech(newTech)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Common Technologies */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Popular technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_TECH_STACK
                    .filter(tech => !techStack.includes(tech))
                    .slice(0, 12)
                    .map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => addTech(tech)}
                        className="text-sm border border-gray-200 hover:border-pink-300 hover:bg-pink-50 px-3 py-1 rounded-full transition-colors"
                      >
                        {tech}
                      </button>
                    ))}
                </div>
              </div>

              {form.formState.errors.techStack && (
                <p className="text-sm text-red-500">{form.formState.errors.techStack.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Company Images</Label>
              <p className="text-sm text-gray-600">
                Upload your company logo and 2-3 photos that show your team atmosphere or workspace.
              </p>

              {/* Upload Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-300 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB each (max 4 images)
                  </p>
                </label>
              </div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/apply/basic-info")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                Continue to Collaboration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
