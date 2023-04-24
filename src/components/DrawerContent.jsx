import React, { useContext, useState } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text, 
  Image
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'
import { UserContext } from '../context/UserContext'


const DrawerContent = props => {

  const { userLogout, user } = useContext(UserContext)
  const { state, tabs } = props
  const { routes, index } = state
  const focusedRoute = routes[index].name

  const logout = () => {
    userLogout()
  }

  const ProfileDrawer = () => {
    return (
      <TouchableOpacity style={styles.profileContainer} onPress={() => {
        props.navigation.navigate('PROFILE')
      }}>
        <Image 
            style={styles.profileImage}
            source={{
                uri: user.profilePicture,
            }}
        />
        <View>
          <Text style={styles.nameProfile}>{user.name}</Text>
          <Text style={styles.titleProfile}>Meu Perfil</Text>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', paddingHorizontal: 25, paddingVertical: 38 }}>
      <DrawerContentScrollView
        {...props}
      >
        <ProfileDrawer/>
        <View>
          {
            tabs.filter(x=>x.alwaysShow).map(tab => {
              return (
                <DrawerItem
                  key={tab.key}
                  {...props}
                  label={() => <Text style={[styles.label, focusedRoute === tab.key ? styles.labelActive : {}]}>{tab.label}</Text>}
                  style={focusedRoute === tab.key ? styles.itemActive : styles.itemInactive}
                  onPress={() => {
                    props.navigation.navigate(tab.key)
                  }}
                />
              )
            })
          }

        </View>
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={logout} style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Text style={styles.logoutLabel}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default DrawerContent

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginTop: 10,
    marginBottom: 30,
    gap: 15
  },
  nameProfile: {
    color: '#514D4D',
    fontSize: 16
  },
  titleProfile: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius:100,
    borderWidth: 4,
    borderColor: '#5B84ED'
  },
  title: {
    color: '#000',
    fontSize: 40,
    color: '#9575cd',
  },
  itemActive: {
    width: '100%',
    marginLeft: 0,
    backgroundColor: '#d6d6d6',
  },
  itemInactive: {
    marginLeft: 0,
    borderRadius: 40
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
  labelActive: {
    color: '#000'
  },
  logoutContainer: {
    backgroundColor: '#f73a3a',
    borderRadius: 8,
  },
  logoutLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
})
