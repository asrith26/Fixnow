// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You could validate the token here with the backend
      // For now, we'll assume it's valid
      setCurrentUser({ token });
    }
    setLoading(false);
  }, []);

  const signup = async (formData) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role || 'user',
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      // Store token and set user
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);

      return { success: true };

    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error or server is down.' };
    }
  };

  const login = async (formData) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      // Store token and set user
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);

      return { success: true };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error or server is down.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
    getAuthHeaders
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
