import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Analytics = ({ darkMode }) => {
  const [chartType, setChartType] = useState('Bar');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ disable: 'mobile' });
  }, []);

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Number of Workouts',
        data: [3, 4, 5, 6],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'Bar':
        return <Bar data={data} />;
      case 'Pie':
        return <Pie data={data} />;
      case 'Line':
        return <Line data={data} />;
      default:
        return null;
    }
  };

  const handleDiscoverMoreClick = () => {
    navigate('/Login');
  };

  return (
    <div className={`${darkMode ? 'bg-[#1a1a2e] text-white' : 'bg-white text-black'} min-h-screen py-16 px-4 flex`}>
      <div className='w-1/2 flex flex-col justify-center items-center' data-aos="fade-up">
        <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-[#00df9a]' : 'text-black'}`}>
          Maximize Your Potential with Smart Analytics
        </h2>
        <p className={`${darkMode ? 'text-[#eaeaea]' : 'text-black'} mb-4`} data-aos="fade" data-aos-delay="200">
          Unlock the power of data to optimize your fitness journey...
        </p>
        <ul className={`list-disc ml-4 mb-4 ${darkMode ? 'text-[#eaeaea]' : 'text-black'}`} data-aos="fade" data-aos-delay="400">
          <li>Effortlessly track your progress and identify patterns.</li>
          <li>Set informed goals based on real-time data analysis.</li>
          <li>Stay motivated by visualizing your achievements over time.</li>
        </ul>
        <p className={`${darkMode ? 'text-[#eaeaea]' : 'text-black'} mb-4`} data-aos="fade" data-aos-delay="600">
          Transform your efforts into measurable results and keep pushing your limits. Our analytics are your stepping stone to greatness!
        </p>
        <button
          onClick={handleDiscoverMoreClick}
          className={`w-[200px] rounded-md font-medium my-6 py-3 ${
            darkMode ? 'bg-[#00df9a] text-black' : 'bg-black text-white'
          } hover:bg-opacity-90 transition duration-300`}
          data-aos="zoom-in"
          data-aos-delay="800"
        >
          Discover More
        </button>
      </div>
      <div className='w-1/2 flex justify-center items-center' data-aos="fade-up">
        <select onChange={(e) => setChartType(e.target.value)} className='mb-4 text-black'>
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Line">Line Chart</option>
        </select>
        <div
          style={{ width: '80%', height: '80%' }}
          className='hover:scale-105 transition-transform duration-300'
        >
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default Analytics;