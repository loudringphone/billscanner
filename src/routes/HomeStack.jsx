import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import LoggingScreen from '../screens/LoggingScreen';
import UserScreen from "../screens/UserScreen";
import EmailScreen from "../screens/EmailScreen";
import PasswordScreen from "../screens/PasswordScreen";
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
export default function HomeStack() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen name="Logging Screen" component={LoggingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="New User" component={UserScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Email Address" component={EmailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Confirm Email" component={ConfirmEmailScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    )



}