import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Edit } from 'lucide-react';
import Button from '../components/Button';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    console.log('Update profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-primary px-6 py-4">
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              <p className="text-primary-100 mt-1">Manage your account information</p>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentUser?.fullName || 'User'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentUser?.email}
                  </p>
                  <button className="mt-2 text-primary hover:text-primary/80 text-sm font-medium">
                    Change Photo
                  </button>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {currentUser?.fullName || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {currentUser?.email || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Info */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Member since</p>
                        <p className="text-gray-900 dark:text-white">
                          {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {isEditing ? (
                    <>
                      <Button type="submit" className="flex-1">
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
