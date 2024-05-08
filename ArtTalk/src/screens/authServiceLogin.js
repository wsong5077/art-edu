import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import sha256 from 'crypto-js/sha256';

const handleLogin = async (email, password, navigation, loginUser) => {
  const hashedPassword = sha256(password).toString();
  const credentials = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(hashedPassword)}`;
  const url = 'http://localhost:8000/auth/login?login_type=username_password';
  try {
    const response = await axios.post(url, credentials, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    await AsyncStorage.setItem('accessToken', access_token);
    console.log('Logged in with token:', access_token);
    navigation.navigate('Home');
    loginUser(); // Assuming loginUser updates the app context
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    const errorMessage = error.response ? error.response.data.detail + "\nPlease try again." : "Please check your network connection and try again.";
    if (Platform.OS === 'web') {
      alert(errorMessage); // Browser's native alert function
    } else {
      Alert.alert("Login Failed", errorMessage);
    }
  }
};

export default handleLogin;
