import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const loginUser = () => {
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,setAuthenticated, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
