import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const BlogPage = () => {
  const { user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URLL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    content: '',
    author: '',
    categories: [],
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl + '/api/posts/' + id, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
        }),
      });
      if (!response.ok) {
        console.log(data.title);
        handleEdit();
        setLoading(false);
        throw new Error('something wrong with deleting the blog');
      }
      handleEdit();
      setLoading(false);
    } catch (error) {
      console.log('updating Blog error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl + '/api/posts/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error('something wrong with deleting the blog');
      }
      setLoading(false);
      navigate('/myblogs');
    } catch (error) {
      console.error('deleting Blog error:', error);
    }
  };
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
        setLoading(false);
      };
      handleData();
    } catch (error) {
      console.error('Blog error:', error);
    }
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (user && user.id == data.author._id) {
    return (
      <div className="w-full flex justify-center mt-20">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div>
            {edit ? (
              <input
                className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                value={data && data.title}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              ></input>
            ) : (
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data && data.title}
              </h5>
            )}
          </div>
          {edit ? (
            <input
              className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={data && data.content}
              onChange={(e) =>
                setData((prev) => ({ ...prev, content: e.target.value }))
              }
            ></input>
          ) : (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data && data.content}
            </p>
          )}

          <div
            to="#"
            className="mb-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 "
          >
            By: {data && data.author.username}
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
          </div>
          {edit ? (
            <button
              type="button"
              onClick={handleSave}
              className="cursor-pointer block focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="cursor-pointer block focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Edit
            </button>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer block focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  if (user) {
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
          <Link
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            By: {data && data.author.username}
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
          </Link>
        </div>
      </div>
    );
  }
};

export default BlogPage;
