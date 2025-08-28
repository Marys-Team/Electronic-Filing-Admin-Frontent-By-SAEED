import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <Header />
      <main className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
                 backgroundSize: '20px 20px'
               }}>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="relative z-10 mt-auto bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-600">
                <p>&copy; {currentYear} E-File Admin. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;