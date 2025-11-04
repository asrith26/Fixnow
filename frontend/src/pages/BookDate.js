import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import BookingCalendar from '../components/BookingCalendar';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const BookDate = () => {
  const { bookingData, setDate, setNotes } = useBooking();
  const [selectedDate, setSelectedDate] = useState(bookingData.date);
  const [notes, setNotesValue] = useState(bookingData.notes);
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (!selectedDate) {
      alert('Please select a date first.');
      return;
    }

    setDate(selectedDate);
    setNotes(notes);
    navigate('/book-time');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Select a Date
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Choose a convenient date for your {bookingData.service || 'service'} appointment.
            </p>

            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Service:</span>
                  <p className="text-gray-900 dark:text-white">{bookingData.service || 'Not selected'}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Selected Date:</span>
                  <p className="text-gray-900 dark:text-white">
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Not selected'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div>
              <FormInput
                label="Additional Notes (Optional)"
                name="notes"
                value={notes}
                onChange={(e) => setNotesValue(e.target.value)}
                placeholder="Any special instructions or notes..."
                multiline
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleContinue}
                disabled={!selectedDate}
                className="flex-1"
              >
                Continue to Time Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDate;
