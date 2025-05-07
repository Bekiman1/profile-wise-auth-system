
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, User, Plus, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const ProfileForm = () => {
  const { currentUser, updateProfile, loading, error } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('personal');
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    profession: currentUser?.profession || '',
    skills: currentUser?.skills?.join(', ') || '',
    phone: currentUser?.phone || '',
    // Social links
    linkedin: currentUser?.socialLinks?.linkedin || '',
    github: currentUser?.socialLinks?.github || '',
    twitter: currentUser?.socialLinks?.twitter || '',
    website: currentUser?.socialLinks?.website || '',
  });

  // Education state
  const [education, setEducation] = useState(
    currentUser?.education || []
  );

  // Experience state
  const [experience, setExperience] = useState(
    currentUser?.experience || []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    
    setEducation(prev => [...prev, newEducation]);
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setEducation(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeEducation = (id: string) => {
    setEducation(prev => prev.filter(item => item.id !== id));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    
    setExperience(prev => [...prev, newExperience]);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperience(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeExperience = (id: string) => {
    setExperience(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const skills = formData.skills
        ? formData.skills.split(',').map(skill => skill.trim())
        : [];
      
      const socialLinks = {
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
        website: formData.website
      };
      
      await updateProfile({
        fullName: formData.fullName,
        bio: formData.bio,
        location: formData.location,
        profession: formData.profession,
        skills,
        phone: formData.phone,
        education,
        experience,
        socialLinks
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated',
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.profilePicture} />
            <AvatarFallback className="text-xl">
              {getInitials(currentUser.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Edit Profile</CardTitle>
        <CardDescription className="text-center">
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Your job title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-medium mb-2">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="GitHub URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="Twitter URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Your personal website"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, UI/UX, etc."
                  rows={6}
                />
              </div>
            </TabsContent>
            
            {/* Education Tab */}
            <TabsContent value="education" className="pt-4">
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="space-y-4 pb-4">
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">Education #{index + 1}</h3>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="University/School name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                        <Input
                          id={`start-date-${edu.id}`}
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`current-${edu.id}`} 
                              checked={edu.current}
                              onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                              className="mr-2"
                            />
                            <Label htmlFor={`current-${edu.id}`} className="text-sm">Current</Label>
                          </div>
                        </div>
                        <Input
                          id={`end-date-${edu.id}`}
                          type="date"
                          value={edu.endDate || ''}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${edu.id}`}>Description</Label>
                      <Textarea
                        id={`description-${edu.id}`}
                        value={edu.description || ''}
                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                        placeholder="Additional details about your education"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={addEducation}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Education
                </Button>
              </div>
            </TabsContent>
            
            {/* Experience Tab */}
            <TabsContent value="experience" className="pt-4">
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="space-y-4 pb-4">
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">Experience #{index + 1}</h3>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Company name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          placeholder="Job title"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`location-${exp.id}`}>Location</Label>
                      <Input
                        id={`location-${exp.id}`}
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                        <Input
                          id={`start-date-${exp.id}`}
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`current-${exp.id}`} 
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="mr-2"
                            />
                            <Label htmlFor={`current-${exp.id}`} className="text-sm">Current</Label>
                          </div>
                        </div>
                        <Input
                          id={`end-date-${exp.id}`}
                          type="date"
                          value={exp.endDate || ''}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        value={exp.description || ''}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Job responsibilities and achievements"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={addExperience}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Experience
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
