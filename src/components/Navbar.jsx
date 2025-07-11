import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">
        StayNest
      </Link>
      <div className="space-x-4">
        <Link to="/listings" className="text-gray-700 hover:text-blue-700">
          Listings
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-700">
          Login
        </Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-700">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
