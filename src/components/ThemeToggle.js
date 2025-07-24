import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-8 flex items-center gap-2 px-4 py-2 rounded-full 
        bg-gray-900 text-rose-400 dark:bg-white dark:text-gray-800 
        shadow-lg border border-gray-700 dark:border-gray-200 
        transition-all duration-300 hover:scale-105 z-50"
    >
      {darkMode ? (
        <>
          <Sun size={18} />
          <span className="text-sm">Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={18} />
          <span className="text-sm">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
