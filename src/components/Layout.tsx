
import { ReactNode } from 'react';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export default Layout;
