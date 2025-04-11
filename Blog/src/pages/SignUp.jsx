import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const apiUrl = import.meta.env.VITE_API_REGISTER;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const { user, login } = useAuth();
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    pwd: '',
    message: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const validateForm = () => {
    let valid = true;

    if (!username) {
      setErrors((prev) => ({
        ...prev,
        username: 'Username is required',
      }));
      valid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        username: '',
      }));
    }
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email is required',
      }));
      valid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        email: '',
      }));
    }
    if (!pwd) {
      setErrors((prev) => ({
        ...prev,
        pwd: 'Password is required',
      }));
      valid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        pwd: '',
      }));
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password: pwd,
          }),
        });
        const result = await response.json();
        if (!response.ok) {
          setErrors({
            message: 'this email already exists LOGIN lil bro!',
          });
          throw new Error(
            result.message || `HTTP error! status: ${response.status}`
          );
        }
        localStorage.setItem('token', result.token);
        login(result.token);
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/blogs');
    }
    setLoading(false);
  }, [user, navigate]);
  if (loading) {
    return <div className="w-full text-center font-bold">Loading...</div>;
  }
  if (!user) {
    return (
      <div className="w-full mt-35 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
          </div>
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
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
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
                placeholder="******************"
                onChange={(e) => setPwd(e.target.value)}
              ></input>
              {errors.pwd && (
                <p className="mt-1 text-sm text-red-600">{errors.pwd}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>
    );
  }
};

export default SignUp;
