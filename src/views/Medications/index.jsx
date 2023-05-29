import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import HeaderCircleBlue from '../../components/HeaderCircleBlue';
import Loading from '../../components/Loading';
import { UserContext } from '../../context/UserContext';
import { PatientService } from '../../services/patient/PatientService';
import CardMedication from './components/CardMedication';
import EmptyMedication from './components/EmptyMedication';



const WIDTH = Dimensions.get('window').width

const MedicationList = () => {
  const [loading, setLoading] = useState(true)
  const [errorFetch, setErrorFetch] = useState(false)
  const [medications, setMedications] = useState([])

  const {user} = useContext(UserContext)

  const getMedications = async () => {

    try {
      const {data, error} = await PatientService.getMedicationsByPatientId(user.id)
      if (error) 
        throw new Error(data)

      setMedications(data)

    } catch (err) {
      setErrorFetch(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getMedications()
  },[]) 


  return (
    <View style={styles.containerBg}>
      <HeaderCircleBlue height={520} top={-340}/>
      <View style={styles.headerContainer}>
          <Text style={styles.titleName}>Medicamentos</Text>
      </View>
      <View style={styles.bodyContent}>
          {
              loading ? <Loading /> : (
                <ScrollView contentContainerStyle={styles.cardsContainer} align>
                  {
                    medications.length > 0 ? (
                      medications.map(medication=> {
                        return <CardMedication name={medication.medicine.name} description={medication.frequency} key={medication.medicineId}/>
                      })
                    ) : <EmptyMedication />
                  }
                </ScrollView>
              )
          }
      </View>
  </View>
  )
}

export default MedicationList

const styles = StyleSheet.create({
  containerBg:{
      minHeight:'100%',
      width: '100%',
      paddingTop:StatusBar.currentHeight,
      backgroundColor: '#fff',
      position: 'relative',
      flex: 1,
      alignItems: 'center',
      paddingTop: 60
  },
  headerContainer: {
      position: 'absolute',
      top: 70
  },
  titleName: {
      fontSize: 30,
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  bodyContent: {
      width: '100%',
      marginTop: 150,
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 10,
      flex: 1
  },
  emptyContainer:{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      paddingHorizontal: 20
  },
  iconDataEmpty:{
      color: '#514d4dc3'
  },
  textWarningEmpty: {
      color: '#514d4dc3',
      fontSize: 26,
      textAlign: 'center'
  },
  selectContainer: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 10
  },
  cardsContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flexGrow: 2, 
      justifyContent: 'flex-start',
      alignItems: 'center', 
      overflow: 'scroll', 
  }
})
