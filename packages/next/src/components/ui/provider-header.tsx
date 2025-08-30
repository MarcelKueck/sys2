'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderHeader() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="hidden md:block w-px h-6 bg-gray-300" />
            <span className="hidden md:block text-sm text-gray-500">Provider Profile</span>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(255, 0, 153)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(255, 0, 153)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('spaces')}
              className="text-gray-600 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(255, 0, 153)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Spaces
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(255, 0, 153)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Contact
            </button>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button size="sm" className="text-white" style={{backgroundColor: 'rgb(255, 0, 153)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(230, 0, 138)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(255, 0, 153)'}>
              Contact Pixida
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
