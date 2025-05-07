
import React from 'react';
import { User } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Calendar, Building, GraduationCap, Mail, Phone, Link, Github, Linkedin, Twitter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold">{user.fullName}</CardTitle>
        
        <div className="flex flex-col items-center mt-2 space-y-1">
          {user.profession && (
            <div className="flex items-center text-muted-foreground text-sm">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{user.profession}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6 pt-4">
            {user.bio && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            )}
            
            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-6 pt-4">
            {user.experience && user.experience.length > 0 ? (
              <div className="space-y-4">
                {user.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    {index > 0 && <Separator className="my-3" />}
                    <div className="flex justify-between">
                      <h3 className="font-medium">{exp.position}</h3>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="h-3.5 w-3.5 mr-1 inline" />
                      <span>{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="mx-1">•</span>
                          <MapPin className="h-3.5 w-3.5 mr-1 inline" />
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-sm mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No experience listed yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6 pt-4">
            {user.education && user.education.length > 0 ? (
              <div className="space-y-4">
                {user.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    {index > 0 && <Separator className="my-3" />}
                    <div className="flex justify-between">
                      <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5 mr-1 inline" />
                      <span>{edu.institution}</span>
                    </div>
                    {edu.description && (
                      <p className="text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No education listed yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                
                {user.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
            
            {user.socialLinks && Object.values(user.socialLinks).some(link => !!link) && (
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Social Links</h3>
                <div className="space-y-2">
                  {user.socialLinks.linkedin && (
                    <div className="flex items-center text-sm">
                      <Linkedin className="h-4 w-4 mr-2" />
                      <a 
                        href={user.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  
                  {user.socialLinks.github && (
                    <div className="flex items-center text-sm">
                      <Github className="h-4 w-4 mr-2" />
                      <a 
                        href={user.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub Profile
                      </a>
                    </div>
                  )}
                  
                  {user.socialLinks.twitter && (
                    <div className="flex items-center text-sm">
                      <Twitter className="h-4 w-4 mr-2" />
                      <a 
                        href={user.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Twitter Profile
                      </a>
                    </div>
                  )}
                  
                  {user.socialLinks.website && (
                    <div className="flex items-center text-sm">
                      <Link className="h-4 w-4 mr-2" />
                      <a 
                        href={user.socialLinks.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Personal Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
