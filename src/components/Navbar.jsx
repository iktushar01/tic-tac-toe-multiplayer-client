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
            <Link
              to="/settings"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/settings') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Settings
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
                  <Link 
                    to="/settings" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 transition-colors ${
                      isActive('/settings') ? 'bg-gray-700 text-cyan-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Settings
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
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden shadow-md hover:ring-2 hover:ring-cyan-400 transition-all relative"
              >
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL}
                    alt={user?.displayName || user?.email}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="font-bold text-sm flex items-center justify-center w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white absolute inset-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </span>
              </button>
              
              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="font-semibold text-white">{user?.displayName || 'User'}</p>
                    <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      to="/dashboard" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
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
