
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCard from '@/components/ProfileCard';
import ProfileForm from '@/components/ProfileForm';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
      
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>
        <TabsContent value="view" className="mt-6">
          <div className="flex justify-center">
            <ProfileCard user={currentUser} />
          </div>
        </TabsContent>
        <TabsContent value="edit" className="mt-6">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
