import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ darkMode }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login'); 
  };

  return (
    <div className={`${darkMode ? 'bg-[#1a1a2e] text-white' : 'bg-white text-black'} min-h-screen flex flex-col items-center justify-center`}>
      <div className='text-center'>
        <p className={`font-bold p-2 ${darkMode ? 'text-[#00df9a]' : 'text-black'}`}>GROWING HABITS WITH ACCOUNTABILITY</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Visualise Your Progress</h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Quick and Easy {' '}</p>
          <span className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'>Set Up Connections Progression</span>
        </div>
        <p className='md:text-2xl text-xl font-bold text-[#eaeaea]'>TAKE YOUR FIRST STEP</p>
        <button 
          onClick={handleGetStartedClick}
          className={`w-[200px] rounded-md font-medium my-6 mx-auto py-3 ${darkMode ? 'bg-[#00df9a] text-black' : 'bg-black text-white'}`}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
