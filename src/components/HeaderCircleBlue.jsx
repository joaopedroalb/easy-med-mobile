import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, ScrollView, PanResponder } from 'react-native';

const WIDTH = Dimensions.get('window').width

const HeaderCircleBlue = ({height = 560, top = -210}) => {
  return  <View style={[styles.circleBlue, {minHeight: height, top: top}]}></View>
}

export default HeaderCircleBlue;

const styles = StyleSheet.create({
    circleBlue:{
        backgroundColor: '#5B84ED',
        minWidth: WIDTH + 100,
        position: 'absolute',
        borderRadius: 500,
        left: -50,
    },
})