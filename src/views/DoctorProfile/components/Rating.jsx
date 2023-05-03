import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Rating = ({rating}) => {
    if (rating === -1)
        return null

  return (
    <View style={styles.ratingContent}>
         {
            [1,2,3,4,5].map(value=>{
                return (
                    <FontAwesome5 name={'star'} size={25} solid style={value<=rating ? styles.active : styles.disable} key={value}/>
                )
            })
         }
    </View>
  )
}

const styles = StyleSheet.create({
   ratingContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
   },
   active: {
    color: '#FAFF00'
   },
   disable: {
    color: '#fff'
   }
})

export default Rating;