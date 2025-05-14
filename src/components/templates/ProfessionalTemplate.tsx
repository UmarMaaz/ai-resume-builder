
import React from "react";
import { ResumeData } from "@/types/resume";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="font-serif">
      {/* Header */}
      <div className="bg-resume-dark text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center gap-6 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {skillsList.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-dark border-b-2 border-resume-accent pb-1">
              PROFESSIONAL SKILLS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {skillsList.map((skill, index) => (
                <div key={index} className="flex items-baseline">
                  <div className="w-1 h-1 bg-resume-dark rounded-full mr-2"></div>
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-dark border-b-2 border-resume-accent pb-1">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{exp.jobTitle || "Position"}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.duration || "Duration"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{exp.description || "Job description"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-dark border-b-2 border-resume-accent pb-1">
              KEY PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <h3 className="font-bold">{project.title || "Project Title"}</h3>
                  <p className="mt-1 text-sm">
                    {project.description || "Project description"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Education */}
          <div className="md:w-1/2">
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 text-resume-dark border-b-2 border-resume-accent pb-1">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="pl-4 border-l-2 border-gray-200">
                      <h3 className="font-bold">
                        {edu.degree || "Degree"}
                      </h3>
                      <p className="text-sm">{edu.institute || "Institute"}</p>
                      <p className="text-sm text-gray-500">{edu.year || "Year"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            {/* Certifications */}
            {certifications.length > 0 && certifications[0].name && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 text-resume-dark border-b-2 border-resume-accent pb-1">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h3 className="font-bold">
                        {cert.name || "Certification"}
                      </h3>
                      {cert.issuer && (
                        <p className="text-sm">{cert.issuer}</p>
                      )}
                      {cert.year && (
                        <p className="text-sm text-gray-500">{cert.year}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {hobbies && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-resume-dark border-b-2 border-resume-accent pb-1">
                  INTERESTS
                </h2>
                <p className="text-sm pl-4 border-l-2 border-gray-200">
                  {hobbies}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
