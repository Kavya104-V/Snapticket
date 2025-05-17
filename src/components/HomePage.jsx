import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://cdn.dribbble.com/users/1187836/screenshots/7049426/media/7b3ab8c1fff5cdb8fa3e2fcc53c18dfb.gif')",
      }}
    >
      <div className="w-full max-w-3xl p-6 bg-black bg-opacity-60 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-300">
          🚍 Bus Ticket Portal
        </h1>

        {/* Tab Buttons */}
        <div className="flex justify-center space-x-2 mb-6">
          <Link
            to="/register"
            className="px-6 py-3 rounded-md bg-gray-800 text-white font-medium transition duration-300 hover:text-black hover:bg-yellow-400"
          >
            Go to Passenger
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-md bg-gray-800 text-white font-medium transition duration-300 hover:text-black hover:bg-yellow-400"
          >
            Bus Administration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
