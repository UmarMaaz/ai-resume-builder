import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

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
  const { user, isAuthenticated } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load from localStorage first (fallback for non-authenticated users)
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Failed to parse stored resume data', e);
        return initialData;
      }
    }
    return initialData;
  });

  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);

  // Save to localStorage as a fallback when not authenticated
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Load user's resumes from Supabase when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadSavedResumes();
    }
  }, [isAuthenticated, user]);

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

  // Database functions with Supabase
  const saveResume = async () => {
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to save a resume", {
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/signin",
        },
      });
      return;
    }

    try {
      const now = new Date().toISOString();
      const userId = parseInt(user.id);
      
      const resumeToSave = {
        ...resumeData,
        userId: userId,
        updatedAt: now,
        createdAt: resumeData.createdAt || now,
      };

      // If resume has an ID, update it, otherwise insert a new one
      if (resumeData.id) {
        const { error } = await supabase
          .from('resumes')
          .update({
            data: resumeToSave,
            updated_at: now,
          })
          .eq('id', resumeData.id)
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert({
            user_id: userId,
            data: resumeToSave,
            created_at: now,
            updated_at: now,
          })
          .select('id')
          .single();

        if (error) throw error;
        
        // Update local resume with new ID
        setResumeData(prev => ({ 
          ...prev, 
          id: data.id, 
          createdAt: now, 
          updatedAt: now 
        }));
      }
      
      toast.success("Resume saved successfully");
      
      // Refresh the list of saved resumes
      await loadSavedResumes();
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    }
  };

  const loadResume = async (id: string) => {
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to load a resume");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('data')
        .eq('id', id)
        .eq('user_id', parseInt(user.id))
        .single();

      if (error) throw error;
      
      if (data && data.data) {
        setResumeData(data.data);
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
    if (!isAuthenticated || !user) {
      setSavedResumes([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('id, created_at, updated_at, data')
        .eq('user_id', parseInt(user.id))
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      const formattedResumes = data.map(item => ({
        ...item.data,
        id: item.id,
        updatedAt: item.updated_at,
        createdAt: item.created_at
      }));

      setSavedResumes(formattedResumes);
    } catch (error) {
      console.error("Error loading saved resumes:", error);
      toast.error("Failed to load saved resumes");
    }
  };

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
