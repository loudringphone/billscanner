import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen';
import NewUserScreen from "../screens/NewUserScreen";
import EmailScreen from "../screens/EmailScreen";
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import MainScreen from '../screens/MainScreen';

import { Auth, Hub } from 'aws-amplify';

const Stack = createStackNavigator();

export default function HomeStack() {
  const [user, setUser] = useState(undefined)
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser)
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      console.log(data);
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {user ? 
            <>
              <Stack.Screen name="Main Screen" component={MainScreen} options={{ headerShown: false }}/>
            </>
          :
            <>
              <Stack.Screen name="Home Screen" component={HomeScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="New User" component={NewUserScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Email Address" component={EmailScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Confirm Email" component={ConfirmEmailScreen} options={{ headerShown: false }}/> 
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    )



}