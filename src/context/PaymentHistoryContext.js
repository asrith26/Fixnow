import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PaymentHistoryContext = createContext({});

export const usePaymentHistory = () => {
  const context = useContext(PaymentHistoryContext);
  if (!context) {
    throw new Error('usePaymentHistory must be used within a PaymentHistoryProvider');
  }
  return context;
};

export const PaymentHistoryProvider = ({ children }) => {
  const { currentUser, getAuthHeaders } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user-specific payment history from backend when user changes
    if (currentUser?.id) {
      fetchUserPayments();
    } else {
      setPaymentHistory([]);
    }
  }, [currentUser]);

  const fetchUserPayments = async () => {
    if (!currentUser?.id) return;

    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/payments`, {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        if (data.payments) {
          setPaymentHistory(data.payments);
        }
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Fallback to localStorage if backend fails
      const savedHistory = localStorage.getItem('paymentHistory');
      if (savedHistory) {
        setPaymentHistory(JSON.parse(savedHistory));
      }
    } finally {
      setLoading(false);
    }
  };

  const addPaymentToHistory = async (paymentData) => {
    try {
      setLoading(true);

      const paymentPayload = {
        bookingId: paymentData.bookingId,
        amount: paymentData.amount || 125.00,
        paymentMethod: paymentData.paymentMethod || 'card',
        service: paymentData.service,
        location: paymentData.location,
        date: paymentData.date,
        time: paymentData.time
      };

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(paymentPayload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.payment) {
          // Add the new payment to the local state
          setPaymentHistory([data.payment, ...paymentHistory]);
        }
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      // Fallback to localStorage if backend fails
      const newPayment = {
        _id: Date.now().toString(),
        date: new Date().toISOString(),
        amount: paymentData.amount || 125.00,
        service: paymentData.service,
        status: 'completed',
        paymentMethod: paymentData.paymentMethod || 'card',
        location: paymentData.location,
        ...paymentData
      };

      const updatedHistory = [newPayment, ...paymentHistory];
      setPaymentHistory(updatedHistory);
      localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));
    } finally {
      setLoading(false);
    }
  };

  const clearPaymentHistory = () => {
    setPaymentHistory([]);
    localStorage.removeItem('paymentHistory');
  };

  const cancelPayment = (paymentId) => {
    const updatedHistory = paymentHistory.filter(payment => payment._id !== paymentId);
    setPaymentHistory(updatedHistory);
    localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));
  };

  const value = {
    paymentHistory,
    loading,
    addPaymentToHistory,
    clearPaymentHistory,
    cancelPayment,
    fetchUserPayments
  };

  return (
    <PaymentHistoryContext.Provider value={value}>
      {children}
    </PaymentHistoryContext.Provider>
  );
};
