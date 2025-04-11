import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogPage = () => {
  const apiUrl = import.meta.env.VITE_API_URLL;
  const { id } = useParams();
  const [data, setData] = useState({
    title: '',
    content: '',
    author: '',
    categories: [],
    createdAt: '',
  });
  useEffect(() => {
    try {
      let token = localStorage.getItem('token');
      const handleData = async () => {
        const response = await fetch(apiUrl + '/api/posts/' + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Berear ` + token,
          },
        });
        if (!response.ok) {
          throw new Error('something wrong');
        }
        const result = await response.json();
        setData(result.data);
      };
      handleData();
    } catch (error) {
      console.error('Blog error:', error);
    }
  }, [data]);
  return (
    <div className="w-full flex justify-center mt-20">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data && data.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data && data.content}
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BlogPage;
