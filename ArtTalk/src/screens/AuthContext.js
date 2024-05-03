import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const loginUser = (email, password) => {
    const userData = { email }; 
    setUserInfo(userData);
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,setAuthenticated, userInfo, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
