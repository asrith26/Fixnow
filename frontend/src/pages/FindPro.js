import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Sparkles, Paintbrush, Wrench, Car, Truck, Home } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/Button';
import BookingCalendar from '../components/BookingCalendar';

const FindPro = () => {
  const { setService, setDate, setNotes } = useBooking();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setLocalNotes] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'electrical',
      name: 'Electrical Services',
      description: 'Safe, reliable, and efficient electrical solutions for your home and business.',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
    },
    {
      id: 'cleaning',
      name: 'Cleaning Services',
      description: 'Sparkling clean spaces with FixNow. Professional deep cleaning for homes and offices.',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    },
    {
      id: 'painting',
      name: 'Painting Services',
      description: 'Interior and exterior painting with quality finishes.',
      icon: <Paintbrush className="w-8 h-8" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      id: 'plumbing',
      name: 'Plumbing Services',
      description: 'From leaky faucets to complex pipe installations, our skilled plumbers are here to help with all your plumbing needs.',
      icon: <Wrench className="w-8 h-8" />,
      color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
    },
    {
      id: 'handyman',
      name: 'Handyman Services',
      description: 'Your go-to for any home repair. From minor fixes to major installations, our skilled handymen are here to tackle any task, big or small.',
      icon: <Home className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    },
    {
      id: 'carpentry',
      name: 'Carpentry Services',
      description: 'Expert carpentry for your home. From custom builds to repairs, we deliver quality craftsmanship.',
      icon: <Car className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    },
    {
      id: 'moving',
      name: 'Moving Services',
      description: 'Professional moving and relocation assistance.',
      icon: <Truck className="w-8 h-8" />,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  const handleBookingSubmit = () => {
    if (selectedDate && selectedService) {
      setService(selectedService.name);
      setDate(selectedDate);
      setNotes(notes);
      console.log('FindPro: Setting service:', selectedService.name, 'date:', selectedDate);
      navigate('/book-time');
    }
  };

  if (showBooking && selectedService) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setShowBooking(false)}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Services
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Book {selectedService.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select your preferred date and add any notes for the service.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service
              </label>
              <input
                type="text"
                value={selectedService.name}
                readOnly
                className="w-full max-w-sm p-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Add any specific notes or requirements..."
                rows={4}
                className="w-full p-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Selected: {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'None'}
              </div>
              <Button
                onClick={handleBookingSubmit}
                disabled={!selectedDate}
                className="px-8"
              >
                Continue to Time Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find a Professional
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse and hire trusted professionals for all your home repair and maintenance needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto">
                <div className={`${service.color} p-3 rounded-full`}>
                  {service.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {service.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                {service.description}
              </p>

              <Button
                onClick={() => handleServiceSelect(service)}
                className="w-full"
                variant="outline"
              >
                Book {service.name.split(' ')[0]}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find the service you need?
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="secondary"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindPro;
