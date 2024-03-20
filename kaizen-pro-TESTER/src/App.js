import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { HabitsProvider } from './components/Account/HabitsContext'; 
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/Account/LoggedInNavbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Cac from './components/Cac';
import About from './components/About';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Account/Dashboard';
import Habits from './components/Account/Habits';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe; 
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString()); 
    document.body.className = darkMode ? 'dark' : ''; 
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <Router>
      <HabitsProvider> 
        <div>
          {isLoggedIn ? (
            <LoggedInNavbar onLogout={handleLogout} />
          ) : (
            <Navbar darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
          )}
          <Routes>
            <Route path="/" element={
              <>
                <Hero darkMode={darkMode} />
                <Analytics darkMode={darkMode} />
                <Cac darkMode={darkMode} />
              </>
            } />
            <Route path="/about" element={<About darkMode={darkMode} />} />
            <Route path="/contact" element={<Contact darkMode={darkMode} />} />
            <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/habits" element={<Habits />} /> 
          </Routes>
        </div>
      </HabitsProvider>
    </Router>
  );
};

export default App;
