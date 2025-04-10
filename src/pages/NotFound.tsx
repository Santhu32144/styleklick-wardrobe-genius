
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold gradient-heading mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! We can't find the page you're looking for.
        </p>
        <Button className="btn-primary" asChild>
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft size={18} />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
