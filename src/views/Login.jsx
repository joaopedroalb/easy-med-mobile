import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, StatusBar, Pressable } from 'react-native'
import { AuthService } from '../services/auth/AuthService'
import { UserContext } from '../context/UserContext'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Login = () => {
  const {userLogin} = useContext(UserContext)

  const [hidePass, setHidePass] = useState(true)

  const [userForm, setUserForm] = useState({
    email: '',
    password: ''
  })

  const [errorLogin, setErrorLogin] = useState({
    hasError: false,
    message: ''
  })

  const onHandleClick = async () => {
    const {data, error} = await AuthService.login(userForm.email, userForm.password)

    if (error) {
      setErrorLogin({
        hasError: true,
        message: data
      })
      return false
    }

    const userLogged = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      isDoctor:data.role, 
      profilePicture:data.user.profilePicture,
      cpf: data.user.cpf
    }

    userLogin(userLogged)
  }

  return (
    <View style={styles.containerBg}>
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
                placeholder="Email"
              />
              <View style={styles.passContainer}>
                <TextInput
                  placeholder="Senha"
                  onChangeText={value=>setUserForm({...userForm, password: value})}
                  secureTextEntry={hidePass}
                  style={styles.inputPassword}
                />
                <Icon
                  style={styles.iconHidePass}
                  name={hidePass ? 'eye-slash' : 'eye'}
                  onPress={() => setHidePass(!hidePass)} 
                />
              </View>
              <Pressable style={styles.button} onPress={onHandleClick}>
                <Text style={{color:'#fff', fontSize: 20}}>Entrar</Text>
              </Pressable>  
              {
                errorLogin.hasError && (
                  <Text style={{color:'red', fontSize: 14}} >Login ou senha incorreta</Text>  

                )
              }
        </View>
      </LinearGradient>
    </View>
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
  passContainer: {
    width: '75%',
    height: 50,
    position: 'relative',
  },
  input: {
    width: '75%',
    height: 50,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10
  },
  inputPassword: {
    width: '100%',
    height: 50,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10,
    paddingRight: 40
  },
  iconHidePass: {
    position:'absolute',
    right: 20,
    top: 18,
    fontWeight: 'bold',
  },
  button:{
    width: 200,
    backgroundColor: '#3559B7',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center'
  },
});

export default Login