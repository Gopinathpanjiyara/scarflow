export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  isInternship: boolean;
  duration?: string;
  salary?: string;
  compensation?: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  jobId: string | Job;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  university?: string;
  linkedinProfile?: string;
  coverLetter: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
} 