import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    professionalId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.professionalId.trim()) {
      newErrors.professionalId = 'Professional ID is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call to check application status
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock status response - in real app, this would come from backend
      const mockStatus = {
        status: 'approved', // Could be 'pending', 'approved', 'rejected'
        submittedDate: '2024-01-15',
        reviewedDate: '2024-01-18',
        message: 'Your application has been approved! You can now start accepting jobs.',
        nextSteps: 'Please log in to your professional dashboard to set up your profile and start receiving job requests.'
      };

      setApplicationStatus(mockStatus);
      toast.success('Application status retrieved successfully!');
    } catch (error) {
      toast.error('Failed to retrieve application status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '✗';
      default:
        return '?';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FixNow</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Check your application status
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter your credentials to check your status or log in.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
            {!applicationStatus ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Professional ID"
                  name="professionalId"
                  type="text"
                  value={formData.professionalId}
                  onChange={handleInputChange}
                  error={errors.professionalId}
                  placeholder="Enter your Professional ID"
                  required
                />

                <div className="relative">
                  <FormInput
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Checking...' : 'Check Status / Login'}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl mb-4 ${getStatusColor(applicationStatus.status)}`}>
                    {getStatusIcon(applicationStatus.status)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Application {applicationStatus.status.charAt(0).toUpperCase() + applicationStatus.status.slice(1)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Submitted: {new Date(applicationStatus.submittedDate).toLocaleDateString()}
                    {applicationStatus.reviewedDate && (
                      <span> | Reviewed: {new Date(applicationStatus.reviewedDate).toLocaleDateString()}</span>
                    )}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {applicationStatus.message}
                  </p>
                  {applicationStatus.nextSteps && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Next Steps:</strong> {applicationStatus.nextSteps}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setApplicationStatus(null)}
                    className="flex-1"
                  >
                    Check Another Application
                  </Button>
                  {applicationStatus.status === 'approved' && (
                    <Button
                      onClick={() => navigate('/professional-dashboard')}
                      className="flex-1"
                    >
                      Go to Dashboard
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Status</span>
                </div>
              </div>
              <div className="mt-6 p-4 rounded bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Your application status will be displayed here after submission. If approved, you will be redirected to your professional dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 FixNow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplicationStatus;
