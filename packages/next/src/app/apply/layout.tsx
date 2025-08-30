import { Button } from "@/components/ui/button";
import { ApplicationProvider } from "@/lib/application-context";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <Building2 className="h-8 w-8 text-pink-600" />
              <span className="text-xl font-bold text-slate-900">WorkspaceMatch</span>
            </Link>
            <div className="text-sm text-slate-600">
              Need help? <Link href="/contact" className="text-pink-600 hover:underline">Contact us</Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ApplicationProvider>
  );
}
