import React from 'react';

interface SwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onToggle }) => {
  return (
    <label className="inline-block relative cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        className="sr-only"
      />
      <div
        className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${isChecked ? 'bg-blue' : 'bg-gray-400'}`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}
        ></div>
        <svg
          className={`absolute left-2 top-1 w-4 h-4 text-gray-600 transition-transform duration-300 ${isChecked ? 'hidden' : 'block'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 505.696 225.696"
        >
          <path d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"></path>
        </svg>
        <svg
          className={`absolute right-1 top-1 flex justify-center items-center  w-4 h-4 text-blue transition-transform duration-300 ${isChecked ? 'block' : 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 28 18"
        >
          <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
        </svg>
      </div>
    </label>
  );
};

export default Switch;
