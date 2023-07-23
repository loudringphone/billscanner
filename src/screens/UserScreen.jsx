import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Heading, Button, Input, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

class UserScreen extends Component {
  state = {
    name: '',
    showNameError: false,
  };
  handleContinue = () => {
    const { navigation, route } = this.props;
    const email = route?.params?.email ?? '';
    const { name } = this.state;
    if (!name) {
      this.setState({ showNameError: true });
    } else {
      this.setState({ showNameError: false });
      navigation.navigate('Email Address', { name, email });
    }
  };


  render() {
    const { name, showNameError } = this.state;
    const buttonStyle = name ? styles.button : styles.disabledButton;
    return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView  behavior='padding' style={{flex: 1}}>
        <Heading style={styles.heading}>Let's get started! How should we call you?</Heading>
        <View style={styles.inputContainer}>
        {showNameError && <Text style={styles.errorText}>Please enter your name.</Text>}
        <Input 
          placeholder="Your name"
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text, showNameError: false })}
          style={styles.input}
        >
        </Input>
        
        </View>
        <Button onPress={this.handleContinue} style={buttonStyle}
        >Continue</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );
  }
}

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    marginLeft: '3%',
    marginRight: '3%',
    alignSelf: 'center',
  },
  heading: {
    marginBottom: 20,
  },
  inputContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 40,
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
  },
  button: {
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: 'grey',
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
