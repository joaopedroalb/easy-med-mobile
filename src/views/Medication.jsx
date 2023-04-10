import React from 'react';
import { View, Text, Dimensions, StyleSheet, StatusBar } from 'react-native';

const WIDTH = Dimensions.get('window').width

const Medication = () => {
  return (
    <View style={styles.containerBg}>
        <Text>Futura Pagina de medicacao</Text>
    </View>
  )
}

export default Medication

const styles = StyleSheet.create({
    containerBg:{
        minHeight:'100%',
        width: '100%',
        paddingTop:StatusBar.currentHeight,
        backgroundColor: '#000',
        position: 'relative'
    }
})