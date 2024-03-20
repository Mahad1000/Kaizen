import React from 'react';

const AboutPage = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-[#1a1a2e] text-white' : 'bg-white text-black'} min-h-screen`}>
      <div className='max-w-[800px] mx-auto py-12 px-4'>
        <h1 className={`text-7xl font-bold md:py-6 ${darkMode ? 'text-[#00df9a]' : 'text-black'}`}>
          About Kaizen-Pro
        </h1>
        <p className={`md:text-2xl text-xl font-bold mt-4 ${darkMode ? 'text-[#eaeaea]' : 'text-black'}`}>
          Empowering Your Personal Growth Journey
        </p>
        <div className='my-6'>
        </div>
        
        <p className={`text-md ${darkMode ? 'text-[#eaeaea]' : 'text-black'} mb-6`}>
          At Kaizen-Pro, we believe in the power of continuous improvement. Our platform offers tailored analytics and tools to help you build and maintain healthy habits. Whether it's fitness, productivity, or wellness, we're here to support your progress.
        </p>

        <p className={`text-md ${darkMode ? 'text-[#eaeaea]' : 'text-black'} mb-6`}>
          Our journey began with a simple vision: to create a tool that not only tracks goals but also inspires change. Today, Kaizen-Pro is more than an app; it's a community of individuals committed to self-improvement.
        </p>

        <p className={`text-md ${darkMode ? 'text-[#eaeaea]' : 'text-black'}`}>
          Join us on this journey. Embrace the Kaizen philosophy and see how small, consistent steps can lead to significant transformations. Let's grow together with Kaizen-Pro.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
