"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import { Building2, Users, Target, Briefcase } from "lucide-react";

const applicantOnboardingSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  company_stage: z.enum(["idea", "mvp", "growth", "scale"], {
    required_error: "Please select your company stage",
  }),
  team_size: z.number().min(1, "Team size must be at least 1"),
  industry: z.string().min(1, "Please specify your industry"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  description: z.string().min(50, "Description must be at least 50 characters"),
  looking_for: z.string().min(10, "Please describe what you're looking for"),
  can_offer: z.string().min(10, "Please describe what you can offer"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  founded_date: z.string().min(1, "Please specify when your company was founded"),
  funding_status: z.string().min(1, "Please specify your funding status"),
  ideal_neighbors: z.string().min(10, "Please describe your ideal neighbors"),
  collaboration_interests: z.string().min(10, "Please describe your collaboration interests"),
});

type ApplicantOnboardingData = z.infer<typeof applicantOnboardingSchema>;

export default function ApplicantOnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicantOnboardingData>({
    resolver: zodResolver(applicantOnboardingSchema),
  });

  const onSubmit = async (data: ApplicantOnboardingData) => {
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No user found");
      }

      // Check if profile exists, create if not
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!existingProfile && profileCheckError?.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            role: user.user_metadata?.role || 'applicant'
          });

        if (createProfileError) {
          throw new Error(`Failed to create profile: ${createProfileError.message}`);
        }
      }

      // Insert applicant data
      const { error: insertError } = await supabase.from("applicants").insert({
        id: user.id,
        company_name: data.company_name,
        company_stage: data.company_stage,
        team_size: data.team_size,
        industry: data.industry,
        website: data.website || null,
        description: data.description,
        looking_for: data.looking_for,
        can_offer: data.can_offer,
        linkedin: data.linkedin || null,
        founded_date: data.founded_date,
        funding_status: data.funding_status,
        ideal_neighbors: data.ideal_neighbors,
        collaboration_interests: [data.collaboration_interests],
      });

      if (insertError) {
        throw new Error(`Failed to create profile: ${insertError.message}`);
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating applicant profile:", error);
      setError(error instanceof Error ? error.message : "Failed to create profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-12 w-12 text-pink-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome! Let's set up your profile</h1>
            <p className="text-gray-600 mt-2">
              Tell us about your company and what you're looking for to get started.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-pink-600" />
                Company Information
              </CardTitle>
              <CardDescription>
                Help us understand your company and find the perfect workspace matches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      {...register("company_name")}
                      placeholder="e.g., Acme Corp"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.company_name && (
                      <p className="text-sm text-red-600">{errors.company_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company_stage">Company Stage *</Label>
                    <select
                      id="company_stage"
                      {...register("company_stage")}
                      className="flex h-10 w-full rounded-md border border-pink-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select stage</option>
                      <option value="idea">Idea</option>
                      <option value="mvp">MVP</option>
                      <option value="growth">Growth</option>
                      <option value="scale">Scale</option>
                    </select>
                    {errors.company_stage && (
                      <p className="text-sm text-red-600">{errors.company_stage.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="team_size">Team Size *</Label>
                    <Input
                      id="team_size"
                      type="number"
                      {...register("team_size", { valueAsNumber: true })}
                      placeholder="e.g., 10"
                      min="1"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.team_size && (
                      <p className="text-sm text-red-600">{errors.team_size.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Input
                      id="industry"
                      {...register("industry")}
                      placeholder="e.g., Technology, Healthcare"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.industry && (
                      <p className="text-sm text-red-600">{errors.industry.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      {...register("website")}
                      placeholder="https://www.example.com"
                      type="url"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.website && (
                      <p className="text-sm text-red-600">{errors.website.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Tell us about your company, what you do, your mission..."
                    className="min-h-[120px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="looking_for">What are you looking for? *</Label>
                  <Textarea
                    id="looking_for"
                    {...register("looking_for")}
                    placeholder="Describe the type of workspace, amenities, or partnership you're seeking..."
                    className="min-h-[100px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.looking_for && (
                    <p className="text-sm text-red-600">{errors.looking_for.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="can_offer">What can you offer? *</Label>
                  <Textarea
                    id="can_offer"
                    {...register("can_offer")}
                    placeholder="Describe what you can offer to potential partners or workspace collaborators..."
                    className="min-h-[100px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.can_offer && (
                    <p className="text-sm text-red-600">{errors.can_offer.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      {...register("linkedin")}
                      placeholder="https://linkedin.com/company/yourcompany"
                      type="url"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.linkedin && (
                      <p className="text-sm text-red-600">{errors.linkedin.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founded_date">Founded Date *</Label>
                    <Input
                      id="founded_date"
                      {...register("founded_date")}
                      type="date"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.founded_date && (
                      <p className="text-sm text-red-600">{errors.founded_date.message}</p>
                    )}
                  </div>
                </div>

                  <div className="space-y-2">
                    <Label htmlFor="funding_status">Funding Status *</Label>
                    <Input
                      id="funding_status"
                      {...register("funding_status")}
                      placeholder="e.g., Bootstrapped, Seed, Series A, VC-backed"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    {errors.funding_status && (
                      <p className="text-sm text-red-600">{errors.funding_status.message}</p>
                    )}
                  </div>                <div className="space-y-2">
                  <Label htmlFor="ideal_neighbors">Ideal Neighbors *</Label>
                  <Textarea
                    id="ideal_neighbors"
                    {...register("ideal_neighbors")}
                    placeholder="Describe the type of companies or people you'd like to work alongside..."
                    className="min-h-[100px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.ideal_neighbors && (
                    <p className="text-sm text-red-600">{errors.ideal_neighbors.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collaboration_interests">Collaboration Interests *</Label>
                  <Textarea
                    id="collaboration_interests"
                    {...register("collaboration_interests")}
                    placeholder="What kind of partnerships or collaborations are you interested in?"
                    className="min-h-[100px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.collaboration_interests && (
                    <p className="text-sm text-red-600">{errors.collaboration_interests.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Setting up your profile..." : "Complete Setup & Continue"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              You can always update this information later in your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
