import 'react-native-get-random-values'
import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Dimensions, Image } from 'react-native';
import { Heading, Button, Input, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { pickImage } from '../functions/pickImage';
import { getCurrentDate } from '../functions/getCurrentDate';
import { uploadImage } from '../functions/uploadImage';
import ImageToText from '../components/ImageToText';
import CustomButton from  '../components/CustomButton'
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
    galleryImage: null,
    progressText: '',
  };
  handleSignOut = async () => {
    const response = await signOut()
  }

  handleCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('Camera');
  }
  handleGallery = async () => {
    const result = await pickImage()
    if (result) {
      this.setState({ galleryImage: result });
    }
  }
  handleUpload = async (asset) => {
    const fileExtension = asset.uri.split('.').pop();
    const imageName = getCurrentDate() + '-' + uuidv4() + '.' + fileExtension
    try {
      this.setState({ progressText: 'Uploading...' });
      await uploadImage(asset, imageName, this.updateProgress);
      console.log('SUCCESSSSSSSSSSSSSSSSSS')
    } catch (error) {
      alert(error)
    }
  };
  
  updateProgress = progressText => {
    this.setState({ progressText });
  };


  render() {

    const { galleryImage } = this.state;

    if (!galleryImage) {
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView  behavior='padding' style={{flex: 1}}>
          <View style={styles.headingContainer}>
              <Heading style={{marginBottom: 5,}}>Grocery Helper</Heading>
            </View>
            <Button onPress={this.handleCamera} style={styles.button}
            >Camera</Button>
            <Button onPress={this.handleGallery} style={styles.button}
            >Gallery</Button>
            <Text onPress={this.handleSignOut} style={styles.logout}>Sign out</Text>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )
    }
    else {
      return (
        <View style={styles.imageContainer}>
          <ImageToText image={galleryImage.assets[0].uri}/>
          <Image source={{ uri: galleryImage.assets[0].uri }} style={styles.image} />
          <View style={styles.imageButtons}>
            <CustomButton library='Ionicons' icon='return-down-back' title="" onPress={() => this.setState({ galleryImage: null })} />
            <CustomButton library='Ionicons' icon='analytics' title="Analyse" onPress={() => this.handleUpload(galleryImage.assets[0])} />
            <CustomButton library='Ionicons' icon='folder' title="" onPress={() => this.handleGallery()} />

          </View>
        </View>
      );
    }
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    alignSelf: 'center',
    height: '100%',
    width: '90%',
  },
  headingContainer: {
    marginBottom: 40,
  },
  button: {
    marginTop: 30,
    width: screenWidth * 0.75,
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingButtom: 20,
  },
  image: {
    width: Dimensions.get('window').width,
    aspectRatio: 1, 
  },
  imageButtons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    bottom: 0,
  },
  logout: {
    marginTop: 15,
    color: 'grey',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
