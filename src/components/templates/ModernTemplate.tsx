
import React from "react";
import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills, projects, workExperience, certifications, hobbies } = data;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-resume-blue text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-100 p-6 md:w-1/3">
          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-resume-blue">SKILLS</h2>
              <div className="space-y-2">
                {skillsList.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-resume-blue rounded-full mr-2"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-resume-blue">EDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                    <p className="text-sm">{edu.institute || "Institute"}</p>
                    <p className="text-sm text-gray-600">{edu.year || "Year"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-resume-blue">CERTIFICATIONS</h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{cert.name || "Certification"}</h3>
                    {cert.issuer && <p className="text-sm">{cert.issuer}</p>}
                    {cert.year && <p className="text-sm text-gray-600">{cert.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-resume-blue">INTERESTS</h2>
              <p className="text-sm">{hobbies}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6 md:w-2/3">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-resume-blue pb-2">WORK EXPERIENCE</h2>
              <div className="space-y-6">
                {workExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{exp.jobTitle || "Position"}</h3>
                      <span className="text-sm text-gray-600">{exp.duration || "Duration"}</span>
                    </div>
                    <p className="mt-2">{exp.description || "Job description"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 border-b-2 border-resume-blue pb-2">PROJECTS</h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg">{project.title || "Project Title"}</h3>
                    <p className="mt-2">{project.description || "Project description"}</p>
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
