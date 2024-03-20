import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const LoggedInNavbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); 
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center h-16 w-full px-4 bg-[#1a1a2e] text-[#00df9a]">
      <Link to='/dashboard' className='text-2xl font-semibold'>Kaizen-Pro</Link>
      <ul className="flex space-x-4">
        <li><Link to='/habits' className='hover:text-blue-600 transition duration-300 text-lg'>Habits</Link></li>
        <li><button onClick={handleLogout} className='hover:text-blue-600 transition duration-300 text-lg'>Logout</button></li>
      </ul>
    </nav>
  );
};

export default LoggedInNavbar;
