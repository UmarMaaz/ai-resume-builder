
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Header from "@/components/Header";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { ResumeProvider } from "@/context/ResumeContext";
import html2pdf from "html2pdf.js";
import Footer from "@/components/Footer";

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
  },
  education: [
    {
      degree: "",
      year: "",
      institute: "",
    },
  ],
  skills: "",
  projects: [
    {
      title: "",
      description: "",
    },
  ],
  workExperience: [
    {
      jobTitle: "",
      duration: "",
      description: "",
    },
  ],
  certifications: [
    {
      name: "",
      issuer: "",
      year: "",
    },
  ],
  hobbies: "",
  selectedTemplate: "simple",
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load saved data from localStorage if it exists
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        // Parse and validate the saved data
        const parsedData = JSON.parse(savedData);
        // If you want to validate the structure, you can add validation here
      } catch (error) {
        console.error("Error loading saved resume data:", error);
        toast.error("Could not load your saved resume. Starting fresh.");
        localStorage.removeItem("resumeData");
      }
    }
    setIsLoading(false);
  }, []);

  const handleExportToPDF = () => {
    const resumeElement = document.getElementById("resume-preview");
    if (!resumeElement) {
      toast.error("Could not export resume. Please try again.");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    toast.promise(
      html2pdf().set(opt).from(resumeElement).save(),
      {
        loading: "Generating PDF...",
        success: "Resume exported to PDF!",
        error: "Failed to export resume",
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-t-resume-accent border-gray-200 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <ResumeProvider initialData={initialResumeData}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Tabs defaultValue="edit" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="edit">Edit Resume</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <Button onClick={handleExportToPDF} className="bg-resume-accent hover:bg-resume-accent/90">
                Export to PDF
              </Button>
            </div>
            <TabsContent value="edit" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ResumeForm />
                <div className="hidden lg:block">
                  <h2 className="text-xl font-semibold mb-4 text-resume-dark">Live Preview</h2>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <ResumePreview />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="animate-fade-in">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <ResumePreview />
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </ResumeProvider>
  );
};

export default Index;
