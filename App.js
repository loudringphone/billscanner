import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import HomeStack from './src/routes/HomeStack';
import { LogBox } from "react-native"
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';

Amplify.configure(awsExports);

// import Navigator from './src/routes/HomeStack'
LogBox.ignoreLogs([
'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])

export default function App() {

  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
       <HomeStack />
    </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})