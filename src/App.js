/* import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  const r = useSharedValue(20);

  const handlePress = () => {
    r.value += 10;
  };

  // highlight-start
  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
  }));
  // highlight-end

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircle
          cx="50%"
          cy="50%"
          fill="#b58df1"
          // highlight-next-line
          animatedProps={animatedProps}
        />
      </Svg>
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  svg: {
    height: 250,
    width: '100%',
  },
});
 */


import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
const circleRadius = 30;

const Circle = () => {
  const _touchX = new Animated.Value(width / 2 - circleRadius);

  const _onPanGestureEvent = Animated.event([{ nativeEvent: { x: _touchX } }], {
    useNativeDriver: true,
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={_onPanGestureEvent}>
        <Animated.View
          style={{
            height: 150,
            justifyContent: 'center',
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: '#42a5f5',
                borderRadius: circleRadius,
                height: circleRadius * 2,
                width: circleRadius * 2,
              },
              {
                transform: [
                  {
                    translateX: Animated.add(
                      _touchX,
                      new Animated.Value(-circleRadius)
                    ),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return <Circle />;
}




/* 

import { View, Text } from 'react-native';
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <View style={{ paddingHorizontal: 15, flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <View style={{ height: 250, width: '100%', backgroundColor: 'grey', borderRadius: 25, }}>

        <View style={{ height: 50, width: 50, position: 'absolute', top: 100, bottom: 100, right: -30, borderRadius: 50 / 2, backgroundColor: '#FFFFFF', zIndex: 1, }} />
        <Text ellipsizeMode="clip" numberOfLines={1} style={{ top: 115, position: 'absolute', overflow: 'hidden', zIndex: 0 }}>
          - - - - - - - - - - - - - - - - - - - 
          - - - - - - - - - - - - - - - - - - - 
          - - - - - - - - - - - - - - - - - - - 
          - - - - - - - - - - - - - - - - - - - 
          - - - - - - - - - - - - - - - - - - - 
          - - - - - - - - - - - - - - - - - - - 
          - - - - - - - - - - - - - - - - - - - 
        </Text>
        <View style={{ height: 50, width: 50, position: 'absolute', top: 100, bottom: 100, left: -30, borderRadius: 50 / 2, backgroundColor: '#FFFFFF', zIndex: 1, }} />
      </View>
    </View>

    <View
      style={{
        height: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 1,
        borderStyle: 'dashed',
        zIndex: 0
      }}
    >
      <View style={{ position: 'absolute', left: -1, top: -1, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
      <View style={{ position: 'absolute', left: -1, top: -1, width: 1, height: '100%', backgroundColor: 'white', zIndex: 1 }} />
      <View style={{ position: 'absolute', right: -1, top: -1, width: 1, height: '100%', backgroundColor: 'white', zIndex: 1 }} />
    </View>
  </Fragment>
)
}

export default App

*/
