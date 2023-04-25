import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator  } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadginContainer}>
      <ActivityIndicator size={200} color="#5B84ED" style={styles.loadingAnimation}/>
    </View>
  )
}
const styles = StyleSheet.create({
    loadginContainer:{
        width: '100%',
        minHeight: 250,
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})
export default Loading;