import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBudgetContext } from '../context/BudgetContext';

const Settings = () => {
  const { user, logoutUser, loading } = useBudgetContext();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setSuccessMessage('');
    
    // Basic validation
    if (!profileForm.name || !profileForm.email) {
      setProfileError('Please fill in all fields');
      return;
    }
    
    try {
      // In a real app, this would call an API to update user profile
      // For now, just simulate success
      setTimeout(() => {
        setSuccessMessage('Profile updated successfully');
      }, 500);
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setSuccessMessage('');
    
    // Basic validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }
    
    try {
      // In a real app, this would call an API to update user password
      // For now, just simulate success
      setTimeout(() => {
        setSuccessMessage('Password updated successfully');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }, 500);
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Required</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access settings.</p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold  text-gray-800 mb-6">Settings</h1>
      
      {successMessage && (
        <div className="bg-green-50 border-l-4  border-green-400 p-4 mb-6">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h2>
        
        {profileError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-sm text-red-700">{profileError}</p>
          </div>
        )}
        
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={profileForm.name}
              onChange={handleProfileChange}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={profileForm.email}
              onChange={handleProfileChange}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
        
        {passwordError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-sm text-red-700">{passwordError}</p>
          </div>
        )}
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account</h2>
        <button
          onClick={logoutUser}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;