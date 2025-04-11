import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const apiUrl = import.meta.env.VITE_API_URLL;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(apiUrl + '/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          categories: categories,
        }),
      });
      if (!response.ok) {
        throw new Error('something wrong');
      }
      const result = await response.json();

      navigate('/blogs'); //redirection l post b id dyalo
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (user) {
    return (
      <div
        onSubmit={handleSubmit}
        className="w-full mt-35 flex flex-col items-center"
      >
        <form className="w-full max-w-sm">
          <div className="flex flex-col items-start mb-3">
            <div className="">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 pr-4"
                htmlFor="inline-email"
              >
                Title
              </label>
            </div>
            <div className="w-full">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black"
                id="inline-email"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              ></input>
            </div>
          </div>

          <div className="max-w-sm flex flex-col items-start mb-3">
            <label
              htmlFor="message"
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            >
              Write your Blog
            </label>
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-200 block p-2.5 w-full text-sm text-gray-900 focus:bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <div className="max-w-sm mx-auto mb-5">
            <label
              htmlFor="countries"
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            >
              Select the category
            </label>
            <select
              id="countries"
              onChange={(e) => setCategories([e.target.value])}
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Tech</option>
              <option>Agriculture</option>
              <option>Economy</option>
              <option>History</option>
            </select>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="cursor-pointer shadow bg-blue-500  text-white font-bold py-2 px-4  rounded hover:bg-blue-400 focus:shadow-outline focus:outline-none transition hover:scale-105 duration-300 ease-in-out"
                type="submit"
              >
                Submit Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default CreateBlog;
