import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const Detailmoduleartist = ({ navigation, route }) => {
    const { artwork } = route.params;
    const [showDescription, setShowDescription] = useState(false); // State to toggle description
    console.log(artwork.description);


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
                        source={{ uri: artwork.imageUri }}
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
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.chatButton}>
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
    }
});

export default Detailmoduleartist;
