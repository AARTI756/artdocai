import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ArtDocAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;