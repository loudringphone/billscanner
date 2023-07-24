import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Heading, Button, Input, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

class HomeScreen extends Component {
  handleSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('Email Address', {name: 'visitor', login: true});
  }
  handleSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('New User');
  }
  


  render() {
    return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView  behavior='padding' style={{flex: 1}}>
      <View style={styles.headingContainer}>
          <Heading style={{marginBottom: 5,}}>Welcome!</Heading>
          <Heading>What would you like to sign?</Heading>
        </View>
        
        <Button onPress={this.handleSignIn} style={styles.button}
        >IN</Button>
        <Button onPress={this.handleSignUp} style={styles.button}
        >UP</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    marginLeft: '3%',
    marginRight: '3%',
    alignSelf: 'center',
  },
  headingContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    height: 80,
    justifyContent: 'flex-end',
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
  },
  button: {
    marginTop: 30,
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
});
