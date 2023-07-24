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

async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
}

class ConfirmEmailScreen extends Component {
  state = {
    email: '',
    emailError: false,
    code: '',
    codeError: false,
    resent: false,
    countdown: 0,
  };

  handleConfirm = async (email, code) => {
    const { navigation } = this.props;
    if (!code) {
      this.setState({ codeError: true });
    } else {
      this.setState({ codeError: false });
      const response = await confirmCode(email, code)
    //   navigation.navigate('Password', { name, email });
    }
  };

  countdownTimer = null;

  handleSendCode = async (email) => {
    const password = 'aaAA11@@'
    const user = signIn(email, password)
    // Auth.setupTOTP(user).then((code) => {console.log(code)})
    this.setState({ resent: true, countdown: 60 });
  }
  componentWillUnmount() {
    clearInterval(this.countdownTimer);
  }

  startCountdown = () => {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
    this.countdownTimer = setInterval(() => {
      this.setState((prevState) => ({
        countdown: Math.max(prevState.countdown - 1, 0),
      }));
      const {countdown} = this.state
      if (countdown == 0) {
        this.setState({ resent: false });
      }
    }, 1000);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.countdown > 0 && this.state.countdown !== prevState.countdown) {
      this.startCountdown();
    }
  }

  render() {

    const { navigation } = this.props;
    const { email, emailError, code, codeError, resent, countdown } = this.state;
    const buttonStyle = resent ? styles.disabledButton : styles.resendButton;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView  behavior='padding'>
        
       
        <View style={styles.headingContainer}>
            <Heading>Welcome back!</Heading>
            <Heading>Please get a code to log in.</Heading>
        </View>
        <View style={styles.inputContainer}>
          <Input
            label="email"
            placeholder="Your Email address"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text, emailError: false })}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            >
          </Input>
          {codeError && <Text style={styles.errorText}> Incorrect code.</Text>}
          <Input
            label="code"
            placeholder="Vertification code"
            value={this.state.code}
            onChangeText={(text) => this.setState({ code: text, codeError: false })}
            keyboardType="numeric"
            autoCapitalize="none"
            style={styles.input}>
          </Input>
        </View>

        <Button onPress={() => this.handleConfirm(email, code)} style={styles.button}
        >Confirm</Button>
        <Button onPress={() => this.handleSendCode(email)} style={buttonStyle}
        ><Text style={{color: resent ? 'white' : 'teal'}}>Get a code</Text></Button>
        {resent && <Text style={styles.resendText}> Resend code in{' '}
        <Text style={{ fontWeight: 'bold' }}>{countdown} {countdown == 1 ? 'second' : 'seconds'}</Text></Text>}
        <Text onPress={() => navigation.navigate('Logging Screen',)} style={styles.back}>Back</Text>
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
  headingContainer: {
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
  resendButton: {
    marginTop: 20,
    width: screenWidth * 0.75,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: 'teal',
    borderWidth: '1',
  },
  disabledButton: {
    marginTop: 20,
    backgroundColor: 'darkgrey',
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  resendText: {
    color: 'grey',
    fontSize: 12,
  },
  back: {
    marginTop: 15,
    color: 'grey',
    alignSelf: 'center',

    
  },
});
