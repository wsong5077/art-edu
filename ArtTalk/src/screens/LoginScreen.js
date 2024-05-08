import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; 
import * as AppleAuthentication from 'expo-apple-authentication';
import handleLogin from './authServiceLogin';
import { handleEmailChange } from '../utils/checkEmail';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { loginUser } = useAuth();

  const onChangeEmail = (text) => {
    handleEmailChange(text, setEmail, setIsEmailValid);
  };

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
  
      // Assuming the loginUser function can handle Apple login
      loginUser({
        email: credential.email,
        name: credential.fullName.givenName + ' ' + credential.fullName.familyName
      });
  
      navigation.navigate('Home'); // Navigate to the home screen after login
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        console.log('User canceled the sign in.');
      } else {
        console.error('Apple sign-in error:', e);
      }
    }
  };
  

  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>Login</Text>
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
        title="Login"
        onPress={() => handleLogin(email, password, navigation, loginUser)}
      />
      <Button
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('Signup')}
      />
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
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
  button: {
    width: 200,
    height: 44,
  },
  errorText: {
    color: 'red', // Error text in red for visibility
    fontSize: 12,
    marginBottom: 5,
    alignSelf: 'flex-start', // Align text to the left
    marginLeft: 12 // Match the input text margin
  }
});

export default LoginScreen;
