import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './screens/AuthNavigation';
import {SafeAreaView} from 'react-native';
export default function RootNavigation() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthNavigation from './screens/AuthNavigation'
// const RootNavigation = () => {
//   return (
//     <NavigationContainer>
//         <AuthNavigation/>
//     </NavigationContainer>
//   )
// }

// export default RootNavigation
