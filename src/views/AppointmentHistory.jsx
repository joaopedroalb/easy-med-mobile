import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { PatientService } from '../services/patient/PatientService';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import HeaderCircleBlue from '../components/HeaderCircleBlue';
import Loading from '../components/Loading';

const WIDTH = Dimensions.get('window').width;

const AppointmentHistory = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const fetchPatientAppointments = async () => {
    const fetchResult = await PatientService.getAppointmentsByPatientId(user.id)

    if (fetchResult.error) {
      setError(fetchResult.data)
      setLoading(false)
      return 
    }

    setAppointments(fetchResult.data)
    setLoading(false);
  };

  const formatDate = (ISODate) => {
    const date = new Date(ISODate);
    return date.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    fetchPatientAppointments();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderCircleBlue height={540} top={-350}/>
      <View style={styles.headerContainer}>
        <Text style={styles.titleName}>Histórico de Consultas</Text>
      </View>
      {loading && <Loading/>}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{`Ocorreu um erro: ${error}`}</Text>
        </View>
      )}
      {
        appointments !== undefined && appointments.map(appointment => {
          return (
            <AppointmentCard
              key={appointment.id}
              tags={appointment.exam ? appointment.exams.map((exam) => exam.examType) : []}
              date={`Consulta feita em ${formatDate(appointment.date)}`}
              buttonText={'Mais informações'}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardDescription}>
                  Exame feito pelo médico(a):
                </Text>
                <Text style={styles.cardValue}>{appointment.doctor.name}</Text>
              </View>
            </AppointmentCard>
          )
        })
      }
      
    </ScrollView>
  );
};

export default AppointmentHistory;

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
  cardContent: {
    padding: 10,
  },
  cardDescription: {
    color: '#fff',
    fontSize: 16,
  },
  cardValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  errorContainer: {
    backgroundColor: '#FF5E5E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
  },
  errorText: { color: 'white' },
});
