import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      return accessToken;
    } else {
      console.log('No access token stored');
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
  return null;
};