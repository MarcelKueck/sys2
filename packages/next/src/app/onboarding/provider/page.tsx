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

const providerOnboardingSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  team_size: z.number().min(1, "Team size must be at least 1"),
  founded_year: z.number().min(1800, "Please enter a valid founding year"),
  industry_focus: z.string().min(1, "Please specify your industry focus"),
  looking_for: z.string().min(10, "Please describe what you're looking for"),
  offers: z.string().min(10, "Please describe what you offer"),
  values: z.string().min(10, "Please describe your company values"),
});

type ProviderOnboardingData = z.infer<typeof providerOnboardingSchema>;

export default function ProviderOnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderOnboardingData>({
    resolver: zodResolver(providerOnboardingSchema),
  });

  const onSubmit = async (data: ProviderOnboardingData) => {
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      // Insert profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email || "",
        role: "space_provider",
      });

      if (profileError && profileError.code !== "23505") {
        // Ignore duplicate key error
        throw profileError;
      }

      // Insert space provider
      const { error: providerError } = await supabase.from("space_providers").insert({
        profile_id: user.id,
        company_name: data.company_name,
        tagline: data.tagline,
        description: data.description,
        team_size: data.team_size,
        founded_year: data.founded_year,
        industry_focus: data.industry_focus.split(",").map((item) => item.trim()),
        looking_for: data.looking_for.split(",").map((item) => item.trim()),
        offers: data.offers.split(",").map((item) => item.trim()),
        values: data.values.split(",").map((item) => item.trim()),
      });

      if (providerError) throw providerError;

      router.push("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome to WorkspaceMatch!</h1>
          <p className="text-slate-600 mt-2">Let's set up your space provider profile</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Tell us about your company and what you're looking for in workspace partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    placeholder="e.g., Pixida GmbH"
                    {...register("company_name")}
                  />
                  {errors.company_name && (
                    <p className="text-sm text-red-600">{errors.company_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="e.g., Innovation through Technology"
                    {...register("tagline")}
                  />
                  {errors.tagline && (
                    <p className="text-sm text-red-600">{errors.tagline.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your company, mission, and culture..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team_size">Team Size</Label>
                  <Input
                    id="team_size"
                    type="number"
                    placeholder="150"
                    {...register("team_size", { valueAsNumber: true })}
                  />
                  {errors.team_size && (
                    <p className="text-sm text-red-600">{errors.team_size.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded_year">Founded Year</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    placeholder="2012"
                    {...register("founded_year", { valueAsNumber: true })}
                  />
                  {errors.founded_year && (
                    <p className="text-sm text-red-600">{errors.founded_year.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry_focus">Industry Focus</Label>
                <Input
                  id="industry_focus"
                  placeholder="Technology, Automotive, IoT, AI/ML (comma separated)"
                  {...register("industry_focus")}
                />
                {errors.industry_focus && (
                  <p className="text-sm text-red-600">{errors.industry_focus.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="looking_for">What are you looking for in workspace partners?</Label>
                <Textarea
                  id="looking_for"
                  rows={3}
                  placeholder="Innovative startups, Tech companies, Digital agencies (comma separated)"
                  {...register("looking_for")}
                />
                {errors.looking_for && (
                  <p className="text-sm text-red-600">{errors.looking_for.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="offers">What do you offer to workspace partners?</Label>
                <Textarea
                  id="offers"
                  rows={3}
                  placeholder="Mentorship, Technical expertise, Network access, Funding connections (comma separated)"
                  {...register("offers")}
                />
                {errors.offers && <p className="text-sm text-red-600">{errors.offers.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="values">Company Values</Label>
                <Textarea
                  id="values"
                  rows={3}
                  placeholder="Innovation, Collaboration, Excellence, Sustainability (comma separated)"
                  {...register("values")}
                />
                {errors.values && <p className="text-sm text-red-600">{errors.values.message}</p>}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Setting up your profile..." : "Complete Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
