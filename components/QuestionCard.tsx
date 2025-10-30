
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  userAnswer: string | undefined;
  onAnswerSelect: (questionId: number, selectedAnswer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, userAnswer, onAnswerSelect }) => {
  const [eliminatedOptions, setEliminatedOptions] = useState<Set<string>>(new Set());
  const isAnswered = userAnswer !== undefined;

  useEffect(() => {
    setEliminatedOptions(new Set());
  }, [question.id]);

  const handleEliminateOption = (optionLetter: string) => {
    setEliminatedOptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(optionLetter)) {
        newSet.delete(optionLetter);
      } else {
        newSet.add(optionLetter);
      }
      return newSet;
    });
  };

  const getOptionClass = (optionLetter: string) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-blue-50 hover:border-blue-400 cursor-pointer';
    }
    if (optionLetter === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-900 transform scale-105';
    }
    if (optionLetter === userAnswer && optionLetter !== question.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-900';
    }
    return 'bg-gray-100 text-gray-500 opacity-70 cursor-not-allowed';
  };

  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300">
      <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight mb-6 text-gray-900">
        <span className="text-gray-400 font-medium mr-2">{question.id}.</span>
        {question.question}
      </p>

      {question.type === 'multiple-choice' ? (
        <div className="space-y-4 xl:space-y-5">
          {question.options.map((option) => (
            <button
              key={option.letter}
              onClick={() => onAnswerSelect(question.id, option.letter)}
              disabled={isAnswered}
              className={`w-full text-left p-4 xl:p-6 rounded-lg border-2 transition-all duration-300 ease-in-out text-xl md:text-2xl lg:text-3xl font-semibold ${getOptionClass(option.letter)}`}
            >
              <div className="flex items-center justify-between">
                <span className={`flex-grow transition-colors ${eliminatedOptions.has(option.letter) ? 'line-through text-gray-400' : ''}`}>
                  <span className="font-bold mr-3 text-blue-600">{option.letter})</span>
                  <span>{option.text}</span>
                </span>

                {!isAnswered && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEliminateOption(option.letter);
                    }}
                    className="ml-4 p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label={`Eliminar alternativa ${option.letter}`}
                    title={`Eliminar alternativa ${option.letter}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 xl:h-8 xl:w-8">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                      <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                      <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                    </svg>
                  </button>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
           <p className="text-lg md:text-xl xl:text-2xl text-gray-700 mb-4">Esta é uma questão discursiva/V-F. A resposta está no gabarito.</p>
           {!isAnswered && (
             <button
                onClick={() => onAnswerSelect(question.id, question.correctAnswer)}
                className="px-6 py-3 text-lg xl:px-8 xl:py-4 xl:text-xl font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
             >
                Mostrar Resposta
             </button>
           )}
        </div>
      )}

      {isAnswered && (
        <div className="mt-8 p-6 xl:p-8 bg-blue-50/70 rounded-lg border border-blue-200/80 animate-fade-in">
          <h3 className="text-xl xl:text-2xl font-bold text-blue-700 mb-3">Gabarito Comentado</h3>
          {question.type === 'discursive' && (
             <p className="text-lg xl:text-xl font-bold text-green-700 mb-3">
                Resposta Correta: {question.correctAnswer}
            </p>
          )}
          <p className="text-lg md:text-xl xl:text-2xl text-gray-800 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

// Add fade-in animation to tailwind config if possible, or use a simple one here
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default QuestionCard;
