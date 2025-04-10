import React from 'react';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <div className="text-center w-full bg-gray-800 text-white p-4 flex flex-col items-center mt-5">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-10 mb-5">
        Welcome to BLOGGY
      </h1>
      <p className="text-gray-400 max-w-xl mx-auto mb-5">
        Browse, search, create etc..., or let Bloggy pick the perfect Blogs to
        read tonight.
      </p>
      <Button content="Start Writing" to="/create-blog" />
    </div>
  );
};

export default Hero;
