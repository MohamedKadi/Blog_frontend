import React, { useState } from 'react';
import { useEffect } from 'react';
import Blog from '../components/blogs/Blog';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
  const apiUrl = import.meta.env.VITE_API_URLL;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const handleData = async () => {
        const response = await fetch(apiUrl + '/api/posts/myblogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('error of calling the posts');
        }
        const result = await response.json();

        setData(result.data);
      };
      handleData();
    } catch (error) {
      console.log(error.message());
    }
  }, []);
  if (data) {
    return data.map((item) => <Blog item={item} />);
  }
};

export default MyBlogs;
