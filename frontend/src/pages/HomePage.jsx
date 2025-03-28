import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  PlayCircleIcon, 
  TrophyIcon 
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white shadow-2xl rounded-2xl p-10">
          <BookOpenIcon className="mx-auto h-20 w-20 text-blue-600 mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Welcome to AI Quiz Master
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Challenge yourself with AI-generated quizzes across various topics and difficulty levels!
          </p>

          <div className="flex justify-center space-x-6">
            <Link 
              to="/quiz-setup"
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
            >
              <PlayCircleIcon className="mr-2" />
              Start New Quiz
            </Link>
            <Link 
              to="/history"
              className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-lg"
            >
              <TrophyIcon className="mr-2" />
              Quiz History
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                AI-Generated Quizzes
              </h3>
              <p className="text-gray-700">
                Unique quizzes generated by advanced AI technology
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600">
                Multiple Difficulty Levels
              </h3>
              <p className="text-gray-700">
                Choose from Easy, Medium, and Hard difficulty levels
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">
                Diverse Topics
              </h3>
              <p className="text-gray-700">
                Quizzes covering Programming, Science, History, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;