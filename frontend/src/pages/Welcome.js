import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center p-8 max-w-2xl">
        <div className="mb-12 flex justify-center">
          <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Wrench className="text-white text-7xl" />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome to FixNow
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your one-stop solution for all home repair needs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="btn-primary text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="btn-secondary text-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
