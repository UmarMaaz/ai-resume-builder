
import React from "react";
import { useResumeContext } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TemplateSelector from "./TemplateSelector";
import { Plus, X, ArrowRight, Download } from "lucide-react";
import AIAssistant from "./AIAssistant";

const ResumeForm = () => {
  const {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addProject,
    updateProject,
    removeProject,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addCertification,
    updateCertification,
    removeCertification,
    updateHobbies,
  } = useResumeContext();

  return (
    <div className="space-y-6">
      <TemplateSelector />
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={addEducation}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.education.map((education, index) => (
            <div key={index} className="border rounded-md p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => removeEducation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`degree-${index}`}>Degree/Certificate</Label>
                  <Input
                    id={`degree-${index}`}
                    value={education.degree}
                    onChange={(e) =>
                      updateEducation(index, { degree: e.target.value })
                    }
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`institute-${index}`}>Institute</Label>
                    <Input
                      id={`institute-${index}`}
                      value={education.institute}
                      onChange={(e) =>
                        updateEducation(index, { institute: e.target.value })
                      }
                      placeholder="University of Technology"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`year-${index}`}>Year</Label>
                    <Input
                      id={`year-${index}`}
                      value={education.year}
                      onChange={(e) =>
                        updateEducation(index, { year: e.target.value })
                      }
                      placeholder="2018-2022"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {resumeData.education.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No education added yet. Click the button above to add your education.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Textarea
            id="skills"
            value={resumeData.skills}
            onChange={(e) => updateSkills(e.target.value)}
            placeholder="JavaScript, React, Node.js, Project Management, Communication"
            className="h-24"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Separate each skill with a comma (e.g., JavaScript, React, Node.js)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={addProject}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="border rounded-md p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => removeProject(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                  <Input
                    id={`project-title-${index}`}
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, { title: e.target.value })
                    }
                    placeholder="Portfolio Website"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`project-desc-${index}`}>Description</Label>
                    <AIAssistant
                      inputText={project.title}
                      onGeneratedText={(text) => 
                        updateProject(index, { description: text })
                      }
                      type="project"
                    />
                  </div>
                  <Textarea
                    id={`project-desc-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, { description: e.target.value })
                    }
                    placeholder="Developed a responsive portfolio website using React and Tailwind CSS."
                    className="h-24"
                  />
                </div>
              </div>
            </div>
          ))}
          {resumeData.projects.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No projects added yet. Click the button above to add your projects.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={addWorkExperience}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.workExperience.map((experience, index) => (
            <div key={index} className="border rounded-md p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => removeWorkExperience(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                    <Input
                      id={`job-title-${index}`}
                      value={experience.jobTitle}
                      onChange={(e) =>
                        updateWorkExperience(index, { jobTitle: e.target.value })
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`duration-${index}`}>Duration</Label>
                    <Input
                      id={`duration-${index}`}
                      value={experience.duration}
                      onChange={(e) =>
                        updateWorkExperience(index, { duration: e.target.value })
                      }
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`job-desc-${index}`}>Description</Label>
                    <AIAssistant
                      inputText={experience.jobTitle}
                      onGeneratedText={(text) => 
                        updateWorkExperience(index, { description: text })
                      }
                      type="experience"
                    />
                  </div>
                  <Textarea
                    id={`job-desc-${index}`}
                    value={experience.description}
                    onChange={(e) =>
                      updateWorkExperience(index, { description: e.target.value })
                    }
                    placeholder="Developed web applications using React and Node.js. Led a team of 3 developers."
                    className="h-24"
                  />
                </div>
              </div>
            </div>
          ))}
          {resumeData.workExperience.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No work experience added yet. Click the button above to add your work experience.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certifications (Optional)</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={addCertification}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Certification
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.certifications.map((certification, index) => (
            <div key={index} className="border rounded-md p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => removeCertification(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                  <Input
                    id={`cert-name-${index}`}
                    value={certification.name}
                    onChange={(e) =>
                      updateCertification(index, { name: e.target.value })
                    }
                    placeholder="AWS Certified Developer"
                  />
                </div>
                <div>
                  <Label htmlFor={`cert-year-${index}`}>Year</Label>
                  <Input
                    id={`cert-year-${index}`}
                    value={certification.year}
                    onChange={(e) =>
                      updateCertification(index, { year: e.target.value })
                    }
                    placeholder="2022"
                  />
                </div>
                <div className="md:col-span-3">
                  <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                  <Input
                    id={`cert-issuer-${index}`}
                    value={certification.issuer}
                    onChange={(e) =>
                      updateCertification(index, { issuer: e.target.value })
                    }
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>
            </div>
          ))}
          {resumeData.certifications.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No certifications added yet. Click the button above to add your certifications.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hobbies & Interests (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.hobbies}
            onChange={(e) => updateHobbies(e.target.value)}
            placeholder="Reading, Hiking, Photography, Cooking, Traveling"
            className="h-24"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeForm;
