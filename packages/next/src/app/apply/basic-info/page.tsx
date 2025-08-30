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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useApplication } from "@/lib/application-context";
import { APPLICATION_STEPS, TEAM_SIZE_OPTIONS, COMPANY_STAGE_OPTIONS } from "@/lib/constants";
import { ArrowRight, Building2, Eye, EyeOff } from "lucide-react";

const basicInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  name: z.string().min(1, "Your name is required"),
  role: z.string().min(1, "Your role is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  linkedinProfile: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  teamSize: z.string().min(1, "Please select team size"),
  companyStage: z.string().min(1, "Please select company stage"),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

export default function BasicInfoPage() {
  const router = useRouter();
  const { formData, updateBasicInfo } = useApplication();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      ...formData.basicInfo,
      // Ensure select fields have proper default values
      teamSize: formData.basicInfo.teamSize || "",
      companyStage: formData.basicInfo.companyStage || "",
    },
  });

  const onSubmit = (data: BasicInfoFormData) => {
    updateBasicInfo(data);
    router.push("/apply/about");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator currentStep={1} totalSteps={4} steps={APPLICATION_STEPS} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-pink-600" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Let's start with the basics about your company and create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                {...form.register("companyName")}
                placeholder="e.g., TechStart AI"
              />
              {form.formState.errors.companyName && (
                <p className="text-sm text-red-500">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            {/* Personal Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Your full name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">
                  Your Role <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="role"
                  {...form.register("role")}
                  placeholder="e.g., CEO, CTO, Founder"
                />
                {form.formState.errors.role && (
                  <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                )}
              </div>
            </div>

            {/* Account Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="your.email@company.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    placeholder="Create a secure password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Online Presence Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  {...form.register("website")}
                  placeholder="https://your-company.com"
                />
                {form.formState.errors.website && (
                  <p className="text-sm text-red-500">{form.formState.errors.website.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                <Input
                  id="linkedinProfile"
                  {...form.register("linkedinProfile")}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                {form.formState.errors.linkedinProfile && (
                  <p className="text-sm text-red-500">{form.formState.errors.linkedinProfile.message}</p>
                )}
              </div>
            </div>

            {/* Company Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">
                  Team Size <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => form.setValue("teamSize", value)} defaultValue={formData.basicInfo.teamSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.teamSize && (
                  <p className="text-sm text-red-500">{form.formState.errors.teamSize.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyStage">
                  Company Stage <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => form.setValue("companyStage", value)} defaultValue={formData.basicInfo.companyStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_STAGE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.companyStage && (
                  <p className="text-sm text-red-500">{form.formState.errors.companyStage.message}</p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <div>
                <p className="text-sm text-gray-500">
                  Step 1 of 4 - All fields marked with * are required
                </p>
              </div>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                Continue to About Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
