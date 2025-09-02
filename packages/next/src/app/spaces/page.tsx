"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Euro, 
  Wifi, 
  Coffee, 
  Car, 
  Printer,
  Building2,
  Star,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for available spaces - in real app this would come from API
const allSpaces = [
  {
    id: "pixida-collaboration-lab",
    name: "Collaboration Lab Munich",
    provider: "Pixida GmbH",
    providerSlug: "pixida",
    location: "Munich, Germany",
    address: "Balanstraße 73, 81541 München",
    size: "120sqm",
    capacity: "15-20 people",
    type: "Collaboration Lab",
    monthlyPrice: 2800,
    availability: "Available from Q1 2025",
    description: "Open workspace designed for cross-functional teams and agile development. Perfect for AI/ML projects and rapid prototyping.",
    features: ["3D Printer Access", "Rapid Prototyping Lab", "AI Computing Cluster", "Collaborative Whiteboards"],
    amenities: ["wifi", "kitchen", "parking", "printer"],
    images: ["/api/placeholder/400/300?text=Collaboration+Lab"],
    rating: 4.9,
    tags: ["Collaboration", "AI/ML", "Tech", "Startup"],
  },
  {
    id: "pixida-collaboration-corner",
    name: "Collaboration Corner",
    provider: "Pixida GmbH",
    providerSlug: "pixida",
    location: "Munich, Germany",
    address: "Balanstraße 73, 81541 München",
    size: "45sqm",
    capacity: "8-12 people",
    type: "Meeting & Workshop Space",
    monthlyPrice: 1200,
    availability: "Available now",
    description: "Intimate workspace perfect for creative workshops, strategic planning sessions, and small team collaborations.",
    features: ["Modular Furniture", "Video Conferencing Setup", "Workshop Materials", "Breakout Areas"],
    amenities: ["wifi", "kitchen", "parking"],
    images: ["/api/placeholder/400/300?text=Collaboration+Corner"],
    rating: 4.8,
    tags: ["Workshops", "Creative", "Small Teams", "Meetings"],
  },
  {
    id: "pixida-tech-sandbox",
    name: "Tech Sandbox",
    provider: "Pixida GmbH",
    providerSlug: "pixida",
    location: "Munich, Germany",
    address: "Balanstraße 73, 81541 München",
    size: "80sqm",
    capacity: "10-15 people",
    type: "Hardware Lab",
    monthlyPrice: 2200,
    availability: "Available from Feb 2025",
    description: "Specialized workspace with hardware lab access, perfect for IoT companies and hardware startups.",
    features: ["Hardware Lab Access", "Testing Equipment", "Soldering Stations", "Component Library"],
    amenities: ["wifi", "kitchen", "parking", "printer"],
    images: ["/api/placeholder/400/300?text=Tech+Sandbox"],
    rating: 4.9,
    tags: ["Hardware", "IoT", "Testing", "Development"],
  }
];

const amenityIcons = {
  wifi: Wifi,
  kitchen: Coffee,
  parking: Car,
  printer: Printer,
};

export default function BrowseSpacesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const filteredSpaces = allSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "all" || space.type.toLowerCase().includes(selectedType.toLowerCase());
    
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "budget" && space.monthlyPrice < 1500) ||
                        (priceRange === "mid" && space.monthlyPrice >= 1500 && space.monthlyPrice < 2500) ||
                        (priceRange === "premium" && space.monthlyPrice >= 2500);

    return matchesSearch && matchesType && matchesPrice;
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
              <span className="text-lg font-semibold text-slate-900">Browse Spaces</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/providers" className="text-slate-600 hover:text-slate-900">
              For Providers
            </Link>
            <Link href="/auth/signin" className="text-slate-600 hover:text-slate-900">
              Sign In
            </Link>
            <Button size="sm" asChild>
              <Link href="/apply/basic-info">Apply Now</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Discover Your Perfect Workspace
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Browse premium workspaces from trusted providers. Find spaces that match your company's 
            culture, values, and collaboration goals.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="h-5 w-5 mr-2" />
              Filter Spaces
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
                    placeholder="Search spaces, providers, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="type">Space Type</Label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Types</option>
                  <option value="collaboration">Collaboration Lab</option>
                  <option value="meeting">Meeting & Workshop</option>
                  <option value="hardware">Hardware Lab</option>
                </select>
              </div>
              <div>
                <Label htmlFor="price">Price Range</Label>
                <select
                  id="price"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (&lt; €1,500)</option>
                  <option value="mid">Mid-range (€1,500 - €2,500)</option>
                  <option value="premium">Premium (&gt; €2,500)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredSpaces.length} of {allSpaces.length} available spaces
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <Card key={space.id} className="group hover:shadow-lg transition-all duration-200">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={space.images[0]}
                  alt={space.name}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-slate-900">
                    {space.availability}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-pink-600/90 text-white">
                    {space.type}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">{space.name}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {space.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {space.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {space.description}
                </p>

                <div className="flex items-center justify-between mb-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {space.capacity}
                  </div>
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    {space.size}
                  </div>
                  <div className="flex items-center font-medium text-slate-900">
                    <Euro className="h-4 w-4 mr-1" />
                    {space.monthlyPrice.toLocaleString()}/mo
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {space.amenities.slice(0, 4).map((amenity) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                    return Icon ? (
                      <div key={amenity} className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full">
                        <Icon className="h-4 w-4 text-slate-600" />
                      </div>
                    ) : null;
                  })}
                  {space.amenities.length > 4 && (
                    <span className="text-sm text-slate-500">+{space.amenities.length - 4} more</span>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  {space.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {space.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{space.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/providers/${space.providerSlug}`}>
                      View Provider
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href="/apply/basic-info">
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No spaces found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search criteria or browse all available spaces.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setPriceRange("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-pink-600 to-purple-600 border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Don't See What You're Looking For?
              </h2>
              <p className="text-pink-100 mb-6 text-lg max-w-2xl mx-auto">
                Join our platform and get notified when new spaces become available that match your preferences.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/apply/basic-info">
                  Join Our Collaboration Ecosystem
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
