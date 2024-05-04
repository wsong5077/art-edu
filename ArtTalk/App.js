import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from "./src/navigations/Navigator";  // Ensure this path is correct
import { AuthProvider } from './src/screens/AuthContext'; // Corrected path

const App = () => {
  return (
    <AuthProvider>  
      <NavigationContainer>
        <HomeStackNavigator/>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
