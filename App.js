import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/welcomeScreen';
import AuthOptionsScreen from './src/screens/authOptionsScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="AuthOptions" component={AuthOptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}