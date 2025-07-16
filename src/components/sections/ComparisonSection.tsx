"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<"startups" | "talent">("startups");
  
  const startupFeatures = [
    {
      id: 1,
      title: "Post in 60 seconds",
      description: "Create a verified job listing with our streamlined process.",
      icon: "⚡"
    },
    {
      id: 2,
      title: "Auto-match with talent",
      description: "Our AI matches your needs with verified candidates.",
      icon: "🔍"
    },
    {
      id: 3,
      title: "View verified talent",
      description: "Browse profiles of pre-vetted candidates ready to work.",
      icon: "✅"
    },
    {
      id: 4,
      title: "Hire faster",
      description: "Cut hiring time by 60% with our streamlined process.",
      icon: "🚀"
    }
  ];
  
  const talentFeatures = [
    {
      id: 1,
      title: "Apply with smart profile",
      description: "Create once, apply to multiple verified opportunities.",
      icon: "📝"
    },
    {
      id: 2,
      title: "Avoid scams",
      description: "Every listing is verified to ensure legitimate opportunities.",
      icon: "🛡️"
    },
    {
      id: 3,
      title: "Get paid gigs",
      description: "No unpaid internships or exploitative positions.",
      icon: "💰"
    },
    {
      id: 4,
      title: "Grow career with real projects",
      description: "Build your portfolio with meaningful startup work.",
      icon: "📈"
    }
  ];

  return (
    <section className="py-16 md:py-20" id="for-startups">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Right Match for Everyone</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're hiring or looking for work, Scarflow creates the perfect environment for success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Startups Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setActiveTab("startups")}
          >
            <Card className={`h-full transition-all ${activeTab === "startups" ? "border-blue-500 shadow-lg" : "border-gray-200"}`}>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">For Startups</CardTitle>
                <CardDescription>Find the perfect talent for your team</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 md:space-y-4">
                  {startupFeatures.map((feature) => (
                    <motion.li 
                      key={feature.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: feature.id * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mr-3 text-xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                {activeTab === "startups" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      <h5 className="font-semibold text-blue-700">Startup Verified</h5>
                    </div>
                    <p className="text-sm text-blue-700">
                      We verify your startup to build trust with candidates, resulting in 3x more quality applications.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            {activeTab === "startups" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-blue-500 rounded-full"
              />
            )}
          </motion.div>
          
          {/* Talent Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setActiveTab("talent")}
          >
            <Card className={`h-full transition-all ${activeTab === "talent" ? "border-blue-500 shadow-lg" : "border-gray-200"}`}>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">For Talent</CardTitle>
                <CardDescription>Discover legitimate startup opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 md:space-y-4">
                  {talentFeatures.map((feature) => (
                    <motion.li 
                      key={feature.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: feature.id * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mr-3 text-xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                {activeTab === "talent" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      <h5 className="font-semibold text-blue-700">Talent Verified</h5>
                    </div>
                    <p className="text-sm text-blue-700">
                      Our verification process helps you stand out to quality startups and increases your chances of being hired by 2.5x.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            {activeTab === "talent" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-blue-500 rounded-full"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 