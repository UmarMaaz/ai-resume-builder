
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

interface AIAssistantProps {
  inputText: string;
  onGeneratedText: (text: string) => void;
  type: "project" | "experience" | "improve";
}

// Gemini API key
const API_KEY = "AIzaSyBcklilewKoMufw_r3zwlFgDqAzuUbujvs";

const AIAssistant: React.FC<AIAssistantProps> = ({
  inputText,
  onGeneratedText,
  type,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first to generate suggestions.");
      return;
    }

    setIsGenerating(true);

    try {
      let prompt = "";
      
      if (type === "project") {
        prompt = `Write a professional and detailed project description for a project titled "${inputText}". The description should be one paragraph long, highlight technical skills used, and explain the purpose and impact of the project. Make it suitable for a resume.`;
      } else if (type === "experience") {
        prompt = `Write a professional job description for the role of "${inputText}". The description should be one paragraph long, highlight responsibilities, achievements, and skills used. Make it suitable for a resume.`;
      } else {
        // improve text
        prompt = `Improve this text to make it more professional and suitable for a resume: "${inputText}". Keep approximately the same length but enhance the wording and impact.`;
      }

      console.log("Making Gemini API request with prompt:", prompt);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", response.status, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const generatedText = data.candidates[0].content.parts[0].text;
        onGeneratedText(generatedText);
        toast.success("AI suggestion generated!");
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        console.error("Content blocked:", data.promptFeedback);
        throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
      } else {
        console.error("Unexpected API response format:", data);
        throw new Error("Failed to generate content: Invalid API response format");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Fallback to mock responses if API fails
      const mockResponse = mockGeminiResponse(inputText, type);
      onGeneratedText(mockResponse);
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback mock responses
  const mockGeminiResponse = (input: string, type: string): string => {
    if (!input.trim()) {
      return "Please provide some initial text to generate a description.";
    }

    if (type === "project") {
      const projectResponses = [
        `Developed a ${input} using modern web technologies including React, TypeScript, and Node.js. Implemented responsive design principles to ensure optimal user experience across all devices. Integrated with third-party APIs to enhance functionality and user experience.`,
        `Created a feature-rich ${input} that streamlines workflow processes and improves productivity. Architected with scalability in mind, utilizing cloud infrastructure for deployment. Incorporated user feedback through multiple iterations to refine the user interface and experience.`,
        `Designed and implemented a comprehensive ${input} solution that addresses key business needs. Applied best practices in code organization and documentation. Collaborated with stakeholders to ensure the final product met all requirements and exceeded expectations.`
      ];
      return projectResponses[Math.floor(Math.random() * projectResponses.length)];
    } else if (type === "experience") {
      const experienceResponses = [
        `As a ${input}, led cross-functional teams in developing and maintaining enterprise-level applications. Collaborated with product managers to define project requirements and timelines. Mentored junior developers and conducted code reviews to ensure code quality and consistency.`,
        `Working as a ${input}, spearheaded the adoption of agile methodologies resulting in a 30% increase in team productivity. Designed and implemented microservices architecture to improve system scalability and maintainability. Participated in client meetings to gather requirements and provide technical expertise.`,
        `In my role as ${input}, managed full software development lifecycle from planning to deployment. Reduced system downtime by 40% through implementation of robust testing strategies. Collaborated with UI/UX designers to create intuitive and user-friendly interfaces.`
      ];
      return experienceResponses[Math.floor(Math.random() * experienceResponses.length)];
    } else {
      // improve text
      return `Enhanced and professionally reworded: ${input}`;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleGenerate}
      disabled={isGenerating || !inputText.trim()}
      className="h-7"
    >
      {isGenerating ? (
        <>
          <div className="h-3 w-3 mr-1 border-2 border-t-resume-accent border-gray-200 border-solid rounded-full animate-spin"></div>
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-3 w-3 mr-1 text-resume-accent" />
          {type === "improve" ? "Improve Text" : "Generate Description"}
        </>
      )}
    </Button>
  );
};

export default AIAssistant;
