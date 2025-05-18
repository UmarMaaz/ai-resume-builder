
import React from "react";
import { ResumeData } from "@/types/resume";

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="font-serif text-xs">
      {/* Header with elegant styling */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap gap-3 mt-1 text-gray-300 text-xs">
            {personalInfo.email && <span className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-1"></span>{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-1"></span>{personalInfo.phone}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Skills */}
        {skillsList.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm border-b-2 border-gray-300 pb-1 mb-2 font-semibold">CORE COMPETENCIES</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {skillsList.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1 h-1 bg-gray-800 rounded-full mr-1"></div>
                  <span className="text-xs">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm border-b-2 border-gray-300 pb-1 mb-2 font-semibold">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-3">
              {workExperience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold uppercase text-xs">{exp.jobTitle || "Position"}</h3>
                    <span className="text-xs font-medium text-gray-600">{exp.duration || "Duration"}</span>
                  </div>
                  <p className="mt-1 text-xs leading-snug">{exp.description || "Job description"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm border-b-2 border-gray-300 pb-1 mb-2 font-semibold">KEY INITIATIVES</h2>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold text-xs">{project.title || "Project Title"}</h3>
                  <p className="mt-0.5 text-xs leading-snug">{project.description || "Project description"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two column layout for education and certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          <div>
            {education.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm border-b-2 border-gray-300 pb-1 mb-2 font-semibold">EDUCATION</h2>
                <div className="space-y-2">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <div className="font-bold text-xs">{edu.degree || "Degree"}</div>
                      <div className="text-xs">{edu.institute || "Institute"}</div>
                      <div className="text-xs text-gray-600">{edu.year || "Year"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Certifications */}
            {certifications.length > 0 && certifications[0].name && (
              <div className="mb-4">
                <h2 className="text-sm border-b-2 border-gray-300 pb-1 mb-2 font-semibold">CERTIFICATIONS</h2>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <div className="font-bold text-xs">{cert.name || "Certification"}</div>
                      {cert.issuer && <div className="text-xs">{cert.issuer}</div>}
                      {cert.year && <div className="text-xs text-gray-600">{cert.year}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {hobbies && (
              <div>
                <h2 className="text-sm border-b-2 border-gray-300 pb-1 mb-2 font-semibold">INTERESTS</h2>
                <p className="text-xs">{hobbies}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
