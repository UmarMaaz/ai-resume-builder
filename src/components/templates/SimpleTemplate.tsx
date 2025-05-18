
import React from "react";
import { ResumeData } from "@/types/resume";

interface SimpleTemplateProps {
  data: ResumeData;
}

const SimpleTemplate: React.FC<SimpleTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="p-6 font-sans text-resume-dark text-xs">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-3 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
        </div>
      </div>

      {/* Skills */}
      {skillsList.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 mb-1.5 pb-0.5">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-100 px-1.5 py-0.5 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-0.5">Work Experience</h2>
          <div className="space-y-3">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xs">{exp.jobTitle || "Position"}</h3>
                  <span className="text-xs text-gray-600">{exp.duration || "Duration"}</span>
                </div>
                <p className="text-xs mt-0.5 leading-tight">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-0.5">Education</h2>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-xs">{edu.degree || "Degree"}</h3>
                  <p className="text-xs">{edu.institute || "Institute"}</p>
                </div>
                <span className="text-xs text-gray-600">{edu.year || "Year"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-0.5">Projects</h2>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold text-xs">{project.title || "Project Title"}</h3>
                <p className="text-xs mt-0.5 leading-tight">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-0.5">Certifications</h2>
          <div className="space-y-1.5">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-xs">{cert.name || "Certification Name"}</h3>
                  {cert.issuer && <p className="text-xs">{cert.issuer}</p>}
                </div>
                {cert.year && <span className="text-xs text-gray-600">{cert.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies && (
        <div>
          <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-0.5">Hobbies & Interests</h2>
          <p className="text-xs">{hobbies}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleTemplate;
