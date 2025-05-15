
import React from "react";
import { useResumeContext } from "@/context/ResumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const TemplateSelector = () => {
  const { resumeData, updateTemplate } = useResumeContext();

  const templates = [
    {
      id: "simple",
      name: "Simple",
      description: "Clean and straightforward layout",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with bold accents",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Elegant and spacious layout",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional corporate style",
    },
    {
      id: "compact",
      name: "Compact",
      description: "Space-efficient design for more content",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Colorful and unique presentation",
    },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="font-medium">Choose a template</div>
          <RadioGroup
            value={resumeData.selectedTemplate}
            onValueChange={(value) => updateTemplate(value as any)}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {templates.map((template) => (
              <div key={template.id}>
                <RadioGroupItem
                  value={template.id}
                  id={template.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={template.id}
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                    resumeData.selectedTemplate === template.id && "border-resume-accent"
                  )}
                >
                  <div className="h-4 w-4 rounded-full bg-resume-accent mb-2"></div>
                  <div className="font-semibold">{template.name}</div>
                  <div className="text-xs text-center text-muted-foreground">
                    {template.description}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
