import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; // Using MaterialIcons as an example

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let newPhoto = await cameraRef.takePictureAsync();
      setPhoto(newPhoto);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)} />
      <TouchableOpacity
        onPress={takePicture}
        style={styles.captureButton}
      >
        <MaterialIcons name="camera" size={36} color="#fff" />
      </TouchableOpacity>
      {photo && (
        <Image source={{ uri: photo.uri }} style={styles.previewImage} />
      )}
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
  captureButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default Scan;
