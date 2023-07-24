import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import React from 'react';

import { NativeBaseProvider } from 'native-base';

import Signup from './src/components/Signup';
import { useForm, Controller } from "react-hook-form"
import HomeStack from './src/routes/HomeStack';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

import { LogBox } from "react-native"
import ImagePickerComponent from  './src/components/ImagePickerComponent'
// import Navigator from './src/routes/HomeStack'
LogBox.ignoreLogs([
'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])



const FirstScreenComponent = () => <View><Text>First screen</Text></View>

const SecondScreenComponent = () => <View><Text>Sezcond screen</Text></View>

export default function App() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
    
      {/* <ImagePickerComponent /> */}
       <HomeStack />
    </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
 
})