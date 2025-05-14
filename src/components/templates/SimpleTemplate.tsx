
import React from "react";
import { ResumeData } from "@/types/resume";

interface SimpleTemplateProps {
  data: ResumeData;
}

const SimpleTemplate: React.FC<SimpleTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="p-8 font-sans text-resume-dark">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-4 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
        </div>
      </div>

      {/* Skills */}
      {skillsList.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{exp.jobTitle || "Position"}</h3>
                  <span className="text-sm text-gray-600">{exp.duration || "Duration"}</span>
                </div>
                <p className="text-sm mt-1">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                  <p className="text-sm">{edu.institute || "Institute"}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.year || "Year"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1">Projects</h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">{project.title || "Project Title"}</h3>
                <p className="text-sm mt-1">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{cert.name || "Certification Name"}</h3>
                  {cert.issuer && <p className="text-sm">{cert.issuer}</p>}
                </div>
                {cert.year && <span className="text-sm text-gray-600">{cert.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies && (
        <div>
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1">Hobbies & Interests</h2>
          <p className="text-sm">{hobbies}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleTemplate;
