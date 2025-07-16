"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-80">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0 w-full md:w-auto">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-48 mb-2">
                <Image 
                  src="/images/scarflowlogo.png" 
                  alt="Scarflow Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">
              Where Real Talent Meets Real Startups.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-0 w-full md:w-auto">
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium text-sm">Navigation</h3>
              <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-600">
                Home
              </button>
              <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-600">
                How It Works
              </button>
              <button onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-600">
                Jobs
              </button>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium text-sm">For Startups</h3>
              <button onClick={() => document.getElementById('for-startups')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-600">
                Post a Job
              </button>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Find Talent
              </Link>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium text-sm">For Talent</h3>
              <button onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-600">
                Find Jobs
              </button>
              <button onClick={() => document.getElementById('for-talent')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-500 hover:text-blue-600">
                Create Profile
              </button>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium text-sm">Legal</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Privacy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Scarflow. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link href="https://linkedin.com" className="text-gray-400 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://twitter.com" className="text-gray-400 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="mailto:support@scarflow.in" className="flex items-center text-sm text-gray-500 hover:text-blue-600">
              <Mail size={18} className="mr-1" />
              <span>support@scarflow.in</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 