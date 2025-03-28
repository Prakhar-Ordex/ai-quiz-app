import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  PlayCircleIcon, 
  BarChartIcon, 
  BookOpenIcon 
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-800">
                AI Quiz Master
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link 
              to="/quiz-setup" 
              className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition"
            >
              <PlayCircleIcon className="h-5 w-5 mr-2" />
              Start Quiz
            </Link>
            <Link 
              to="/history" 
              className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md transition"
            >
              <BarChartIcon className="h-5 w-5 mr-2" />
              Quiz History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;