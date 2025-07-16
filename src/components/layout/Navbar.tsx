"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/scarflowlogo.png" 
            alt="Scarflow Logo" 
            width={120} 
            height={32} 
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#home" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="#for-startups" className="text-sm font-medium hover:text-blue-600 transition-colors">
            For Startups
          </Link>
          <Link href="#for-talent" className="text-sm font-medium hover:text-blue-600 transition-colors">
            For Talent
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How It Works
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-gray-200">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-gray-100">
          <div className="flex flex-col space-y-4">
            <Link 
              href="#home" 
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#for-startups" 
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Startups
            </Link>
            <Link 
              href="#for-talent" 
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Talent
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="flex space-x-4 pt-4">
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-gray-200">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 