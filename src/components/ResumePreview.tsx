
import React from "react";
import { useResumeContext } from "@/context/ResumeContext";
import SimpleTemplate from "./templates/SimpleTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

const ResumePreview = () => {
  const { resumeData } = useResumeContext();
  
  return (
    <div id="resume-preview" className="w-full min-h-[842px] bg-white">
      {resumeData.selectedTemplate === "simple" && (
        <SimpleTemplate data={resumeData} />
      )}
      {resumeData.selectedTemplate === "modern" && (
        <ModernTemplate data={resumeData} />
      )}
      {resumeData.selectedTemplate === "minimalist" && (
        <MinimalistTemplate data={resumeData} />
      )}
      {resumeData.selectedTemplate === "professional" && (
        <ProfessionalTemplate data={resumeData} />
      )}
    </div>
  );
};

export default ResumePreview;
