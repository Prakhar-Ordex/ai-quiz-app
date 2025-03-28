import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  TrophyIcon, 
  XCircleIcon, 
  CheckCircleIcon,
  RefreshCwIcon 
} from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    questions, 
    selectedAnswers, 
    quizResult 
  } = location.state || {};

  if (!quizResult) {
    return <div>No quiz results available</div>;
  }

  const { 
    quizType, 
    difficulty, 
    score, 
    totalQuestions, 
    passPercentage 
  } = quizResult;

  console.log(questions)
  console.log(selectedAnswers)
  const getScoreCategory = () => {
    if (passPercentage >= 90) return { text: 'Excellent!', color: 'text-green-600' };
    if (passPercentage >= 70) return { text: 'Good Job!', color: 'text-blue-600' };
    if (passPercentage >= 50) return { text: 'Not Bad!', color: 'text-yellow-600' };
    return { text: 'Keep Practicing!', color: 'text-red-600' };
  };

  const scoreCategory = getScoreCategory();
//   const calculateScore = () => {
//     return questions.reduce((score, question) => {
//       return selectedAnswers[question.id] === question.correctAnswer 
//         ? score + 1 
//         : score;
//     }, 0);
//   };

//   const totalQuestions = questions.length;
//   const score = calculateScore();
//   const passPercentage = ((score / totalQuestions) * 100).toFixed(2);

//   const getScoreCategory = () => {
//     if (passPercentage >= 90) return { text: 'Excellent!', color: 'text-green-600' };
//     if (passPercentage >= 70) return { text: 'Good Job!', color: 'text-blue-600' };
//     if (passPercentage >= 50) return { text: 'Not Bad!', color: 'text-yellow-600' };
//     return { text: 'Keep Practicing!', color: 'text-red-600' };
//   };

//   const scoreCategory = getScoreCategory();

  const retakeQuiz = () => {
    navigate('/quiz-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        <div className="text-center">
          <TrophyIcon className="mx-auto h-20 w-20 text-yellow-500 mb-4" />
          <h1 className={`text-4xl font-bold mb-4 ${scoreCategory.color}`}>
            {scoreCategory.text}
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {quizType} Quiz - {difficulty} Level Results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-blue-600">Total Questions</h3>
            <p className="text-2xl font-bold">{totalQuestions}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-green-600">Correct Answers</h3>
            <p className="text-2xl font-bold">{score}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-purple-600">passPercentage</h3>
            <p className="text-2xl font-bold">{passPercentage}%</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Detailed Results
          </h2>
          {questions.map((question, index) => (
            <div 
              key={question.id} 
              className={`p-4 mb-4 rounded-lg border-2 ${
                selectedAnswers[question.id] === question?.options[question?.correctAnswer]
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">
                  Question {index + 1}
                </h3>
                {selectedAnswers[question.id] === question?.options[question?.correctAnswer] ? (
                  <CheckCircleIcon className="text-green-600" />
                ) : (
                  <XCircleIcon className="text-red-600" />
                )}
              </div>
              <p className="mb-2">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <div
                    key={option}
                    className={`p-2 rounded ${
                      option === question?.options[question?.correctAnswer]
                        ? 'bg-green-200'
                        : option === selectedAnswers[question.id]
                        ? 'bg-red-200'
                        : 'bg-gray-100'
                    }`}
                  >
                    {option}
                    {option === question?.options[question?.correctAnswer] && (
                      <span className="ml-2 text-green-600 font-bold">
                        (Correct Answer)
                      </span>
                    )}
                    {option === selectedAnswers[question.id] && 
                     option !== question?.options[question?.correctAnswer] && (
                      <span className="ml-2 text-red-600 font-bold">
                        (Your Answer)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={retakeQuiz}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCwIcon className="mr-2" /> Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;