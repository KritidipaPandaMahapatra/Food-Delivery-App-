// import React from 'react'
// import LoginScreen from './LoginScreen'
// import SignupScreen from './SignupScreen';
// import WelcomeScreen from './WelcomeScreen';
// import HomeScreen from './HomeScreen';
// //import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
// export const AuthNavigation = () => {
//   return (
//     <Stack.Navigator>
//         <Stack.Screen name="Home" component={WelcomeScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="Dashboard" component={HomeScreen} />
//     </Stack.Navigator>
//   )
// }
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import UserProfile from './UserProfile';
import ProductScreen from './ProductScreen';
import UserCart from './UserCart'
import PlaceOrder from './PlaceOrder';
import TrackOrder from './TrackOrder';
const Stack = createNativeStackNavigator();

function  AuthNavigation() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashBoard"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Cart"
        component={UserCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Place order"
        component={PlaceOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Track order"
        component={TrackOrder}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
