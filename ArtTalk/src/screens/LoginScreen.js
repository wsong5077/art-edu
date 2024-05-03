import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; 
import * as AppleAuthentication from 'expo-apple-authentication';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const { loginUser } = useAuth(); // Use the loginUser method from context
  const loginUser = (userDetails) => {
    setUserInfo(userDetails);
    setAuthenticated(true);
  };
  

  const handleLogin = () => {
    loginUser(email, password); // Update context with user info
    navigation.navigate('Home'); // Navigate to the home screen after login
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
});

export default LoginScreen;
