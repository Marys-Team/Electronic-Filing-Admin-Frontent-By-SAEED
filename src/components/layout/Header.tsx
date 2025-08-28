


// Header.tsx
import React from 'react';
import { LogOut, User, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  E-File Admin
                </h1>
                <span className="text-xs text-gray-500 font-medium">CSV to ASCII Converter</span>
              </div>
            </div>
            
            {/* Navigation Breadcrumb */}
            <div className="hidden md:flex items-center space-x-2 ml-8">
              <div className="h-6 w-px bg-gray-300"></div>
              <nav className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Dashboard</span>
                <span className="text-gray-400">/</span>
                <span className="text-blue-600 font-medium">CSV Converter</span>
              </nav>
            </div>
          </div>
          
          {/* User Actions Section */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  {user?.username || 'Administrator'}
                </span>
                <span className="text-xs text-gray-500">Admin User</span>
              </div>
            </div>
            
            {/* Settings Button */}
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;