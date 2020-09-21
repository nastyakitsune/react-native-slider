import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';

import Slide from './Slide';
import SliderDots from './SliderDots';

const screenWidth = Dimensions.get('window').width;

const sortItems = (a, b) => (b.category > a.category ? -1 : 1);

const Slider = ({items}) => {
  const categories = items
    .map((item) => item.category)
    .filter((v, i, a) => a.indexOf(v) === i);

  const pagesRef = useRef(null);

  const [category, setCategory] = useState(categories[0]);

  const [progress] = useState(new Animated.Value(0));

  const onScroll = ({nativeEvent: {contentOffset}}) => {
    const offset = contentOffset.x / screenWidth;
    progress.setValue(offset);
  };

  const onCategoryPress = (pressed) => {
    const categoryItems = items.filter((item) => item.category === pressed);
    const index = items.indexOf(categoryItems[0]);
    pagesRef.current.scrollToIndex({animated: true, index});
  };

  const onMomentumScrollEnd = ({nativeEvent: {contentOffset}}) => {
    const index = contentOffset.x / screenWidth;
    items[index].category !== category && setCategory(items[index].category);
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={pagesRef}
          data={items.sort(sortItems)}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          keyExtractor={(slide, index) => `${slide}-${index}`}
          contentContainerStyle={styles.scrollContainer}
          renderItem={({item: {image}}, index) => (
            <Slide content={image} progress={progress} count={items.length} />
          )}
        />
        <View style={styles.categories}>
          {categories.sort(sortItems).map((cat, index) => (
            <TouchableOpacity
              key={`${cat}-${index}`}
              onPress={() => onCategoryPress(cat)}>
              <Text
                style={[
                  styles.category,
                  cat === category && styles.categoryActive,
                ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <SliderDots count={items.length} progress={progress} />
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
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 15,
  },
  category: {
    marginRight: 5,
    fontSize: 18,
    color: '#E9ECEF',
  },
  categoryActive: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default Slider;
