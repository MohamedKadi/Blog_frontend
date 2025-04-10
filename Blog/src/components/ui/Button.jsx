import React from 'react';

const Button = ({ content, to }) => {
  return (
    <a
      className="border px-5 py-2 rounded-xl hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out"
      href={to}
    >
      {content}
    </a>
  );
};

export default Button;
