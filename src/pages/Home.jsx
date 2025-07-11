import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'Boys PG',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Girls PG',
    imageUrl: 'https://images.unsplash.com/photo-1592840740734-2c8c7c90735d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Co-Living Spaces',
    imageUrl: 'https://images.unsplash.com/photo-1600585154205-8e8c5ae60c31?auto=format&fit=crop&w=800&q=80',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to StayNest</h1>
          <p className="text-lg">Find your perfect PG with comfort and convenience.</p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="py-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={category.imageUrl}
                alt={category.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <Link to="/listings">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose StayNest?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Verified listings, seamless communication between tenants and owners, modern UI, and
          responsive experience. We help you find a place you can call home.
        </p>
        <Link to="/listings">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition">
            Browse Listings
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 StayNest. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
