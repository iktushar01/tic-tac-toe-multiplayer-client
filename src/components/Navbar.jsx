import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

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
      <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-300">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link to="/login" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md animate-gradient bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:scale-105 transition-transform">
                  <span className="text-2xl font-bold text-white">X-O</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent bg-shimmer bg-[length:200%_auto]">
                  Arena
                </span>
              </Link>
            </div>
            
            {/* Navigation - Center (Optional, can show feature links) */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              <div className="text-sm text-base-content/60">
                Play Tic-Tac-Toe Online
              </div>
            </div>
            
            {/* User Section - Right */}
            <div className="flex items-center space-x-2">
              <Link 
                to="/login" 
                className="btn btn-ghost btn-sm text-base-content hover:text-primary"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary btn-sm bg-gradient-to-r from-yellow-400 to-yellow-600 border-0 text-white hover:from-yellow-500 hover:to-yellow-700 shadow-md"
              >
                Sign Up
              </Link>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <MdDarkMode className="w-5 h-5" />
                ) : (
                  <MdLightMode className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md animate-gradient bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:scale-105 transition-transform">
                <span className="text-2xl font-bold text-white">X-O</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent bg-shimmer bg-[length:200%_auto]">
                Arena
              </span>
            </Link>
          </div>
          
          {/* Navigation Menu - Center */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-primary text-primary-content shadow-md' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/dashboard') 
                  ? 'bg-primary text-primary-content shadow-md' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/profile') 
                  ? 'bg-primary text-primary-content shadow-md' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              Profile
            </Link>
          </div>
          
          {/* User Section - Right */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Toggle */}
            <div className="dropdown md:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl border border-base-300 mt-3"
              >
                <li>
                  <Link to="/" className={isActive('/') ? 'active' : ''}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                    Profile
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>

            {/* User Avatar Menu - Desktop */}
            <div className="hidden md:block dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition-all"
              >
                <div className="w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-white">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow-xl border border-base-300 mt-3"
              >
                <li>
                  <div className="p-3 border-b border-base-300">
                    <p className="font-semibold text-base-content">{user?.displayName || 'User'}</p>
                    <p className="text-sm text-base-content/70 truncate">{user?.email}</p>
                  </div>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </a>
                </li>
              </ul>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MdDarkMode className="w-5 h-5" />
              ) : (
                <MdLightMode className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


