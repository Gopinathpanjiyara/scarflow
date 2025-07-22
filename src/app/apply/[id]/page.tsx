"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data.job);
      } catch (error) {
        console.error('Error fetching job:', error);
        router.push('/carriers'); // Redirect to jobs page if job not found
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    // Validate resume
    if (!resumeUrl) {
      setFormError("Please upload your resume");
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    const applicationData = {
      jobId: jobId,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      resumeUrl: resumeUrl,
      profileImageUrl: profileImageUrl || undefined, // Only include if exists
      university: formData.get("university") || undefined,
      linkedinProfile: formData.get("linkedin") || undefined,
      coverLetter: formData.get("coverLetter"),
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to submit application');
      }

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setFormError(error instanceof Error ? error.message : 'Failed to submit application');
    }
  };

  if (formSubmitted) {
    return (
      <>
        <Header />
        <main className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto overflow-hidden border-0 shadow-lg">
              <div className="bg-green-50 p-10 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for applying. We will review your application and get back to you soon.
                </p>
                <Button onClick={() => router.push('/carriers')}>
                  View More Opportunities
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return null; // Router will handle redirect
  }

  return (
    <>
      <Header />
      <main className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Job Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-blue-600">{job.company}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {job.location}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {job.isInternship ? `${job.duration} Internship` : job.type}
                </span>
                {job.isInternship && job.compensation && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {job.compensation}
                  </span>
                )}
                {!job.isInternship && job.salary && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {job.salary}
                  </span>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Job Details */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg mb-8">
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h2 className="text-xl font-bold mb-4">Job Description</h2>
                      <p className="text-gray-600 mb-6">{job.description}</p>
                      
                      <h3 className="text-lg font-bold mb-3">Responsibilities</h3>
                      <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
                        {job.responsibilities.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-bold mb-3">Requirements</h3>
                      <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
                        {job.requirements.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-bold mb-3">Benefits</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {job.benefits.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Application Form */}
              <div className="relative">
                <div className="lg:sticky lg:top-8">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="bg-blue-600 p-4">
                      <h3 className="text-xl font-bold text-white">Apply Now</h3>
                    </div>
                    <CardContent className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {formError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name*</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="Enter first name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name*</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Enter last name"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address*</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number*</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Profile Image (Optional)</Label>
                          <FileUpload
                            type="image"
                            accept="image/*"
                            maxSize={2}
                            onUploadComplete={(url) => setProfileImageUrl(url)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Resume/CV*</Label>
                          <FileUpload
                            type="resume"
                            accept=".pdf,.doc,.docx"
                            maxSize={5}
                            onUploadComplete={(url) => setResumeUrl(url)}
                            required
                          />
                        </div>

                        {job.isInternship && (
                          <div className="space-y-2">
                            <Label htmlFor="university">University/College*</Label>
                            <Input
                              id="university"
                              name="university"
                              placeholder="Enter your university/college name"
                              required
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="coverLetter">Why are you interested in this position?*</Label>
                          <Textarea
                            id="coverLetter"
                            name="coverLetter"
                            placeholder="Tell us why you're a good fit..."
                            required
                            rows={4}
                          />
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox id="terms" required />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the terms and privacy policy*
                            </label>
                            <p className="text-xs text-gray-500">
                              By submitting this application, you agree to our terms of service and privacy policy.
                            </p>
                          </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          Submit Application
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 