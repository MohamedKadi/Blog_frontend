import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Blog from './Blog';

const BlogCard = ({ show }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="mt-3 mx-8 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 mx-8 text-center text-red-500">
        <p>Error loading blog posts:</p>
        <p>{error}</p>
      </div>
    );
  }
  if (!show) {
    return (
      <div className="flex flex-wrap justify-center mt-3 mx-8 mb-5">
        <h1 className="text-center font-bold text-2xl">Latest 3 BLOGS</h1>
        {data.length > 0 ? (
          data.slice(0, 3).map((item) => <Blog item={item} />)
        ) : (
          <p className="text-center">No blog posts available</p>
        )}
        <Link
          className=" border px-5 py-2 rounded-xl hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out"
          to="/blogs"
        >
          More...
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-wrap justify-center mt-3 mx-8 mb-5">
        <h1 className="text-center font-bold text-2xl">BLOGS</h1>
        {data.length > 0 ? (
          data.map((item) => <Blog item={item} />)
        ) : (
          <p className="text-center">No blog posts available</p>
        )}
      </div>
    );
  }
};
export default BlogCard;
