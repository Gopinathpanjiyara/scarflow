"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Building, GraduationCap } from "lucide-react";

export function CTASection() {
  const cards = [
    {
      id: 1,
      title: "For Candidates",
      description: "Start your career with truth",
      icon: <Brain className="w-10 h-10 text-blue-600" />,
      buttonText: "Create Free Account",
      delay: 0,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "For Startups",
      description: "Build teams that matter",
      icon: <Building className="w-10 h-10 text-indigo-600" />,
      buttonText: "Post a Job",
      delay: 0.2,
      color: "bg-indigo-50"
    },
    {
      id: 3,
      title: "For Colleges",
      description: "Place students into real startups",
      icon: <GraduationCap className="w-10 h-10 text-purple-600" />,
      buttonText: "Partner with Us",
      delay: 0.4,
      color: "bg-purple-50"
    }
  ];

  return (
    <section className="py-16 md:py-20" id="for-talent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Build with Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the movement to create a more transparent and effective hiring ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: card.delay }}
              viewport={{ once: true }}
            >
              <Card className="border-gray-200 h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader className={`${card.color} rounded-t-lg py-5`}>
                  <div className="flex justify-center mb-4">
                    {card.icon}
                  </div>
                  <CardTitle className="text-center">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-5">
                  <p className="text-center text-gray-600">{card.description}</p>
                </CardContent>
                <CardFooter className="pt-2 pb-5">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    {card.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-100">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Join Our Waitlist</h3>
            <p className="text-gray-600 mb-5 md:mb-6 max-w-md mx-auto">
              Be the first to experience the future of startup hiring when we launch.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
              Get Early Access
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 