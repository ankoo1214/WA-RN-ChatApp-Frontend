import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import LoginSignup from '../screens/LoginSignup';
import OTP from '../screens/OTP';
import Home from '../screens/Home';
import Message from '../screens/Message';
const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // optional, if you don’t want headers
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="SplashScreen" component={Splash} />
        <Stack.Screen name="LoginSignUp" component={LoginSignup} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          screenOptions={{
            headerShown: true,
          }}
          name="MessageScreen"
          component={Message}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
