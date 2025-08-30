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
              <Building2 className="h-8 w-8 text-pink-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">WorkspaceMatch</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
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
              className="py-4 px-2 border-b-2 border-pink-500 text-pink-600 font-medium text-sm"
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
    </div>
  );
}
