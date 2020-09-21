import React from 'react';
import {Dimensions, StyleSheet, View, Image, Animated} from 'react-native';
import {sliderBackgrounds} from '../assets/design/colors.js';
const screenWidth = Dimensions.get('window').width;

const Slide = ({content, count, progress}) => {
  return (
    <View style={styles.slide}>
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor: progress.interpolate({
              inputRange: Array(count)
                .fill(0)
                .map((_, i) => i),
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
