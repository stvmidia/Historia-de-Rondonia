import React, { useState, useCallback, useMemo } from 'react';
import { quizQuestions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import ProgressBar from './components/ProgressBar';
import { Question, Option } from './types';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const score = useMemo(() => {
    return quizQuestions.reduce((acc, question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers]);

  const handleAnswerSelect = useCallback((questionId: number, selectedAnswer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleGoToStart = () => {
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const currentQuestion: Question = quizQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 lg:p-16 font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full">
        {!showResults ? (
          <>
            <div className="w-full flex justify-start gap-4 mb-4">
                <button
                onClick={handleGoToStart}
                className="flex items-center px-6 py-3 text-lg xl:px-8 xl:py-4 xl:text-xl font-bold rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Voltar ao início"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 xl:h-7 xl:w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Início
                </button>
                 <button
                onClick={handleRestartQuiz}
                className="flex items-center px-6 py-3 text-lg xl:px-8 xl:py-4 xl:text-xl font-bold rounded-lg bg-white text-red-700 border border-red-300 hover:bg-red-50 transition-colors"
                aria-label="Reiniciar simulado"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 xl:h-7 xl:w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 12M20 20l-1.5-1.5A9 9 0 003.5 12" />
                </svg>
                Reiniciar
                </button>
            </div>
            <header className="mb-6 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-blue-600 mb-2">Simulado: Rondônia</h1>
              <p className="text-lg md:text-xl xl:text-2xl text-gray-600">Teste seus conhecimentos de História e Geografia</p>
            </header>

            <ProgressBar current={currentQuestionIndex + 1} total={quizQuestions.length} />

            <main className="flex-grow">
              <QuestionCard
                question={currentQuestion}
                userAnswer={userAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            </main>

            <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="w-full sm:w-auto px-8 py-4 text-xl xl:px-10 xl:py-5 xl:text-2xl font-bold rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-8 py-4 text-xl xl:px-10 xl:py-5 xl:text-2xl font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
              </button>
            </footer>
          </>
        ) : (
          <ResultsScreen score={score} totalQuestions={quizQuestions.length} onRestart={handleRestartQuiz} />
        )}
      </div>
    </div>
  );
};

export default App;