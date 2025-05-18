
import React from "react";
import { ResumeData } from "@/types/resume";

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="min-h-full bg-white text-[10px]">
      {/* Header with diagonal design */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h1 className="text-lg font-bold">{personalInfo.fullName || "Your Name"}</h1>
          <div className="mt-1 space-y-0.5 text-[10px]">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-3 gap-3">
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-3">
          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-purple-600 mb-1 pb-0.5 border-b border-purple-200">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-0.5">
                {skillsList.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-1 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[9px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-purple-600 mb-1 pb-0.5 border-b border-purple-200">
                EDUCATION
              </h2>
              <div className="space-y-1.5">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-2 border-l-2 border-purple-200">
                    <h3 className="font-medium text-[10px]">{edu.degree || "Degree"}</h3>
                    <p className="text-[10px]">{edu.institute || "Institute"}</p>
                    <p className="text-[10px] text-gray-500">{edu.year || "Year"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-purple-600 mb-1 pb-0.5 border-b border-purple-200">
                CERTIFICATIONS
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert, index) => (
                  <div key={index} className="relative pl-2 border-l-2 border-purple-200">
                    <h3 className="font-medium text-[10px]">{cert.name || "Certification"}</h3>
                    {cert.issuer && <p className="text-[10px]">{cert.issuer}</p>}
                    {cert.year && <p className="text-[10px] text-gray-500">{cert.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && (
            <div>
              <h2 className="text-xs font-bold text-purple-600 mb-1 pb-0.5 border-b border-purple-200">
                INTERESTS
              </h2>
              <p className="text-[10px] pl-2 border-l-2 border-purple-200">{hobbies}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-pink-600 mb-2 pb-0.5 border-b border-pink-200">
                EXPERIENCE
              </h2>
              <div className="space-y-2">
                {workExperience.map((exp, index) => (
                  <div key={index} className="relative pl-3 before:content-[''] before:absolute before:h-full before:w-0.5 before:bg-pink-200 before:left-0 before:top-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[10px]">{exp.jobTitle || "Position"}</h3>
                      <span className="text-[10px] text-gray-500">{exp.duration || "Duration"}</span>
                    </div>
                    <p className="mt-0.5 text-[10px] leading-tight">{exp.description || "Job description"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-pink-600 mb-2 pb-0.5 border-b border-pink-200">
                PROJECTS
              </h2>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div key={index} className="relative pl-3 before:content-[''] before:absolute before:h-full before:w-0.5 before:bg-pink-200 before:left-0 before:top-0">
                    <h3 className="font-semibold text-[10px]">{project.title || "Project Title"}</h3>
                    <p className="mt-0.5 text-[10px] leading-tight">{project.description || "Project description"}</p>
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
