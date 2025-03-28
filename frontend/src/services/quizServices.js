import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const QuizService = {
  async getQuizQuestions(quizType, difficulty) {
    try {
      const response = await axios.get(`${API_BASE_URL}/quiz/generate`, {
        params: { quizType, difficulty }
      });
      return response.data.questions;
    } catch (error) {
      console.error('Failed to fetch quiz questions', error);
      throw error;
    }
  },

  async submitQuizResults(quizData) {
    try {
      const submissionData = {
        quizType: quizData.quizType,
        difficulty: quizData.difficulty,
        totalQuestions: quizData.totalQuestions || quizData.questions.length,
        userAnswers: quizData.userAnswers,
        questions: quizData.questions
      };
      const response = await axios.post(`${API_BASE_URL}/quiz/submit`, submissionData);
      return response.data;
    } catch (error) {
      console.error('Failed to submit quiz results', error);
      throw error;
    }
  },

  async getQuizHistory(){
    try {
      const response = await axios.get(`${API_BASE_URL}/quiz/history`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch quiz history', error);
      throw error;
    }
  }
};