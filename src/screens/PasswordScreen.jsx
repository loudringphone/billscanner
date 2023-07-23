import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Button, Input, View } from 'native-base'

import { Auth } from 'aws-amplify';

const screenWidth = Dimensions.get('window').width;

async function signUp(username, password, email, name) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        name,
        preferred_username: email,
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    console.log(user);
    navigation.navigate('Confirm Email', { name, email });

  } catch (error) {
    console.log('error signing up:', error);
    alert(error)
  }
}

class PasswordScreen extends Component {
  state = {
    password: '',
    confirmPassword: '',
    showPassword: false,
    passwordError: false,
    confirmPasswordError: false,
  };
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleContinue = async () => {
    const { navigation, route } = this.props;
    const { name, email } = route.params;
    const { password, confirmPassword } = this.state;
    if (password.length < 8) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
    if (password != confirmPassword) {
      this.setState({ confirmPasswordError: true });
    } else {
      this.setState({ confirmPasswordError: false });
    }
    if (password.length >= 8 && password == confirmPassword) {
      this.setState({ passwordError: false, confirmPasswordError: false });
      const username = email
      // const user = await signUp(username, password, email, name)
      navigation.navigate('Confirm Email', { name, email });

    }
  };

  render() {

    const { navigation, route } = this.props;
    const { password, confirmPassword, showPassword, passwordError, confirmPasswordError } = this.state;
    
    const buttonStyle = password.length >= 1 ? styles.button : styles.disabledButton;
    const { name, email } = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView  behavior='padding'>
        
        <View style={styles.headingContainer}>
          <Heading style={{marginBottom: 5,}}>Almost done, {name}!</Heading>
          <Heading>Please set up a password.</Heading>
        </View>
        <View style={styles.inputContainer}>
          {passwordError && <Text style={styles.errorText}>Needs to be at least 8 characters long and requires uppercase, lowercase, numeric, and special characters.</Text>}
          <Input 
          label="password"
          placeholder="Password"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text, passwordError: false })}
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          style={styles.input}></Input>
          <TouchableOpacity onPress={this.togglePasswordVisibility} style={styles.toggleIcon}>
            <Text style={{textDecorationLine: 'underline', color: 'grey'}}>{showPassword ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {confirmPasswordError && <Text style={styles.errorText}> Passwords do not match.</Text>}
          <Input 
            label="password"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text, confirmPasswordError: false })}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            style={styles.input}>
          </Input>
          <TouchableOpacity onPress={this.togglePasswordVisibility} style={styles.toggleIcon}>
            <Text style={{textDecorationLine: 'underline', color: 'grey'}}>{showPassword ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </View>


        <Button onPress={this.handleContinue} style={styles.button}
        >Sign up</Button>
        <Text onPress={() => navigation.navigate('Email Address', { name })} style={styles.back}>Back</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>

    );
  }
}

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    marginLeft: '3%',
    marginRight: '3%',
    alignSelf: 'center',
  },
  headingContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    height: 70,
    justifyContent: 'flex-end',
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
  },
  toggleIcon: {
    position: 'absolute',
    right: 8,
    bottom: 12,
  },
  button: {
    marginTop: 50,
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  back: {
    marginTop: 15,
    color: 'grey',
    alignSelf: 'center',

    
  },
});
