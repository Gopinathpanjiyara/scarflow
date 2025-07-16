"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center" id="home">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Redefining Startup Hiring —{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                Real Teams. Real Talent. Zero Scams.
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Scarflow is where trusted startups meet verified, startup-ready talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 px-8"
                onClick={() => document.getElementById('for-startups')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Fast
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 hover:bg-gray-50 px-8"
                onClick={() => document.getElementById('for-talent')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Find Work
              </Button>
            </div>
          </motion.div>
          
          {/* Right side - 3D Card Stack */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] hidden md:block"
          >
            {/* Glass card 1 - Startup Profile */}
            <motion.div 
              initial={{ y: 40, rotate: -5, opacity: 0.8 }}
              animate={{ 
                y: [40, 30, 40], 
                rotate: [-5, -3, -5],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut"
              }}
              className="absolute top-8 right-4 w-[280px] md:w-[320px] h-[220px] bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-100 z-10"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-blue-600">S</span>
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Startup Name</h3>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">Verified</span>
                    <span className="ml-1 w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Early-stage startup building AI tools for developers
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">Remote</span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">Seed Funded</span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">Tech</span>
              </div>
            </motion.div>
            
            {/* Glass card 2 - Candidate Profile */}
            <motion.div 
              initial={{ y: 120, rotate: 5, opacity: 0.8 }}
              animate={{ 
                y: [120, 110, 120], 
                rotate: [5, 3, 5],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-20 right-20 w-[280px] md:w-[320px] h-[220px] bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-100 z-20"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="font-bold text-gray-600">D</span>
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Developer Name</h3>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">Verified</span>
                    <span className="ml-1 w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Full-stack developer with 3+ years experience
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">React</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Node.js</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">TypeScript</span>
              </div>
            </motion.div>
            
            {/* Match animation */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut",
                delay: 2,
                repeatDelay: 4
              }}
              className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-30"
            >
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 