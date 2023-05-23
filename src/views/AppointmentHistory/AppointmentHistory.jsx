import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { PatientService } from '../../services/patient/PatientService';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import AppointmentCard from './components/AppointmentCard';
import HeaderCircleBlue from '../../components/HeaderCircleBlue';
import Loading from '../../components/Loading';
import DetailsModal from './components/DetailsModal';

const WIDTH = Dimensions.get('window').width;

const AppointmentHistory = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const fetchPatientAppointments = async () => {
    const fetchResult = await PatientService.getAppointmentsByPatientId(
      user.id
    );

    if (fetchResult.error) {
      setError(fetchResult.data);
      setLoading(false);
      return;
    }

    setAppointments(fetchResult.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPatientAppointments();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderCircleBlue height={540} top={-350} />
      <View style={styles.headerContainer}>
        <Text style={styles.titleName}>Histórico de Consultas</Text>
      </View>
      {loading && <Loading />}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{`Ocorreu um erro: ${error}`}</Text>
        </View>
      )}
      {!!appointments.length &&
        appointments.map((appointment) => {
          return (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onButtonClick={() => handleAppointmentClick(appointment)}
            />
          );
        })}
      {selectedAppointment && (
        <DetailsModal
          visible={modalVisible}
          appointment={selectedAppointment}
          onClose={handleCloseModal}
        />
      )}
    </ScrollView>
  );
};

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

export default AppointmentHistory;
