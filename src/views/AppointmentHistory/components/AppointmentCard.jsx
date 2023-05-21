import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDate } from '../../../utils/dateTimeHelpers';

const EXAM_COLORS = {
  Urina: '#FCFF64',
  Sangue: '#FF6666',
  Ultrassom: '#FFFFFF',
  Default: 'rgba(255, 255, 255, 0.2)',
};

const AppointmentCard = ({ appointment, onButtonClick }) => (
  <View style={styles.card}>
    <View style={styles.topContainer}>
      <View style={styles.tagContainer}>
        {appointment.exams &&
          appointment.exams
            .map((exam) => (
              <View
                key={exam.id}
                style={[
                  styles.tagBackground,
                  { backgroundColor: EXAM_COLORS[exam.examType] || EXAM_COLORS.Default },
                ]}
              >
                <Text style={styles.tag}>{exam.examType}</Text>
              </View>
            ))}
      </View>
      <Text style={styles.date}>
        {`Consulta feita em ${formatDate(appointment.date)}`}
      </Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardDescription}>
        Consulta realizada pelo médico(a):
      </Text>
      <Text style={styles.cardValue}>{appointment.doctor.name}</Text>
    </View>
    <TouchableOpacity style={styles.button} onPress={onButtonClick}>
      <Text style={styles.buttonText}>{'Mais informações'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5B84ED',
    borderRadius: 20,
    marginVertical: 8,
    padding: 16,
  },
  cardContent: {
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
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
  tagContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  tagBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  tag: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#5B84ED',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AppointmentCard;
