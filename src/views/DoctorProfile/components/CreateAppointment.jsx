import React, { useState } from 'react';
import { View, Text, StyleSheet,Pressable } from 'react-native';
import appointmentTime from '../../../constants/appointmentTime';


const CreateAppointment = ({appointmentList, currentAppointment = null, handleCreate}) => {
    const [dateSelected, setDateSelected] = useState({
        day: null,
        month: null
    })
    const [timeSelected, setTimeSelected] = useState(null)

    const SET_DATE_TIME = (day, month, time) => {
        setDateSelected({...dateSelected, day: day, month: month})
        setTimeSelected(time)
    }

    if (currentAppointment)
        return (
            <View style={{...styles.container, backgroundColor: '#19c030'}}>
                <Text style={styles.infoText}>Você tem uma consulta marcada</Text>
                <Text style={styles.infoText}>Dia {currentAppointment.date.day}/{currentAppointment.date.month} às {appointmentTime[currentAppointment.time]}</Text>
            </View>
        )

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Agendar Consulta nessa semana</Text>
            <View style={styles.optionContainer}>
            {
                appointmentList.map((appointment)=>{
                    return appointment.availableTime.map((time,index)=>{
                        const selected = appointment.day === dateSelected.day && appointment.month === dateSelected.month && time === timeSelected

                        return (
                            <Pressable 
                                key={index} 
                                style={[styles.option, selected ? styles.selected : styles.default]}  
                                onPress={()=>SET_DATE_TIME(appointment.day, appointment.month, time)}
                            >
                                <Text style={{fontSize: 22}}>{appointment.day}/{appointment.month} {appointmentTime[time]}</Text>
                            </Pressable>
                        )
                    })
                })
            }
            </View>
            <Pressable 
                style={(!dateSelected || !timeSelected) ? styles.btnContainerDisabled : styles.btnContainer} 
                disabled={!dateSelected || !timeSelected} 
                onPress={()=>handleCreate(appointmentList[0].year,dateSelected, timeSelected)}
            >
                <Text style={{fontSize: 26, color: '#fff'}}>Agendar</Text>
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
        gap:18, 
        backgroundColor: '#272727',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 30
    },
    infoText: {
        fontSize: 26,
        textAlign: 'center',
        color: '#fff'
    },
    optionContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 18
    },
    option:{
        width: '45%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 3,
    },
    default: {
        backgroundColor: '#fff',
        borderColor: '#272727',
    },
    selected: {
        backgroundColor: '#D1E7CF',
        borderColor: '#24FF00',
    },
    btnContainer: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: '#7197f8',
        marginTop: 16
    },
    btnContainerDisabled: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: '#7197f8',
        marginTop: 16,
        opacity: .55
    }
})

export default CreateAppointment