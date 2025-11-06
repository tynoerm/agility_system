import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './pages/LandingPage.js';
import HomePage from './pages/HomePage.js';
import SignupPage from './pages/SignupPage.js';
import LoanForm from './pages/LoanForm.js';

import LoanApplication from './pages/LoanApplication.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LoanApplication" component={LoanApplication} />
        
        <Stack.Screen name="LoanForm" component={LoanForm} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
