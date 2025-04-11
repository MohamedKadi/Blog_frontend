import React from 'react';
import { useNavigate } from 'react-router-dom';
const Blog = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      key={item.id}
      className="border w-full mx-4 my-4 px-8 py-4 hover:scale-102 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => {
        navigate('/blogs/' + item._id);
      }}
    >
      <h3>
        <span className="font-bold">Title:</span> {item.title}
      </h3>
      <p>
        <span className="font-bold">Content:</span>{' '}
        {item.content?.substring(0, 100) + '...' || 'No content available'}
      </p>
      <p>
        <span className="font-bold">By:</span>{' '}
        {item.author.username || 'Unknown'}
      </p>
      <p>
        <span className="font-bold">Categories:</span>{' '}
        {item.categories ? item.categories.join(', ') : 'Uncategorized'}
      </p>
    </div>
  );
};

export default Blog;
