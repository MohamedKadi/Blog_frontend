import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Decode token to get user info
  const loadUserFromToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setIsLoading(false);
        return;
      }

      setUser({ id: payload.id, role: payload.role });
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    loadUserFromToken();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
