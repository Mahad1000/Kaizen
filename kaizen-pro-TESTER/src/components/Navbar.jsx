import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"; // Bootstrap icons

const Navbar = ({ darkMode, onDarkModeToggle, isLoggedIn }) => {
  // nav visibility 
  const [isNavVisible, setNavVisibility] = useState(false);

  // change navigation visibility
  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isNavVisible) {
        setNavVisibility(false);
      }
    };

    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavVisible]);

//dark mode styling
  const navClass = `flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 ${darkMode ? 'bg-[#1a1a2e] text-[#00df9a]' : 'bg-white text-black'}`;

  return (
    <nav className={navClass}>
      <Link to='/' className='w-full text-3xl font-bold'>
        Kaizen-Pro
      </Link>

      {/* Links for larger screens */}
      <ul className={`hidden md:flex space-x-4 ${isNavVisible ? 'hidden' : ''}`}>
        <li><Link to='/about' className='hover:text-blue-600 transition duration-300'>About</Link></li>
        <li><Link to='/contact' className='hover:text-blue-600 transition duration-300'>Contact</Link></li>
        {isLoggedIn ? (
          // Render the Dashboard link when the user is logged in
          <li><Link to='/dashboard' className='hover:text-blue-600 transition duration-300'>Dashboard</Link></li>
        ) : (
          // Render Login link when the user is not logged in
          <li><Link to='/login' className='hover:text-blue-600 transition duration-300'>Login</Link></li>
        )}
      </ul>

      {/* Mobile menu toggle */}
      <div onClick={toggleNav} className='block md:hidden z-10 cursor-pointer'>
        {isNavVisible ? <AiOutlineClose size={30} className={darkMode ? 'text-[#00df9a]' : 'text-gray-700'} /> : <AiOutlineMenu size={30} className={darkMode ? 'text-[#00df9a]' : 'text-gray-700'} />}
      </div>

      {/* Dark/Light mode toggle */}
      <button onClick={onDarkModeToggle} className='p-2 transition duration-300'>
        {darkMode ? <BsFillSunFill size={24} className='text-white' /> : <BsFillMoonStarsFill size={24} className='text-gray-700' />}
      </button>

      {isNavVisible && (
        <div className="absolute top-0 left-0 h-screen w-full bg-black flex flex-col items-center justify-center">
          <Link to='/about' className='text-white py-2'>About</Link>
          <Link to='/contact' className='text-white py-2'>Contact</Link>
          {isLoggedIn ? (
            <Link to='/dashboard' className='text-white py-2'>Dashboard</Link>
          ) : (
            <Link to='/login' className='text-white py-2'>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
