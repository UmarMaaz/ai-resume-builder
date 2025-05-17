
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface Education {
  degree: string;
  year: string;
  institute: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface WorkExperience {
  jobTitle: string;
  duration: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export type TemplateType = "simple" | "modern" | "minimalist" | "professional" | "compact" | "creative" | "executive" | "ats";

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: string;
  projects: Project[];
  workExperience: WorkExperience[];
  certifications: Certification[];
  hobbies: string;
  selectedTemplate: TemplateType;
  id?: string; // Add ID field for database storage
  userId?: string; // Add user ID field for database storage
  createdAt?: string; // Add creation timestamp
  updatedAt?: string; // Add update timestamp
}
