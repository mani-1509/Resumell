import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Splashscreen from '../screens/SplashScreen'
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
   <Stack.Navigator initialRouteName='Splash'>
    <Stack.Screen
        name="Splash"
        component={Splashscreen}
        options={{headerShown: false}}
    />
   </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})