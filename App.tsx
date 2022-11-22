import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './src/screens/RootStackScreen';
import { AuthProvider } from './src/hooks/useAuth';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootStackScreen />
      </AuthProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default App;
