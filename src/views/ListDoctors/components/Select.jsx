import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Select = ({ options, selectedValue, onValueChange }) => {

  const handleValueChange = (value) => {
    onValueChange(value);
  };

  return (
    <View style={styles.selectContent}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
    selectContent: {
        flex: 1,
        borderColor: '#8E8E8E',
        borderWidth: 2,
        borderRadius: 12,
    }
})