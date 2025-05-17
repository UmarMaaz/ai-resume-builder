
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, isAuthenticated, isLoading } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      console.log("Initiating Google sign-in");
      await loginWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during sign in");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-t-resume-accent border-gray-200 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in with Google</CardTitle>
            <CardDescription className="text-center">
              Use your Google account to sign in and manage your resumes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-white text-black border hover:bg-gray-100"
              variant="outline"
            >
              <FcGoogle className="h-5 w-5" />
              Sign in with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
