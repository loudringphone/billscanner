import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Button, Input, View } from 'native-base'

const screenWidth = Dimensions.get('window').width;

class PasswordScreen extends Component {
  state = {
    password: '',
    showPassword: false,
    showPasswordError: false,
  };
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleContinue = () => {
    const { navigation, route } = this.props;
    const { name, email } = route.params;
    const { password } = this.state;
    if (!password || password.length <= 6) {
      this.setState({ showPasswordError: true });
    } else {
      this.setState({ showPasswordError: false });
      navigation.navigate('AWS', { name, email });
    }
  };

  render() {

    const { navigation, route } = this.props;
    const { password, showPassword, showPasswordError } = this.state;
    
    const buttonStyle = password ? styles.button : styles.disabledButton;
    const { name, email } = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView  behavior='padding'>
        
        <View style={styles.headingContainer}>
          <Heading style={{marginBottom: 5,}}>Almost done, {name} {email}!</Heading>
          <Heading>Please set up a password.</Heading>
        </View>
        <View style={styles.inputContainer}>
          {showPasswordError && <Text style={styles.errorText}> Please enter a password.</Text>}
          <Input 
          label="password"
          placeholder="Password"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text, showPasswordError: false })}
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          style={styles.input}></Input>
          <TouchableOpacity onPress={this.togglePasswordVisibility} style={styles.toggleIcon}>
            <Text style={{textDecorationLine: 'underline', color: 'grey'}}>{showPassword ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {showPasswordError && <Text style={styles.errorText}> Please enter a password.</Text>}
          <Input 
          label="password"
          placeholder="Confirm Password"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text, showPasswordError: false })}
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          style={styles.input}></Input>
          <TouchableOpacity onPress={this.togglePasswordVisibility} style={styles.toggleIcon}>
            <Text style={{textDecorationLine: 'underline', color: 'grey'}}>{showPassword ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </View>


        <Button onPress={this.handleContinue} style={buttonStyle}
        >Continue</Button>
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
    marginBottom: 20,
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
  toggleIcon: {
    position: 'absolute',
    right: 8,
    bottom: 12,
  },
  button: {
    marginTop: 40,
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  disabledButton: {
    marginTop: 40,
    backgroundColor: 'grey',
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  back: {
    marginTop: 15,
    color: 'grey',
    alignSelf: 'center',

    
  },
});
