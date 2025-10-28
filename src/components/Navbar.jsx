import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

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
      <nav className="navbar bg-gradient-to-r from-primary to-secondary shadow-xl text-primary-content">
        <div className="container mx-auto px-4">
          <div className="flex-1">
            <Link to="/login" className="btn btn-ghost text-xl font-bold text-white hover:text-yellow-300 transition-colors">
              <span className="text-yellow-300">⚡ X-O</span> Arena
            </Link>
          </div>
          
          <div className="flex-none gap-2">
            <Link to="/login" className="btn btn-ghost text-white hover:bg-white/10">
              Login
            </Link>
            <Link to="/register" className="btn btn-warning text-white hover:bg-yellow-400">
              Sign Up
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-white hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar bg-gradient-to-r from-primary to-secondary shadow-xl text-primary-content">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold text-white hover:text-yellow-300 transition-colors">
            <span className="text-yellow-300">⚡ X-O</span> Arena
          </Link>
        </div>
        
        <div className="flex-none gap-2">
          <Link
            to="/"
            className={`btn btn-ghost ${isActive('/') ? 'btn-active bg-white/20' : ''} text-white hover:bg-white/10`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`btn btn-ghost ${isActive('/dashboard') ? 'btn-active bg-white/20' : ''} text-white hover:bg-white/10`}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`btn btn-ghost ${isActive('/profile') ? 'btn-active bg-white/20' : ''} text-white hover:bg-white/10`}
          >
            Profile
          </Link>
          
          {/* User Menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-white flex items-center justify-center font-bold">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
            >
              <li>
                <div className="p-2 border-b border-base-300">
                  <p className="font-semibold">{user?.displayName || 'User'}</p>
                  <p className="text-sm text-base-content/70">{user?.email}</p>
                </div>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-white hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


