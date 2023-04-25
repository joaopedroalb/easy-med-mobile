import React from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const SearchAndFilter = ({currentValue, changeValue, openFilter, isOpen}) => {
    return (
        <View style={styles.filterContent}>
            <TextInput placeholder='Buscar por Nome' style={styles.inputSearch} onChangeText={value=>{changeValue(value)}} value={currentValue}/>
            <Pressable onPress={openFilter}>
                <FontAwesome5 name={'filter'} size={30} style={isOpen ? {color: '#3559B7'} : {color: '#AEAEAE'}}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 15
    },
    inputSearch: {
        width: '90%',
        borderRadius: 12,
        padding: 10, 
        borderWidth: 2,
        borderColor: '#8E8E8E'
    }
})

export default SearchAndFilter