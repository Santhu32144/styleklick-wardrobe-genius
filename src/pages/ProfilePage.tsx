
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navigate } from 'react-router-dom';
import { Edit2, Camera, User } from 'lucide-react';

const ProfilePage = () => {
  const { user, profile, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // If not authenticated, redirect to login
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ returnTo: '/profile' }} />;
  }

  React.useEffect(() => {
    if (profile) {
      setGender(profile.gender || null);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user && updateProfile) {
      await updateProfile({ gender });
      setIsEditing(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setAvatarFile(file);
    
    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user) return "?";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-12 bg-gray-50 min-h-screen">
          <div className="container max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <p>Loading profile...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container max-w-2xl mx-auto">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between pb-2">
              <div className="flex items-center">
                <div className="relative group">
                  <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt={user?.email || "User"} />
                    ) : (
                      <AvatarFallback className="bg-styleklick-purple text-white text-xl">
                        {getInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Camera size={16} className="text-styleklick-purple" />
                    </Label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <CardTitle className="text-2xl">{user?.email}</CardTitle>
                  <CardDescription>Member since {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>

            <CardContent className="pt-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={gender || ""} 
                      onValueChange={(val) => setGender(val as 'male' | 'female')}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{user?.email || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{user?.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p>{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
