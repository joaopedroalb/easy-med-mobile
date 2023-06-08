import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback  } from 'react-native';
import { UserContext } from '../context/UserContext';
import { PatientService } from '../services/patient/PatientService';
import CardCarousel from '../components/CardCarousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HeaderCircleBlue from '../components/HeaderCircleBlue';
import Loading from '../components/Loading';


const WIDTH = Dimensions.get('window').width

const MODAL_DEFAULT_VALUE = {
    active:false,
    type: '',
    name: '',
    description: ''
}

const Profile = () => {
    const {user} = useContext(UserContext)
    

    const [userData, setUserData] = useState({
        conditions: [],
        allergies: []
    })
    const [loading, setLoading] = useState(true)
    const [modalItem, setModalItem] = useState(MODAL_DEFAULT_VALUE)

    const setModalValue = (type, name, description) => {
        setModalItem({
            active:true,
            type: type,
            name: name,
            description: description
        })
    }

    const closeModal = () => {
        setModalItem(MODAL_DEFAULT_VALUE)
    }


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

    const EmptyState = () => {
        return (
            <View style={styles.emptyContainer}>
                 <FontAwesome5 name={'frown-open'} size={100} style={styles.iconDataEmpty}/>
                 <Text style={styles.textWarningEmpty}>Você não tem nenhuma informação adicionada</Text>
            </View>
        )
    }

    const RenderCards = () => {
        if (loading)
            return <Loading/>
        
        const conditionsHasData = !!userData.conditions && !!userData.conditions.length > 0
        const allergiesHasData = !!userData.allergies && !!userData.allergies.length > 0

        if (!conditionsHasData && !allergiesHasData)
            return <EmptyState />

        return (
            <>
                {
                    conditionsHasData && (
                        <View style={styles.cardContainer}>
                            <Text style={{fontSize: 20 }}>Doenças</Text>
                            <CardCarousel 
                                    cardsArray={userData.conditions.map(card=>{
                                            return (
                                                <TouchableOpacity 
                                                    style={{...styles.cardScrollView, backgroundColor: '#20925B'}} 
                                                    key={card.name} 
                                                    activeOpacity={.7}
                                                    onPress={()=>setModalValue('Doença',card.name, card.description)}
                                                >
                                                    <FontAwesome5 name={'disease'} size={30} style={styles.iconScrollView}/>
                                                    <Text style={styles.cardText} numberOfLines={1} ellipsizeMode='tail'>
                                                        {card.name} 
                                                    </Text>
                                                </TouchableOpacity>
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
                    )
                }
                {
                    allergiesHasData && (
                        <View style={styles.cardContainer}>
                        <Text style={{fontSize: 20 }}>Alergias</Text>
                        {
                            <CardCarousel 
                                cardsArray={userData.allergies.map(card=>{
                                        return (
                                            <TouchableOpacity 
                                                style={{...styles.cardScrollView, backgroundColor: '#FF8888'}} 
                                                key={card.name} 
                                                activeOpacity={.7}
                                                onPress={()=>setModalValue('Alergia',card.name, card.symptons)}
                                            >
                                                <FontAwesome5 name={'allergies'} size={30} style={styles.iconScrollView}/>
                                                <Text style={styles.cardText} numberOfLines={1} ellipsizeMode='tail'>
                                                    {card.name} 
                                                </Text>
                                            </TouchableOpacity>
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
                    )
                }
                
            </>
        )
    }

    return (
        <View style={styles.containerBg}>
            <HeaderCircleBlue height={540}/>
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
                <RenderCards/>
            </View>       

            <Modal
                transparent={true}
                visible={modalItem.active}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View  style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={()=>{}}>
                            <View style={{...styles.modalContent, backgroundColor: modalItem.type === 'Doença' ? '#20925B':'#FF8888' }}>
                                <Text style={styles.modalTextTitle}>{modalItem.name}</Text>
                                <Text style={styles.modalText}>{modalItem.description}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            
            
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
    emptyContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    iconDataEmpty:{
        color: '#514d4dc3'
    },
    textWarningEmpty: {
        color: '#514d4dc3',
        fontSize: 26,
        textAlign: 'center'
    },
    icon:{
        position:'absolute',
        left: 20,
        color: '#fff',
        marginRight: 8
    },

    iconScrollView:{
        position:'absolute',
        left: 20,
        color: '#fff',
        marginRight: 24
    },

    card: {
        position: 'relative',
        width: '100%',
        height: 120,
        borderRadius: 16, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardScrollView: {
        position: 'relative',
        minWidth: 300,
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
        overflow: 'hidden',
        flexShrink: 1 
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        margin: 15, 
        minWidth: '75%'
      },
      modalTextTitle: {
        color: '#fff',
        fontSize: 32,
        marginBottom: 10,
      },
      modalText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
      },
})

export default Profile;