
import React from "react";
import { ResumeData } from "@/types/resume";

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="min-h-full bg-white text-xs">
      {/* Header with diagonal design */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
          <div className="mt-2 space-y-1 text-xs">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-4">
          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-purple-600 mb-2 pb-1 border-b border-purple-200">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1">
                {skillsList.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-purple-600 mb-2 pb-1 border-b border-purple-200">
                EDUCATION
              </h2>
              <div className="space-y-2">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-3 border-l-2 border-purple-200">
                    <h3 className="font-medium text-xs">{edu.degree || "Degree"}</h3>
                    <p className="text-xs">{edu.institute || "Institute"}</p>
                    <p className="text-xs text-gray-500">{edu.year || "Year"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-purple-600 mb-2 pb-1 border-b border-purple-200">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="relative pl-3 border-l-2 border-purple-200">
                    <h3 className="font-medium text-xs">{cert.name || "Certification"}</h3>
                    {cert.issuer && <p className="text-xs">{cert.issuer}</p>}
                    {cert.year && <p className="text-xs text-gray-500">{cert.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && (
            <div>
              <h2 className="text-sm font-bold text-purple-600 mb-2 pb-1 border-b border-purple-200">
                INTERESTS
              </h2>
              <p className="text-xs pl-3 border-l-2 border-purple-200">{hobbies}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold text-pink-600 mb-3 pb-1 border-b border-pink-200">
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                {workExperience.map((exp, index) => (
                  <div key={index} className="relative pl-4 before:content-[''] before:absolute before:h-full before:w-0.5 before:bg-pink-200 before:left-0 before:top-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-xs">{exp.jobTitle || "Position"}</h3>
                      <span className="text-xs text-gray-500">{exp.duration || "Duration"}</span>
                    </div>
                    <p className="mt-1 text-xs leading-snug">{exp.description || "Job description"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-pink-600 mb-3 pb-1 border-b border-pink-200">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div key={index} className="relative pl-4 before:content-[''] before:absolute before:h-full before:w-0.5 before:bg-pink-200 before:left-0 before:top-0">
                    <h3 className="font-semibold text-xs">{project.title || "Project Title"}</h3>
                    <p className="mt-1 text-xs leading-snug">{project.description || "Project description"}</p>
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

export default CreativeTemplate;
