import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, ScrollView, PanResponder } from 'react-native';
import { UserContext } from '../context/UserContext';
import { PatientService } from '../services/patient/PatientService';
import CardCarousel from '../components/CardCarousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const WIDTH = Dimensions.get('window').width

const Profile = () => {
    const {user} = useContext(UserContext)
    

    const [userData, setUserData] = useState({
        conditions: [],
        allergies: []
    })
    const [loading, setLoading] = useState(true)


    const getUserData = async () => {
        try {
            const conditionsReq = await PatientService.getConditionsByPatientId(user.id)
            const allergiesReq = await PatientService.getAllergiesByPatientId(user.id)
            let userDataAux = userData
    
            if (!conditionsReq.error)
                userDataAux.conditions = conditionsReq.data
            if (!allergiesReq.error)
                userDataAux.allergies = allergiesReq.data
    
            setUserData(userDataAux)

        } catch (err) {
            console.log(err)
        } finally { 
            setLoading(false)
        }
    }

    useEffect(()=>{
        getUserData()
    },[])

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

          {
            !loading && (
                <View style={styles.bodyContent}>
                    <View style={styles.cardContainer}>
                        <Text style={{fontSize: 20 }}>Doenças</Text>
                        <CardCarousel 
                                cardsArray={userData.conditions.map(card=>{
                                        return (
                                            <View style={{...styles.card, backgroundColor: '#20925B'}} key={card.name}>
                                                <FontAwesome5 name={'disease'} size={40} style={styles.icon}/>
                                                <Text style={styles.cardText} numberOfLines={1} ellipsizeMode='tail'>
                                                    {card.name} 
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                                carouselSettings={{
                                    loop:false, 
                                    width: WIDTH, 
                                    scrollAnimationDuration: 1000,
                                    mode:'parallax', 
                                    height:'140'
                                }}
                            />
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{fontSize: 20 }}>Alergias</Text>
                        {
                            <CardCarousel 
                                cardsArray={userData.allergies.map(card=>{
                                        return (
                                            <View style={{...styles.cardScrollView, backgroundColor: '#FF8888'}} key={card.name}>
                                                <FontAwesome5 name={'allergies'} size={30} style={styles.iconScrollView}/>
                                                <Text style={styles.cardText} numberOfLines={1} ellipsizeMode='tail'>
                                                    {card.name} 
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                                carouselSettings={{
                                    loop:true, 
                                    width: WIDTH, 
                                    scrollAnimationDuration: 1000,
                                    mode:'parallax', 
                                    height:'140'
                                }}
                            />
                        }
                    </View>
                </View>
            )
          }         
            
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
        gap: 32
    },

    cardContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },

    icon:{
        position:'absolute',
        left: 40,
        color: '#fff',
        marginRight: 8
    },

    iconScrollView:{
        position:'absolute',
        left: 20,
        color: '#fff',
        marginRight: 12
    },

    card: {
        position: 'relative',
        width: '100%',
        height: 120,
        borderRadius: 16, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardScrollView: {
        position: 'relative',
        width: 300,
        height: 100,
        marginHorizontal: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16, 
    },
    cardText: {
        color: '#fff',
        fontSize: 40,
        maxWidth: '80%',
        overflow: 'hidden'
    },

    buttonExit: {
        position: 'absolute',
        bottom: 0,
        width: WIDTH,
        justifyContent: 'center',
        height: 100
    },
    carousel: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        overflow: 'scroll',
        gap: 16,
        height: 200
    },
})

export default Profile;