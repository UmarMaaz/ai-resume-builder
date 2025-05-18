
import React from "react";
import { ResumeData } from "@/types/resume";

interface MinimalistTemplateProps {
  data: ResumeData;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="p-8 font-sans text-resume-dark text-xs">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-xl font-light mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-light text-gray-400 mb-3">EXPERIENCE</h2>
              <div className="space-y-4">
                {workExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-xs">{exp.jobTitle || "Position"}</h3>
                      <span className="text-xs text-gray-400">{exp.duration || "Duration"}</span>
                    </div>
                    <p className="mt-1 text-xs leading-snug text-gray-600">
                      {exp.description || "Job description"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-light text-gray-400 mb-3">PROJECTS</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-xs">{project.title || "Project Title"}</h3>
                    <p className="mt-1 text-xs leading-snug text-gray-600">
                      {project.description || "Project description"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3">
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-light text-gray-400 mb-3">EDUCATION</h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-xs">{edu.degree || "Degree"}</h3>
                    <p className="text-xs text-gray-600">{edu.institute || "Institute"}</p>
                    <p className="text-xs text-gray-400">{edu.year || "Year"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-light text-gray-400 mb-3">SKILLS</h2>
              <div className="flex flex-wrap gap-1">
                {skillsList.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs text-gray-600"
                  >
                    {skill}{index < skillsList.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div className="mb-6">
              <h2 className="text-sm font-light text-gray-400 mb-3">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-xs">{cert.name || "Certification"}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer || "Issuer"}</p>
                    <p className="text-xs text-gray-400">{cert.year || "Year"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && (
            <div>
              <h2 className="text-sm font-light text-gray-400 mb-3">INTERESTS</h2>
              <p className="text-xs text-gray-600">{hobbies}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
