import React, { useState, useEffect } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="inline-flex items-center px-3 py-1 text-sm text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
      aria-label="Toggle theme"
    >
      <span className="mr-2 text-base">{darkMode ? '🌙' : '☀️'}</span>
      <span className="hidden sm:inline">{darkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
}

export default ThemeToggle;
