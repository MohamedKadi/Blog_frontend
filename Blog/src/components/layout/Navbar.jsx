import React from 'react';

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between mt-6 mx-10 text-blue-900">
      <div className="hover:text-blue-700 transition-colors">
        <a href="#">BLOGGY</a>
      </div>
      <div>
        <ul className="flex flex-row justify-between gap-20 ">
          <li>
            <a href="" className="hover:text-blue-700 transition-colors">
              Solutions
            </a>
          </li>
          <li>
            <a href="" className="hover:text-blue-700 transition-colors">
              Resources
            </a>
          </li>
          <li>
            <a href="" className="hover:text-blue-700 transition-colors">
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-row justify-between gap-10">
          <li>
            <a href="" className="hover:text-blue-700 transition-colors">
              Log in
            </a>
          </li>
          <li>
            <a
              href=""
              className="outline-2 px-8 py-2.5 rounded-full hover:text-blue-700 transition-colors"
            >
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
