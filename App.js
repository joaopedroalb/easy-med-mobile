import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './src/views/Login';
import Profile from './src/views/Profile';

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <View style={styles.container}>
      {
        user ? <Profile user={user} logout={()=>setUser(null)}/> : <Login loginUser={setUser}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
