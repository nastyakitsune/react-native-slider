import React from 'react';
import {StyleSheet, View, Image, Animated} from 'react-native';

import {fillArray} from '../utils/formatters';
import {screenWidth} from '../utils/screen';

import {sliderBackgrounds} from '../assets/design/colors';

const Slide = ({content, count, progress}) => {
  return (
    <View style={styles.slide}>
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor: progress.interpolate({
              inputRange: fillArray(count),
              outputRange: sliderBackgrounds.slice(0, count),
            }),
          },
        ]}
      />
      <Image source={content} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: screenWidth,
    height: (screenWidth / 2) * 1.5,
    overflow: 'hidden',
    alignItems: 'center',
  },
  background: {
    width: screenWidth,
    height: screenWidth / 2,
  },
  image: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    position: 'absolute',
    bottom: 0,
  },
});

export default Slide;
