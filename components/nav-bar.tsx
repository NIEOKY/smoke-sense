import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Label } from './ui/label';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Este efecto se ejecuta solo en el cliente
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Renderizar los iconos solo después de montar en el cliente para evitar discrepancias de hidratación
  const renderThemeToggleIcon = () => {
    if (!mounted) return null; // No renderizar hasta que el componente se haya montado en el cliente
    return theme === 'dark' ? (
      <Sun className="text-slate-200" size={24} />
    ) : (
      <Moon className="text-gray-900" size={24} />
    );
  };

  return (
    <nav className="flex justify-between items-center w-full p-4 bg-white dark:bg-slate-900 transition-colors shadow-xl rounded-b-xl duration-300">
      <div></div>
      <Label className="font-bold text-2xl">SmokeSense</Label>
      <button onClick={toggleTheme} className="...">
        {renderThemeToggleIcon()}
      </button>
    </nav>
  );
};

export default Navbar;
