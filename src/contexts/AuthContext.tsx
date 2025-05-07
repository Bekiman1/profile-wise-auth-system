
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  profession?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
  socialLinks?: SocialLinks;
  createdAt: string;
  phone?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Dummy users for demo purposes
  const dummyUsers: User[] = [
    {
      id: '1',
      email: 'john@example.com',
      fullName: 'John Doe',
      profilePicture: '',
      bio: 'Software developer with 5 years of experience',
      location: 'San Francisco, CA',
      profession: 'Frontend Developer',
      skills: ['React', 'TypeScript', 'CSS', 'Node.js', 'MongoDB'],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Bachelor\'s',
          field: 'Computer Science',
          startDate: '2015-09-01',
          endDate: '2019-06-15',
          current: false,
          description: 'Graduated with honors'
        }
      ],
      experience: [
        {
          id: '1',
          company: 'Tech Solutions Inc.',
          position: 'Frontend Developer',
          location: 'San Francisco, CA',
          startDate: '2019-07-01',
          endDate: undefined,
          current: true,
          description: 'Building responsive web applications using React and TypeScript'
        },
        {
          id: '2',
          company: 'StartUp Co.',
          position: 'Intern',
          location: 'Palo Alto, CA',
          startDate: '2018-06-01',
          endDate: '2018-08-31',
          current: false,
          description: 'Assisted in developing user interfaces for client projects'
        }
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe',
        website: 'https://johndoe.com'
      },
      phone: '+1 (555) 123-4567',
      createdAt: new Date().toISOString()
    }
  ];

  const clearError = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = dummyUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, you'd verify the password here
      // For demo purposes, we'll just accept any password
      
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Successfully logged in');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (dummyUsers.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: String(dummyUsers.length + 1),
        email,
        fullName,
        skills: [],
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) throw new Error('No user logged in');
      
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
