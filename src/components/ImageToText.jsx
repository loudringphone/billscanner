import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ImageToText({image}) {
    return(
        <Text style={styles.tesseract}>{image}</Text>
    )
}

const styles = StyleSheet.create({
    tesseract: {
      position: 'absolute',
      color: 'red',
    },
  })