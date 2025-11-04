import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  List,
  DollarSign,
  Star,
  Settings,
  LogOut,
  User,
  CheckCircle,
  Clock,
  XCircle,
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useProfessional } from '../context/ProfessionalContext';
import Button from '../components/Button';

const ProfessionalDashboard = () => {
  const {
    professionalData,
    activeTab,
    setActiveTab,
    confirmBooking,
    cancelBooking,
    rescheduleBooking,
    addService,
    updateService,
    toggleServiceStatus,
    markNotificationAsRead
  } = useProfessional();

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({ name: '', price: '', status: 'active' });

  const handleBookingAction = (bookingId, action, data = {}) => {
    switch (action) {
      case 'confirm':
        confirmBooking(bookingId);
        break;
      case 'cancel':
        cancelBooking(bookingId);
        break;
      case 'reschedule':
        rescheduleBooking(bookingId, data.newDate, data.newTime);
        break;
      default:
        break;
    }
  };

  const handleAddService = () => {
    if (newService.name && newService.price) {
      addService(newService);
      setNewService({ name: '', price: '', status: 'active' });
      setShowAddServiceModal(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({ name: service.name, price: service.price, status: service.status });
    setShowAddServiceModal(true);
  };

  const handleUpdateService = () => {
    if (editingService && newService.name && newService.price) {
      updateService(editingService.id, newService);
      setEditingService(null);
      setNewService({ name: '', price: '', status: 'active' });
      setShowAddServiceModal(false);
    }
  };

  const handleToggleServiceStatus = (serviceId) => {
    toggleServiceStatus(serviceId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
        ★
      </span>
    ));
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'My Services', icon: List },
    { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Profile Settings', icon: Settings }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 flex flex-col p-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-4 mb-6">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
            style={{ backgroundImage: `url("${professionalData.avatar}")` }}
          />
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white">{professionalData.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Professional</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold'
                  : 'hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.id === 'dashboard' && professionalData.notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {professionalData.notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, {professionalData.name}! Here's your business overview.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${professionalData.stats.totalEarnings.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Completed Jobs</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {professionalData.stats.completedJobs}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {professionalData.stats.averageRating} <span className="text-yellow-400">★</span>
            </p>
          </div>
        </section>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Upcoming Bookings */}
            <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="p-4 font-semibold">Service</th>
                      <th className="p-4 font-semibold">Date & Time</th>
                      <th className="p-4 font-semibold">Client</th>
                      <th className="p-4 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {professionalData.upcomingBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-4">{booking.service}</td>
                        <td className="p-4 text-gray-500 dark:text-gray-400">
                          {new Date(booking.date).toLocaleDateString()}, {booking.time}
                        </td>
                        <td className="p-4 text-gray-500 dark:text-gray-400">{booking.client}</td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleBookingAction(booking.id, 'confirm')}
                                className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primary/90"
                              >
                                Confirm
                              </button>
                            )}
                            <button
                              onClick={() => handleBookingAction(booking.id, 'reschedule')}
                              className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'cancel')}
                              className="px-3 py-1 text-sm rounded bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/70"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Reviews */}
              <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Reviews</h2>
                <div className="space-y-6">
                  {professionalData.recentReviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                          style={{ backgroundImage: `url("${review.avatar}")` }}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{review.client}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">"{review.comment}"</p>
                      <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                  ))}
                </div>
              </section>

              {/* My Services */}
              <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Services</h2>
                  <Button
                    onClick={() => {
                      setEditingService(null);
                      setNewService({ name: '', price: '', status: 'active' });
                      setShowAddServiceModal(true);
                    }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                  >
                    <Plus size={16} />
                    Add Service
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="p-4 font-semibold">Service</th>
                        <th className="p-4 font-semibold">Price</th>
                        <th className="p-4 font-semibold text-center">Status</th>
                        <th className="p-4 font-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professionalData.services.map((service) => (
                        <tr key={service.id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-4">{service.name}</td>
                          <td className="p-4 text-gray-500 dark:text-gray-400">${service.price}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleServiceStatus(service.id)}
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}
                            >
                              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                            </button>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditService(service)}
                                className="p-1 text-gray-500 hover:text-primary"
                              >
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Bookings</h2>
            <div className="space-y-4">
              {[...professionalData.upcomingBookings, ...professionalData.pastBookings].map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{booking.service}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.client} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBookingAction(booking.id, 'confirm')}
                          className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primary/90"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleBookingAction(booking.id, 'cancel')}
                          className="px-3 py-1 text-sm rounded bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/70"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'earnings' && (
          <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Earnings & Payouts</h2>
            <div className="space-y-4">
              {professionalData.earnings.map((earning) => (
                <div key={earning.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{earning.service}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(earning.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${earning.amount}</p>
                    <p className={`text-sm ${earning.status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                      {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'reviews' && (
          <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Reviews</h2>
            <div className="space-y-6">
              {professionalData.recentReviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{ backgroundImage: `url("${review.avatar}")` }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{review.client}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'services' && (
          <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Services</h2>
              <Button
                onClick={() => {
                  setEditingService(null);
                  setNewService({ name: '', price: '', status: 'active' });
                  setShowAddServiceModal(true);
                }}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                <Plus size={16} />
                Add Service
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionalData.services.map((service) => (
                <div key={service.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                    <button
                      onClick={() => handleEditService(service)}
                      className="p-1 text-gray-500 hover:text-primary"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">${service.price}</p>
                  <button
                    onClick={() => handleToggleServiceStatus(service.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}
                  >
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20"
                    style={{ backgroundImage: `url("${professionalData.avatar}")` }}
                  />
                  <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                    Change Picture
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={professionalData.name}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value="sarah.miller@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </section>
        )}


      </main>

      {/* Add/Edit Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={newService.status}
                  onChange={(e) => setNewService({ ...newService, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={editingService ? handleUpdateService : handleAddService}
                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
              >
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
              <Button
                onClick={() => {
                  setShowAddServiceModal(false);
                  setEditingService(null);
                  setNewService({ name: '', price: '', status: 'active' });
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDashboard;
