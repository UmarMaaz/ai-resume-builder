
import React from "react";
import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="flex flex-col min-h-full text-xs">
      {/* Header */}
      <div className="bg-resume-blue text-white p-5">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-3 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-100 p-4 md:w-1/3">
          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold mb-2 text-resume-blue">SKILLS</h2>
              <div className="space-y-1">
                {skillsList.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-resume-blue rounded-full mr-1.5"></div>
                    <span className="text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold mb-2 text-resume-blue">EDUCATION</h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-xs">{edu.degree || "Degree"}</h3>
                    <p className="text-xs">{edu.institute || "Institute"}</p>
                    <p className="text-xs text-gray-600">{edu.year || "Year"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div className="mb-5">
              <h2 className="text-sm font-bold mb-2 text-resume-blue">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-xs">{cert.name || "Certification"}</h3>
                    {cert.issuer && <p className="text-xs">{cert.issuer}</p>}
                    {cert.year && <p className="text-xs text-gray-600">{cert.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && (
            <div>
              <h2 className="text-sm font-bold mb-2 text-resume-blue">INTERESTS</h2>
              <p className="text-xs">{hobbies}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-4 md:w-2/3">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold mb-3 border-b-2 border-resume-blue pb-1">WORK EXPERIENCE</h2>
              <div className="space-y-4">
                {workExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-xs">{exp.jobTitle || "Position"}</h3>
                      <span className="text-xs text-gray-600">{exp.duration || "Duration"}</span>
                    </div>
                    <p className="mt-1 text-xs">{exp.description || "Job description"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-3 border-b-2 border-resume-blue pb-1">PROJECTS</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-xs">{project.title || "Project Title"}</h3>
                    <p className="mt-1 text-xs">{project.description || "Project description"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
