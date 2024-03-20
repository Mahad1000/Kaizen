import React, { useState } from 'react';

const DarkModeButton = ({ onChange }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    onChange(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`text-white p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-800'} transition duration-300`}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeButton;
