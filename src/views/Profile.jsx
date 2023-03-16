import React from 'react';
import { View, Button, Text, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width

const Profile = ({user, logout}) => {
    console.log('user')
    console.log(user)
    return (
        <View style={styles.containerBg}>
            <View style={styles.circleBlue}></View>
            <View style={styles.headerContainer}>
                <Image 
                    style={styles.profileImage}
                    source={{
                        uri: user.profilePicture,
                    }}
                />
                <Text style={styles.titleName}>{user.name}</Text>
            </View>

            <View style={styles.buttonExit}>
                <Button title='Sair' onPress={logout} />
            </View>          
            
        </View>
    )
}

const styles = StyleSheet.create({
    containerBg:{
        height:'100%',
        width: '100%',
        paddingTop:StatusBar.currentHeight,
        backgroundColor: '#fff',
        position: 'relative'
    },
    circleBlue:{
        backgroundColor: '#5B84ED',
        minHeight: 560,
        minWidth: WIDTH + 100,
        top: 0,
        position: 'absolute',
        borderRadius: 500,
        top: -210,
        left: -50,
        flex: 2
    },
    headerContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        paddingTop: 10,
        gap: 20
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius:100,
        borderWidth: 4,
        borderColor: '#fff'
    },
    titleName: {
        fontSize: 20,
        color: '#fff',
    },

    buttonExit: {
        position: 'absolute',
        bottom: 0,
        width: WIDTH,
        justifyContent: 'center'
    }
})

export default Profile;