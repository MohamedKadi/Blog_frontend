import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({ content, to }) => {
  return (
    <Link
      className=" border px-5 py-2 rounded-xl hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out"
      to={to}
    >
      {content}
    </Link>
  );
};

export default Button;
