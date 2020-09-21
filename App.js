import React from 'react';
import {SafeAreaView, StatusBar, Image} from 'react-native';

import Slider from './components/Slider';
import first from './assets/images/1.png';
import second from './assets/images/2.png';
import third from './assets/images/3.png';
import fourth from './assets/images/4.png';
import fifth from './assets/images/5.png';
import sixth from './assets/images/6.png';
import seventh from './assets/images/7.png';
import eight from './assets/images/8.png';
import nine from './assets/images/9.png';
import ten from './assets/images/10.png';

const items = [
  {
    category: 'First',
    image: first,
  },
  {
    category: 'Second',
    image: second,
  },
  {
    category: 'First',
    image: third,
  },
  {
    category: 'Second',
    image: fourth,
  },
  {
    category: 'Third',
    image: fifth,
  },
  {
    category: 'First',
    image: sixth,
  },
  {
    category: 'Second',
    image: seventh,
  },
  {
    category: 'First',
    image: eight,
  },
  {
    category: 'Third',
    image: nine,
  },
  {
    category: 'Second',
    image: ten,
  },
];

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Slider items={items} />
      </SafeAreaView>
    </>
  );
};

export default App;
