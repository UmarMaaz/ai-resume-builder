
import React from "react";
import { FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="text-resume-accent h-7 w-7 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-resume-dark">
            Resume Builder
            <span className="text-resume-accent">AI</span>
          </h1>
        </div>
        <div className="text-sm text-resume-gray">
          <span>Build your professional resume with AI</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
