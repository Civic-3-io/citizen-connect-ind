import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            className="w-full"
          >
            Go Back
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'} 
            className="w-full btn-civic"
          >
            Return to Home
          </Button>
        </div>
        
        <div className="mt-8 text-xs text-muted-foreground">
          <p>🇮🇳 Civic Connect • Government of India</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
