
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm py-4 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-resume-gray">
          <p>
            &copy; {new Date().getFullYear()} Resume BuilderAI. Create professional resumes with AI assistance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
