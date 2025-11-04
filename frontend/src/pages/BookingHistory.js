import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, MessageCircle, Edit, X, RotateCcw, Star, MapPin, Clock, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useBooking } from '../context/BookingContext';

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);
  const { bookings, cancelBooking, updateBooking, loading, getAuthHeaders } = useBooking();

  const upcomingBookings = bookings.filter(booking => booking.status === 'Confirmed');
  const pastBookings = bookings.filter(booking => booking.status !== 'Confirmed');

  const currentBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking._id);
    setEditForm({
      service: booking.service,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      city: booking.city,
      zipCode: booking.zipCode,
      notes: booking.notes || '',
      professional: booking.professional
    });
  };

  const handleSaveEdit = async () => {
    try {
      const result = await updateBooking(editingBooking, editForm);
      if (result.success) {
        // Booking updated successfully
        console.log('Booking updated successfully');
      } else {
        console.error('Failed to update booking:', result.error);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setEditingBooking(null);
      setEditForm({});
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setShowCancelConfirm(null);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  if (loading) {
    return (
      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your bookings...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h1>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-sm mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Past ({pastBookings.length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {currentBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab} bookings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === 'upcoming'
                ? 'Your upcoming bookings will appear here.'
                : 'Your past bookings will appear here.'
              }
            </p>
            {activeTab === 'upcoming' && (
              <Link
                to="/find-pro"
                className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80"
              >
                Book a service →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {currentBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={booking.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQLOVZd8fLaYEiHDEob_8XrxpaaAjlr6i_KKpa7glTxDI4dh4xyhV_NF0Zwk85jXGiNUNOYJ4LC7bU_KPZusXj0MTr7uUcZs2zyyJlSx02nooFI6qBg3UfrpIKk7piMFJXngknZSCknuvBSIgMad-8FJEQOzuVd4Ut7_IYms9l49MInGSWt3EGc6lUB1W352Apg-A5pAAyMdhLVEp66tbb1L7j25z_Y-_mnrQAmV7sc9sfRkPSIUNU3HZ0HpBxksfYazRoNTUttSCa'}
                        alt={booking.service}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {booking.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.address}, {booking.city}, {booking.zipCode}</span>
                      </div>
                      {booking.professional && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4" />
                          <span>{booking.professional}</span>
                        </div>
                      )}
                      {booking.notes && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Notes: {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {activeTab === 'upcoming' && booking.status === 'Confirmed' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditBooking(booking)}
                          className="flex items-center gap-2 text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => setShowCancelConfirm(booking._id)}
                          className="flex items-center gap-2 text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Booking</h3>
              <div className="space-y-4">
                <FormInput
                  label="Service"
                  name="service"
                  type="text"
                  value={editForm.service}
                  onChange={(e) => setEditForm({...editForm, service: e.target.value})}
                />
                <FormInput
                  label="Title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                />
                <FormInput
                  label="Date"
                  name="date"
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                />
                <FormInput
                  label="Time"
                  name="time"
                  type="time"
                  value={editForm.time}
                  onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                />
                <FormInput
                  label="Address"
                  name="address"
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="City"
                    name="city"
                    type="text"
                    value={editForm.city}
                    onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                  />
                  <FormInput
                    label="Zip Code"
                    name="zipCode"
                    type="text"
                    value={editForm.zipCode}
                    onChange={(e) => setEditForm({...editForm, zipCode: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    placeholder="Additional notes..."
                  />
                </div>
                <FormInput
                  label="Professional"
                  name="professional"
                  type="text"
                  value={editForm.professional}
                  onChange={(e) => setEditForm({...editForm, professional: e.target.value})}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-primary text-white hover:bg-primary/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={() => setEditingBooking(null)}
                  className="flex-1 bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancel Booking</h3>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Are you sure you want to cancel this booking?
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      If payment has been made, refunds will be processed within 3 working days.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleCancelBooking(showCancelConfirm)}
                  className="flex-1 bg-red-600 text-white hover:bg-red-700"
                >
                  Yes, Cancel
                </Button>
                <Button
                  onClick={() => setShowCancelConfirm(null)}
                  className="flex-1 bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300"
                >
                  Keep Booking
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="btn-secondary"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BookingHistory;
