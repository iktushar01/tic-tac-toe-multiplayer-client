import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

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

