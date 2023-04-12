import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CardCarousel = ({ cardsArray, carouselSettings }) => {
  const {loop=true, width, scrollAnimationDuration = 1000, mode='parallax', height} = carouselSettings

  if(cardsArray.length === 0) 
    return null

  if (cardsArray.length >= 3 )
      return (
          <Carousel
              loop={loop}
              width={width}
              height={height}
              data={cardsArray}
              scrollAnimationDuration={scrollAnimationDuration}
              mode={mode}
              renderItem={({index}) => {
                return (
                  <>
                    {cardsArray[index]}
                  </>
                )
              }}
          />
      )
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.cardContainer}
      showsHorizontalScrollIndicator={false}
    >
      {cardsArray.map((card) => (
        <>
          {card}
        </>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32
  }
});

export default CardCarousel;