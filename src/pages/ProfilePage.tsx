import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/hooks/use-auth';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navigate } from 'react-router-dom';
import { Edit2, Camera, User, Calendar, Heart, BookOpen, Image, Settings, Star, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingIcons from '@/components/ui/loading-icons';

const ProfilePage = () => {
  const { user, profile, updateProfile, uploadProfilePicture, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [cardDisplayCount, setCardDisplayCount] = useState<string>('1');

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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadProfilePicture) return;
    
    await uploadProfilePicture(file);
  };

  // Sample saved looks data
  const savedLooks = [
    {
      id: '1',
      name: 'Beach Day Look',
      date: 'May 23',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      tags: ['Summer', 'Casual', 'Beach']
    },
    {
      id: '2',
      name: 'Downtown Night Out',
      date: 'May 18',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
      tags: ['Evening', 'Urban',  'Date']
    },
    {
      id: '3',
      name: 'Office Meeting',
      date: 'May 15',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
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

  // Move authentication check after all hooks
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ returnTo: '/profile' }} />;
  }

  if (loading) {
    return (
      <Layout>
        <motion.div 
          className="py-12 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="container max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <LoadingIcons size={32} className="mb-6" />
                <p className="text-lg text-gray-600">Loading your profile...</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <Layout>
      <motion.div 
        className="py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-pink-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-indigo-200/30 rounded-full blur-lg"></div>
        </div>

        <motion.div 
          className="container max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Profile Header */}
          <motion.div variants={itemVariants}>
            <Card className="mb-8 border-0 shadow-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 h-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-pink-500/50"></div>
                <motion.div 
                  className="absolute top-4 right-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </motion.div>
              </div>
              <CardContent className="relative px-8 pb-8">
                <div className="flex flex-col lg:flex-row lg:items-end -mt-20">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Avatar className="h-40 w-40 border-6 border-white shadow-2xl">
                      <AvatarImage src={profile?.avatar_url || ""} alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-5xl">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div 
                      className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <Camera size={20} className="text-purple-600" />
                      </Label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </motion.div>
                  </motion.div>
                  <div className="mt-6 lg:mt-0 lg:ml-8 flex-grow">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                      {getUserDisplayName()}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Member since {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2">
                        <Trophy className="mr-2 h-4 w-4" />
                        Style Explorer
                      </Badge>
                      <Badge variant="outline" className="border-purple-200 text-purple-700 px-4 py-2">
                        <Target className="mr-2 h-4 w-4" />
                        Active User
                      </Badge>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="mt-6 lg:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg" 
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-1 space-y-8"
              variants={itemVariants}
            >
              {/* Enhanced Profile Information */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-0">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mr-3">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">Profile Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* ... keep existing code (profile information form/display) the same ... */}
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
                        <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="font-medium">{getUserDisplayName()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email || "Not provided"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Not specified"}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Style Preferences */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b-0">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg mr-3">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">Style Preferences</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-count">Recommendation Cards to Display</Label>
                      <Select value={cardDisplayCount} onValueChange={setCardDisplayCount}>
                        <SelectTrigger className="border-purple-200 focus:border-purple-400">
                          <SelectValue placeholder="Select number of cards" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Card</SelectItem>
                          <SelectItem value="2">2 Cards</SelectItem>
                          <SelectItem value="3">3 Cards</SelectItem>
                          <SelectItem value="4">4 Cards</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Choose how many style recommendation cards to show on your recommendations page
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Upcoming Events */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100 border-b-0">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">Upcoming Styled Events</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* ... keep existing code (upcoming events) the same ... */}
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <motion.div 
                          key={event.id} 
                          className="border-b pb-4 last:border-b-0"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{event.name}</h4>
                              <p className="text-sm text-gray-500">{event.date}</p>
                            </div>
                            <div>
                              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
                                {event.outfitStatus}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm" className="w-full mt-2 border-purple-200 hover:bg-purple-50">
                          <Calendar className="mr-2 h-4 w-4" />
                          View All Events
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No upcoming events</p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="mt-4 border-purple-200 hover:bg-purple-50">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add Event
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              {/* Enhanced Lookbook */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mr-3">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl">Your Lookbook</CardTitle>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                        <Image className="mr-2 h-4 w-4" />
                        Upload Look
                      </Button>
                    </motion.div>
                  </div>
                  <CardDescription className="text-lg">Your saved outfits and style inspiration</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {savedLooks.length > 0 ? (
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {savedLooks.map((look, index) => (
                        <motion.div 
                          key={look.id} 
                          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                          variants={itemVariants}
                          whileHover={{ y: -10, scale: 1.03 }}
                        >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img 
                              src={look.imageUrl} 
                              alt={look.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <motion.button 
                              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
                            </motion.button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-lg">{look.name}</h3>
                              <span className="text-sm opacity-80">{look.date}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {look.tags.map((tag, idx) => (
                                <Badge key={idx} className="bg-white/20 text-white border-white/20 backdrop-blur-sm text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="text-center py-16 border-2 border-dashed border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Heart className="mx-auto h-16 w-16 text-purple-300 mb-6" />
                      <p className="text-xl text-gray-600 mb-6">You haven't saved any looks yet</p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                          <Heart className="mr-2 h-4 w-4" />
                          Find Looks to Save
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                  {savedLooks.length > 0 && (
                    <motion.div 
                      className="mt-8 text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="border-purple-200 hover:bg-purple-50 px-8 py-3">
                        View All Saved Looks
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default ProfilePage;
