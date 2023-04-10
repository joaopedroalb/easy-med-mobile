import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './src/views/Login';
import Profile from './src/views/Profile';
import { UserContext, UserProvider } from './src/context/UserContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/views/Home';

const Stack = createStackNavigator()

function App() {
  const {user} = useContext(UserContext)

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          { user
            ? <Stack.Screen name='Home' component={Home} />
            : <Stack.Screen name='Login' component={Login} />
          }
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <UserProvider>
    <App/>
  </UserProvider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
