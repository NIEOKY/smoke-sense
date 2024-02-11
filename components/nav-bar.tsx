'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

type Props = {};

const Navbar: React.FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <nav className="flex justify-between items-center w-full p-4 bg-white dark:bg-slate-900 transition-colors shadow-xl rounded-b-xl duration-300">
      <div className="separator"></div>
      <h1 className="text-2xl text-black dark:text-white font-bold">
        SMOKE SENSE
      </h1>
      <button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-all duration-300"
      >
        {isDark ? (
          <Sun className="text-slate-200" size={24} />
        ) : (
          <Moon className="text-gray-900" size={24} />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
