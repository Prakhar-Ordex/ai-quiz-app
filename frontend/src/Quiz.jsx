import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSetup = () => {
  const [quizType, setQuizType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const quizTypes = ['Programming', 'Science', 'History', 'General Knowledge'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

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
    <div className="min-h-screen bg-quiz-background flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-quiz-primary">
          AI Quiz App
        </h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Select Quiz Type
          </label>
          <select 
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-quiz-primary"
          >
            <option value="">Choose Quiz Type</option>
            {quizTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Select Difficulty
          </label>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-quiz-primary"
          >
            <option value="">Choose Difficulty</option>
            {difficultyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleStartQuiz}
          className="w-full bg-quiz-primary text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;