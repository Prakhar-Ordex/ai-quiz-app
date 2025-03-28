import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  TimerIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon 
} from 'lucide-react';
import { QuizService } from '../services/quizServices';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizType, difficulty } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(900); // 15 minutes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  console.log(selectedAnswers)

  useEffect(() => {
    // Redirect if no quiz type or difficulty
    if (!quizType || !difficulty) {
      navigate('/quiz-setup');
      return;
    }

    // Fetch questions
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const generatedQuestions = await QuizService.getQuizQuestions(quizType, difficulty);
        setQuestions(generatedQuestions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to generate quiz questions. Please try again.');
        setIsLoading(false);
      }
    };
    fetchQuestions();

    // Timer setup
    const countdownTimer = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdownTimer);
          handleQuizSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(countdownTimer);
  }, [quizType, difficulty, navigate]);

  const handleAnswerSelect = (option) => {
    if (isQuizSubmitted) return;

    const currentQuestionData = questions[currentQuestion];
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: option
    }));
  };

  // const handleQuizSubmit = async () => {
  //   if (isQuizSubmitted) return;

  //   try {
  //     setIsQuizSubmitted(true);
  //     const quizResult = await QuizService.submitQuizResults({
  //       quizType,
  //       difficulty,
  //       score: calculateScore(),
  //       totalQuestions: questions.length,
  //       userAnswers:selectedAnswers,
  //       questions:questions
  //     });

  //     navigate('/result', { 
  //       state: { 
  //         questions, 
  //         selectedAnswers,
  //         quizResult
  //       } 
  //     });
  //   } catch (err) {
  //     setError('Failed to submit quiz. Please try again.');
  //     setIsQuizSubmitted(false);
  //   }
  // };

  const handleQuizSubmit = async () => {
    if (isQuizSubmitted) return;
  
    try {
      setIsQuizSubmitted(true);
      const quizResult = await QuizService.submitQuizResults({
        quizType,
        difficulty,
        totalQuestions: questions.length,
        userAnswers: selectedAnswers,
        questions
      });
  
      navigate('/result', { 
        state: { 
          questions, 
          selectedAnswers,
          quizResult
        } 
      });
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      setIsQuizSubmitted(false);
    }
  };
  const calculateScore = () => {
    return questions.reduce((score, question) => {
      return selectedAnswers[question.id] === question.correctAnswer 
        ? score + 1 
        : score;
    }, 0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Generating Quiz Questions...
          </h2>
          <p className="text-gray-600">
            Please wait while our AI prepares your quiz
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/quiz-setup')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Quiz Setup
          </button>
        </div>
      </div>
    );
  }

  // No questions
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            No Questions Available
          </h2>
          <button 
            onClick={() => navigate('/quiz-setup')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Quiz Setup
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl relative">
        {/* Timer */}
        <div className="absolute top-4 right-4 flex items-center text-red-600 font-bold">
          <TimerIcon className="mr-2" />
          {formatTime(timer)}
        </div>

        {/* Quiz Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600">
            {quizType} Quiz - {difficulty} Level
          </h2>
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {currentQuestionData.question}
          </h3>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={isQuizSubmitted}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition
                  ${isQuizSubmitted 
                    ? 'cursor-not-allowed opacity-50' 
                    : (selectedAnswers[currentQuestionData.id] === option 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50')}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0 || isQuizSubmitted}
            className={`flex items-center px-4 py-2 rounded-lg transition ${
              currentQuestion === 0 || isQuizSubmitted
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ChevronLeftIcon className="mr-2" /> Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={isQuizSubmitted}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                isQuizSubmitted
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next <ChevronRightIcon className="ml-2" />
            </button>
          ) : (
            <button 
              onClick={handleQuizSubmit}
              disabled={isQuizSubmitted}
              className={`px-6 py-2 rounded-lg transition ${
                isQuizSubmitted
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;