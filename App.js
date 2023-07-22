import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import { NativeBaseProvider } from 'native-base';

import Signup from './src/components/Signup';
import { useForm, Controller } from "react-hook-form"

import {Amplify} from "@aws-amplify/core"
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

import { LogBox } from "react-native"

import ImagePickerComponent from  './src/components/ImagePickerComponent'
LogBox.ignoreLogs([
'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
    <SafeAreaView style={styles.container}>
    <NativeBaseProvider>
    {/* <Stack.Navigator>
      <Stack.Screen name="OnboardingUserScreen" component={OnboardingUserScreen} />
    </Stack.Navigator> */}
      <ImagePickerComponent />
    </NativeBaseProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
 
})