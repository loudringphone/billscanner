import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Heading, Button, Input, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
const screenWidth = Dimensions.get('window').width;

async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

class MainScreen extends Component {
  state = {
    name: '',
    nameError: false,
  };
  handleSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('Sign In');
  }
  handleSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('New User');
  }
  handleSignOut = async () => {
    const { navigation } = this.props;
    const response = await signOut()
  }
  


  render() {
    const { name, nameError } = this.state;
    
    return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView  behavior='padding' style={{flex: 1}}>
      <View style={styles.headingContainer}>
          <Heading style={{marginBottom: 5,}}>Main</Heading>
          <Heading>Screen</Heading>
        </View>
        
        <Button onPress={this.handleSignIn} style={styles.button}
        >IN</Button>
        <Button onPress={this.handleSignUp} style={styles.button}
        >UP</Button>
        <Text onPress={this.handleSignOut} style={styles.logout}>Sign out</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );
  }
}

export default MainScreen;

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
  logout: {
    marginTop: 15,
    color: 'grey',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
