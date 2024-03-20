import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { db } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom'; 

const LoginPage = ({ darkMode }) => {
  const [mode, setMode] = useState('login'); 
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const addUserToFirestore = async (userId, additionalData) => {
    try {
      await setDoc(doc(db, "users", userId), additionalData);
    } catch (error) {
      // Updated error handling to include error code and message
      console.error("Error adding user to Firestore: ", error.code, error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Logged in successfully!');
      setError('');

      
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const username = event.target.username.value; 
    const auth = getAuth();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await addUserToFirestore(user.uid, { email: user.email, username: username });

      setMessage('Registered successfully!');
      setError('');

      // Redirect the user after sign up
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setMessage('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-96 transition-all duration-500 ease-in-out transform ${
        darkMode ? 'bg-[#1a1a2e] text-white' : 'bg-white text-black'
      } ${mode === 'signup' ? 'scale-105' : 'scale-100'}`}>
        <h2 className="text-2xl font-semibold mb-4">
          {mode === 'login' ? 'Welcome Back!' : 'Join Us!'}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        {mode === 'login' ? 
          <LoginForm handleLogin={handleLogin} darkMode={darkMode} /> : 
          <SignupForm handleSignup={handleSignup} darkMode={darkMode} />
        }
        <p className="mt-4">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleMode}
            className={`font-medium ${darkMode ? 'text-blue-500' : 'text-green-600'} hover:underline`}
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

const LoginForm = ({ handleLogin, darkMode }) => {
  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 p-2 w-full border rounded-md text-black"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 p-2 w-full border rounded-md text-black"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className={`w-full bg-${darkMode ? 'blue-500' : 'green-500'} text-black py-2 px-4 rounded-md hover:bg-${darkMode ? 'blue-600' : 'green-600'} transition duration-300 text-${darkMode ? 'white' : 'blue-700'}`}>
        Login
      </button>
    </form>
  );
};

const SignupForm = ({ handleSignup, darkMode }) => {
  return (
    <form onSubmit={handleSignup}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 p-2 w-full border rounded-md text-black"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 p-2 w-full border rounded-md text-black"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="mt-1 p-2 w-full border rounded-md text-black"
          placeholder="Confirm your password"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="mt-1 p-2 w-full border rounded-md text-black"
          placeholder="Enter your username"
          required
        />
      </div>
      <button type="submit" className={`w-full bg-${darkMode ? 'blue-500' : 'green-500'} text-black py-2 px-4 rounded-md hover:bg-${darkMode ? 'blue-600' : 'green-600'} transition duration-300 text-${darkMode ? 'white' : 'green-700'}`}>
        Sign Up
      </button>
    </form>
  );
};

export default LoginPage;
