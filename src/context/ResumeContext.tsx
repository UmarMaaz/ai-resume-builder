import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (personalInfo: Partial<ResumeData["personalInfo"]>) => void;
  addEducation: () => void;
  updateEducation: (index: number, education: Partial<ResumeData["education"][0]>) => void;
  removeEducation: (index: number) => void;
  updateSkills: (skills: string) => void;
  addProject: () => void;
  updateProject: (index: number, project: Partial<ResumeData["projects"][0]>) => void;
  removeProject: (index: number) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (index: number, workExperience: Partial<ResumeData["workExperience"][0]>) => void;
  removeWorkExperience: (index: number) => void;
  addCertification: () => void;
  updateCertification: (index: number, certification: Partial<ResumeData["certifications"][0]>) => void;
  removeCertification: (index: number) => void;
  updateHobbies: (hobbies: string) => void;
  updateTemplate: (template: ResumeData["selectedTemplate"]) => void;
  saveResume: () => Promise<void>;
  loadResume: (id: string) => Promise<void>;
  savedResumes: ResumeData[];
  loadSavedResumes: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

interface ResumeProviderProps {
  children: React.ReactNode;
  initialData: ResumeData;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({
  children,
  initialData,
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load from localStorage first
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse stored resume data", e);
        return initialData;
      }
    }
    return initialData;
  });

  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Utility functions for managing resume data
  const updatePersonalInfo = (personalInfo: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...personalInfo },
    }));
  };

  const updateSkills = (skills: string) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateHobbies = (hobbies: string) => {
    setResumeData((prev) => ({ ...prev, hobbies }));
  };

  // Education functions
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", year: "", institute: "" },
      ],
    }));
  };

  const updateEducation = (index: number, education: Partial<ResumeData["education"][0]>) => {
    setResumeData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = { ...updatedEducation[index], ...education };
      return { ...prev, education: updatedEducation };
    });
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Project functions
  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "" }],
    }));
  };

  const updateProject = (index: number, project: Partial<ResumeData["projects"][0]>) => {
    setResumeData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = { ...updatedProjects[index], ...project };
      return { ...prev, projects: updatedProjects };
    });
  };

  const removeProject = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Work Experience functions
  const addWorkExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { jobTitle: "", duration: "", description: "" },
      ],
    }));
  };

  const updateWorkExperience = (
    index: number,
    workExperience: Partial<ResumeData["workExperience"][0]>
  ) => {
    setResumeData((prev) => {
      const updatedWorkExperience = [...prev.workExperience];
      updatedWorkExperience[index] = {
        ...updatedWorkExperience[index],
        ...workExperience,
      };
      return { ...prev, workExperience: updatedWorkExperience };
    });
  };

  const removeWorkExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  // Certification functions
  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", issuer: "", year: "" },
      ],
    }));
  };

  const updateCertification = (
    index: number,
    certification: Partial<ResumeData["certifications"][0]>
  ) => {
    setResumeData((prev) => {
      const updatedCertifications = [...prev.certifications];
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        ...certification,
      };
      return { ...prev, certifications: updatedCertifications };
    });
  };

  const removeCertification = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Template update function
  const updateTemplate = (selectedTemplate: ResumeData["selectedTemplate"]) => {
    setResumeData((prev) => ({ ...prev, selectedTemplate }));
  };

  // Database functions
  const saveResume = async () => {
    try {
      // For now, we'll simulate a database save by storing in localStorage
      const now = new Date().toISOString();
      const updatedResume = {
        ...resumeData,
        id: resumeData.id || `resume-${Date.now()}`,
        updatedAt: now,
        createdAt: resumeData.createdAt || now,
      };
      
      // Save the current resume
      setResumeData(updatedResume);
      
      // Update savedResumes list
      const existingResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      const updatedResumes = existingResumes.filter((r: ResumeData) => r.id !== updatedResume.id);
      updatedResumes.push(updatedResume);
      
      localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
      setSavedResumes(updatedResumes);
      
      toast.success("Resume saved successfully");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    }
  };

  const loadResume = async (id: string) => {
    try {
      const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      const resume = savedResumes.find((r: ResumeData) => r.id === id);
      
      if (resume) {
        setResumeData(resume);
        toast.success("Resume loaded successfully");
      } else {
        toast.error("Resume not found");
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      toast.error("Failed to load resume");
    }
  };

  const loadSavedResumes = async () => {
    try {
      const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      setSavedResumes(savedResumes);
    } catch (error) {
      console.error("Error loading saved resumes:", error);
      toast.error("Failed to load saved resumes");
    }
  };

  // Load saved resumes on component mount
  useEffect(() => {
    loadSavedResumes();
  }, []);

  const value = {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addProject,
    updateProject,
    removeProject,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addCertification,
    updateCertification,
    removeCertification,
    updateHobbies,
    updateTemplate,
    saveResume,
    loadResume,
    savedResumes,
    loadSavedResumes,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
