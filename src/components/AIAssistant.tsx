
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

interface AIAssistantProps {
  inputText: string;
  onGeneratedText: (text: string) => void;
  type: "project" | "experience" | "improve";
}

// For now, we'll mock the Gemini API response
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

const AIAssistant: React.FC<AIAssistantProps> = ({
  inputText,
  onGeneratedText,
  type,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first to generate suggestions.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const generatedText = mockGeminiResponse(inputText, type);
      onGeneratedText(generatedText);
      setIsGenerating(false);
      toast.success("AI suggestion generated!");
    }, 1500);

    // In a real implementation, this would call the Gemini API
    // const response = await fetch('https://api.example.com/gemini', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text: inputText, type }),
    // });
    // const data = await response.json();
    // onGeneratedText(data.generatedText);
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
