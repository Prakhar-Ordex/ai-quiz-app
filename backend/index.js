import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Quiz Schema
const quizSchema = new mongoose.Schema({
    questions: Array,
    userAnswers: Array,
    correctAnswers: Array,
    score: Number,
});
const Quiz = mongoose.model('Quiz', quizSchema);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to AI-powered Quiz API!');
});

// Generate Quiz Questions
app.get('/api/quiz/generate', async (req, res) => {
    try {
        const { difficulty, quizType } = req.query;
        if (!difficulty || !quizType) {
            return res.status(400).json({ error: 'Missing required query parameters: difficulty and quizType' });
        }

        const prompt = `Generate 5 multiple-choice quiz questions about ${quizType} 
        with difficulty level ${difficulty}. 
        Format each question as a JSON object with these keys:
        - id: A unique identifier for the question
        - question: The question text
        - options: An array of 4 answer options
        - correctAnswer: The index of the correct answer (0-3)
        - explanation: A brief explanation of the correct answer`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const formattedQuestions = response.text?.replace(/```json|```/g, '').trim();
        const questions = JSON.parse(formattedQuestions);

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ error: 'Failed to generate quiz questions' });
    }
});

// Submit Quiz
// app.post('/api/quiz/submit', async (req, res) => {
//     try {
//         const { questions, userAnswers } = req.body;
//         if (!questions || !userAnswers) {
//             return res.status(400).json({ error: 'Missing required fields: questions and userAnswers' });
//         }

//         let score = 0;
//         const correctAnswers = questions.map(q => q.correctAnswer);

//         userAnswers.forEach((answer, index) => {
//             if (answer === correctAnswers[index]) score++;
//         });

//         const quizResult = new Quiz({ questions, userAnswers, correctAnswers, score });
//         await quizResult.save();

//         res.status(200).json({ score, correctAnswers });
//     } catch (error) {
//         console.error('Error submitting quiz:', error);
//         res.status(500).json({ error: 'Failed to submit quiz' });
//     }
// });

app.post('/api/quiz/submit', async (req, res) => {
    try {
        const { 
            quizType, 
            difficulty, 
            totalQuestions, 
            userAnswers, 
            questions 
        } = req.body;

        // Validate input
        if (!quizType || !difficulty || !questions || !userAnswers) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: {
                    quizType: !!quizType,
                    difficulty: !!difficulty,
                    questions: !!questions,
                    userAnswers: !!userAnswers
                }
            });
        }

        // Prepare detailed results with correct comparison
        const detailedResults = questions.map(question => {
            // Get the user's selected option text
            const userAnswerText = userAnswers[question.id];
            
            // Find the index of the correct answer
            const correctAnswerIndex = question.correctAnswer;
            const correctAnswerText = question.options[correctAnswerIndex];

            // Find the index of the user's answer
            const userAnswerIndex = question.options.indexOf(userAnswerText);

            return {
                questionId: question.id,
                question: question.question,
                userAnswer: userAnswerText,
                correctAnswer: correctAnswerText,
                userAnswerIndex: userAnswerIndex,
                correctAnswerIndex: correctAnswerIndex,
                isCorrect: userAnswerIndex === correctAnswerIndex,
                explanation: question.explanation
            };
        });

        // Calculate score
        const score = detailedResults.filter(result => result.isCorrect).length;

        // Create quiz result object
        const quizResult = new Quiz({
            quizType,
            difficulty,
            totalQuestions,
            score,
            userAnswers,
            questions,
            timestamp: new Date()
        });

        // Save quiz result
        await quizResult.save();

        // Prepare response
        const response = {
            score,
            totalQuestions,
            quizType,
            difficulty,
            detailedResults,
            passPercentage: Math.round((score / totalQuestions) * 100),
            isPassed: (score / totalQuestions) * 100 >= 60 // Example passing threshold
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ 
            error: 'Failed to submit quiz',
            message: error.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
