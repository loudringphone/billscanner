import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Button, Input, View } from 'native-base'
import { Auth } from 'aws-amplify';
import loadingGif from '../assets/images/loading.gif'

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

async function resendConfirmCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
    alert('Vertification code was resent successfully.')
  } catch (error) {
    console.log('error resending code: ', error);
    alert(error)
  }
}

//Combine with forgotPasswordSubmit
async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
}

// Send confirmation code to user's email
async function forgotPassword(username) {
  try {
    const data = await Auth.forgotPassword(username);
    console.log(data);
  } catch(error) {
    console.log(error);
    alert(error)
  }
}

// Collect confirmation code and new password
async function forgotPasswordSubmit(username, code, newPassword) {
  try {
    const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
    console.log(data);
    return 'success'
  } catch(error) {
    console.log(error);
    alert(error)
    return 'fail'
  }
}
class ConfirmEmailScreen extends Component {
  state = {
    code: '',
    codeError: false,
    resent: false,
    countdown: 0,
    loading: false,
  };

  handleConfirm = async (email, code) => {
    const { route } = this.props;
    const { login } = route.params;
    if (!code) {
      this.setState({ codeError: true });
    } else {
      this.setState({ codeError: false });
      this.setState({ loading: true });
      if (login) {
        const password = 'aaAA11@@'
        const response = await forgotPasswordSubmit(email, code, password)
        if (response == 'success') {
          const user = await signIn(email, password)
        }
      }
      else {
        const response = await confirmCode(email, code)
      }
      this.setState({ loading: false });
    }
  };

  countdownTimer = null;

  handleResend = async (email) => {
    const { route } = this.props;
    const { login } = route.params;
    if (login) {
      const response = forgotPassword(email)
    } else {
      const response = resendConfirmCode(email)
    }
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

    const { navigation, route } = this.props;
    const { code, codeError, resent, countdown, loading } = this.state;
    const { name, email, login } = route.params;
    const buttonStyle = resent ? styles.disabledButton : styles.resendButton;
    return (
      <SafeAreaView style={styles.container}>
        {
          loading ?
          <View style={styles.loadingContainer}>
            <Image
        source={loadingGif}
        style={{ width: 20, height: 20 }}
      />
            <Text>  Signing in...</Text></View>
        :
          <KeyboardAvoidingView  behavior='padding'>
            <Heading style={styles.heading}>Please enter the code we just sent to your email address</Heading>
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

            <Button onPress={() => this.handleConfirm(email, code)} style={styles.button}
            >{login ? 'Sign in' : 'Confirm'}</Button>
            <Button onPress={() => this.handleResend(email)} style={buttonStyle}
            ><Text style={{color: resent ? 'white' : 'teal'}}>Resend code</Text></Button>
            {resent && <Text style={styles.resendText}> Resend code in{' '}
            <Text style={{ fontWeight: 'bold' }}>{countdown} {countdown == 1 ? 'second' : 'seconds'}</Text></Text>}
            {
              login ?
                <Text onPress={() => navigation.navigate('Email Address', { name, login })} style={styles.back}>Back</Text>
              :
                <Text onPress={() => navigation.navigate('Email Address', { name })} style={styles.back}>Back</Text>
            }
            
          </KeyboardAvoidingView>
        }
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
    height: '100%',
    width: '100%',
  },
  heading: {
    marginBottom: 40,
    alignSelf: 'center',
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
    borderWidth: 1,
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
    alignSelf: 'center',
  },
  back: {
    marginTop: 15,
    color: 'grey',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 200,
    left: 0,
    right: 0,
  }
});
