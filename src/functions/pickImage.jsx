import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export async function pickImage() {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result.assets[0]);
  
      if (!result.canceled) {
        return result
      }
    } catch (error) {
      console.log('Error picking image: ', error);
    }
  }