import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Briefcase, DollarSign, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser, getAuthHeaders } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchStats();
    }
  }, [currentUser]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/admin/stats`, {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your FixNow platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'Users' },
              { id: 'professionals', label: 'Professionals' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'analytics', label: 'Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats Cards */}
        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="Active Professionals"
              value={stats.activeProfessionals}
              icon={Briefcase}
              color="bg-green-500"
            />
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={TrendingUp}
              color="bg-purple-500"
            />
            <StatCard
              title="Total Revenue"
              value={`$${stats.totalRevenue?.toLocaleString() || '0'}`}
              icon={DollarSign}
              color="bg-yellow-500"
            />
          </div>
        )}

        {/* Content based on active tab */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New professional registered</p>
                      <p className="text-sm text-gray-500">Sarah Johnson joined as an electrician</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Booking completed</p>
                      <p className="text-sm text-gray-500">Plumbing service for John Doe</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pending verifications</p>
                      <p className="text-sm text-gray-500">3 professionals awaiting approval</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
              <p className="text-gray-600">User management features coming soon...</p>
            </div>
          )}

          {activeTab === 'professionals' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Management</h2>
              <p className="text-gray-600">Professional management features coming soon...</p>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Management</h2>
              <p className="text-gray-600">Booking management features coming soon...</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
              <p className="text-gray-600">Analytics features coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
