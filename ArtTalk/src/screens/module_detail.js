import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef

import axios from 'axios';

const screenWidth = Dimensions.get('window').width;


const Detailmodule = ({ navigation, route }) => {
    // Predefine imports for all images
    const images = {
        monalisa: require('../images/monalisa.jpg'),
        starry:require('../images/starry.jpg'),
        lilly:require('../images/Monet1.jpg'),
    };
  
    const { artwork } = route.params;
    const [showDescription, setShowDescription] = useState(false); // State to toggle description
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(); // Ref for FlatList to control scroll position

    useEffect(() => {
        if (isChatVisible && messages.length) {
            // Scroll to the bottom of the list when new messages are added
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages, isChatVisible]); // Dependency array includes messages and isChatVisible

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
        console.log(showDescription);
        setShowDescription(false);
        if (isChatVisible) {
            setShowDescription(false);
            console.log(showDescription);
        }
    };

    const toggleDescriptionVisibility = () => {
        setShowDescription(!showDescription);
        if (showDescription) {
            setIsChatVisible(false);
        }
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;
        const context = `Discussing: ${artwork.title} by ${artwork.artist}.`;

        //const lastMessage = messages.length > 0 ? messages[messages.length - 1].text : '';
    
        const messageToSend = { id: Date.now(), text: inputText, owner: 'user' };
        setMessages(messages => [...messages, messageToSend]);
    
        try {
            const response = await axios.post('http://0.0.0.0:8000/chat/', {
                question: inputText,
                context: context  // Sending the last message which includes art and OCR results
            });
    
            if (response.data && response.data.response) {
                setMessages(messages => [
                    ...messages,
                    { id: Date.now(), text: response.data.response, owner: 'bot' }
                ]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    
        setInputText('');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
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
                <Text style={styles.artist}>
                    {artwork.artist}
                </Text>
               
            <ScrollView style={{ backgroundColor: '#FFF', flex: 1 }}>
            {showDescription && (
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            {artwork.description}
                        </Text>
                    </View>
                )}
            {isChatVisible && (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.messageBubble, item.owner === 'bot' ? styles.botMessage : styles.userMessage]}>
                                <Text style={styles.messageText}>{item.text}</Text>
                            </View>
                        )}
                        style={styles.chatContainer}
                    />
                )}
                
            </ScrollView>
            </View>
            {isChatVisible && (
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
                )}
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.chatButton} onPress={toggleChatVisibility}>
                    <Text style={styles.chatButtonText}>Chat with AI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.descriptionButton} onPress={toggleDescriptionVisibility}>
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
        marginTop: -120,
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
        marginBottom:10
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
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#d1e7dd',  // A light green background for bot messages
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#f0f0f0',  // A light grey background for user messages
    }
    
});

export default Detailmodule;
