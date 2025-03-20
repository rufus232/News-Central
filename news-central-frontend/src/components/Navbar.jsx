// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-bold text-xl">
            ECHO<span className="text-pink-500">Z</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-pink-400 transition">Home</Link>
            <Link to="/entertainment" className="hover:text-pink-400 transition">Entertainment</Link>
            <Link to="/business" className="hover:text-pink-400 transition">Business</Link>
            <Link to="/lifestyle" className="hover:text-pink-400 transition">Lifestyle</Link>
            <Link to="/technology" className="hover:text-pink-400 transition">Technology</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/history" className="hover:text-pink-400 transition">
                  History
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-pink-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-pink-400 transition">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-pink-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <Link to="/" className="block py-2 hover:text-pink-400 transition">Home</Link>
            <Link to="/entertainment" className="block py-2 hover:text-pink-400 transition">Entertainment</Link>
            <Link to="/business" className="block py-2 hover:text-pink-400 transition">Business</Link>
            <Link to="/lifestyle" className="block py-2 hover:text-pink-400 transition">Lifestyle</Link>
            <Link to="/technology" className="block py-2 hover:text-pink-400 transition">Technology</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/history" className="block py-2 hover:text-pink-400 transition">
                  History
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-pink-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-pink-400 transition">
                  Sign In
                </Link>
                <Link to="/register" className="block py-2 hover:text-pink-400 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;