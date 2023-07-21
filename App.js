import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import CameraComponent from './src/components/CameraComponent';
import ImagePickerComponent from './src/components/ImagePickerComponent';

import Button from './src/components/Button';
export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <ImagePickerComponent />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
 
})