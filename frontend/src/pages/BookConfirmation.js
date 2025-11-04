import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/Button';

const BookConfirmation = () => {
  const { bookingData, confirmBooking } = useBooking();
  const [displayService, setDisplayService] = useState(bookingData.service || '');
  const navigate = useNavigate();

  console.log('BookConfirmation: Current bookingData:', bookingData);

  // If bookingData.service isn't set (flow or provider timing), try to read from localStorage
  useEffect(() => {
    if (bookingData?.service) {
      setDisplayService(bookingData.service);
      return;
    }

    try {
      const saved = localStorage.getItem('bookingData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.service) setDisplayService(parsed.service);
      }
    } catch (e) {
      // ignore JSON errors
      console.warn('BookConfirmation: failed to read bookingData from localStorage', e);
    }
  }, [bookingData]);

  const handleConfirmBooking = () => {
    confirmBooking();
    navigate('/payment');
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return 'Not specified';
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return `${formattedDate} at ${time}`;
  };

  const formatLocation = () => {
    const { address, city, zipCode } = bookingData;
    if (!address && !city && !zipCode) return '522202';

    const parts = [];
    if (address) parts.push(address);
    if (city) parts.push(city);
    if (zipCode) parts.push(zipCode);

    return parts.join(', ');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Step 3 of 3
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Review and Confirm Your Booking
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Almost there! Please review the details below.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Booking Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start py-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Service</span>
                <span id="service-detail" className="font-semibold text-right text-gray-900 dark:text-white">
                  {bookingData.service || 'Not specified'}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Date & Time</span>
                <span id="datetime-detail" className="font-semibold text-right text-gray-900 dark:text-white">
                  {formatDateTime(bookingData.date, bookingData.time)}
                </span>
              </div>
              <div className="flex justify-between items-start py-4">
                <span className="text-gray-600 dark:text-gray-400">Location</span>
                <span id="location-detail" className="font-semibold text-right text-gray-900 dark:text-white">
                  {formatLocation() || '522202'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleConfirmBooking}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-base font-medium"
            >
              Confirm & Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConfirmation;
