import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Building2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Get applicant data for header display
  let applicantData = null;
  if (profile?.role === "applicant") {
    const { data } = await supabase
      .from("applicants")
      .select("company_name")
      .eq("id", user.id)
      .single();
    applicantData = data;
  }

  const handleSignOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">WorkspaceMatch</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {applicantData?.company_name || user.email?.split("@")[0]}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {profile?.role === "space_provider" ? "Provider" : "Applicant"}
              </span>
              <form action={handleSignOut}>
                <Button variant="ghost" size="sm" type="submit">
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/dashboard"
              className="py-4 px-2 border-b-2 border-blue-500 text-blue-600 font-medium text-sm"
            >
              Dashboard
            </Link>
            {profile?.role === "space_provider" ? (
              <>
                <Link
                  href="/dashboard/spaces"
                  className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm"
                >
                  My Spaces
                </Link>
                <Link
                  href="/dashboard/applications"
                  className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm"
                >
                  Applications
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/browse"
                  className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm"
                >
                  Browse Spaces
                </Link>
                <Link
                  href="/dashboard/applications"
                  className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm"
                >
                  My Applications
                </Link>
              </>
            )}
            <Link
              href="/dashboard/profile"
              className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">Help Center</a>
              <a href="#" className="hover:text-gray-700">Contact Support</a>
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            </div>
            <div className="mt-4 sm:mt-0 text-sm text-gray-500">
              © 2025 WorkspaceMatch. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
