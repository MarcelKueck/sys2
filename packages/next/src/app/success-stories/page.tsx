"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Building2, 
  Star, 
  ArrowRight,
  Lightbulb,
  Target,
  TrendingUp,
  Award,
  Users,
  Handshake,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for success stories
const successStories = [
  {
    id: "pixida-motionai",
    title: "Pixida + MotionAI: Revolutionizing Autonomous Mobility",
    partnerA: {
      name: "Pixida GmbH",
      role: "Collaboration Partner & Host",
      logo: "/api/placeholder/80/40?text=Pixida"
    },
    partnerB: {
      name: "MotionAI",
      role: "AI Startup Partner",
      logo: "/api/placeholder/80/40?text=MotionAI"
    },
    image: "/api/placeholder/600/400?text=Autonomous+Vehicle+Testing",
    duration: "18 months",
    outcome: "Joint Patent Filed",
    description: "A breakthrough collaboration between automotive collaboration leader Pixida and AI startup MotionAI resulted in groundbreaking autonomous vehicle perception technology.",
    achievements: [
      "3 joint patents filed for sensor fusion technology",
      "€2.1M in joint funding secured from EU Collaboration Program",
      "50% faster time-to-market for both companies",
      "Award-winning prototype at Munich AutoTech Summit 2024"
    ],
    testimonials: [
      {
        quote: "Working alongside Pixida's automotive expertise accelerated our AI development by years. The daily collaboration in their Collaboration Lab was invaluable.",
        author: "Dr. Sarah Chen",
        role: "CTO, MotionAI"
      },
      {
        quote: "MotionAI brought cutting-edge AI capabilities that perfectly complemented our automotive knowledge. This is exactly the collaboration magic we envisioned.",
        author: "Klaus Weber",
        role: "Collaboration Director, Pixida GmbH"
      }
    ],
    tags: ["AI/ML", "Automotive", "Patents", "EU Funding"],
    impact: {
      collaboration: 95,
      business: 88,
      growth: 92
    }
  },
  {
    id: "pixida-greenfactory",
    title: "Pixida + GreenFactory: Sustainable Manufacturing Revolution",
    partnerA: {
      name: "Pixida GmbH",
      role: "Digital Transformation Partner",
      logo: "/api/placeholder/80/40?text=Pixida"
    },
    partnerB: {
      name: "GreenFactory",
      role: "Sustainability Innovator",
      logo: "/api/placeholder/80/40?text=GreenFactory"
    },
    image: "/api/placeholder/600/400?text=Smart+Factory+IoT",
    duration: "24 months",
    outcome: "Industry Standard Created",
    description: "Combining Pixida's manufacturing digitization expertise with GreenFactory's sustainability collaborations to create the industry's first carbon-neutral smart factory framework.",
    achievements: [
      "40% reduction in manufacturing carbon footprint",
      "New industry standard adopted by 12 German manufacturers",
      "€5M in cost savings achieved across pilot implementations",
      "Winner of German Sustainability Collaboration Award 2024"
    ],
    testimonials: [
      {
        quote: "The synergy was immediate. Pixida's deep manufacturing knowledge combined with our sustainability tech created something neither could achieve alone.",
        author: "Maria Schmidt",
        role: "Founder & CEO, GreenFactory"
      }
    ],
    tags: ["Sustainability", "Manufacturing", "IoT", "Industry 4.0"],
    impact: {
      collaboration: 90,
      business: 85,
      growth: 88
    }
  }
];

const upcomingOpportunities = [
  {
    provider: "Pixida GmbH",
    title: "Seeking Fintech Partners for Automotive Payment Solutions",
    description: "Looking for fintech innovators to collaborate on next-gen in-vehicle payment systems",
    tags: ["Fintech", "Automotive", "Payments"],
    deadline: "Q1 2025"
  },
  {
    provider: "Pixida GmbH", 
    title: "IoT Security Collaboration Opportunity",
    description: "Partnership opportunity for cybersecurity companies specializing in IoT device protection",
    tags: ["Cybersecurity", "IoT", "Manufacturing"],
    deadline: "Q2 2025"
  }
];

export default function SuccessStoriesPage() {
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
              <Award className="h-6 w-6 text-pink-600" />
              <span className="text-lg font-semibold text-slate-900">Success Stories</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/providers" className="text-slate-600 hover:text-slate-900">
              Explore Partners
            </Link>
            <Link href="/auth/signin" className="text-slate-600 hover:text-slate-900">
              Sign In
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
            Collaboration Partnership Success Stories
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover how strategic workspace partnerships are creating breakthrough collaborations, 
            accelerating growth, and transforming industries. These are the results when the 
            right partners find each other.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="py-6">
              <div className="text-3xl font-bold text-pink-600 mb-2">€8.2M</div>
              <div className="text-sm text-slate-600">Combined Funding Raised</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="py-6">
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <div className="text-sm text-slate-600">Patents Filed Together</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="py-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-slate-600">Partner Satisfaction</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="py-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-sm text-slate-600">Industry Awards Won</div>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="space-y-12">
          {successStories.map((story, index) => (
            <Card key={story.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className={`md:flex ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <div className="md:w-1/2 relative">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600/90 text-white">
                      <Award className="h-3 w-3 mr-1" />
                      {story.outcome}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Image
                          src={story.partnerA.logo}
                          alt={story.partnerA.name}
                          width={60}
                          height={30}
                          className="bg-white p-1 rounded"
                        />
                        <Handshake className="h-6 w-6 text-pink-600" />
                        <Image
                          src={story.partnerB.logo}
                          alt={story.partnerB.name}
                          width={60}
                          height={30}
                          className="bg-white p-1 rounded"
                        />
                      </div>
                      <div className="text-xs text-slate-600 text-center">
                        Partnership Duration: {story.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      {story.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {story.description}
                    </p>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-pink-600 mb-1">
                        {story.impact.collaboration}%
                      </div>
                      <div className="text-xs text-slate-600">Collaboration Score</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600 mb-1">
                        {story.impact.business}%
                      </div>
                      <div className="text-xs text-slate-600">Business Impact</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600 mb-1">
                        {story.impact.growth}%
                      </div>
                      <div className="text-xs text-slate-600">Growth Acceleration</div>
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {story.achievements.slice(0, 3).map((achievement, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                          <Zap className="h-4 w-4 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial */}
                  {story.testimonials[0] && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                      <blockquote className="text-sm text-slate-700 italic mb-2">
                        "{story.testimonials[0].quote}"
                      </blockquote>
                      <div className="text-xs text-slate-600">
                        — {story.testimonials[0].author}, {story.testimonials[0].role}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Upcoming Opportunities */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Current Partnership Opportunities
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {upcomingOpportunities.map((opportunity, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{opportunity.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-600">
                        by {opportunity.provider}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {opportunity.deadline}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">
                    {opportunity.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/apply/basic-info">
                      Apply for Partnership
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-pink-600 to-purple-600 border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-pink-100 mb-6 text-lg max-w-2xl mx-auto">
                Join our collaboration network and find the strategic partners who will accelerate 
                your breakthrough projects and business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/apply/basic-info">
                    Find Your Collaboration Partner
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-pink-600" asChild>
                  <Link href="/providers">
                    Explore All Partners
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
