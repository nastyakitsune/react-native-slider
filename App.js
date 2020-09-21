import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {slides} from './utils/data';

import Slider from './components/Slider';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Slider items={slides} />
      </SafeAreaView>
    </>
  );
};

export default App;
