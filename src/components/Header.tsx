
import React from "react";
import { Link } from "react-router-dom";
import { FileText, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
  const { profile, isAuthenticated, logout, loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <FileText className="text-resume-accent h-7 w-7 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-resume-dark">
            Resume Builder
            <span className="text-resume-accent">AI</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-sm text-resume-gray hidden md:block">
            <span>Build your professional resume with AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center mr-2">
                  <Avatar className="h-9 w-9 mr-2">
                    {profile?.name && profile.name.includes("://") ? (
                      <AvatarImage src={profile?.name} alt={profile?.email} />
                    ) : (
                      <AvatarFallback>
                        {profile?.name ? profile.name.substring(0, 2).toUpperCase() : profile?.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium">{profile?.name || profile?.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => logout()} 
                  className="flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button 
                className="bg-white text-black border hover:bg-gray-100 flex items-center gap-1"
                size="sm"
                variant="outline"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="h-4 w-4" />
                <span className="hidden md:inline">Sign in with Google</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
