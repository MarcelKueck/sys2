'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar, Wifi, Car, Coffee, Printer, Lightbulb, ArrowRight, Star, Award, Globe, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProviderHeader from '@/components/ui/provider-header';

export default function PixidaProfilePage() {
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const spaces = [
    {
      id: 1,
      name: "Innovation Lab Munich",
      size: "120sqm",
      capacity: "15-20 people",
      availability: "Available from Q1 2025",
      price: "€2,800/month",
      description: "Open workspace designed for cross-functional teams and agile development. Perfect for AI/ML projects and rapid prototyping.",
      features: ["3D Printer Access", "Rapid Prototyping Lab", "AI Computing Cluster", "Collaborative Whiteboards"],
      amenities: ["wifi", "kitchen", "parking", "printer"],
      images: [
        "/api/placeholder/600/400?text=Innovation+Lab+Main+Space",
        "/api/placeholder/600/400?text=Innovation+Lab+Meeting+Area",
        "/api/placeholder/600/400?text=Innovation+Lab+Tech+Zone",
        "/api/placeholder/600/400?text=Innovation+Lab+Collaboration+Space"
      ]
    },
    {
      id: 2,
      name: "Collaboration Corner",
      size: "45sqm",
      capacity: "6-8 people",
      availability: "Available immediately",
      price: "€1,200/month",
      description: "Intimate workshop space ideal for focused project work and client meetings. Premium location with natural light.",
      features: ["Video Conference Setup", "Presentation Display", "Soundproof Design", "Premium Location"],
      amenities: ["wifi", "kitchen", "parking"],
      images: [
        "/api/placeholder/600/400?text=Collaboration+Corner+Main",
        "/api/placeholder/600/400?text=Collaboration+Corner+Meeting",
        "/api/placeholder/600/400?text=Collaboration+Corner+Workspace",
        "/api/placeholder/600/400?text=Collaboration+Corner+View"
      ]
    },
    {
      id: 3,
      name: "Tech Sandbox",
      size: "80sqm",
      capacity: "10-12 people",
      availability: "Available from February 2025",
      price: "€2,200/month",
      description: "Hardware-focused workspace with access to our engineering lab. Perfect for IoT development and sensor technology projects.",
      features: ["Hardware Lab Access", "Electronics Workbench", "Testing Equipment", "Component Library"],
      amenities: ["wifi", "kitchen", "parking", "printer"],
      images: [
        "/api/placeholder/600/400?text=Tech+Sandbox+Lab",
        "/api/placeholder/600/400?text=Tech+Sandbox+Workbench",
        "/api/placeholder/600/400?text=Tech+Sandbox+Testing",
        "/api/placeholder/600/400?text=Tech+Sandbox+Components"
      ]
    }
  ];

  const projects = [
    {
      title: "Autonomous Driving Solutions",
      description: "Next-generation ADAS systems for German automotive manufacturers",
      image: "/api/placeholder/400/250?text=Autonomous+Driving+Project",
      tech: ["AI/ML", "Computer Vision", "Sensor Fusion"]
    },
    {
      title: "Smart Factory Implementation",
      description: "Industry 4.0 transformation for Mittelstand manufacturing companies",
      image: "/api/placeholder/400/250?text=Smart+Factory+Project",
      tech: ["IoT", "Edge Computing", "Digital Twin"]
    },
    {
      title: "Digital Twin Development",
      description: "Real-time simulation platforms for industrial process optimization",
      image: "/api/placeholder/400/250?text=Digital+Twin+Project",
      tech: ["3D Modeling", "Real-time Analytics", "Cloud Computing"]
    }
  ];

  const amenityIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    kitchen: <Coffee className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    printer: <Printer className="w-5 h-5" />
  };

  const nextSpace = () => {
    setCurrentSpaceIndex((prev) => (prev + 1) % spaces.length);
    setCurrentImageIndex(0); // Reset image when changing space
  };

  const prevSpace = () => {
    setCurrentSpaceIndex((prev) => (prev - 1 + spaces.length) % spaces.length);
    setCurrentImageIndex(0); // Reset image when changing space
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentSpace.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentSpace.images.length) % currentSpace.images.length);
  };

  const currentSpace = spaces[currentSpaceIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 scroll-smooth">
      <ProviderHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/api/placeholder/1920/1080?text=Pixida+Office+Munich")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-blue-900/60 z-10" />
        
        <div className="relative z-20 text-center text-white max-w-4xl px-6">
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 mx-auto bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-4xl font-bold" style={{color: 'rgb(255, 0, 153)'}}>P</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Pixida</h1>
            <p className="text-xl md:text-2xl font-light mb-6 text-blue-100">
              Where Innovation Meets Mittelstand Excellence
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-blue-50">
              Join Germany's leading innovation consultancy in creating the future of mobility, 
              manufacturing, and digital transformation. Let's build tomorrow, together.
            </p>
            
            {/* Stats Row */}
            <div className="flex justify-center space-x-8 mt-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-blue-200">Experts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-sm text-blue-200">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12+</div>
                <div className="text-sm text-blue-200">Years</div>
              </div>
            </div>
          </div>
          
          <Button size="lg" className="text-white px-8 py-3 text-lg" style={{backgroundColor: 'rgb(255, 0, 153)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(230, 0, 138)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(255, 0, 153)'}>
            Join Our Innovation Ecosystem
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Pixida</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just workspace – we're your innovation partner in Germany's dynamic tech ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(255, 0, 153, 0.1)'}}>
                  <Target className="w-6 h-6" style={{color: 'rgb(255, 0, 153)'}} />
                </div>
                <CardTitle style={{color: 'rgb(255, 0, 153)'}}>Who We Are</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Germany's premier innovation consultancy, bridging the gap between traditional 
                  Mittelstand excellence and cutting-edge technology. We foster collaboration 
                  that drives real business impact.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(255, 0, 153, 0.1)'}}>
                  <Globe className="w-6 h-6" style={{color: 'rgb(255, 0, 153)'}} />
                </div>
                <CardTitle style={{color: 'rgb(255, 0, 153)'}}>What We Do</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Digital transformation, AI/ML solutions, and mobility innovation. We help 
                  companies navigate Industry 4.0 while maintaining the quality and precision 
                  that defines German engineering.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(255, 0, 153, 0.1)'}}>
                  <Award className="w-6 h-6" style={{color: 'rgb(255, 0, 153)'}} />
                </div>
                <CardTitle style={{color: 'rgb(255, 0, 153)'}}>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Lightbulb className="w-4 h-4 mr-2" style={{color: 'rgb(255, 0, 153)'}} />
                    Innovation Excellence
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2" style={{color: 'rgb(255, 0, 153)'}} />
                    Collaborative Growth
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Star className="w-4 h-4 mr-2" style={{color: 'rgb(255, 0, 153)'}} />
                    Trust & Quality
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(255, 0, 153, 0.1)'}}>
                  <MapPin className="w-6 h-6" style={{color: 'rgb(255, 0, 153)'}} />
                </div>
                <CardTitle style={{color: 'rgb(255, 0, 153)'}}>Company Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2" style={{color: 'rgb(255, 0, 153)'}} />
                    500+ employees
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" style={{color: 'rgb(255, 0, 153)'}} />
                    Founded 2012
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2" style={{color: 'rgb(255, 0, 153)'}} />
                    Munich, Germany
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-16 px-6 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Innovation in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the cutting-edge projects that showcase our expertise and the collaborative opportunities waiting for you
            </p>
          </div>
          
          <div className="flex overflow-x-auto space-x-6 pb-6 scroll-smooth custom-scrollbar">
            {projects.map((project, index) => (
              <Card key={index} className="min-w-[380px] bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Active Project
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-white px-3 py-1 rounded-full text-sm font-medium"
                        style={{backgroundColor: 'rgb(255, 0, 153)'}}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Collaboration opportunities available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-2 text-white hover:bg-opacity-90" style={{borderColor: 'rgb(255, 0, 153)', backgroundColor: 'rgb(255, 0, 153)'}}>
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            What We're Looking For
          </h2>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{color: 'rgb(255, 0, 153)'}}>Ideal Partners</h3>
                  <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      AI/ML startups in mobility or manufacturing
                    </li>
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      IoT and sensor technology companies
                    </li>
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      Digital transformation consultancies
                    </li>
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      Sustainable tech innovators
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{color: 'rgb(255, 0, 153)'}}>We Offer</h3>
                  <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      Access to enterprise clients and projects
                    </li>
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      Mentorship from industry experts
                    </li>
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      Collaborative project opportunities
                    </li>
                    <li className="flex items-start">
                      <span style={{color: 'rgb(255, 0, 153)'}} className="mr-2">•</span>
                      Access to German automotive network
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Spaces Section */}
      <section id="spaces" className="py-16 px-6 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Innovation Spaces
          </h2>
          
          <div className="relative">
            <Card className="bg-white border-0 shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="relative group">
                  <img 
                    src={currentSpace.images[currentImageIndex]} 
                    alt={`${currentSpace.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-64 lg:h-full object-cover transition-all duration-500"
                  />
                  
                  {/* Image Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2 justify-center">
                      {currentSpace.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {currentSpace.images.length}
                  </div>
                </div>

                {/* Space Details */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{currentSpace.name}</h3>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={prevSpace}
                        className="p-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={nextSpace}
                        className="p-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Size</span>
                      <p className="font-semibold">{currentSpace.size}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Capacity</span>
                      <p className="font-semibold">{currentSpace.capacity}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Availability</span>
                      <p className="font-semibold text-green-600">{currentSpace.availability}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Investment</span>
                      <p className="font-semibold">{currentSpace.price}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {currentSpace.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Special Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {currentSpace.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="text-white px-3 py-1 rounded-full text-sm"
                          style={{backgroundColor: 'rgba(255, 0, 153, 0.8)'}}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                    <div className="flex space-x-4">
                      {currentSpace.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          {amenityIcons[amenity as keyof typeof amenityIcons]}
                          <span className="ml-1 text-sm capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full text-white" style={{backgroundColor: 'rgb(255, 0, 153)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(230, 0, 138)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(255, 0, 153)'}>
                    Apply for This Space
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Space Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {spaces.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSpaceIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300`}
                  style={{
                    backgroundColor: index === currentSpaceIndex ? 'rgb(255, 0, 153)' : '#d1d5db'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our current partners about their experience in the Pixida innovation ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{background: 'linear-gradient(135deg, rgb(255, 0, 153), rgb(200, 0, 120))'}}>
                    AI
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">AutoSense AI</h4>
                    <p className="text-sm text-gray-600">Autonomous Driving Startup</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Pixida's Innovation Lab gave us access to industry-grade testing equipment and direct collaboration 
                  with automotive OEMs. We've accelerated our development by 18 months."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{background: 'linear-gradient(135deg, rgb(255, 0, 153), rgb(200, 0, 120))'}}>
                    ST
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">SmartTech Solutions</h4>
                    <p className="text-sm text-gray-600">IoT Manufacturing Platform</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "The collaboration opportunities at Pixida are unmatched. We've partnered on three major 
                  Industry 4.0 projects and expanded our client base by 300%."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{background: 'linear-gradient(135deg, rgb(255, 0, 153), rgb(200, 0, 120))'}}>
                    DT
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">DigiTransform</h4>
                    <p className="text-sm text-gray-600">Digital Transformation Consultancy</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Being part of Pixida's ecosystem connected us with traditional Mittelstand companies 
                  looking for digital transformation. Perfect cultural fit."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Key Metrics */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Innovation Impact</h3>
              <p className="text-gray-600">Measurable results from our collaborative ecosystem</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: 'rgb(255, 0, 153)'}}>25+</div>
                <div className="text-sm text-gray-600">Active Partnerships</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: 'rgb(255, 0, 153)'}}>€15M+</div>
                <div className="text-sm text-gray-600">Investment Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: 'rgb(255, 0, 153)'}}>95%</div>
                <div className="text-sm text-gray-600">Partner Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: 'rgb(255, 0, 153)'}}>18mo</div>
                <div className="text-sm text-gray-600">Avg. Time to Market</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Ready to Shape the Future Together?
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Join our innovation ecosystem and become part of Germany's digital transformation story. 
                Let's build the technologies that will define tomorrow's Mittelstand.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-blue-100">
                  <Award className="w-5 h-5 mr-3" style={{color: 'rgb(255, 0, 153)'}} />
                  <span>Award-winning innovation environment</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <Users className="w-5 h-5 mr-3" style={{color: 'rgb(255, 0, 153)'}} />
                  <span>Network of 500+ industry experts</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <Target className="w-5 h-5 mr-3" style={{color: 'rgb(255, 0, 153)'}} />
                  <span>Direct access to enterprise clients</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Schedule a Visit
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                  Download Info Pack
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Quick Contact Form */}
            <div className="lg:pl-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Get Started Today</CardTitle>
                  <p className="text-blue-100">Tell us about your innovation goals</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Company Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                      <option value="" className="text-gray-800">Select your industry</option>
                      <option value="automotive" className="text-gray-800">Automotive</option>
                      <option value="manufacturing" className="text-gray-800">Manufacturing</option>
                      <option value="ai-ml" className="text-gray-800">AI/ML</option>
                      <option value="iot" className="text-gray-800">IoT</option>
                      <option value="other" className="text-gray-800">Other</option>
                    </select>
                  </div>
                  <Button className="w-full text-blue-900 font-semibold py-3" style={{backgroundColor: 'rgb(255, 0, 153)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(230, 0, 138)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(255, 0, 153)'}>
                    Start the Conversation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  
                  <p className="text-xs text-blue-200 text-center">
                    We'll get back to you within 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgb(255, 0, 153)'}}>
                  <span className="text-xl font-bold">P</span>
                </div>
                <span className="ml-3 text-xl font-bold">Pixida</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Innovation consultancy driving digital transformation in Germany's tech ecosystem.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Innovation Consulting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Transformation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI/ML Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Workspace Partnership</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Munich, Germany</span>
                </div>
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 mr-2" />
                  <span>innovation@pixida.com</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>www.pixida.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pixida GmbH. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
