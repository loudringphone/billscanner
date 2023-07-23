import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Button, Input, View } from 'native-base'

const screenWidth = Dimensions.get('window').width;

class EmailScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = props;
    const savedEmail = route?.params?.email ?? '';

    this.state = {
      email: savedEmail,
      emailError: false,
    };
  }
  handleContinue = () => {
    const { navigation, route } = this.props;
    const { name } = route.params;
    const { email } = this.state;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
      navigation.navigate('Password', { name, email });
    }
  };

  render() {

    const { navigation, route } = this.props;
    const { email, emailError } = this.state;
    const { name } = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView  behavior='padding'>
        
        <Heading style={styles.heading}>Hello { name }! What's your email address?</Heading>
        <View style={styles.inputContainer}>
          {emailError && <Text style={styles.errorText}> Please enter a valid email address.</Text>}
          <Input
            label="email"
            placeholder="Your Email"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text, emailError: false })}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}>
          </Input>
        </View>

        <Button onPress={this.handleContinue} style={styles.button}
        >Continue</Button>
        <Text onPress={() => navigation.navigate('New User', { email })} style={styles.back}>Back</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>

    );
  }
}

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
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
