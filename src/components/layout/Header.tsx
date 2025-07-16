"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when scrolling
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center z-20">
        <div className="flex items-center space-x-2">
  <div className="relative h-8 w-8">
    <Image 
      src="/images/scarflowlogo.png" 
      alt="Scarflow Logo" 
      fill
      style={{ objectFit: 'contain' }}
      priority
    />
  </div>
  <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
    Scarflow
  </span>
</div>

          
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('for-startups')} 
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            For Startups
          </button>
          <button 
            onClick={() => scrollToSection('for-talent')} 
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            For Talent
          </button>
          <button 
            onClick={() => scrollToSection('jobs')} 
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Jobs
          </button>
        </nav>
        
        <div className="flex items-center space-x-3 z-20">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Log In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            Join Waitlist
          </Button>
          <button 
            ref={buttonRef}
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden fixed inset-0 bg-white z-10 pt-20 px-4 pb-6 flex flex-col"
        >
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-lg font-medium py-2 border-b border-gray-100"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('for-startups')} 
              className="text-lg font-medium py-2 border-b border-gray-100"
            >
              For Startups
            </button>
            <button 
              onClick={() => scrollToSection('for-talent')} 
              className="text-lg font-medium py-2 border-b border-gray-100"
            >
              For Talent
            </button>
            <button 
              onClick={() => scrollToSection('jobs')} 
              className="text-lg font-medium py-2 border-b border-gray-100"
            >
              Jobs
            </button>
          </nav>
          <div className="mt-auto flex flex-col space-y-3">
            <Button variant="outline" className="w-full">
              Log In
            </Button>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              Join Waitlist
            </Button>
          </div>
        </div>
      )}
    </header>
  );
} 