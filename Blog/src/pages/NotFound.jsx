import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
const NotFound = () => {
  return (
    <>
      <div className="font-bold text-center my-10">
        <p className="my-5">NotFound 404</p>
        <Button content="Go Back to The HomePage" to="/" />
      </div>
    </>
  );
};

export default NotFound;
