import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const loginUser = (email, password) => {
    // Here you would integrate with your backend to authenticate the user
    // and retrieve user info, then store it in the context
    const userData = { email }; // Replace with actual user data
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
