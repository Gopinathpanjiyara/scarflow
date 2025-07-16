"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-16 overflow-hidden" id="home">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-blue-200/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full bg-purple-200/20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Connect with <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  verified talent
                </span>
                <svg className="absolute -bottom-2 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 238.5 4.47226 355 9" stroke="url(#paint0_linear)" strokeWidth="5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="3" y1="9" x2="355" y2="9" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5" stopOpacity="0.3"/>
                      <stop offset="1" stopColor="#9333EA" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span> for your startup
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 md:pr-10">
              Scarflow eliminates hiring risks with our verified talent network. 
              Find pre-vetted developers, designers, and marketers ready to join your team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 shadow-md shadow-blue-500/20"
                onClick={() => document.getElementById('for-startups')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Top Talent
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 hover:bg-gray-50 px-8"
                onClick={() => document.getElementById('for-talent')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join as Talent
              </Button>
            </div>
          </motion.div>
          
          {/* Right side - Realistic Interface */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Browser-like window frame */}
              <div className="bg-gray-800 rounded-t-lg p-2">
                <div className="flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto bg-gray-700 rounded-md text-gray-300 text-xs px-4 py-1">
                    scarflow.io/talent
                  </div>
                </div>
              </div>
              
              {/* Main content area */}
              <div className="bg-white border-x border-b border-gray-300 rounded-b-lg shadow-xl overflow-hidden">
                {/* Search and filter bar */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[180px]">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input type="text" className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Search skills, roles..." defaultValue="Full-stack developer" />
                    </div>
                    <div className="flex items-center text-xs bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                      <span>Remote</span>
                      <button className="ml-1.5 text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filters
                    </button>
                  </div>
                </div>
                
                {/* Results - Talent cards */}
                <div className="divide-y divide-gray-200">
                  {/* Talent card 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                          <span className="text-lg font-medium text-gray-600">MK</span>
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Michael Kim</h3>
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-md flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Senior Full-Stack Developer</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="inline-block">Previously at Stripe, Airbnb</span>
                          <span className="mx-1.5">•</span>
                          <span className="inline-block">5+ years experience</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">React</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Node.js</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">TypeScript</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">AWS</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Talent card 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 hover:bg-gray-50 bg-blue-50/40"
                  >
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="flex items-start relative">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                          <span className="text-lg font-medium text-gray-600">SJ</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Sarah Johnson</h3>
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-md flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Product Designer</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="inline-block">Previously at Figma, Uber</span>
                          <span className="mx-1.5">•</span>
                          <span className="inline-block">4+ years experience</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">UI/UX</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Figma</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Design Systems</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Talent card 3 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                          <span className="text-lg font-medium text-gray-600">RP</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Raj Patel</h3>
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-md flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Backend Engineer</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="inline-block">Previously at Amazon, Shopify</span>
                          <span className="mx-1.5">•</span>
                          <span className="inline-block">7+ years experience</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Python</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Django</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Docker</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Bottom action bar */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-500">Showing 3 of 156 talents</div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1.5 rounded-md bg-blue-600 border border-blue-600 text-white hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notification badge */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                3
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 