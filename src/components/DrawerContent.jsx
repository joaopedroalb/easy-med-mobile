import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'


const DrawerContent = props => {
  const { state, tabs } = props
  const { routes, index } = state
  const focusedRoute = routes[index].name

  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const logout = () => {
    console.log('logout')
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', paddingHorizontal: 25, paddingVertical: 38 }}>
      <DrawerContentScrollView
        {...props}
      >
        <View style={{ marginTop: 44, marginBottom: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20 }} >
          <Text style={styles.title} weight='bold'>EasyMed</Text>
          
        </View>
        <View>
          {
            tabs.map(tab => {
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
      <View>
        <TouchableOpacity onPress={() => setShowLogoutModal(true)} style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          {/* <LogoutButton /> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default DrawerContent

const styles = StyleSheet.create({
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
  }
})
