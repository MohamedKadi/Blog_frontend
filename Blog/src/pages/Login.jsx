import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const apiUrl = import.meta.env.VITE_API_LOGIN;
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/blogs');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      });
      if (!response.ok) {
        throw new Error('log in again something wrong');
      }
      const result = await response.json();

      login(result.token);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (!user) {
    return (
      <div
        onSubmit={handleSubmit}
        className="w-full mt-35 flex flex-col items-center"
      >
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-password"
                type="password"
                onChange={(e) => setPwd(e.target.value)}
                placeholder="******************"
              ></input>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default Login;
