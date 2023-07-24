import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Button, Input, View } from 'native-base'
import { Auth } from 'aws-amplify';
import loadingGif from '../assets/images/loading.gif'
const screenWidth = Dimensions.get('window').width;

async function signUp(username, password, email, name) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        name: name,
      },
      autoSignIn: { 
        enabled: true,
      }
    });
    console.log(user);
    return 'success'
  } catch (error) {
    console.log('error signing up:', error);
    alert(error)
    return 'fail'
  }
}

// Send confirmation code to user's email
async function forgotPassword(username) {
  try {
    const data = await Auth.forgotPassword(username);
    console.log(data);
    return 'success'
  } catch(error) {
    console.log(error);
    alert(error)
    return 'fail'
  }
}

class EmailScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = props;
    const savedEmail = route?.params?.email ?? '';

    this.state = {
      email: savedEmail,
      emailError: false,
      loading: false,
    };
  }
  handleContinue = async () => {
    const { navigation, route } = this.props;
    const { name, login } = route.params;
    const { email } = this.state;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
      if (login) {
        this.setState({ loading: true });
        const response = await forgotPassword(email)
        console.log(response)
        this.setState({ loading: false });
        navigation.navigate('Confirm Email', { name, email, login });
      }
      else {
        const username = email
        const password = 'aaAA11@@'
        this.setState({ loading: true });
        const response = await signUp(username, password, email, name)
        this.setState({ loading: false });
        if (response == 'success') {
          navigation.navigate('Confirm Email', { name, email });
        }
      }
      
    }
  };

  render() {
    
    const { navigation, route } = this.props;
    const { email, emailError, loading } = this.state;
    const { name, login } = route.params;
    console.log(route)
    return (
      <SafeAreaView style={styles.container}>
        {
          loading ?
          <View style={styles.loadingContainer}>
            <Image
        source={loadingGif}
        style={{ width: 20, height: 20 }}
      />
            <Text>{login ? '  Retrieving user information...' : '  Creating new user...'}</Text></View>
        :
          <KeyboardAvoidingView  behavior='padding'>
          
          <Heading style={styles.heading}>Hello { name }! What's your email address?</Heading>
          <View style={styles.inputContainer}>
            {emailError && <Text style={styles.errorText}> Please enter a valid email address.</Text>}
            <Input
              label="email"
              placeholder="Your Email address"
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text, emailError: false })}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}>
            </Input>
          </View>

          <Button onPress={this.handleContinue} style={styles.button}
          >{login ? 'Signing in' : 'Signing up'}</Button>
          {
            login ? 
            <Text onPress={() => navigation.navigate('Home Screen')} style={styles.back}>Back</Text>
            :
            <Text onPress={() => navigation.navigate('New User', { email })} style={styles.back}>Back</Text>

          }
          
          </KeyboardAvoidingView>
        }
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
    height: '100%',
    width: '100%',
  },
  heading: {
    marginBottom: 40,
    alignSelf: 'center',
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
