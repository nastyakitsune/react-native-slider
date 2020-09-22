import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';

import {sortArray, uniqArray} from '../utils/formatters';
import {screenWidth} from '../utils/screen';

import Slide from './Slide';
import SliderDots from './SliderDots';

const Slider = ({items}) => {
  const categories = items.map((item) => item.category).filter(uniqArray);

  const sliderRef = useRef(null);
  const categoriesRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;

  const [category, setCategory] = useState(categories[0]);

  const onScroll = ({nativeEvent: {contentOffset}}) => {
    const offset = contentOffset.x / screenWidth;
    progress.setValue(offset);
  };

  const onCategoryPress = (pressed) => {
    const categoryItems = items.filter((item) => item.category === pressed);
    const index = items.indexOf(categoryItems[0]);
    sliderRef.current.scrollToIndex({animated: true, index});
  };

  const onMomentumScrollEnd = ({nativeEvent: {contentOffset}}) => {
    const index = contentOffset.x / screenWidth;
    if (items[index].category !== category) {
      setCategory(items[index].category);
      categoriesRef.current.scrollToIndex({
        animated: true,
        index: categories.indexOf(items[index].category),
        viewOffset: 15,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={sliderRef}
          data={items.sort(sortArray)}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          keyExtractor={(slide, index) => `${slide}-${index}`}
          contentContainerStyle={styles.scrollContainer}
          renderItem={({item: {image}}) => (
            <Slide content={image} progress={progress} count={items.length} />
          )}
        />
        <FlatList
          ref={categoriesRef}
          data={categories.sort(sortArray)}
          style={styles.categories}
          contentContainerStyle={styles.categoriesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(cat, index) => `${cat}-${index}`}
          renderItem={({item}, index) => (
            <TouchableOpacity onPress={() => onCategoryPress(item)}>
              <Text
                style={[
                  styles.category,
                  item === category && styles.categoryActive,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <SliderDots progress={progress} count={items.length} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
  },
  categories: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
  },
  category: {
    marginRight: 15,
    fontSize: 18,
    color: '#E9ECEF',
  },
  categoryActive: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default Slider;
