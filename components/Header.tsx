import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../constants';

const Header: React.FC = () => {
  const linkClass =
    "px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors";
  const activeLinkClass = "bg-gray-100 text-gray-900";
  const navigate = useNavigate();
  const location = useLocation();

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on the homepage, just scroll
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage and pass state to trigger scroll
      navigate("/", { state: { scrollToFeatures: true } });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900"
          >
            <Logo className="h-8 w-8 text-cyan-500" />
            <span>ArtDocAI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/chat-with-pdf"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Chat with PDF
            </NavLink>
            <NavLink
              to="/diagram-interpreter"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Diagram Interpreter
            </NavLink>
            <NavLink
              to="/ai-calculator"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              AI Calculator
            </NavLink>
            <NavLink
              to="/translator"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Translator
            </NavLink>
            <NavLink
              to="/code-interpreter"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Code Interpreter
            </NavLink>
            
          </nav>

          {/* Explore Features Button */}
          <a
            href="#features"
            onClick={handleExploreClick}
            className="hidden md:block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Explore Features
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
