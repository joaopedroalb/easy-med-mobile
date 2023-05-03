import React, { useState } from 'react';
import { View, Text, StyleSheet,Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const RateDoctor = () => {
    const [rating, setRating] = useState(5)

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Você já foi consultado por esse médico, avalie ele</Text>
            <View style={styles.ratingContent}>
            {
                [1,2,3,4,5].map(value=>{
                    return (
                        <FontAwesome5 name={'star'} size={50} solid style={value<=rating ? styles.active : styles.disable} key={value} onPress={()=>setRating(value)}/>
                    )
                })
            }
            </View>
            <Pressable style={styles.btnContainer}>
                <Text style={{fontSize: 26, color: '#fff'}}>Avaliar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:10, 
        backgroundColor: '#3c5081',
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 30
    },
    infoText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
    },
    ratingContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
    },
    active: {
        color: '#fafd3c'
    },
    disable: {
        color: '#fff'
    },
    btnContainer: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: '#7197f8',
        marginTop: 16
    }
})

export default RateDoctor;