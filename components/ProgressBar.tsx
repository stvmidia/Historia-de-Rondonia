
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center text-gray-600 mb-2">
        <span className="text-lg xl:text-xl font-semibold">Questão</span>
        <span className="text-lg xl:text-xl font-bold">{current} / {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 xl:h-5">
        <div
          className="bg-blue-600 h-4 xl:h-5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
