
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload, User, image } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/components/auth/AuthContext';
import ImageEditor from './ImageEditor';

interface AvatarStylerProps {
  onStyleComplete?: () => void;
}

const AvatarStyler: React.FC<AvatarStylerProps> = ({ onStyleComplete }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();
  const { user, profile, uploadAvatar } = useAuth();
  
  // Initialize avatar from profile if available
  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatar(profile.avatar_url);
    }
  }, [profile]);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    
    setSelectedFile(file);
    setShowEditor(true);
  };
  
  const handleEditedImageSave = async (editedImageBlob: Blob) => {
    setIsUploading(true);
    
    try {
      // Convert blob to file with original file metadata
      const fileName = selectedFile?.name || "edited-profile-picture.jpg";
      const fileType = selectedFile?.type || "image/jpeg";
      
      const editedFile = new File([editedImageBlob], fileName, {
        type: fileType,
      });
      
      // Upload to Supabase storage
      const avatarUrl = await uploadAvatar(editedFile);
      
      if (avatarUrl) {
        setAvatar(avatarUrl);
        toast({
          title: "Success",
          description: "Your profile picture has been updated.",
        });
      }
      
      // Close the editor
      setShowEditor(false);
      setSelectedFile(null);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleEditorCancel = () => {
    setShowEditor(false);
    setSelectedFile(null);
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
    if (profile?.name) {
      const nameParts = profile.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return profile.name.substring(0, 2).toUpperCase();
    }
    
    if (!user) return "?";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };
  
  return (
    <>
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
                  <span>{isUploading ? "Uploading..." : "Upload Photo"}</span>
                </Label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
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

      {/* Image Editor Modal */}
      <ImageEditor
        image={selectedFile}
        onSave={handleEditedImageSave}
        onCancel={handleEditorCancel}
        isOpen={showEditor}
      />
    </>
  );
};

export default AvatarStyler;
