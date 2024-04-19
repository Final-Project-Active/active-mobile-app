import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const NumberPicker = () => {
  const [selectedNumber, setSelectedNumber] = useState(18);
  const [scrollPosition, setScrollPosition] = useState(0);

  const data = Array.from({ length: 33 }, (_, i) => 18 + i);

  const interpolateColorAndSize = (index) => {
    const distance = Math.abs(selectedNumber - index);
    const maxDistance = 5; 
    const intensity = Math.min(distance, maxDistance) / maxDistance;
    const opacity = 1 - intensity;
    const fontSize = 20 - 5 * intensity;
    return { opacity, fontSize };
  };

  useEffect(() => {
    const visibleIndexes = Math.floor(scrollPosition / 60);
    setSelectedNumber(18 + visibleIndexes);
    console.log('Number at center:', 18 + visibleIndexes);
  }, [scrollPosition]);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
    console.log('Clicked number:', number);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={60}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={(event) => {
          const { contentOffset } = event.nativeEvent;
          setScrollPosition(contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        {data.map((item) => {
          const { opacity, fontSize } = interpolateColorAndSize(item);
          const adjustedOpacity = Math.max(opacity - 0.3, 0); // Lower opacity for adjacent numbers
          return (
            <TouchableOpacity
              key={item}
              onPress={() => handleNumberSelect(item)}
              style={[
                styles.numberButton,
                {
                  opacity: adjustedOpacity,
                  fontSize: fontSize,
                  borderTopColor: item === selectedNumber ? 'black' : 'transparent',
                  borderTopWidth: item === selectedNumber ? 1 : 0,
                  borderBottomColor: item === selectedNumber ? 'black' : 'transparent',
                  borderBottomWidth: item === selectedNumber ? 1 : 0,
                },
              ]}
            >
              <Text style={styles.numberText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250, 
    justifyContent: 'center', 
    alignItems: 'center',
    top: 350,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  numberButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default NumberPicker;
