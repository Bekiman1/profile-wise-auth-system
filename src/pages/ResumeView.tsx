
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Mail, Phone, MapPin, Link, Linkedin, Github, Twitter, Download, ArrowLeft } from 'lucide-react';

const ResumeView = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }

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
  
  const printResume = () => {
    window.print();
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Button variant="outline" onClick={() => navigate('/profile')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Profile
        </Button>
        <Button onClick={printResume}>
          <Download className="h-4 w-4 mr-2" /> Export as PDF
        </Button>
      </div>
      
      <Card className="p-8 shadow-lg print:shadow-none">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex items-center md:items-start gap-4 mb-4 md:mb-0">
            <Avatar className="h-20 w-20 print:hidden">
              <AvatarImage src={currentUser.profilePicture} alt={currentUser.fullName} />
              <AvatarFallback className="text-lg">
                {getInitials(currentUser.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{currentUser.fullName}</h1>
              {currentUser.profession && <p className="text-lg text-muted-foreground">{currentUser.profession}</p>}
            </div>
          </div>
          
          <div className="space-y-1 text-sm">
            {currentUser.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{currentUser.email}</span>
              </div>
            )}
            {currentUser.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{currentUser.phone}</span>
              </div>
            )}
            {currentUser.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{currentUser.location}</span>
              </div>
            )}
            {currentUser.socialLinks?.website && (
              <div className="flex items-center">
                <Link className="h-4 w-4 mr-2" />
                <a 
                  href={currentUser.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Website
                </a>
              </div>
            )}
            {currentUser.socialLinks?.linkedin && (
              <div className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                <a 
                  href={currentUser.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
        
        {currentUser.bio && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <p className="text-muted-foreground">{currentUser.bio}</p>
          </div>
        )}
        
        {currentUser.skills && currentUser.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {currentUser.experience && currentUser.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              {currentUser.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{exp.position}</h3>
                      <h4 className="text-md">{exp.company}{exp.location ? `, ${exp.location}` : ''}</h4>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && <p className="text-muted-foreground">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentUser.education && currentUser.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Education</h2>
            <div className="space-y-6">
              {currentUser.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{edu.degree} in {edu.field}</h3>
                      <h4 className="text-md">{edu.institution}</h4>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.description && <p className="text-muted-foreground">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResumeView;
