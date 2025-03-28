import React, { useState, useEffect } from 'react';
import { BarChartIcon, TrophyIcon } from 'lucide-react';

const QuizHistoryPage = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const history = await QuizService.getQuizHistory();
        setQuizHistory(history);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz history');
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, []);
//   useEffect(() => {
//     // Simulate fetching quiz history
//     const fetchQuizHistory = async () => {
//       try {
//         // In a real app, this would be an API call
//         const mockHistory = [
//           {
//             id: 1,
//             date: new Date('2024-03-15'),
//             quizType: 'Programming',
//             difficulty: 'Medium',
//             score: 12,
//             totalQuestions: 15,
//             percentage: 80
//           },
//           {
//             id: 2,
//             date: new Date('2024-03-20'),
//             quizType: 'Science',
//             difficulty: 'Hard',
//             score: 9,
//             totalQuestions: 15,
//             percentage: 60
//           }
//         ];

//         setQuizHistory(mockHistory);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch quiz history', error);
//         setLoading(false);
//       }
//     };

//     fetchQuizHistory();
//   }, []);

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading Quiz History...
      </div>
    );
  }

   if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex items-center mb-8">
          <BarChartIcon className="h-12 w-12 text-blue-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Quiz History
          </h1>
        </div>

        {quizHistory.length === 0 ? (
          <div className="text-center py-12">
            <TrophyIcon className="mx-auto h-20 w-20 text-gray-300 mb-4" />
            <p className="text-xl text-gray-600">
              No quiz history available. Start taking quizzes to see your progress!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {quizHistory.map((quiz) => (
              <div 
                key={quiz.id} 
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-600">
                      {quiz.quizType} Quiz
                    </h2>
                    <p className="text-gray-600">
                      {quiz.difficulty} Difficulty | 
                      {' '}{quiz.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(quiz.percentage)}`}>
                      {quiz.score}/{quiz.totalQuestions}
                    </p>
                    <p className={`text-lg ${getScoreColor(quiz.percentage)}`}>
                      {quiz.percentage}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHistoryPage;