"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Building2,
  Star,
  ArrowRight,
  Globe,
  Award,
  Calendar,
  Target
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for providers - in real app this would come from API
const allProviders = [
  {
    id: "pixida",
    slug: "pixida",
    companyName: "Pixida GmbH",
    tagline: "Where Collaboration Meets Mittelstand Excellence",
    logo: "/api/placeholder/200/100?text=Pixida+Logo",
    heroImage: "/api/placeholder/800/400?text=Pixida+Office",
    location: "Munich, Germany",
    founded: 2016,
    teamSize: "200+",
    industry: ["Digital Transformation", "AI/ML", "Automotive", "Manufacturing"],
    description: "Leading collaboration consultancy specializing in digital transformation for automotive and manufacturing industries. We partner with breakthrough companies to accelerate collaboration through shared expertise, resources, and collaborative workspace environments.",
    values: ["Collaboration", "Partnership", "Trust", "Growth", "Excellence"],
    lookingFor: [
      "AI/ML startups in mobility or manufacturing",
      "IoT and sensor technology companies", 
      "Digital transformation consultancies",
      "Sustainable tech innovators"
    ],
    offers: [
      "Access to automotive industry network and key decision makers",
      "Technical expertise sharing and collaborative R&D projects", 
      "Joint patent development and IP collaboration opportunities",
      "Shared collaboration lab facilities with cutting-edge equipment",
      "Co-marketing and go-to-market partnership opportunities",
      "Access to Pixida's 200+ client network for pilot projects"
    ],
    availableSpaces: 3,
    totalCapacity: "40+ people",
    priceRange: "€1,200 - €2,800/month",
    rating: 4.9,
    reviewCount: 47,
    verified: true,
    highlights: [
      "200+ Successful Collaboration Partnerships", 
      "€15M+ in Joint Funding Secured with Partners",
      "12 Patents Co-developed with Workspace Partners",
      "German Engineering Excellence & Mittelstand Values"
    ],
    collaborationScore: 98,
    responseTime: "< 24 hours",
    acceptanceRate: "85%"
  },
  // Additional providers can be added here as the platform grows
];

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredProviders = allProviders.filter(provider => {
    const matchesSearch = provider.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.industry.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === "all" || 
                           provider.industry.some(ind => ind.toLowerCase().includes(selectedIndustry.toLowerCase()));
    
    const matchesLocation = selectedLocation === "all" || 
                           provider.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesIndustry && matchesLocation;
  });

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
              <Building2 className="h-6 w-6 text-pink-600" />
              <span className="text-lg font-semibold text-slate-900">Collaboration Partners</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/success-stories" className="text-slate-600 hover:text-slate-900">
              Success Stories
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted Collaboration Partners
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with established collaboration leaders who prioritize strategic partnerships 
            over simple transactions. Find partners who share your vision and can accelerate 
            your breakthrough projects through collaboration.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="h-5 w-5 mr-2" />
              Find Your Perfect Collaboration Partner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="search"
                    placeholder="Search companies, industries, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="industry">Industry Focus</Label>
                <select
                  id="industry"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Industries</option>
                  <option value="automotive">Automotive</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="ai">AI/ML</option>
                  <option value="digital">Digital Transformation</option>
                </select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Locations</option>
                  <option value="munich">Munich</option>
                  <option value="berlin">Berlin</option>
                  <option value="hamburg">Hamburg</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredProviders.length} collaboration partner{filteredProviders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Providers Grid */}
        <div className="space-y-8">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="md:flex">
                {/* Left side - Image */}
                <div className="md:w-1/3 relative">
                  <Image
                    src={provider.heroImage}
                    alt={`${provider.companyName} office`}
                    width={400}
                    height={300}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    {provider.verified && (
                      <Badge className="bg-green-600/90 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Image
                      src={provider.logo}
                      alt={`${provider.companyName} logo`}
                      width={80}
                      height={40}
                      className="bg-white/90 p-2 rounded"
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {provider.companyName}
                      </h2>
                      <p className="text-lg text-pink-600 font-medium mb-3">
                        {provider.tagline}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {provider.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Founded {provider.founded}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {provider.teamSize} employees
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {provider.rating} ({provider.reviewCount} reviews)
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {provider.description}
                  </p>

                  {/* Industry Tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Industry Focus</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.industry.map((industry) => (
                        <Badge key={industry} variant="outline" className="text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600 mb-1">
                        {provider.availableSpaces}
                      </div>
                      <div className="text-xs text-slate-600">Available Spaces</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {provider.collaborationScore}%
                      </div>
                      <div className="text-xs text-slate-600">Collaboration Score</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600 mb-1">
                        {provider.responseTime}
                      </div>
                      <div className="text-xs text-slate-600">Response Time</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {provider.acceptanceRate}
                      </div>
                      <div className="text-xs text-slate-600">Acceptance Rate</div>
                    </div>
                  </div>

                  {/* What they're looking for */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Looking For
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {provider.lookingFor.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-600 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                      {provider.lookingFor.length > 2 && (
                        <li className="text-xs text-slate-500 ml-4">
                          +{provider.lookingFor.length - 2} more criteria
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {provider.highlights.map((highlight) => (
                        <Badge key={highlight} className="bg-pink-100 text-pink-700 border-pink-200">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1" asChild>
                      <Link href={`/providers/${provider.slug}`}>
                        View Partnership Profile
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/apply/basic-info">
                        Request Partnership
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No providers found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search criteria or browse all available providers.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("all");
                setSelectedLocation("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Provider CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Host Collaboration Partners?
              </h2>
              <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
                Join our platform and connect with breakthrough companies looking for strategic 
                collaboration partnerships. Share your expertise, expand your network, and accelerate collaboration together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/signup?role=space_provider">
                    Become a Collaboration Partner
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link href="/contact">
                    Learn About Partnership Benefits
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applicant CTA Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-pink-600 to-purple-600 border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Find Your Collaboration Partner?
              </h2>
              <p className="text-pink-100 mb-6 text-lg max-w-2xl mx-auto">
                Apply now and get connected with collaboration partners who share your vision 
                and can accelerate your breakthrough projects through strategic collaboration.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/apply/basic-info">
                  Start Partnership Application
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
