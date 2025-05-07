
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Welcome to CVSmart
        </h1>
        
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Your professional profile management system. Create, update, and showcase your professional identity with ease.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {currentUser ? (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/profile">Go to My Profile</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center">Professional Profile</h3>
            <p className="mt-2 text-sm text-gray-500">Create your professional profile with all the essential details to showcase your skills.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center">Secure Authentication</h3>
            <p className="mt-2 text-sm text-gray-500">State-of-the-art authentication system to keep your professional data secure.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center">Easy Updates</h3>
            <p className="mt-2 text-sm text-gray-500">Keep your profile up to date with our intuitive editing tools and interface.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
