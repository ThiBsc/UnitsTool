import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';


const ShakingComponent = ({ active, children }) => {

  const animation = useRef(new Animated.Value(0)).current;

  const animatedLoop = Animated.loop(
    Animated.timing(animation, {
        toValue: 5,
        duration: 125,
        easing: Easing.linear,
        useNativeDriver: true  // To make use of native driver for performance
      }
    )
  );

  const spin = animation.interpolate({
    inputRange: [0, 1, 3, 4, 5],
    outputRange: ['0deg', '0.4deg', '0deg', '-0.4deg', '0deg']
  })

  if (active) {
    animatedLoop.start();
  } else {
    animation.setValue(0);
    animatedLoop.stop();
  }

  return (
    <Animated.View
      style={{
        transform: [
          { rotate: spin }
        ]
      }}
    >
      {children}
    </Animated.View>
  );
}

export default ShakingComponent;