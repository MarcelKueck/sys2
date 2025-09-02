"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Building2, 
  ArrowRight,
  Search,
  Users,
  Handshake,
  TrendingUp,
  Star,
  CheckCircle,
  MessageSquare,
  FileText,
  Award
} from "lucide-react";
import Link from "next/link";

export default function HowPartnershipsWorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Handshake className="h-6 w-6 text-pink-600" />
              <span className="text-lg font-semibold text-slate-900">How Partnerships Work</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/providers" className="text-slate-600 hover:text-slate-900">
              Explore Partners
            </Link>
            <Link href="/success-stories" className="text-slate-600 hover:text-slate-900">
              Success Stories
            </Link>
            <Button size="sm" asChild>
              <Link href="/apply/basic-info">Find Partners</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
            How Collaboration Partnerships Work
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our platform connects breakthrough companies with established collaboration leaders through 
            strategic workspace partnerships. Here's how we create meaningful collaborations that 
            accelerate growth and drive success.
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
            The Partnership Process
          </h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <CardHeader className="pl-8">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-pink-600" />
                  Discovery & Application
                </CardTitle>
                <CardDescription>
                  Companies explore collaboration partners and submit detailed partnership applications
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Browse collaboration partner profiles and collaboration opportunities</li>
                  <li>• Complete comprehensive company and collaboration profile</li>
                  <li>• Select preferred partnership environments based on collaboration goals</li>
                  <li>• Submit partnership application with collaboration interests</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <CardHeader className="pl-8">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-pink-600" />
                  AI-Powered Matching & Review
                </CardTitle>
                <CardDescription>
                  Our algorithm analyzes collaboration potential and collaboration partners review applications
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• AI matching based on industry alignment, values, and collaboration potential</li>
                  <li>• Collaboration partners review applications for strategic fit</li>
                  <li>• Background verification and reference checks conducted</li>
                  <li>• Shortlisted companies invited for partnership discussions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <CardHeader className="pl-8">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-pink-600" />
                  Partnership Discussions
                </CardTitle>
                <CardDescription>
                  Structured conversations to align on collaboration goals and partnership structure
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Initial partnership discovery calls with collaboration partners</li>
                  <li>• Collaborative goal setting and expectation alignment</li>
                  <li>• Workspace tour and partnership environment introduction</li>
                  <li>• Terms discussion including collaboration commitments</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <CardHeader className="pl-8">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-pink-600" />
                  Partnership Agreement
                </CardTitle>
                <CardDescription>
                  Formalize the strategic partnership with clear collaboration frameworks
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Partnership agreement outlining collaboration commitments</li>
                  <li>• Workspace access terms and shared resource arrangements</li>
                  <li>• IP collaboration guidelines and joint project frameworks</li>
                  <li>• Performance metrics and partnership success indicators</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <CardHeader className="pl-8">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-pink-600" />
                  Collaborative Partnership
                </CardTitle>
                <CardDescription>
                  Begin working together to create breakthrough collaborations and accelerate growth
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Onboarding into collaboration partner's workspace and community</li>
                  <li>• Regular collaboration sessions and joint project initiation</li>
                  <li>• Access to partner networks, expertise, and resources</li>
                  <li>• Continuous partnership optimization and success tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Principles */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Our Partnership Principles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-pink-600" />
                  Collaboration Over Transaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We prioritize strategic value and collaboration potential over simple rental income. 
                  The right partner creates exponentially more value than the highest rent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-600" />
                  Curated Collaboration Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Collaboration partners carefully select companies that align with their values 
                  and can contribute to a thriving collaborative ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-pink-600" />
                  Mutual Success Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Partnerships are structured for mutual benefit, with clear collaboration 
                  commitments and shared success metrics that drive collaboration forward.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600" />
                  Quality Assurance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Rigorous vetting ensures only serious, committed companies join our 
                  collaboration network, maintaining high standards for all partnerships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Expectations */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle>Partnership Timeline</CardTitle>
              <CardDescription>
                Typical timeline from application to active collaboration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-slate-700">Week 1-2</div>
                  <div className="text-sm text-slate-600">Application review and AI matching</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-slate-700">Week 3-4</div>
                  <div className="text-sm text-slate-600">Partnership discussions and workspace tours</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-slate-700">Week 5-6</div>
                  <div className="text-sm text-slate-600">Agreement finalization and onboarding preparation</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-slate-700">Week 7+</div>
                  <div className="text-sm text-slate-600">Active collaboration and partnership projects begin</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-pink-600 to-purple-600 border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Collaboration Partnership?
              </h2>
              <p className="text-pink-100 mb-6 text-lg max-w-2xl mx-auto">
                Join our network of breakthrough companies and collaboration leaders who are 
                creating the future through strategic collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/apply/basic-info">
                    Start Partnership Application
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-pink-600" asChild>
                  <Link href="/providers">
                    Explore Collaboration Partners
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
