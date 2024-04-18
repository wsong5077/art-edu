import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../screens/AuthContext'; // Correct the path as needed
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const { isAuthenticated, setAuthenticated } = useAuth(); // This must be the correct usage

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigation = useNavigation();

  const handleSignup = () => {
    // Replace this logic with your actual signup process
    // For example, sending email and password to your backend
    // and handling the response.
    loginUser(email, password); // Store user info and set authenticated
    navigation.navigate('Home'); // Redirect to home after signup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        title="Sign Up"
        onPress={handleSignup}
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

export default SignupScreen;
