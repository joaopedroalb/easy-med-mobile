import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const CardMedication = ({name, description}) => {
    const [open, setOpen] = useState(false)
    

    return (
        <View style={styles.container}>
            <Pressable style={styles.headerContainer} onPress={()=>setOpen(value=>!value)}>
                <FontAwesome5 name={'capsules'} size={24} style={styles.nameMedication}/>
                <Text style={styles.nameMedication}>{name}</Text>
                <FontAwesome5 name={open ? 'caret-up' : 'caret-down'} size={32} style={styles.iconDown} />
            </Pressable>
            {
                open && (
                    <View>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 8,
        width: 320,
        maxWidth: '80%',
        backgroundColor: '#5B84ED',
        display: 'flex',
    },
    description: {
        color: '#fff',
        fontSize: 14
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    nameMedication: {
        color: '#fff',
        fontSize: 26
    },
    iconDown: {
        color: '#fff',
        marginLeft: 'auto'
    }
})

export default CardMedication;