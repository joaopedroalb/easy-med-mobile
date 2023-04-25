import React from 'react';
import { View, Image, Pressable, StyleSheet, Text } from 'react-native';

const DoctorCard = ({doctor, specialties, navigateDoctor}) => {
    const DEFAULT_IMAGE = doctor.profilePicture || 'https://thumbs.dreamstime.com/b/default-placeholder-doctor-half-length-portrait-default-placeholder-doctor-half-length-portrait-photo-avatar-gray-color-116470452.jpg' 
    const specialtieName = specialties.filter(x=>x.id === doctor.specialtyId)[0] || null
    return (
        <Pressable style={styles.doctorCardBg} onPress={navigateDoctor}>
            <Image 
                style={styles.doctorImg}
                source={{
                    uri: DEFAULT_IMAGE,
                }}
            />
            <View style={{flex: 1, display: 'flex', gap: 8, alignItems: 'center'}}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text>{doctor.email}</Text>
                {doctor.phone && <Text style={{letterSpacing: .5}}>{doctor.phone}</Text>}
                <View style={styles.tagContainer}>
                    {specialtieName && <Text style={styles.tag}>{specialtieName.name}</Text>}
                    {doctor.insurance && <Text style={{...styles.tag, backgroundColor: '#2E406F'}}>{doctor.insurance}</Text>}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    doctorCardBg: {
        width: '90%',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row', 
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: '#8E8E8E'
    },
    doctorImg: {
        width: 100,
        height: 100,
        borderRadius:100,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000'
    },
    tagContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }, 
    tag: {
        backgroundColor: '#363333',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        color: '#fff'
    }
})


export default DoctorCard