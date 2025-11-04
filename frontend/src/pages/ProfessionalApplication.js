import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Upload, User, Briefcase, FileText, Calendar, CheckCircle, Eye, EyeOff, LogIn } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import toast from 'react-hot-toast';

const ProfessionalApplication = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isExistingWorker, setIsExistingWorker] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',

    // Professional Details
    serviceCategory: '',
    experience: '',
    skills: '',

    // Documentation
    licenseFile: null,
    insuranceFile: null,

    // Availability
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    serviceRadius: '',

    // Application Status
    professionalId: '',
    statusPassword: '',
    applicationStatus: null
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Personal Info', icon: User, completed: currentStep > 1 },
    { id: 2, title: 'Professional Details', icon: Briefcase, completed: currentStep > 2 },
    { id: 3, title: 'Documentation', icon: FileText, completed: currentStep > 3 },
    { id: 4, title: 'Availability', icon: Calendar, completed: currentStep > 4 }
  ];

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

  const handleAvailabilityChange = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day]
      }
    }));
  };

  const handleStatusInputChange = (e) => {
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

  const checkApplicationStatus = async () => {
    if (!formData.professionalId.trim() || !formData.statusPassword.trim()) {
      setErrors({
        professionalId: !formData.professionalId.trim() ? 'Professional ID is required' : '',
        statusPassword: !formData.statusPassword.trim() ? 'Password is required' : ''
      });
      return;
    }

    try {
      // Try to login with the provided credentials
      const result = await login({
        email: formData.professionalId, // Using email as professional ID
        password: formData.statusPassword
      });

      if (result.success) {
        // Check if user is a professional
        if (result.user.role === 'professional') {
          toast.success('Welcome back! Redirecting to your dashboard...');
          navigate('/professional-dashboard');
        } else {
          toast.error('This account is not registered as a professional.');
        }
      } else {
        toast.error(result.error || 'Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      toast.error('Failed to login. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
      case 2:
        if (!formData.serviceCategory) newErrors.serviceCategory = 'Service category is required';
        if (!formData.experience) newErrors.experience = 'Years of experience is required';
        if (!formData.skills.trim()) newErrors.skills = 'Skills description is required';
        break;
      case 3:
        if (!formData.licenseFile) newErrors.licenseFile = 'Professional license is required';
        if (!formData.insuranceFile) newErrors.insuranceFile = 'Proof of insurance is required';
        break;
      case 4:
        const hasAvailability = Object.values(formData.availability).some(day => day);
        if (!hasAvailability) newErrors.availability = 'Please select at least one day of availability';
        if (!formData.serviceRadius) newErrors.serviceRadius = 'Service radius is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      try {
        // In a real app, you would submit the form data to your backend
        console.log('Submitting application:', formData);

        toast.success('Application submitted successfully! We\'ll review your application and get back to you within 3-5 business days.');

        // Show status form after successful submission
        setTimeout(() => {
          setShowStatusForm(true);
        }, 2000);
      } catch (error) {
        toast.error('Failed to submit application. Please try again.');
      }
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li key={step.id} className={`flex w-full items-center ${
            step.completed ? 'text-primary dark:text-primary after:border-primary' : ''
          } ${currentStep === step.id ? 'text-primary dark:text-primary' : ''}`}>
            <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
              currentStep >= step.id
                ? 'bg-primary text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}>
              <step.icon className="w-4 h-4 lg:w-6 lg:h-6" />
            </span>
            {index < steps.length - 1 && (
              <div className={`after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
                currentStep > step.id
                  ? 'after:border-primary'
                  : 'after:border-gray-300 dark:after:border-gray-700'
              }`} />
            )}
          </li>
        ))}
      </ol>
    </div>
  );

  const renderPersonalInfo = () => (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">
        1. Personal Information
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />
        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          required
        />
        <FormInput
          label="Street Address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          required
        />
        <FormInput
          label="City"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
          required
        />
        <FormInput
          label="ZIP / Postal Code"
          name="zipCode"
          type="text"
          value={formData.zipCode}
          onChange={handleInputChange}
          error={errors.zipCode}
          required
        />
      </div>
    </section>
  );

  const renderProfessionalDetails = () => (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">
        2. Professional Details
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Service Category
          </label>
          <select
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a category</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="carpentry">Carpentry</option>
            <option value="painting">Painting</option>
            <option value="cleaning">Cleaning</option>
            <option value="landscaping">Landscaping</option>
            <option value="other">Other</option>
          </select>
          {errors.serviceCategory && (
            <p className="mt-1 text-sm text-red-600">{errors.serviceCategory}</p>
          )}
        </div>
        <FormInput
          label="Years of Experience"
          name="experience"
          type="number"
          min="0"
          value={formData.experience}
          onChange={handleInputChange}
          error={errors.experience}
          required
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="e.g., Leak detection, circuit breaker installation, furnace repair..."
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
          )}
        </div>
      </div>
    </section>
  );

  const renderDocumentation = () => (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">
        3. Documentation Upload
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional License / Certification
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary dark:ring-offset-gray-800">
                  <span>Upload a file</span>
                  <input
                    name="licenseFile"
                    type="file"
                    className="sr-only"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</p>
              {formData.licenseFile && (
                <p className="text-sm text-green-600">{formData.licenseFile.name}</p>
              )}
            </div>
          </div>
          {errors.licenseFile && (
            <p className="mt-1 text-sm text-red-600">{errors.licenseFile}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Proof of Insurance
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary dark:ring-offset-gray-800">
                  <span>Upload a file</span>
                  <input
                    name="insuranceFile"
                    type="file"
                    className="sr-only"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</p>
              {formData.insuranceFile && (
                <p className="text-sm text-green-600">{formData.insuranceFile.name}</p>
              )}
            </div>
          </div>
          {errors.insuranceFile && (
            <p className="mt-1 text-sm text-red-600">{errors.insuranceFile}</p>
          )}
        </div>
      </div>
    </section>
  );

  const renderAvailability = () => (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">
        4. Availability & Service Area
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            General Availability
          </label>
          <div className="mt-2 space-y-2">
            {Object.entries(formData.availability).map(([day, checked]) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={day}
                  checked={checked}
                  onChange={() => handleAvailabilityChange(day)}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor={day} className="ml-2 block text-sm text-gray-900 dark:text-gray-300 capitalize">
                  {day}
                </label>
              </div>
            ))}
          </div>
          {errors.availability && (
            <p className="mt-1 text-sm text-red-600">{errors.availability}</p>
          )}
        </div>
        <FormInput
          label="Service Radius (in miles)"
          name="serviceRadius"
          type="number"
          min="1"
          max="100"
          value={formData.serviceRadius}
          onChange={handleInputChange}
          error={errors.serviceRadius}
          required
          placeholder="How far are you willing to travel?"
        />
      </div>
    </section>
  );

  const renderApplicationStatus = () => (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">
        Professional Login
      </h2>
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-blue-800 dark:text-blue-300">
            Already have a professional account? Sign in below to access your dashboard.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label="Email Address"
            name="professionalId"
            type="email"
            value={formData.professionalId}
            onChange={handleStatusInputChange}
            error={errors.professionalId}
            placeholder="Enter your email address"
            required
          />
          <div className="relative">
            <FormInput
              label="Password"
              name="statusPassword"
              type={showPassword ? "text" : "password"}
              value={formData.statusPassword}
              onChange={handleStatusInputChange}
              error={errors.statusPassword}
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
        </div>
        <div className="text-center space-y-4">
          <Button
            onClick={checkApplicationStatus}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2 justify-center"
          >
            <LogIn size={20} />
            Sign In as Professional
          </Button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Don't have an account yet?</p>
            <button
              type="button"
              onClick={() => setIsExistingWorker(false)}
              className="text-primary hover:text-primary/90 font-medium"
            >
              Apply to become a professional
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center gap-2 text-primary" to="/dashboard">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
              </svg>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">FixNow</h2>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              Professional Application Portal
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Complete your application and check your status below.
            </p>
          </div>

          <div className="mb-8 text-center">
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setIsExistingWorker(false)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !isExistingWorker
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                New Application
              </button>
              <button
                onClick={() => setIsExistingWorker(true)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isExistingWorker
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Existing Professional
              </button>
            </div>
          </div>

          {!isExistingWorker ? (
            <>
              {renderStepIndicator()}

              <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {currentStep === 1 && renderPersonalInfo()}
                  {currentStep === 2 && renderProfessionalDetails()}
                  {currentStep === 3 && renderDocumentation()}
                  {currentStep === 4 && renderAvailability()}

                  <div className="pt-8 flex justify-between">
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-800 disabled:opacity-50"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-800"
                      >
                        Cancel
                      </Button>

                      {currentStep < 4 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-800"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-800"
                        >
                          Submit Application
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8">
              {renderApplicationStatus()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfessionalApplication;
