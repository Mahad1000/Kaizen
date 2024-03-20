import React from 'react';

const ContactPage = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-[#1a1a2e] text-white' : 'bg-white text-black'} min-h-screen flex items-center justify-center`}>
      <div className='max-w-[800px] mx-auto py-12 px-4'>
        <h1 className={`text-7xl font-bold text-center ${darkMode ? 'text-[#00df9a]' : 'text-black'}`}>
          Contact Us
        </h1>
        <p className={`md:text-2xl text-xl font-bold text-center mt-4 ${darkMode ? 'text-[#eaeaea]' : 'text-black'}`}>
          We're Here to Help
        </p>

        <div className={`${darkMode ? 'bg-[#24243e]' : 'bg-white'} p-6 rounded-lg shadow-lg mt-8`}>
          <form className='flex flex-col items-center'>
            <input 
              type='text' 
              placeholder='Name' 
              className='p-2 rounded-md mb-4 w-full' 
            />
            <input 
              type='email' 
              placeholder='Email' 
              className='p-2 rounded-md mb-4 w-full' 
            />
            <textarea 
              placeholder='Your Message' 
              className='p-2 rounded-md mb-4 w-full' 
              rows='4'
            ></textarea>
            <button 
              type='submit' 
              className={`w-[200px] rounded-md font-medium py-3 ${darkMode ? 'bg-[#00df9a] text-black' : 'bg-black text-white'} hover:bg-[#00af7a] transition duration-300`}
            >
              Send Message
            </button>
          </form>

          <div className={`${darkMode ? 'text-[#eaeaea]' : 'text-black'} mt-6`}>
            <p>Email: <a href='mailto:info@kaizen-pro.com' className='hover:underline'>info@kaizen-pro.com</a></p>
            <p>Phone: <a href='tel:+1234567890' className='hover:underline'>+1 234 567 890</a></p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-8'>
          <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-[#00df9a]' : 'text-black'}`}>
            Frequently Asked Questions
          </h2>
          <div className={`${darkMode ? 'bg-[#2a2a2e]' : 'bg-white'} space-y-4 mt-4 p-4 rounded-md`}>
            <div>
              <p className='font-bold'>How do I sign up for Kaizen-Pro?</p>
              <p>You can sign up through our app or website by clicking the 'Get Started' button.</p>
            </div>
            <div>
              <p className='font-bold'>What services does Kaizen-Pro offer?</p>
              <p>We offer personalized analytics and tools to help you track and maintain your wellness and fitness goals.</p>
            </div>
            {/* Add more FAQ items as needed */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;
