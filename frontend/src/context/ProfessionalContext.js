import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfessionalContext = createContext({});

export const useProfessional = () => {
  const context = useContext(ProfessionalContext);
  if (!context) {
    throw new Error('useProfessional must be used within a ProfessionalProvider');
  }
  return context;
};

export const ProfessionalProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [professionalData, setProfessionalData] = useState({
    name: 'Sarah Miller',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVtswGSU78Z3c_k0-4kmwd-WkfWw7wtmapHEWL8bYxwWScTGXbxBeEVr_GuhWEJyTz4d0Mm-y4jCGpaWGARZ2YDZN50knXM6xUIL-QAf2CKilVxKEtM16KDINA3F8HGdf4J9GdALGvKjPUaAqT1z-UIy3T9_DOkUds5Qs5cDwDcIieVDgw0eNgZnlKoN8s7RkMaeAaBOZBhFbA5pxITtLO1HGkqIZr4dwrU6WaDrktjEha05hhkwHutxJXw0VcvEOf5BWEji3cSIi',
    stats: {
      totalEarnings: 12500,
      completedJobs: 75,
      averageRating: 4.8
    },
    upcomingBookings: [
      {
        id: 1,
        service: 'Plumbing Repair',
        date: '2024-07-15',
        time: '2:00 PM',
        client: 'Emily Carter',
        status: 'pending'
      },
      {
        id: 2,
        service: 'Electrical Installation',
        date: '2024-07-16',
        time: '10:00 AM',
        client: 'David Lee',
        status: 'confirmed'
      },
      {
        id: 3,
        service: 'Appliance Repair',
        date: '2024-07-17',
        time: '4:00 PM',
        client: 'Jessica Brown',
        status: 'pending'
      }
    ],
    pastBookings: [
      {
        id: 4,
        service: 'Plumbing Repair',
        date: '2024-06-15',
        time: '1:00 PM',
        client: 'John Doe',
        status: 'completed',
        earnings: 150
      }
    ],
    recentReviews: [
      {
        id: 1,
        client: 'Emily Carter',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1lojPaJL1PaANK0CwHHy6Z9mBRJYx7dkDgM3BQlmY8_0aFsu4PvULHio5P_P53UZWZagDqld1tqr2Uaj-jZw_EUrBYpC5a7x9Zro_2mXm8j9ra7dCVh8LpoDkRv2VuvEtyREUXwWQMrwAZHtTu222W5NpgoNFlMxGUP3bveUfCn_0n5wLMEGE32MmHlKhdpRQKGV78Qv-RWZcjn6mNvoDzKBUwC5ul46CVJg_b7qBGQ2OzgILf6rLY1R3IalL6WKGY-6Mx0E4t87T',
        date: 'July 10, 2024',
        rating: 5,
        comment: 'Sarah was prompt, professional, and fixed my plumbing issue quickly. Highly recommend!'
      },
      {
        id: 2,
        client: 'David Lee',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7OyUVga3INIFFwvCrZOBF-MqjRILqRDiMhTlufO8EdNc8PF_SxxtynwZM9vLTKeE4owTdwG7Z1p6lvvXqAYYGpKBb79t9C9UQpgBcx2XQHl_3BrWGm-OfFmnSJeDLSSof6BI2j5ZoYYB0Xik-L_2NdFUo-Ec1nrD2Xz4a-ni5H6T435i91PLUzZ7zqnoP3GiiR5tZdr33mokmjUHJcVzwuiA5ahMJuSi1tVqZKocB6MuLJKKGmpPpzh1BEozuFb14Aa0tXHB2cN1l',
        date: 'July 8, 2024',
        rating: 4,
        comment: 'Good service, but arrived a bit later than scheduled. Overall, satisfied with the work.'
      }
    ],
    services: [
      {
        id: 1,
        name: 'Plumbing Repair',
        price: 150,
        status: 'active'
      },
      {
        id: 2,
        name: 'Electrical Installation',
        price: 200,
        status: 'active'
      },
      {
        id: 3,
        name: 'Appliance Repair',
        price: 100,
        status: 'inactive'
      }
    ],
    earnings: [
      {
        id: 1,
        date: '2024-07-10',
        amount: 150,
        service: 'Plumbing Repair',
        status: 'paid'
      },
      {
        id: 2,
        date: '2024-07-08',
        amount: 200,
        service: 'Electrical Installation',
        status: 'pending'
      }
    ],
    notifications: [
      {
        id: 1,
        type: 'booking',
        message: 'New booking request from Emily Carter',
        date: '2024-07-14',
        read: false
      },
      {
        id: 2,
        type: 'payment',
        message: 'Payment of $150 has been processed',
        date: '2024-07-10',
        read: true
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Load professional data from localStorage or API
    if (currentUser?.id) {
      const savedData = localStorage.getItem(`professional_${currentUser.id}`);
      if (savedData) {
        setProfessionalData(JSON.parse(savedData));
      }
    }
  }, [currentUser]);

  const updateProfessionalData = (newData) => {
    const updatedData = { ...professionalData, ...newData };
    setProfessionalData(updatedData);
    if (currentUser?.id) {
      localStorage.setItem(`professional_${currentUser.id}`, JSON.stringify(updatedData));
    }
  };

  const confirmBooking = (bookingId) => {
    const updatedBookings = professionalData.upcomingBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
    );
    updateProfessionalData({ upcomingBookings: updatedBookings });
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = professionalData.upcomingBookings.filter(booking => booking.id !== bookingId);
    updateProfessionalData({ upcomingBookings: updatedBookings });
  };

  const rescheduleBooking = (bookingId, newDate, newTime) => {
    const updatedBookings = professionalData.upcomingBookings.map(booking =>
      booking.id === bookingId ? { ...booking, date: newDate, time: newTime } : booking
    );
    updateProfessionalData({ upcomingBookings: updatedBookings });
  };

  const addService = (service) => {
    const newService = { ...service, id: Date.now() };
    const updatedServices = [...professionalData.services, newService];
    updateProfessionalData({ services: updatedServices });
  };

  const updateService = (serviceId, updates) => {
    const updatedServices = professionalData.services.map(service =>
      service.id === serviceId ? { ...service, ...updates } : service
    );
    updateProfessionalData({ services: updatedServices });
  };

  const toggleServiceStatus = (serviceId) => {
    const updatedServices = professionalData.services.map(service =>
      service.id === serviceId ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' } : service
    );
    updateProfessionalData({ services: updatedServices });
  };

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = professionalData.notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    updateProfessionalData({ notifications: updatedNotifications });
  };

  const value = {
    professionalData,
    activeTab,
    setActiveTab,
    updateProfessionalData,
    confirmBooking,
    cancelBooking,
    rescheduleBooking,
    addService,
    updateService,
    toggleServiceStatus,
    markNotificationAsRead
  };

  return (
    <ProfessionalContext.Provider value={value}>
      {children}
    </ProfessionalContext.Provider>
  );
};
