"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job } from "@/types/job";
import { Application } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Pencil,
  Trash2,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [internships, setInternships] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState("jobs");

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data.jobs);
      setInternships(data.internships);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      // setIsLoading(false); // This line was removed as per the edit hint
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: applicationId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const jobData = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      tags: formData.get("tags")?.toString().split(",").map(tag => tag.trim()),
      isInternship: formData.get("isInternship") === "true",
      duration: formData.get("duration"),
      salary: formData.get("salary"),
      compensation: formData.get("compensation"),
      responsibilities: formData.get("responsibilities")?.toString().split("\n").filter(Boolean),
      requirements: formData.get("requirements")?.toString().split("\n").filter(Boolean),
      benefits: formData.get("benefits")?.toString().split("\n").filter(Boolean),
    };

    try {
      const response = await fetch('/api/jobs', {
        method: currentJob ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          _id: currentJob?._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save job');
      }

      fetchJobs();
      setCurrentJob(null);
      setIsEditing(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await fetch(`/api/jobs?id=${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job: Job) => {
    setCurrentJob(job);
    setIsEditing(true);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewing: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return statusStyles[status as keyof typeof statusStyles] || statusStyles.pending;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {activeTab !== "applications" && (
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "View Listings" : "Add New Listing"}
            </Button>
          )}
        </div>

        {isEditing ? (
          <Card>
            <CardHeader>
              <CardTitle>{currentJob ? "Edit Listing" : "Add New Listing"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={currentJob?.title}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      defaultValue={currentJob?.company}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      defaultValue={currentJob?.location}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      name="type"
                      defaultValue={currentJob?.type}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={currentJob?.description}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={currentJob?.tags.join(", ")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="isInternship"
                        value="false"
                        defaultChecked={!currentJob?.isInternship}
                        required
                      />
                      <span>Full-time Job</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="isInternship"
                        value="true"
                        defaultChecked={currentJob?.isInternship}
                      />
                      <span>Internship</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary (for full-time)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      defaultValue={currentJob?.salary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compensation">Compensation (for internship)</Label>
                    <Input
                      id="compensation"
                      name="compensation"
                      defaultValue={currentJob?.compensation}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (for internship)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    defaultValue={currentJob?.duration}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    defaultValue={currentJob?.responsibilities.join("\n")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    defaultValue={currentJob?.requirements.join("\n")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    defaultValue={currentJob?.benefits.join("\n")}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCurrentJob(null);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {currentJob ? "Update" : "Create"} Listing
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="jobs">
                Jobs ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="internships">
                Internships ({internships.length})
              </TabsTrigger>
              <TabsTrigger value="applications">
                Applications ({applications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs">
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <Card key={job._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(job)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(job._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="internships">
              <div className="grid gap-4">
                {internships.map((internship) => (
                  <Card key={internship._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <GraduationCap className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{internship.title}</h3>
                            <p className="text-gray-600">{internship.company}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(internship)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(internship._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <div className="grid gap-4">
                {applications.map((application) => (
                  <Card key={application._id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">
                              {application.firstName} {application.lastName}
                            </h3>
                            <Badge className={getStatusBadge(application.status)}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <a href={`mailto:${application.email}`} className="hover:text-blue-600">
                                {application.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${application.phone}`} className="hover:text-blue-600">
                                {application.phone}
                              </a>
                            </div>
                            {application.university && (
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                <span>{application.university}</span>
                              </div>
                            )}
                            {application.linkedinProfile && (
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <a 
                                  href={application.linkedinProfile}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600"
                                >
                                  LinkedIn Profile
                                </a>
                              </div>
                            )}
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Applied For:</h4>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4" />
                              <span>{(application.jobId as Job).title} at {(application.jobId as Job).company}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Cover Letter:</h4>
                            <p className="text-gray-600 whitespace-pre-wrap">{application.coverLetter}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => window.open(application.resumeUrl, '_blank')}
                          >
                            View Resume
                          </Button>
                          {application.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={() => handleStatusUpdate(application._id, "reviewing")}
                              >
                                Start Review
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                onClick={() => handleStatusUpdate(application._id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {application.status === "reviewing" && (
                            <>
                              <Button
                                size="sm"
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusUpdate(application._id, "accepted")}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                onClick={() => handleStatusUpdate(application._id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
} 