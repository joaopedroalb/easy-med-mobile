import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { UserContext } from '../context/UserContext';

const WIDTH = Dimensions.get('window').width

const Profile = () => {
    const {user} = useContext(UserContext)
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

            <View style={styles.bodyContent}>
                <View style={styles.cardContainer}>
                    <Text style={{fontSize: 20 }}>Doenças Hereditárias</Text>
                    <View style={{...styles.card, backgroundColor: '#20925B'}}>
                        <Text style={styles.cardText}>Diabetes</Text>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={{fontSize: 20 }}>Alergias</Text>
                    <View style={{...styles.card, backgroundColor: '#FF8888'}}>
                        <Text style={styles.cardText}>Frutos do Mar</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonExit}>
                <Button title='Sair' onPress={()=>console.log('logout')} />
            </View>          
            
        </View>
    )
}

const styles = StyleSheet.create({
    containerBg:{
        minHeight:'100%',
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
        fontSize: 28,
        color: '#fff',
        maxWidth: WIDTH - 100,
        textAlign: 'center'
    },

    bodyContent: {
        marginTop: 150,
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 60
    },

    cardContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
    },

    card: {
        width: '80%',
        height: 90,
        padding: 8, 
        borderRadius: 16, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardText: {
        color: '#fff',
        fontSize: 32
    },

    buttonExit: {
        position: 'absolute',
        bottom: 0,
        width: WIDTH,
        justifyContent: 'center',
        height: 100
    }
})

export default Profile;