"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function AntiScamSection() {
  const stats = [
    {
      id: 1,
      value: "10,000+",
      label: "fake internships skipped",
      icon: "✊",
      delay: 0
    },
    {
      id: 2,
      value: "1,500+",
      label: "verified startups onboard",
      icon: "🛡️",
      delay: 0.2
    },
    {
      id: 3,
      value: "90%",
      label: "candidates trust Scarflow over portals",
      icon: "🔥",
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-blue-400 text-blue-300">
            Anti-Scam Movement
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We&apos;re not just hiring. We&apos;re fixing the broken system.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Scarflow is leading the charge against scam job listings and exploitative hiring practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5 md:p-6 text-center"
            >
              <div className="text-3xl mb-4">{stat.icon}</div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: stat.delay + 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                  {stat.value}
                </h3>
                <motion.div
                  animate={{ 
                    boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0)", "0px 0px 20px rgba(59, 130, 246, 0.3)", "0px 0px 0px rgba(59, 130, 246, 0)"]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut",
                    delay: stat.id * 0.5
                  }}
                  className="absolute inset-0 rounded-lg"
                />
              </motion.div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 md:mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="bg-blue-600 bg-opacity-20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-3 inline-flex items-center">
              <span className="text-blue-300 mr-2">Join the movement</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 