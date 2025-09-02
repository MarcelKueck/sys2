import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Users, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-pink-600" />
            <span className="text-xl font-bold text-slate-900">ShareYourSpace</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/providers" className="text-slate-600 hover:text-slate-900">
              Explore Partners
            </Link>
            <Link href="/success-stories" className="text-slate-600 hover:text-slate-900">
              Success Stories
            </Link>
            <Link href="/auth/signin" className="text-slate-600 hover:text-slate-900">
              Sign In
            </Link>
            <Button asChild>
              <Link href="/apply/basic-info">Find Partners</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Find Your Perfect
            <span className="text-pink-600 block">Collaboration Partner</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect with like-minded companies who share your vision. Build strategic partnerships, 
            collaborate on breakthrough projects, and grow together in shared collaboration spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-pink-600 hover:bg-pink-700" asChild>
              <Link href="/apply/basic-info">
                Join Our Collaboration Network <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/auth/signup?role=space_provider">Host Collaboration Partners</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose Collaboration Partnerships?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>Smart Collaboration Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithm connects companies based on shared values, complementary skills, 
                  and collaboration potential - not just space requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Collaboration Community</CardTitle>
                <CardDescription>
                  Join curated collaboration ecosystems where breakthrough ideas emerge from 
                  strategic partnerships and knowledge sharing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Trusted Collaboration Partners</CardTitle>
                <CardDescription>
                  Connect with established collaboration leaders like Pixida GmbH who prioritize 
                  collaboration value over rental income
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Collaboration Partner?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join hundreds of companies who have found strategic partnerships that accelerate collaboration
          </p>
          <Button size="lg" className="text-lg px-8 bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/apply/basic-info">
              Join Our Collaboration Network <ArrowRight className="ml-2 h-5 w-5" />
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
                <span className="font-bold text-slate-900">ShareYourSpace</span>
              </div>
              <p className="text-slate-600 text-sm">
                Connecting innovative companies through strategic workspace partnerships.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Partnership</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/providers">Explore Partners</Link>
                </li>
                <li>
                  <Link href="/success-stories">Success Stories</Link>
                </li>
                <li>
                  <Link href="/how-partnerships-work">How Partnerships Work</Link>
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
            © 2024 ShareYourSpace. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
