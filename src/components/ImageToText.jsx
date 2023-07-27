import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ImageToText({image}) {
    return(
        <Text style={styles.text}>{image}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      color: 'red',
    },
  })