import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { formatDate } from '../../../utils/dateTimeHelpers';
import appointmentTime from '../../../constants/appointmentTime';
import { AppointmentService } from '../../../services/appointment/AppointmentService';
import { useEffect, useState } from 'react';
import ExamCard from './ExamCard';

const DetailsModal = ({ visible, appointment, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);

  const fetchAppointmentExams = async (appointmentId) => {
    const fetchResult = await AppointmentService.getAppointmentExams(
      appointmentId
    );

    if (fetchResult.error) {
      setError(fetchResult.data);
      setLoading(false);
      return;
    }

    setExams(fetchResult.data);
    setLoading(false);
  };

  useEffect(() => {
    if (visible) {
      fetchAppointmentExams(appointment.id);
    }
  }, [appointment, visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              onClose();
              setLoading(true);
              setExams([]);
            }}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {`Consulta em ${formatDate(appointment.date) || '-'}`}
          </Text>
          <Text style={styles.info}>
            {`Horário: ${appointmentTime[appointment.time] || '-'}`}
          </Text>
          <Text style={styles.info}>
            {`Médico: ${appointment.doctor.name || '-'}`}
          </Text>
          <Text style={styles.info}>
            {`Local: ${appointment.location || '-'}`}
          </Text>
          <Text style={styles.title}>Exames realizados:</Text>
          {loading && <ActivityIndicator size={'small'} color={'#5B84ED'} />}
          {error && (
            <View style={styles.errorContainer}>
              <Text
                style={styles.errorText}
              >{`Ocorreu um erro: ${error}`}</Text>
            </View>
          )}
          {!error && !loading && (
            <ScrollView>
              {!!exams.length ? (
                exams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
              ) : (
                <Text style={styles.info}>
                  {'Nenhum exame realizado'}
                </Text>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    width: '85%',
    maxHeight: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    right: 10,
    backgroundColor: '#5B84ED',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default DetailsModal;
