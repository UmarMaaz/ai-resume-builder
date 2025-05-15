
import React from "react";
import { ResumeData } from "@/types/resume";

interface ATSTemplateProps {
  data: ResumeData;
}

const ATSTemplate: React.FC<ATSTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="p-6 font-sans text-black text-sm">
      {/* Header - Clean, minimal formatting for ATS */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      {/* Skills - Keywords for ATS */}
      {skillsList.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold uppercase mb-2">Skills</h2>
          <p className="text-sm">{skillsList.join(', ')}</p>
        </div>
      )}

      {/* Work Experience - Clear structure for ATS parsing */}
      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold uppercase mb-2">Professional Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="font-bold">{exp.jobTitle || "Position"}</div>
                <div className="text-sm">{exp.duration || "Duration"}</div>
                <p className="mt-1 text-sm">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold uppercase mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="font-bold">{project.title || "Project Title"}</div>
                <p className="mt-1 text-sm">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold uppercase mb-2">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="font-bold">{edu.degree || "Degree"}</div>
                <div className="text-sm">{edu.institute || "Institute"}</div>
                <div className="text-sm">{edu.year || "Year"}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="mb-4">
          <h2 className="text-base font-bold uppercase mb-2">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-bold">{cert.name || "Certification"}</div>
                {cert.issuer && <div className="text-sm">{cert.issuer}</div>}
                {cert.year && <div className="text-sm">{cert.year}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies && (
        <div>
          <h2 className="text-base font-bold uppercase mb-2">Interests</h2>
          <p className="text-sm">{hobbies}</p>
        </div>
      )}
    </div>
  );
};

export default ATSTemplate;
