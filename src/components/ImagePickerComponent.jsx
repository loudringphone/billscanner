import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Button from './Button';
import ImageToText from './ImageToText';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result);
    }
  };
  return (
    <View style={styles.container}>
      {!image ?
        <Button icon='folder' title="Select an image from Gallery" onPress={pickImage} />
      :
        <View>
        <Image source={{ uri: image.assets[0].uri }} style={styles.camera} />
        <Button icon='folder' title="Select another image" onPress={pickImage} />
        <ImageToText image={image.assets[0].uri}/>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingButtom: 20,
  },
  camera: {
    width: Dimensions.get('window').width * 1,
    flex: 1,
  },
})