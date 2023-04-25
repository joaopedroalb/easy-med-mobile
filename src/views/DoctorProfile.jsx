import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import HeaderCircleBlue from '../components/HeaderCircleBlue';

// import { Container } from './styles';

const DoctorProfile = ({route}) => {

    const { doctorId } = route.params;

    return (
        <View style={styles.containerBg}>
            <HeaderCircleBlue />
            <Text style={{color: '#000'}}>
                Doutor de Id {doctorId}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerBg:{
        minHeight:'100%',
        width: '100%',
        paddingTop:StatusBar.currentHeight,
        backgroundColor: '#fff',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        paddingTop: 60
    }
})

export default DoctorProfile