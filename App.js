// In App.js in a new project

// import * as React from 'react';
// import { View, Text ,Button} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import WelcomeScreen from './src/screens/WelcomeScreen';
// import LoginScreen from './src/screens/LoginScreen';
// import SignupScreen from './src/screens/SignupScreen';
// import HomeScreen from './src/screens/HomeScreen';
// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={WelcomeScreen}  options={{ headerShown: false }}/>
//         <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
//         <Stack.Screen name="Signup" component={SignupScreen}  options={{ headerShown: false }}/>
//         <Stack.Screen name="Dashboard" component={HomeScreen}  options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;
import * as React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, View} from 'react-native';
import RootNavigation from './src/RootNavigation';
const App = () => {
  return <RootNavigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
// import React,{useEffect} from 'react';
// import RootNavigation from './src/RootNavigation';
// import {View} from 'react-native';
// const App = () => {
//   useEffect(() => {
//     return () => <View style={{ flex: 1 }}><RootNavigation/></View>;
//   }, []);
// };

// export default App;
