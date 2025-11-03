import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { usePaymentHistory } from '../context/PaymentHistoryContext';
import Button from '../components/Button';

const PaymentComplete = () => {
  const { bookingData } = useBooking();
  const { addPaymentToHistory } = usePaymentHistory();
  const [bookingId, setBookingId] = useState(null);
  const location = useLocation();
  const { bookingData: passedBookingData, paymentMethod, paymentData } = location.state || {};

  const currentBookingData = passedBookingData || bookingData;

  useEffect(() => {
    // Add payment to history when component mounts
    if (currentBookingData?.service) {
      // First, create the booking to get the bookingId
      const createBookingAndPayment = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
          const bookingResponse = await fetch(`${apiUrl}/api/bookings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              service: currentBookingData.service,
              title: `${currentBookingData.service} Service`,
              date: currentBookingData.date,
              time: currentBookingData.time,
              address: currentBookingData.address,
              city: currentBookingData.city,
              zipCode: currentBookingData.zipCode,
              notes: currentBookingData.notes,
              professional: 'Professional'
            })
          });

          if (bookingResponse.ok) {
            const bookingDataResponse = await bookingResponse.json();
            const newBookingId = bookingDataResponse.booking._id;
            setBookingId(newBookingId);

            // Now add payment with the bookingId
            addPaymentToHistory({
              bookingId: newBookingId,
              service: currentBookingData.service,
              amount: 125.00,
              paymentMethod: paymentMethod || 'card',
              location: `${currentBookingData.address}, ${currentBookingData.city}, ${currentBookingData.zipCode}`,
              date: currentBookingData.date,
              time: currentBookingData.time
            });
          }
        } catch (error) {
          console.error('Error creating booking and payment:', error);
        }
      };

      createBookingAndPayment();
    }
  }, [currentBookingData, addPaymentToHistory, paymentMethod]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center gap-2 text-primary" to="/">
              <div className="text-primary">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">FixNow</h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full p-3">
              <CheckCircle className="h-12 w-12" />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Payment Successful!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your booking is confirmed. You will receive an email with all the details shortly.
          </p>

          <Button
            onClick={() => window.location.href = '/'}
            className="w-full max-w-xs bg-primary text-white py-3 px-6 rounded-lg font-bold text-base hover:opacity-90"
          >
            Return to Homepage
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PaymentComplete;
