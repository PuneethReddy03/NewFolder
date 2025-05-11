import React from 'react';
import { Link } from 'react-router-dom';
import { useBudgetContext } from '../../context/BudgetContext';

const Header = () => {
  const { user } = useBudgetContext();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Budget</span>
              <span className="text-xl font-bold text-gray-800">Planner</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="ml-3 relative flex items-center space-x-3">
                <Link to="/settings" className="text-gray-700 hover:text-blue-600">
                  <span className="font-medium">{user.name}</span>
                </Link>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;