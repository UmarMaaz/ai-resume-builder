
import React from "react";
import { ResumeData } from "@/types/resume";

interface ATSTemplateProps {
  data: ResumeData;
}

const ATSTemplate: React.FC<ATSTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="p-5 font-sans text-black text-xs">
      {/* Header - Clean, minimal formatting for ATS */}
      <div className="mb-3 text-center">
        <h1 className="text-lg font-bold">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-2 mt-1 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      {/* Skills - Keywords for ATS */}
      {skillsList.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase mb-1">Skills</h2>
          <p className="text-xs">{skillsList.join(', ')}</p>
        </div>
      )}

      {/* Work Experience - Clear structure for ATS parsing */}
      {workExperience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase mb-1">Professional Experience</h2>
          <div className="space-y-3">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="font-bold text-xs">{exp.jobTitle || "Position"}</div>
                <div className="text-xs">{exp.duration || "Duration"}</div>
                <p className="mt-0.5 text-xs leading-snug">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase mb-1">Projects</h2>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="font-bold text-xs">{project.title || "Project Title"}</div>
                <p className="mt-0.5 text-xs leading-snug">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase mb-1">Education</h2>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="font-bold text-xs">{edu.degree || "Degree"}</div>
                <div className="text-xs">{edu.institute || "Institute"}</div>
                <div className="text-xs">{edu.year || "Year"}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase mb-1">Certifications</h2>
          <div className="space-y-1.5">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-bold text-xs">{cert.name || "Certification"}</div>
                {cert.issuer && <div className="text-xs">{cert.issuer}</div>}
                {cert.year && <div className="text-xs">{cert.year}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies && (
        <div>
          <h2 className="text-sm font-bold uppercase mb-1">Interests</h2>
          <p className="text-xs">{hobbies}</p>
        </div>
      )}
    </div>
  );
};

export default ATSTemplate;
