
import React from "react";
import { ResumeData } from "@/types/resume";

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="font-serif">
      {/* Header with elegant styling */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-gray-300">
            {personalInfo.email && <span className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>{personalInfo.phone}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Skills */}
        {skillsList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl border-b-2 border-gray-300 pb-2 mb-4 font-semibold">CORE COMPETENCIES</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skillsList.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl border-b-2 border-gray-300 pb-2 mb-4 font-semibold">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold uppercase">{exp.jobTitle || "Position"}</h3>
                    <span className="text-sm font-medium text-gray-600">{exp.duration || "Duration"}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{exp.description || "Job description"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl border-b-2 border-gray-300 pb-2 mb-4 font-semibold">KEY INITIATIVES</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold">{project.title || "Project Title"}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{project.description || "Project description"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two column layout for education and certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl border-b-2 border-gray-300 pb-2 mb-4 font-semibold">EDUCATION</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <div className="font-bold">{edu.degree || "Degree"}</div>
                      <div className="text-sm">{edu.institute || "Institute"}</div>
                      <div className="text-sm text-gray-600">{edu.year || "Year"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Certifications */}
            {certifications.length > 0 && certifications[0].name && (
              <div className="mb-6">
                <h2 className="text-xl border-b-2 border-gray-300 pb-2 mb-4 font-semibold">CERTIFICATIONS</h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <div className="font-bold">{cert.name || "Certification"}</div>
                      {cert.issuer && <div className="text-sm">{cert.issuer}</div>}
                      {cert.year && <div className="text-sm text-gray-600">{cert.year}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {hobbies && (
              <div>
                <h2 className="text-xl border-b-2 border-gray-300 pb-2 mb-4 font-semibold">INTERESTS</h2>
                <p className="text-sm">{hobbies}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
