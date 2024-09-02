import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#3B82F6', // Tailwind의 blue-500 색상
}) => {
  const sizeClass = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  }[size];

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClass} border-4 border-t-4 border-gray-200 rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
