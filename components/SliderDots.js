import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {fillArray} from '../utils/formatters.js';

const SliderDots = ({count, progress}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const listener = ({value}) => {
      setStep(Math.round(value));
    };

    progress.addListener(listener);
    return () => progress.removeListener(listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.dotsContainer}>
      {fillArray(count).map((dot) => (
        <View
          key={`dot-${dot}`}
          style={[styles.dot, dot === step ? styles.dotActive : {}]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 2,
    backgroundColor: '#E9ECEF',
  },
  dotActive: {
    backgroundColor: '#000000',
  },
});

export default SliderDots;
