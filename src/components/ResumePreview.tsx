
import React from "react";
import { useResumeContext } from "@/context/ResumeContext";
import SimpleTemplate from "./templates/SimpleTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CompactTemplate from "./templates/CompactTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import ATSTemplate from "./templates/ATSTemplate";

const ResumePreview = () => {
  const { resumeData } = useResumeContext();
  
  return (
    <div id="resume-preview" className="w-full min-h-[842px] bg-white overflow-auto scale-100">
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
      {resumeData.selectedTemplate === "compact" && (
        <CompactTemplate data={resumeData} />
      )}
      {resumeData.selectedTemplate === "creative" && (
        <CreativeTemplate data={resumeData} />
      )}
      {resumeData.selectedTemplate === "executive" && (
        <ExecutiveTemplate data={resumeData} />
      )}
      {resumeData.selectedTemplate === "ats" && (
        <ATSTemplate data={resumeData} />
      )}
    </div>
  );
};

export default ResumePreview;
