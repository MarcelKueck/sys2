import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

async function createAdmin(formData: FormData) {
  "use server";
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const adminSecret = formData.get("adminSecret") as string;
  
  // Simple admin secret check (in production, use environment variable)
  if (adminSecret !== "ADMIN_SECRET_2024") {
    console.error("Invalid admin secret");
    return;
  }
  
  const supabase = await createClient();
  
  // Create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (authError) {
    console.error("Auth error:", authError.message);
    return;
  }
  
  if (authData.user) {
    // Update the profile to admin role
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", authData.user.id);
    
    if (profileError) {
      console.error("Profile update error:", profileError);
      return;
    }
  }
  
  redirect("/admin");
}

export default function AdminSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Admin Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Set up administrative access for the workspace matching platform
          </p>
        </div>

        <form action={createAdmin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@workspacematching.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter a secure password"
            />
          </div>

          <div>
            <Label htmlFor="adminSecret">Admin Secret</Label>
            <Input
              id="adminSecret"
              name="adminSecret"
              type="password"
              required
              placeholder="Enter admin secret key"
            />
            <p className="mt-1 text-xs text-gray-500">
              Contact system administrator for the admin secret key
            </p>
          </div>

          <Button type="submit" className="w-full">
            Create Admin Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an admin account?{" "}
            <a href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
