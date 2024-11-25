import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">
        Event Logging System
      </h1>
      <p className="text-lg text-center mb-6 text-gray-600">
        Welcome to the event logging system. Use the app to log, monitor, and
        validate events securely.
      </p>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-3">Available Pages:</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/realtime"
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Real-Time Events
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Search Events
            </Link>
          </li>
          <li>
            <Link
              to="/validate"
              className="text-white bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
            >
              Validate Chain
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
