import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { useAuth } from '../screens/AuthContext'; // Correct the path as needed
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import handleLogin from './authServiceLogin';
import { handleEmailChange } from '../utils/checkEmail';
import sha256 from 'crypto-js/sha256';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { loginUser } = useAuth();
  const navigation = useNavigation();

  const onChangeEmail = (text) => {
    handleEmailChange(text, setEmail, setIsEmailValid);
  };

  const handleSignup = async () => {
    try {
      // Construct the user object as expected by your backend API
      const hashedPassword = sha256(password).toString();
      const userData = {
        username: email, // Using email as username, adjust according to your needs
        email: email,
        hashed_password: hashedPassword // Note: Sending plain text password, should ideally be hashed on the server side
      };

      const response = await axios.post('http://localhost:8000/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Assuming the server responds with access token or user data on successful registration
      if (response.data) {
        // login user or set authentication state here
        console.log('User registered:', response.data);
        handleLogin(email, password, navigation, loginUser);
      }
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response ? error.response.data.detail + "\nPlease try again." : "Please check your network connection and try again.";
      if (Platform.OS === 'web') {
        // Use a custom modal or browser alert for web
        alert(errorMessage); // Browser's native alert function
      } else {
        // Use React Native's Alert for mobile
        Alert.alert("Signup Failed", errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {!isEmailValid && (
        <Text style={styles.errorText}>Invalid email format</Text> // Display error message if email is invalid
      )}
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="abc@example.com"
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
        title="Sign Up"
        onPress={handleSignup}
        disabled={!isEmailValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',

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
  errorText: {
    color: 'red', // Error text in red for visibility
    fontSize: 12,
    marginBottom: 5,
    alignSelf: 'flex-start', // Align text to the left
    marginLeft: 12 // Match the input text margin
  }
});

export default SignupScreen;
