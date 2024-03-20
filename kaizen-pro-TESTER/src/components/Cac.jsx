import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import climbImage from '../pictures/climb.jpg';
import { useNavigate } from 'react-router-dom'; 

const Cac = ({ darkMode }) => {
  AOS.init();

  
  const navigate = useNavigate();

  
  const handleGetStartedClick = () => {
    
    navigate('/login');
  };

  return (
    <div className={`${darkMode ? 'bg-[#1a1a2e] text-white' : 'bg-white text-black'} flex flex-col md:flex-row items-center justify-center py-16 px-4`}>
      <div className='md:w-1/2'>
        <h2
          className='text-5xl font-bold mb-2'
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Climb &
        </h2>
        <h2
          className='text-5xl font-bold mb-6'
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Compete
        </h2>
        <p
          className='text-xl mb-4'
          data-aos="fade"
          data-aos-duration="800"
          data-aos-anchor-placement="center-bottom"
        >
          Take your habit tracking to new heights by competing with friends and climbing the leaderboard.
        </p>
        <ul
          className='list-disc list-inside mb-4'
          data-aos="fade"
          data-aos-duration="800"
          data-aos-anchor-placement="center-bottom"
        >
          <li>Challenge others and reach your goals together.</li>
          <li>Visualize your progress and stay motivated.</li>
          <li>Unlock achievements and celebrate your success.</li>
        </ul>
        <button
          onClick={handleGetStartedClick}
          className={`w-[200px] rounded-md font-medium py-3 ${darkMode ? 'bg-[#00df9a] text-black' : 'bg-black text-white'} hover:bg-opacity-90 transition duration-300`}
          data-aos="zoom-in"
        >
          Get Started
        </button>
      </div>
      <div className='md:w-1/2 mt-8 md:mt-0 flex justify-center'>
        <img
          src={climbImage}
          alt="Climb to Success"
          className="max-w-[80%] h-auto rounded-lg shadow-lg"
          data-aos="fade"
          data-aos-duration="800"
          data-aos-anchor-placement="center-bottom"
        />
      </div>
    </div>
  );
};

export default Cac;
