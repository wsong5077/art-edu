import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; // Correct this path to where AuthContext.js is located in your project

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth(); // Use the loginUser method from context

  const handleLogin = () => {
    // Implement login logic here
    // This is where you would authenticate against a backend
    // For now, we'll assume the login is successful and call loginUser
    loginUser(email, password); // Update context with user info
    navigation.navigate('Home'); // Navigate to the home screen after login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
