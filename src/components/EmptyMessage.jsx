import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



const EmptyMessage = ({message, icon}) => {
  return (
    <View style={styles.container}>
        <FontAwesome5 name={icon} size={80} style={styles.icon}/>
        <Text style={styles.info}>
            {message}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    padding: 20
   },
   info: {
    fontSize: 28,
    textAlign: 'center',
    color: '#626262'
   },
   icon: {
    color: '#626262'
   }
});
  

export default EmptyMessage;