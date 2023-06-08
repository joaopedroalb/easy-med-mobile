import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import HeaderCircleBlue from '../components/HeaderCircleBlue'
import { UserContext } from '../context/UserContext';
import { PatientService } from '../services/patient/PatientService';
import Loading from '../components/Loading';
import { DateService } from '../services/Date/DateService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import appointmentTime from '../constants/appointmentTime';
import { AppointmentService } from '../services/appointment/AppointmentService';
import EmptyMessage from '../components/EmptyMessage';

const WIDTH = Dimensions.get('window').width;

const AppointmentList = () => {

    const { user } = useContext(UserContext)

    const [loading, setLoading] = useState(true)
    const [appointmentList, setAppointmentList] = useState([])

    const getAppointmentsList = async () => {
        const { data , error } = await PatientService.getAppointmentsByPatientId(user.id)

        if (error)
            return

        const result = data.filter(x=> DateService.isAfterOrEqualsCurrentDate(x.date))
        setAppointmentList(result)
    }

    const getData = async () => {
        await getAppointmentsList()
        setLoading(false)
    }

    const handleDelete = async (idAppointment) => {
        const {data, error} = await AppointmentService.deleteAppointment(idAppointment)

        if(error)
            return null
            
        await getData()
    }

    useEffect(()=>{
        getData()
    },[])


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderCircleBlue height={540} top={-350}/>
            <View style={styles.headerContainer}>
                <Text style={styles.titleName}>Minhas Consultas</Text>
            </View>
            <View style={styles.bodyContent}>
                {
                    loading ? <Loading/> : appointmentList.length === 0 ? <EmptyMessage message={'Nenhuma Consulta Agendada'} icon={'calendar-check'}/> : (
                            appointmentList.map(item=>{
                                return (
                                    <View key={item.id} style={styles.card}>
                                        <View style={styles.cardHeader}>
                                            <Text style={styles.cardHeaderText}>{DateService.formatDate(item.date)}</Text>
                                            <Text style={styles.cardHeaderText}>{appointmentTime[item.time]}</Text>
                                        </View>
                                        <Text>{item.doctor.name}</Text>
                                        <TouchableOpacity  activeOpacity={.7} style={styles.btnDelete} onPress={()=>handleDelete(item.id)}>
                                            <Text style={styles.btnDeleteText}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                    )
                }
            </View>
        </ScrollView>
    )
}

export default AppointmentList

const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 40,
      marginBottom: 80,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      zIndex: 1,
    },
    titleName: {
      fontSize: 30,
      color: '#fff',
      maxWidth: WIDTH - 100,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    container: {
      padding: 16,
    },
    bodyContent: {
        width: '100%',
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 10,
        flex: 1
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        backgroundColor: '#D9D9D9',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        gap: 8
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        fontSize: 28
    },
    cardHeaderText: {
        fontSize: 24
    },
    btnDelete: {
        backgroundColor: '#FF4343',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 8
    },
    btnDeleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }

    
  });
  