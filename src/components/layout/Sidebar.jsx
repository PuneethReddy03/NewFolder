import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBudgetContext } from '../../context/BudgetContext';

const Sidebar = () => {
  const { user, logoutUser } = useBudgetContext();

  // Navigation items - available to all users
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/income', label: 'Income', icon: '💰' },
    { path: '/expenses', label: 'Expenses', icon: '💸' },
    { path: '/goals', label: 'Savings Goals', icon: '🎯' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full flex-shrink-0">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Budget Planner</h2>
        <div className="mt-2 text-sm text-gray-600">
          {user ? `Welcome, ${user.name}` : 'Welcome, Guest'}
        </div>
      </div>
      <nav className="mt-2">
        <ul>
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                    isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {user && (
        <div className="p-6 mt-auto border-t border-gray-200">
          <button
            onClick={logoutUser}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded"
          >
            <span className="mr-3">🚪</span>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;