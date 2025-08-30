import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-pink-600" />
            <span className="text-xl font-bold text-slate-900">WorkspaceMatch</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/spaces" className="text-slate-600 hover:text-slate-900">
              Browse Spaces
            </Link>
            <Link href="/providers" className="text-slate-600 hover:text-slate-900">
              For Providers
            </Link>
            <Link href="/auth/signin" className="text-slate-600 hover:text-slate-900">
              Sign In
            </Link>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Find Your Perfect
            <span className="text-pink-600 block">Workspace Match</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect innovative companies with ideal workspace partners. Discover spaces, build
            communities, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/signup?role=applicant">
                Find a Space <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/auth/signup?role=space_provider">List Your Space</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose WorkspaceMatch?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithm matches companies based on culture, values, and collaboration
                  potential
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Community Focus</CardTitle>
                <CardDescription>
                  Build meaningful connections with like-minded companies and professionals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Premium Spaces</CardTitle>
                <CardDescription>
                  Access to high-quality workspaces from trusted providers like Pixida GmbH
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join hundreds of companies who have found their ideal workspace partners
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/auth/signup">
              Start Matching Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-pink-600" />
                <span className="font-bold text-slate-900">WorkspaceMatch</span>
              </div>
              <p className="text-slate-600 text-sm">
                Connecting innovative companies with perfect workspace solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/spaces">Browse Spaces</Link>
                </li>
                <li>
                  <Link href="/providers">For Providers</Link>
                </li>
                <li>
                  <Link href="/how-it-works">How It Works</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
                <li>
                  <Link href="/cookies">Cookies</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-slate-600">
            © 2024 WorkspaceMatch. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
