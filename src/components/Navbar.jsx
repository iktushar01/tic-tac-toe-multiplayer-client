import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <nav className="bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-700">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link to="/login" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:scale-105 transition-transform">
                  <span className="text-xl font-bold text-white">X-O</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Arena
                </span>
              </Link>
            </div>
            
            {/* Navigation - Center */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              <div className="text-sm text-gray-400">
                Play Tic-Tac-Toe Online
              </div>
            </div>
            
            {/* User Section - Right */}
            <div className="flex items-center space-x-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-gray-700"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md border-0"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:scale-105 transition-transform">
                <span className="text-xl font-bold text-white">X-O</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Arena
              </span>
            </Link>
          </div>
          
          {/* Navigation Menu - Center */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/dashboard') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/profile') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Profile
            </Link>
          </div>
          
          {/* User Section - Right */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2">
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 transition-colors ${
                      isActive('/') ? 'bg-gray-700 text-cyan-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 transition-colors ${
                      isActive('/dashboard') ? 'bg-gray-700 text-cyan-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 transition-colors ${
                      isActive('/profile') ? 'bg-gray-700 text-cyan-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar Menu - Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-md hover:ring-2 hover:ring-cyan-400 transition-all"
              >
                <span className="font-bold text-sm">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </button>
              
              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                  <div className="p-3 border-b border-gray-700">
                    <p className="font-semibold text-white">{user?.displayName || 'User'}</p>
                    <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
