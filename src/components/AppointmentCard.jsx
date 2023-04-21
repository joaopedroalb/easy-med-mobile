import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EXAM_COLORS = {
  Urina: '#FCFF64',
  Sangue: '#FF6666',
  Ultrassom: '#FFFFFF',
  Default: 'rgba(255, 255, 255, 0.2)',
};

const Card = ({ tags, date, buttonText, children }) => (
  <View style={styles.card}>
    <View style={styles.topContainer}>
      <View style={styles.tagContainer}>
        {tags &&
          tags.map((tag, i) => (
            <View
              key={i}
              style={[
                styles.tagBackground,
                { backgroundColor: EXAM_COLORS[tag] || EXAM_COLORS.Default },
              ]}
            >
              <Text style={styles.tag}>{tag}</Text>
            </View>
          ))}
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
    {children}
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5B84ED',
    borderRadius: 10,
    marginVertical: 8,
    padding: 16,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
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

export default Card;
