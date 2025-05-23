
import React from "react";
import { ResumeData } from "@/types/resume";

interface CompactTemplateProps {
  data: ResumeData;
}

const CompactTemplate: React.FC<CompactTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="p-4 font-sans text-resume-dark text-[10px]">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-base font-bold mb-0.5">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-2 text-[10px]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Left Column */}
        <div className="col-span-1 space-y-2">
          {/* Skills */}
          {skillsList.length > 0 && (
            <div>
              <h2 className="text-xs font-bold border-b border-gray-300 mb-0.5 pb-0.5">Skills</h2>
              <div className="flex flex-wrap gap-0.5">
                {skillsList.map((skill, index) => (
                  <span key={index} className="text-[10px]">{skill}{index < skillsList.length - 1 ? "," : ""} </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold border-b border-gray-300 mb-0.5 pb-0.5">Education</h2>
              <div className="space-y-1.5">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="font-semibold text-[10px]">{edu.degree || "Degree"}</div>
                    <div className="text-[10px]">{edu.institute || "Institute"}</div>
                    <div className="text-[10px] text-gray-600">{edu.year || "Year"}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div>
              <h2 className="text-xs font-bold border-b border-gray-300 mb-0.5 pb-0.5">Certifications</h2>
              <div className="space-y-1">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-[10px]">
                    <div className="font-semibold">{cert.name || "Certification"}</div>
                    {cert.issuer && <div>{cert.issuer}</div>}
                    {cert.year && <div className="text-gray-600">{cert.year}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && (
            <div>
              <h2 className="text-xs font-bold border-b border-gray-300 mb-0.5 pb-0.5">Interests</h2>
              <p className="text-[10px]">{hobbies}</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-2 border-l pl-2">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold border-b border-gray-300 mb-0.5 pb-0.5">Work Experience</h2>
              <div className="space-y-1.5">
                {workExperience.map((exp, index) => (
                  <div key={index} className="mb-1">
                    <div className="flex justify-between items-baseline">
                      <div className="font-semibold text-[10px]">{exp.jobTitle || "Position"}</div>
                      <div className="text-gray-500 text-[10px]">{exp.duration || "Duration"}</div>
                    </div>
                    <p className="text-[10px] mt-0.5 leading-tight">{exp.description || "Job description"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold border-b border-gray-300 mb-0.5 pb-0.5">Projects</h2>
              <div className="space-y-1.5">
                {projects.map((project, index) => (
                  <div key={index} className="mb-1">
                    <div className="font-semibold text-[10px]">{project.title || "Project Title"}</div>
                    <p className="text-[10px] mt-0.5 leading-tight">{project.description || "Project description"}</p>
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

export default CompactTemplate;
