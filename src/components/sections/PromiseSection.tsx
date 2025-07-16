"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { XCircle, AlertTriangle, CheckCircle } from "lucide-react";

export function PromiseSection() {
  const steps = [
    {
      id: 1,
      title: "The Current Market",
      description: "Scams, unpaid gigs, and ghost jobs plague the startup hiring landscape.",
      icon: <XCircle className="w-10 h-10 text-red-500" />,
      color: "bg-red-50 border-red-100",
      textColor: "text-red-700",
      badgeText: "Problem"
    },
    {
      id: 2,
      title: "Scarflow Disrupts",
      description: "We introduce rigorous verification for both startups and talent.",
      icon: <AlertTriangle className="w-10 h-10 text-amber-500" />,
      color: "bg-amber-50 border-amber-100",
      textColor: "text-amber-700",
      badgeText: "Solution"
    },
    {
      id: 3,
      title: "Trust-First Ecosystem",
      description: "Startups scale with real people. Talent grows with real work.",
      icon: <CheckCircle className="w-10 h-10 text-green-500" />,
      color: "bg-green-50 border-green-100",
      textColor: "text-green-700",
      badgeText: "Result"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-blue-200 text-blue-700 bg-blue-50">
            Our Mission
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Scarflow Promise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re building a trust-first platform that eliminates scams and creates real opportunities.
          </p>
        </div>

        {/* Horizontal timeline on desktop, vertical on mobile */}
        <div className="hidden lg:flex justify-between items-start relative">
          {/* Timeline line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200"></div>
          
          {/* Timeline steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative w-1/3 px-4 md:px-6"
            >
              <div className={`${step.color} border rounded-xl p-4 md:p-6 h-full`}>
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center mb-4">{step.description}</p>
                <div className="flex justify-center">
                  <Badge className={`${step.textColor} bg-white`}>
                    {step.badgeText}
                  </Badge>
                </div>
              </div>
              
              {/* Step number */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-500 z-10 flex items-center justify-center">
                <span className="font-bold text-sm">{step.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Vertical timeline on mobile */}
        <div className="lg:hidden space-y-8 md:space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <div className="mr-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center">
                  <span className="font-bold text-sm">{step.id}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 bg-gray-200 h-full mt-4"></div>
                )}
              </div>
              <div className={`${step.color} border rounded-xl p-4 md:p-6 flex-1`}>
                <div className="flex justify-start mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <Badge className={`${step.textColor} bg-white`}>
                  {step.badgeText}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Verification badge animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <div className="bg-white rounded-full p-4 shadow-lg flex items-center gap-3 relative">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span className="font-bold">Scarflow Verified</span>
            <motion.div
              animate={{ 
                boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0)", "0px 0px 15px rgba(59, 130, 246, 0.5)", "0px 0px 0px rgba(59, 130, 246, 0)"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 