import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [navlinks, setNavlinks] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-900 sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo - Left side */}
        <Link 
          to="/home" 
          className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mr-4"
        >
          PDFtoXML
        </Link>

        {/* Centered Navigation Links - Adjusted slightly right */}
        <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 ml-16"> {/* Changed ml-10 to ml-16 */}
          <div className="flex space-x-1">
            <Link 
              to="/home" 
              className="px-4 py-2 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </Link>
            <Link 
              to="/conversion-history" 
              className="px-4 py-2 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Explore
            </Link>
            <Link 
              to="/profile" 
              className="px-4 py-2 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Right side - Logout and mobile menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center px-4 py-2 text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavlinks(!navlinks)}
            className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {navlinks ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${navlinks ? "block" : "hidden"} lg:hidden bg-white dark:bg-gray-900 shadow-md`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-2">
          <Link 
            to="/home" 
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/conversion-history" 
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Explore
          </Link>
          <Link 
            to="/profile" 
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-colors font-medium flex items-center mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;