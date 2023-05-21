import { View, StyleSheet, Text } from 'react-native';
import { formatDate } from '../../../utils/dateTimeHelpers';

const ExamCard = ({ exam }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exam.examType || 'Exame'}</Text>
      <View style={styles.topContainer}>
        <Text style={styles.topLeft}>{`Local: ${exam.location || '-'}`}</Text>
        <Text style={styles.topRight}>{`Data: ${formatDate(
          exam.createdAt
        )}`}</Text>
      </View>
      <Text style={styles.header}>Resultado:</Text>
      <Text style={styles.paragraph}>
        {exam.result || 'Nenhum resultado registrado para este exame'}
      </Text>
      <Text style={styles.header}>Arquivo:</Text>
      <Text style={styles.paragraph}>
        {exam.file || 'Nenhum link associado'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5B84ED',
    borderRadius: 20,
    marginVertical: 8,
    padding: 12,
    height: 200
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  topRight: {
    flexDirection: 'row',
    marginRight: 8,
    color: 'white',
    fontSize: 12,
  },
  topLeft: {
    fontSize: 12,
    color: 'white',
    flex: 1,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  paragraph: {
    color: 'white',
  },
});

export default ExamCard;
