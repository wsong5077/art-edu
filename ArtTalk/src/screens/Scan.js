import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Modal, Button, TextInput, FlatList, Alert, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

const classDescriptions = {
    'Rococo': 'An 18th-century artistic movement and style.',
    'Expressionism': 'A modernist movement focusing on emotional experience rather than appearances.',
    'High Renaissance': 'The period in the history of Western art that traditionally falls in the 15th century in Italy and continues into the early 16th century.',
    'Magic Realism': 'A literary and artistic genre in which realistic narrative and naturalistic technique are combined with surreal elements of dream or fantasy.',
    'Ukiyo-e': 'A genre of Japanese art which flourished from the 17th through 19th centuries and produced woodblock prints and paintings of such subjects as female beauties, kabuki actors, and sumo wrestlers.',
    'Romanticism': 'An artistic, literary, musical, and intellectual movement that originated in Europe toward the end of the 18th century.',
    'Abstract Art': 'Art that does not attempt to represent an accurate depiction of visual reality but instead uses shapes, colors, forms, and gestural marks to achieve its effect.',
    'Op Art': 'A style of visual art that makes use of optical illusions.',
    'Color Field Painting': 'A style of abstract painting characterized chiefly by large areas of flat solid color spread across or stained into the canvas.',
    'Abstract Expressionism': 'An artistic movement that developed in the 1940s, characterized by large-scale abstract painted canvases.',
    'Pop Art': 'An art movement that emerged in the United Kingdom and the United States during the mid- to late-1950s.',
    'Naïve Art (Primitivism)': 'Art created by artists who lack formal education in the arts.',
    'Lyrical Abstraction': 'An artistic style characterized by the use of soft forms, gestural brushstrokes, and lyrical compositions.',
    'Early Renaissance': 'A period in the history of Western art that began in Italy in the 14th century and lasted until the late 15th century.',
    'Pointillism': 'A technique of painting in which small, distinct dots of color are applied in patterns to form an image.',
    'Post-Impressionism': 'An art movement that emerged in the late 19th century as a reaction against Impressionism.',
    'Neoclassicism': 'An artistic movement of the late 18th and early 19th centuries that characterized many works of literature, architecture, music, and visual art.',
    'Concretism': 'An abstract art movement which developed in Brazil in the mid-20th century.',
    'Baroque': 'A highly ornate and often extravagant style of architecture, art, and music that flourished in Europe from the early 17th to the late 18th century.',
    'Surrealism': 'A 20th-century avant-garde movement in art that sought to release the creative potential of the unconscious mind.',
    'Art Informel': 'A style of painting and sculpture that emerged in Europe in the years following World War II.',
    'Art Nouveau (Modern)': 'An international style of art, architecture, and applied art, especially the decorative arts, that was most popular between 1890 and 1910.',
    'Neo-Romanticism': 'A movement in the arts, taking place at the end of the 19th and the beginning of the 20th century, characterized by a return to the emotionalism and sublimity of Romanticism.',
    'Symbolism': 'A late 19th-century art movement of French, Russian, and Belgian origin in poetry and other arts.',
    'Fauvism': 'A style of painting with vivid expressionistic and non-naturalistic use of color that flourished in Paris from 1905.',
    'None': 'A placeholder or absence of a specific artistic movement or style.',
    'Academicism': 'A style of painting and sculpture produced under the influence of European academies or universities.',
    'Northern Renaissance': 'The Renaissance that occurred in Europe north of the Alps.',
    'Impressionism': 'A 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, and inclusion of movement as a crucial element of human perception and experience.',
    'Realism': 'The attempt to represent subject matter truthfully, without artificiality and avoiding artistic conventions, implausible, exotic, and supernatural elements.',
    'Art Deco': 'A style of visual arts, architecture, and design that first appeared in France just before World War I.',
    'Minimalism': 'An art movement that began in post–World War II Western art, most strongly with American visual arts in the 1960s and early 1970s.',
    'Ink and wash painting': 'A type of East Asian brush painting that uses black ink, typically in various concentrations, on Chinese paper or silk.',
    'Mannerism (Late Renaissance)': 'A style in European art that emerged in the later years of the Italian High Renaissance around 1520.',
    'Cubism': 'An early-20th-century avant-garde art movement that revolutionized European painting and sculpture.',
  };
  

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
      setPhotoModalVisible(true); // Show modal with the photo
    }
  };

  const pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(photo['assets'][0]);

    if (!photo.canceled) {
      setPhoto(photo['assets'][0]);
      setPhotoModalVisible(true);
    }else {
        alert('You did not select any image.');
    };
  };



  const handleSendPhoto = async () => {
    if (!photo) {
      alert('No image to convert');
      return;
    }

    const manipResult = await manipulateAsync(
      photo.localUri || photo.uri,
      [],
      { compress: 1, format: SaveFormat.JPEG }
    );
    
    const formData = new FormData();
    const fetchResponse = await fetch(manipResult.uri);
    const blob = await fetchResponse.blob();
    formData.append('file', blob, 'image.jpg');
    
    try {
      const response = await fetch('http://127.0.0.1:5000/recognize', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const classPrediction = result.class;
        const description = classDescriptions[classPrediction] || "No description available for this class.";
        setMessages([{ id: Date.now(), text: `This piece of artwork is likely to be ${classPrediction}. ${description}` }]);
        setChatModalVisible(true);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending image: ' + error.message);
    }

    setPhotoModalVisible(false);
  };

  const handleSendMessage = () => {
    const newMessages = [...messages, { id: Date.now(), text: inputText }];
    setMessages(newMessages);
    setInputText('');
  };

  const handleCloseChat = () => {
    setChatModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={ref => setCameraRef(ref)} />
      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.docscanButton}>
                <MaterialIcons name="document-scanner" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                <MaterialIcons name="camera" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                <MaterialIcons name="photo-library" size={36} color="#fff" />
            </TouchableOpacity>
        </View>


      <Modal
        animationType="slide"
        transparent={false}
        visible={photoModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPhotoModalVisible(!photoModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Image source={{ uri: photo?.uri }} style={styles.modalImage} />
          <Text style={styles.modalText}>Do you want to retake or use this photo?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Retake" style={styles.retakeButton} onPress={() => setPhotoModalVisible(!photoModalVisible)} />
            <Button title="Chat with AI" style={styles.aiButton} onPress={handleSendPhoto} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={chatModalVisible}
        onRequestClose={handleCloseChat}
      >
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
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
          <Button title="Close Chat" style={styles.closeButton} onPress={handleCloseChat} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalImage: {
    width: 300, 
    height: 300,
    marginBottom: 20,
  },
  
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messageBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginVertical: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:5
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
  closeButton: {
    backgroundColor: '#00a46c',
    borderRadius: 25,
    padding: 10,
    paddingTop:20,
  },
  buttonContainer: { // Adjusted container for buttons
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop:20,
    justifyContent: 'center',
  },
captureButton: { // Capture button centered
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
docscanButton:{
  flexGrow: 0,
  alignItems: 'flex-start',
  justifyContent: 'center',
},
uploadButton: { // Upload button right
    flexGrow: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
},
retakeButton: { 
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:20
},
aiButton: { 
    flexGrow: 0,
    alignItems: 'center',
    paddingLeft:20,
    justifyContent: 'center',
},
  photo: {
    width: 200,
    height: 200,
  },
});

export default Scan;
