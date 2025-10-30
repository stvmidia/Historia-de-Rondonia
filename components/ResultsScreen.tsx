
import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const resultMessage = percentage >= 70 ? 'Excelente Desempenho!' : percentage >= 50 ? 'Bom Trabalho!' : 'Continue Estudando!';
  const messageColor = percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 xl:p-16 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fade-in-results">
      <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-blue-600 mb-4">Simulado Concluído!</h2>
      <p className={`text-2xl sm:text-3xl xl:text-4xl font-bold mb-6 ${messageColor}`}>{resultMessage}</p>
      
      <div className="text-8xl sm:text-9xl font-bold text-gray-800 mb-4">
        {percentage}<span className="text-5xl align-top">%</span>
      </div>
      
      <p className="text-xl sm:text-2xl xl:text-3xl text-gray-700 mb-10">
        Você acertou <span className="font-bold text-blue-600">{score}</span> de <span className="font-bold text-blue-600">{totalQuestions}</span> questões.
      </p>

      <button
        onClick={onRestart}
        className="px-10 py-5 text-2xl xl:px-12 xl:py-6 xl:text-3xl font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Refazer Simulado
      </button>
    </div>
  );
};


const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in-results {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in-results {
    animation: fade-in-results 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
`;
document.head.appendChild(style);

export default ResultsScreen;
