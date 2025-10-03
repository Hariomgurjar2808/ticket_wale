// MONGODB INTEGRATION: Authentication context to manage user state across the application
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // MONGODB INTEGRATION: Check for stored authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('Auth restored from localStorage:', parsedUser.name);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    
    setLoading(false);
  }, []);

  // MONGODB INTEGRATION: Login function that stores user data and token
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // MONGODB INTEGRATION: Logout function that clears stored data
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  // MONGODB INTEGRATION: Get authentication token for API calls
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // MONGODB INTEGRATION: Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!getToken();
  };

  // MONGODB INTEGRATION: Make authenticated API calls
  const authenticatedFetch = async (url, options = {}) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    // If token is invalid, logout user
    if (response.status === 401) {
      logout();
      throw new Error('Authentication failed');
    }
    
    return response;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    getToken,
    isAuthenticated,
    authenticatedFetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};