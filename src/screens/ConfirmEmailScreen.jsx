import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Button, Input, View } from 'native-base'
import { Auth } from 'aws-amplify';


const screenWidth = Dimensions.get('window').width;

async function confirmCode(username, code) {
    try {
      const response = await Auth.confirmSignUp(username, code)
      console.log(response)
    } catch (error) {
      console.log('error confirming sign up:', error);
      alert(error)
    }
}

class ConfirmEmailScreen extends Component {
  state = {
    code: '',
    codeError: false,
  };

  handleConfirm = async () => {
    const { navigation, route } = this.props;
    const { name, email } = route.params;
    const { code } = this.state;
    if (!code) {
      this.setState({ codeError: true });
    } else {
      this.setState({ codeError: false });
      const response = await confirmCode(email, code)
    //   navigation.navigate('Password', { name, email });
    }
  };

  handleResendCode = () => {

  }

  render() {

    const { navigation, route } = this.props;
    const { code, codeError } = this.state;
    const { name, email } = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView  behavior='padding'>
        
        <Heading style={styles.heading}>Finally, confirm your email</Heading>
        <View style={styles.inputContainer}>
          <Input
            label="email"
            placeholder="Your Email address"
            value={email}
            editable={false} 
            keyboardType="email-address"
            autoCapitalize="none"
            style={{fontSize: 18, color: 'grey', backgroundColor:'lightgrey'}}>
          </Input>
          {codeError && <Text style={styles.errorText}> Incorrect code.</Text>}
          <Input
            label="code"
            placeholder="Confirmation code"
            value={this.state.code}
            onChangeText={(text) => this.setState({ code: text, codeError: false })}
            keyboardType="numeric"
            autoCapitalize="none"
            style={styles.input}>
          </Input>
        </View>

        <Button onPress={this.handleConfirm} style={styles.button}
        >Confirm</Button>
        <Button onPress={this.handleResendCode} style={styles.button}
        >Resend code</Button>
        <Text onPress={() => navigation.navigate('Logging Screen')} style={styles.back}>Back to logging screen</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>

    );
  }
}

export default ConfirmEmailScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    marginLeft: '3%',
    marginRight: '3%',
    alignSelf: 'center',
  },
  heading: {
    marginBottom: 40,
  },
  inputContainer: {
    height: 110,
    marginBottom: 30,
    justifyContent: 'space-between',
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
  },
  button: {
    marginTop: 20,
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
