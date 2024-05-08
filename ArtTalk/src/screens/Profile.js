import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const { isAuthenticated, setAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken'); // Remove the token from storage
            console.log('token deleted');
            setAuthenticated(false); // Update authentication state
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert("Logout Error", "An error occurred while trying to logout.");
        }
    };

    if (!isAuthenticated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>You are not logged in</Text>
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
                <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to your profile!</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default Profile;
