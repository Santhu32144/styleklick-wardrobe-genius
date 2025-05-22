
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/auth/AuthContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navigate } from 'react-router-dom';
import { Edit2, Camera, User, Calendar, Heart, BookOpen, Image } from 'lucide-react';

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

  // Get user's name or display email as fallback
  const getUserDisplayName = () => {
    if (profile?.name) return profile.name;
    return user?.email?.split('@')[0] || "User";
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

  // Sample saved looks data
  const savedLooks = [
    {
      id: '1',
      name: 'Beach Day Look',
      date: 'May 23',
      imageUrl: '/placeholder.svg',
      tags: ['Summer', 'Casual', 'Beach']
    },
    {
      id: '2',
      name: 'Downtown Night Out',
      date: 'May 18',
      imageUrl: '/placeholder.svg',
      tags: ['Evening', 'Urban', 'Date']
    },
    {
      id: '3',
      name: 'Office Meeting',
      date: 'May 15',
      imageUrl: '/placeholder.svg',
      tags: ['Business', 'Formal', 'Professional']
    },
  ];

  // Sample upcoming styled events
  const upcomingEvents = [
    {
      id: '1',
      name: 'Wedding',
      date: 'June 15',
      outfitStatus: 'Selected'
    },
    {
      id: '2',
      name: 'Beach Vacation',
      date: 'July 3-10',
      outfitStatus: 'Planning'
    }
  ];

  // Get user initials for avatar fallback
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

  if (loading) {
    return (
      <Layout>
        <div className="py-12 bg-styleklick-soft-blue/10 min-h-screen">
          <div className="container max-w-6xl mx-auto">
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
      <div className="py-12 bg-styleklick-soft-blue/10 min-h-screen">
        <div className="container max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 border-0 shadow-airbnb overflow-hidden">
            <div className="bg-gradient-to-r from-styleklick-soft-blue to-styleklick-soft-purple h-32"></div>
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end -mt-16">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt={getUserDisplayName()} />
                    ) : (
                      <AvatarFallback className="bg-styleklick-purple text-white text-4xl">
                        {getInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Camera size={16} className="text-styleklick-airbnb-pink" />
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
                <div className="mt-4 md:mt-0 md:ml-6">
                  <CardTitle className="text-2xl">{getUserDisplayName()}</CardTitle>
                  <CardDescription>Member since {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</CardDescription>
                </div>
                <div className="flex-grow"></div>
                <Button 
                  variant="outline" 
                  className="mt-4 md:mt-0" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              {/* Profile Information */}
              <Card className="mb-8 shadow-airbnb border-0">
                <CardHeader>
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-styleklick-airbnb-pink" />
                    <CardTitle className="text-lg">Profile Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
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
                        <Button type="submit" className="bg-styleklick-airbnb-pink hover:bg-styleklick-airbnb-red">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Username</p>
                        <p>{getUserDisplayName()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{user?.email || "Not provided"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Gender</p>
                        <p>{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Not specified"}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="shadow-airbnb border-0">
                <CardHeader>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-styleklick-airbnb-pink" />
                    <CardTitle className="text-lg">Upcoming Styled Events</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{event.name}</h4>
                              <p className="text-sm text-gray-500">{event.date}</p>
                            </div>
                            <div>
                              <Badge variant="outline" className="bg-styleklick-soft-green/20 text-green-700 border-0">
                                {event.outfitStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        View All Events
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No upcoming events</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {/* Lookbook */}
              <Card className="shadow-airbnb border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-styleklick-airbnb-pink" />
                      <CardTitle className="text-lg">Your Lookbook</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      <Image className="mr-2 h-4 w-4" />
                      Upload Look
                    </Button>
                  </div>
                  <CardDescription>Your saved outfits and style inspiration</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedLooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {savedLooks.map(look => (
                        <div key={look.id} className="outfit-card overflow-hidden hover-lift">
                          <div className="relative">
                            <div className="aspect-square overflow-hidden">
                              <img 
                                src={look.imageUrl} 
                                alt={look.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors">
                              <Heart className="h-4 w-4 fill-styleklick-airbnb-pink text-styleklick-airbnb-pink" />
                            </button>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm">{look.name}</h3>
                              <span className="text-xs text-gray-500">{look.date}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {look.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="bg-styleklick-soft-blue/30 border-0 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed rounded-lg">
                      <p className="text-gray-500">You haven't saved any looks yet</p>
                      <Button className="mt-4 bg-styleklick-airbnb-pink hover:bg-styleklick-airbnb-red">
                        <Heart className="mr-2 h-4 w-4" />
                        Find Looks to Save
                      </Button>
                    </div>
                  )}
                  {savedLooks.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button variant="outline">View All Saved Looks</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
