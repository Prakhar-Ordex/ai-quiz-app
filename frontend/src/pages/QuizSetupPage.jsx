import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookIcon, 
  CodeIcon, 
  BeakerIcon, 
  GlobeIcon,
  CheckCircleIcon 
} from 'lucide-react';

const QuizSetupPage = () => {
  const [quizType, setQuizType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const quizTypes = [
    { 
      name: 'Programming', 
      icon: CodeIcon,
      description: 'Test your coding knowledge'
    },
    { 
      name: 'Science', 
      icon: BeakerIcon,
      description: 'Explore scientific concepts'
    },
    { 
      name: 'History', 
      icon: GlobeIcon,
      description: 'Journey through historical events'
    },
    { 
      name: 'General Knowledge', 
      icon: BookIcon,
      description: 'Challenge your overall knowledge'
    }
  ];

  const difficultyLevels = [
    { 
      name: 'Easy', 
      color: 'text-green-600',
      description: 'Perfect for beginners'
    },
    { 
      name: 'Medium', 
      color: 'text-yellow-600',
      description: 'Test your intermediate skills'
    },
    { 
      name: 'Hard', 
      color: 'text-red-600',
      description: 'Challenge for experts'
    }
  ];

  const handleStartQuiz = () => {
    if (quizType && difficulty) {
      navigate('/quiz', { 
        state: { quizType, difficulty } 
      });
    } else {
      alert('Please select quiz type and difficulty');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Set Up Your Quiz
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Choose Quiz Type
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {quizTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setQuizType(type.name)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition transform hover:scale-105 
                  ${quizType === type.name 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-200 hover:border-blue-300'}`}
              >
                <type.icon className="h-12 w-12 mb-2" />
                <span className="font-semibold">{type.name}</span>
                <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                {quizType === type.name && (
                  <CheckCircleIcon className="h-6 w-6 text-blue-600 absolute top-2 right-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Select Difficulty
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {difficultyLevels.map((level) => (
              <button
                key={level.name}
                onClick={() => setDifficulty(level.name)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition transform hover:scale-105 
                  ${difficulty === level.name 
                    ? `${level.color} border-current bg-blue-50` 
                    : 'border-gray-200 hover:border-blue-300'}`}
              >
                <span className="text-2xl font-bold mb-2">{level.name}</span>
                <p className="text-sm text-gray-500">{level.description}</p>
                {difficulty === level.name && (
                  <CheckCircleIcon className="h-6 w-6 text-blue-600 absolute top-2 right-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button 
            onClick={handleStartQuiz}
            disabled={!quizType || !difficulty}
            className={`px-10 py-3 rounded-lg text-white text-xl font-bold transition ${
              quizType && difficulty 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSetupPage;