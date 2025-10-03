import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full mt-auto">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
