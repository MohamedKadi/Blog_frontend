import React, { useState } from 'react';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const login = (username, email) => {
    setUsername({ name: username });
    setEmail({ email: email });
  };

  const logout = () => {
    setUsername(null);
  };
  return (
    <div>
      <AuthContext.Provider value={{ username, login, logout }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
