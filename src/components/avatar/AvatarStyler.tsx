import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';

interface AvatarStylerProps {
  onStyleComplete?: () => void;
}

const AvatarStyler: React.FC<AvatarStylerProps> = ({ onStyleComplete }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Read the file and convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAvatar(result);
      setIsUploading(false);
      
      toast({
        title: "Avatar updated",
        description: "Your avatar has been updated successfully.",
      });
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleDone = () => {
    if (onStyleComplete) {
      onStyleComplete();
    }
    
    toast({
      title: "Avatar styling complete",
      description: "Your avatar styling preferences have been saved.",
    });
  };

  const getInitials = () => {
    if (!user) return "?";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Personalize Your Avatar</CardTitle>
        <CardDescription>
          Upload your photo or customize an avatar to get outfit recommendations tailored to you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32">
            {avatar ? (
              <AvatarImage src={avatar} alt="Your avatar" />
            ) : (
              <AvatarFallback className="bg-styleklick-purple text-white text-3xl">
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              disabled={isUploading}
            >
              <Label htmlFor="avatar-upload" className="cursor-pointer flex items-center gap-2">
                <Upload size={16} />
                <span>Upload Photo</span>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "Avatar customization is coming soon! For now, you can upload a photo.",
                });
              }}
            >
              <User size={16} />
              <span>Customize</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Style Preferences</h3>
          <p className="text-sm text-gray-500">
            Your outfit recommendations will be tailored based on your avatar and style preferences.
          </p>
          
          <Button className="w-full" onClick={handleDone}>
            Continue to Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvatarStyler;
