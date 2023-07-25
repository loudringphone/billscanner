import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Heading, Button, Input, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context';
import CameraComponent from '../components/CameraComponent';

const screenWidth = Dimensions.get('window').width;

class CameraScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
    <SafeAreaView style={styles.container}>
        <CameraComponent navigation={navigation} />
    </SafeAreaView>
    );
  }
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
});
