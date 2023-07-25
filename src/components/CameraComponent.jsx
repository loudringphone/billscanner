import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import CustomButton from './CustomButton';

export default function CameraComponent({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [imageSaved, setImageSaved] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  const takePicture = async () => {
    if(cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch(e) {
        console.log(e)
      }
    }
  }
  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImageSaved(true)

        // setImage(null)
      } catch (e) {
        console.log(e)
      }
    }
  }
  const handleReturn = (navigation) => {
    navigation.navigate('Main Screen');
  }

  if(!hasCameraPermission) {
    return <Text>No access to camera.</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      {!image ?
        <Camera 
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >

          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 30,
          }}>
            <CustomButton library='Ionicons' icon='return-down-back' title="" onPress={() => handleReturn(navigation)} />
            <CustomButton icon="flash" 
              color={flash === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
              onPress={() => {
              setFlash(flash === Camera.Constants.FlashMode.off ? 
                Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
            }}/>
            <CustomButton library="Ionicons" icon="md-camera-reverse-outline" onPress={() => {
              setType(type === CameraType.back ? 
                CameraType.front : CameraType.back)
            }}/>
          </View>
        </Camera>
      :
      <Image source={{uri: image}} style={styles.camera}/>
      }
      {image ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
         <CustomButton library='Entypo' title={'Re-take'} icon="retweet" onPress={() => {setImage(null); setImageSaved(false)}}/>
         <CustomButton library='Entypo' title={imageSaved? 'Saved' : 'Save'} icon="check" color={imageSaved? 'lightgreen' : null} onPress={saveImage} />
        </View>
      :
        <View>
          <CustomButton  title={'Take a picture'} icon="camera" onPress={takePicture} />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingButtom: 20,
  },
  camera: {
    flex: 1,
    // borderRadius: 20,
  }
})