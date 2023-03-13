import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './src/views/Login';

export default function App() {
  const [user, setUser] = useState(null)
  

  const Teste = () => {
    return (
      <View>
        <Text>Existe um user chamado {user.name} </Text>
        <Button title='Sair' onPress={()=>setUser(null)}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {
        user ? <Teste/> : <Login loginUser={setUser}/>
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
