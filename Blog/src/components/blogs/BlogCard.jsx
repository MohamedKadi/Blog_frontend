import React, { useEffect, useState } from 'react';

const BlogCard = () => {
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

  return (
    <div className="mt-3 mx-8">
      <h1 className="text-center font-bold text-2xl">Latest 3 BLOGS</h1>
      {data.length > 0 ? (
        data.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="border mx-4 my-4 px-8 py-4 hover:scale-102 transition duration-300 ease-in-out cursor-pointer"
          >
            <h3>
              <span className="font-bold">Title:</span> {item.title}
            </h3>
            <p>
              <span className="font-bold">Content:</span>{' '}
              {item.content?.substring(0, 100) + '...' ||
                'No content available'}
            </p>
            <p>
              <span className="font-bold">By:</span> {item.author || 'Unknown'}
            </p>
            <p>
              <span className="font-bold">Categories:</span>{' '}
              {item.categories ? item.categories.join(', ') : 'Uncategorized'}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center">No blog posts available</p>
      )}
    </div>
  );
};
export default BlogCard;
