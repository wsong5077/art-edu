import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions, FlatList } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Detailmoduleartist = ({ navigation, route }) => {
    const { artwork } = route.params;
    const [showDescription, setShowDescription] = useState(false); // State to toggle description
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const images = {
        vinci: require('../images/davinci.jpg'),
        van:require('../images/van.jpeg'),
        monet:require('../images/monet.jpg'),
    };
    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        // Add new message to the messages array
        setMessages([...messages, { id: Date.now(), text: inputText }]);

        // Clear the input field
        setInputText('');
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image
                            source={require('../images/17.png')}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Image
                        source={images[artwork.localImage]}
                        style={styles.artworkImage}
                    />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {artwork.title}
                    </Text>
                   
                </View>
                {/* Conditional rendering for description */}
                {showDescription && (
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            {artwork.description}
                        </Text>
                    </View>
                )}

            </ScrollView>
            {isChatVisible && (
                <View style={styles.chatContainer}>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.messageBubble}>
                                <Text style={styles.messageText}>{item.text}</Text>
                            </View>
                        )}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type your message..."
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.chatButton} onPress={() => setIsChatVisible(!isChatVisible)}>
                    <Text style={styles.chatButtonText}>Chat with AI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.descriptionButton} onPress={() => {
                    console.log('Description button pressed');
                    setShowDescription(!showDescription);
                }}>
                    <Text style={styles.descriptionButtonText}>Description</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    descriptionContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    description: {
        fontSize: 16,
        color: "#62636a",
    },
    descriptionButtonText: {
        color: "#00a46c",
        fontWeight: "bold",
        fontSize: 17,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    container: {
        flex: 1,
    },
    backButton: {
        width: "10%",
        paddingLeft: 20,
        marginVertical: 40,
    },
    backIcon: {
        // Style if needed
    },
    artworkImage: {
        marginLeft: 10,
        marginBottom: 130,
        height: screenWidth * 0.30, // 3:4 aspect ratio based on screen width
        width: screenWidth * 0.30, // Screen width minus some margin
        marginTop: 0,
    },
    titleContainer: {
        flexDirection: "row",
        marginTop: -100,
        marginHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 28,
        color: "#62636a",
    },
    artist: {
        paddingHorizontal: 20,
        fontWeight: "bold",
        color: "#b1e5d3",
        paddingTop: 3,
        fontSize: 20,
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#e2e2e2",
    },
    chatButton: {
        width: "50%",
        backgroundColor: "#00a46c",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    chatButtonText: {
        color: "#FFF",
        fontSize: 17,
    },
    descriptionButton: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
    descriptionButtonText: {
        color: "#62636a",
        fontWeight: "bold",
        fontSize: 17,
    },
    chatContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    messageBubble: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 10,
        flex: 1,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#00a46c',
        borderRadius: 25,
        padding: 10,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default Detailmoduleartist;
