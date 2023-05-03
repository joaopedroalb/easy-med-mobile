import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, ScrollView } from 'react-native';
import HeaderCircleBlue from '../../components/HeaderCircleBlue';
import Loading from '../../components/Loading';
import { AppointmentService } from '../../services/appointment/AppointmentService';
import { DoctorService } from '../../services/doctor/DoctorService';
import Rating from './components/Rating';
import RateDoctor from './components/RateDoctor';
import CreateAppointment from './components/CreateAppointment';
import { UserContext } from '../../context/UserContext';
import { PatientService } from '../../services/patient/PatientService';

const WIDTH = Dimensions.get('window').width


const DoctorProfile = ({route}) => {

    const { user } = useContext(UserContext)

    const { doctorId, doctorName, photo, description, insurance, specialty } = route.params;

    const [loading, setLoading] = useState(true)
    const [appointmentAvailable, setAppointmentAvailable] = useState([])
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const [rating, setRating] = useState(-1)

    const getAppointmentDateParams = () => {
        let datesAppointment = []


        const currentDate = new Date()
        const weekDay = currentDate.getDay()

        let initDate = currentDate
        let utilsDays = 5 - weekDay

        if (weekDay === 0 || utilsDays <= 0) {
            const daysToNextSunday = (1 - weekDay + 7) % 7
            const nextSunday = new Date(currentDate.getTime() + daysToNextSunday * 24 * 60 * 60 * 1000)

            initDate = nextSunday
            utilsDays = 5
        }

        for (let i = 0; i<utilsDays; i++) {
            const date = new Date(initDate.getTime() + 24 * 60 * 60 * 1000)
            datesAppointment.push(date)

            initDate = date
        }

        const start = datesAppointment[0]
        const end = datesAppointment[datesAppointment.length - 1]

        return {
            startDate: `${start.getFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, '0')}-${String(start.getUTCDate()).padStart(2, '0')}`,
            endDate: `${end.getFullYear()}-${String(end.getUTCMonth() + 1).padStart(2, '0')}-${String(end.getUTCDate()).padStart(2, '0')}`
        }
    }

    const getAppointment = async () => {
        const {startDate, endDate} = getAppointmentDateParams()
        const appointmentReq = await AppointmentService.getAvailableAppointment(doctorId, startDate, endDate)
        

        if (appointmentReq.error) 
            return

        const result = appointmentReq.data.map(appoint => {
            const splitDate = appoint.date.split('-')

            return {
                day: splitDate[2],
                month: splitDate[1],
                availableTime: appoint.freeTimeSlots, 
                year: splitDate[0]
            }
        })

        setAppointmentAvailable(result)
    }

    const getRating = async () => {
        const {data, error} = await DoctorService.getRating(doctorId)

        if (error) 
            return 

        if (data._avg.rating === null || data._count.rating === null)
            return 
        
        setRating(data._count.rating)
        
    }

    const getAppointmentPatient = async () => {
        const {data, error} = await PatientService.getAppointmentsByPatientId(user.id)
        
        if (error)
            return 
        
        const currentDate = new Date()
        
        const filterList = data.filter(appoint=> new Date(appoint.date) > currentDate && appoint.doctorId === doctorId)

        if (filterList.length <= 0)
            return 
        
        const appointDate = new Date(filterList[0].date)
        const month = String(appointDate.getUTCMonth() + 1).padStart(2, '0')
        const day = String(appointDate.getUTCDate()).padStart(2, '0')
        const time = filterList[0].time


        setCurrentAppointment({date: {day, month }, time})
    }

    const getData = async () => {
        await getAppointment()
        await getRating()
        await getAppointmentPatient()
        setLoading(false)
    }

    const createAppointment = async (year, date, time) => {

        const dateAppoint = year+'-'+date.month+'-'+date.day

        const {data, error} = await AppointmentService.createAppointment(doctorId, user.id, dateAppoint, time)

        if (error)
            return 

        setCurrentAppointment({date:{day: date.day, month: date.month}, time})
    }   

    useEffect(()=>{
        getData()
    },[])

    const RenderBody = () => {
        if (loading) return <Loading/>

        return (
            <>
                <View style={styles.headerTagContainer}>
                    {specialty && <Text style={styles.tag}>{specialty.name}</Text>}
                    {insurance && <Text style={{...styles.tag, backgroundColor:'#2E406F'}}>{insurance}</Text>}
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>{description}</Text>
                </View>
                <CreateAppointment appointmentList={appointmentAvailable} currentAppointment={currentAppointment} handleCreate={createAppointment}/>
                <RateDoctor />
            </>
        )
    }

    return (
        <ScrollView contentContainerStyle={{backgroundColor: '#fff', flexGrow: 2}}>
            <View style={styles.containerBg}>
                <HeaderCircleBlue height={600}/>
                <View style={styles.headerContainer}>
                    <Image 
                        style={styles.profileImage}
                        source={{
                            uri: photo,
                        }}
                    />
                    <Text style={styles.titleName}>{doctorName}</Text>
                    <Rating rating={rating}/>
                </View>
                <View style={styles.bodyContent}>
                    <RenderBody/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerBg:{
        minHeight: '100%',
        width: '100%',
        paddingTop:StatusBar.currentHeight,
        position: 'relative',
        flex: 1, 
        paddingTop: 60,
        display: 'flex', 
        flexDirection: 'column',
        gap: 55,
        overflow: 'scroll', 
    },
    headerContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        paddingTop: 10,
        gap: 20,
        minHeight: 300
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
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 12,
        marginBottom: 20
    },
    headerTagContainer:{
        width: '100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8
    },
    tag:{
        color: '#fff',
        backgroundColor:'#363333',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30
    },
    descriptionContainer: {
        width: '100%',
        paddingHorizontal: 18,
    }
})

export default DoctorProfile