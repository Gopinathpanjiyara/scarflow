"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, Clock, Briefcase } from "lucide-react";

const jobListings = [
  {
    id: 1,
    company: "TechFlow AI",
    position: "Senior Frontend Developer",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
    logo: "T",
    logoColor: "bg-indigo-100 text-indigo-600",
    tags: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 2,
    company: "DataSphere",
    position: "Product Designer",
    location: "Remote",
    type: "Full-time",
    posted: "1 day ago",
    logo: "D",
    logoColor: "bg-blue-100 text-blue-600",
    tags: ["UI/UX", "Figma", "Design Systems"]
  },
  {
    id: 3,
    company: "GrowthX",
    position: "Growth Marketing Specialist",
    location: "Hybrid",
    type: "Full-time",
    posted: "3 days ago",
    logo: "G",
    logoColor: "bg-green-100 text-green-600",
    tags: ["SEO", "Content", "Analytics"]
  },
  {
    id: 4,
    company: "LaunchPad",
    position: "Backend Developer",
    location: "Remote",
    type: "Contract",
    posted: "5 hours ago",
    logo: "L",
    logoColor: "bg-amber-100 text-amber-600",
    tags: ["Node.js", "Python", "AWS"]
  },
  {
    id: 5,
    company: "FinEdge",
    position: "Mobile Developer",
    location: "Remote",
    type: "Full-time",
    posted: "1 week ago",
    logo: "F",
    logoColor: "bg-red-100 text-red-600",
    tags: ["React Native", "iOS", "Android"]
  }
];

export function HiringBoardSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = [
    { id: "all", label: "All Jobs" },
    { id: "remote", label: "Remote" },
    { id: "internship", label: "Internships" },
    { id: "cofounder", label: "Co-founder Search" }
  ];
  
  const filteredJobs = activeFilter === "all" 
    ? jobListings 
    : jobListings.filter(job => 
        activeFilter === "remote" && job.location === "Remote" ||
        activeFilter === "internship" && job.type === "Internship" ||
        activeFilter === "cofounder" && job.position.includes("Co-founder")
      );

  return (
    <section className="py-16 md:py-20" id="jobs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-blue-200 text-blue-700 bg-blue-50">
            Live Opportunities
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hiring Board Snapshot</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-time job listings from verified startups. No scams, no unpaid gigs.
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "text-gray-600 hover:text-blue-600"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* Job listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${job.logoColor} flex items-center justify-center font-bold mr-3`}>
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-bold">{job.company}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Verified</span>
                      <CheckCircle className="w-3 h-3 ml-1 text-green-500" />
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs bg-blue-50 border-blue-100 text-blue-700">
                  {job.type}
                </Badge>
              </div>
              
              <h4 className="font-semibold text-lg mb-3">{job.position}</h4>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-5">
                <div className="flex items-center mr-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{job.posted}</span>
                </div>
              </div>
              
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Apply Now
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-10">
          <Button variant="outline" size="lg" className="border-gray-300">
            View All Jobs <Briefcase className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
} 