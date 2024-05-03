import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from './AuthContext'; 

const Profile = ({ navigation }) => {
    const { isAuthenticated, setAuthenticated } = useAuth();

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
            <Button title="Logout" onPress={() => setAuthenticated(false)} />
        </View>
    );
};

export default Profile;
