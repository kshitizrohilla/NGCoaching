// src/Components/GlobalNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const GlobalNavbar = () => {
  return (
    <nav className="bg-black py-4 absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-xl font-bold">
          NG Coaching
        </span>
        <div className="flex space-x-4">
          <Link to="/coach-registration" className="text-white hover:text-gray-300">
            Register Coach
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
