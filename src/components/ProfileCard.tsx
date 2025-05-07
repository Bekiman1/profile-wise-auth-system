
import React from 'react';
import { User } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase } from 'lucide-react';

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

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold">{user.fullName}</CardTitle>
        {user.profession && (
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{user.profession}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{user.location}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {user.bio && (
          <div className="mb-6">
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
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
