import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, StatusBar, Pressable } from 'react-native';
import { AuthService } from '../services/auth/AuthService';

const Login = ( {loginUser} ) => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: ''
  })

  const onHandleClick = async () => {
    console.log('entrei')
    const req = await AuthService.login(userForm.email, userForm.password)
    console.log({...req})
    if (req.error) return false

    loginUser(req.data)
  }

  return (
    <SafeAreaView style={styles.containerBg}>
      <LinearGradient  
        colors={['#0080DD', '#2EA1']} 
        locations={[-2.76, 68.09]}
        start={{x: 0.26, y: 0.46}} 
        end={[0.85, 1.8]}
        style={styles.containerGradient}
      >
        <View>
            <Text style={styles.title}>Easy med</Text>
        </View>
    
        <View style={styles.containerForm}>
              <TextInput
                onChangeText={value=>setUserForm({...userForm, email: value})}
                style={styles.input}
              />
              <TextInput
                onChangeText={value=>setUserForm({...userForm, password: value})}
                secureTextEntry={true}
                style={styles.input}
              />
              <Pressable style={styles.button} onPress={onHandleClick}>
                <Text style={{color:'#fff', fontSize: 20}}>Logar</Text>
              </Pressable>    
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerBg:{
    height:'100%',
    width: '100%',
    paddingTop:StatusBar.currentHeight,
    color: '#fff'
  },
  containerGradient: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    gap: 64
  },
  title:{
    fontSize:45,
    color: '#fff'
  },
  containerForm:{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 36
  },
  input: {
    width: '75%',
    height: 50,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10
  },
  button:{
    width: 200,
    backgroundColor: '#3559B7',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center'
  }
});

export default Login