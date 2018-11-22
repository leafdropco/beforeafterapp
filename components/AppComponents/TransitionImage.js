import React from 'react';
import { Animated, View, Dimensions } from 'react-native';

export default class TransitionImage extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
    shouldAnimate: false,
  };
 
  touchStart = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: this.props.duration,
    }).start();
  };
  touchEnd = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: this.props.duration,
    }).start();
  };
  render() {
    return (
      <View
        onTouchStart={this.touchStart}
        onTouchEnd={this.touchEnd}
        style={{ flex: 1 }}>
        <Animated.Image
          source={{ uri: this.props.images.before }}
          style={{
            width: this.props.width,
            height: this.props.height,
            resizeMode: 'cover',
            position: 'absolute',
          }}
        />
        <Animated.Image
          source={{ uri: this.props.images.after }}
          style={{
            width: this.props.width,
            height: this.props.height,
            resizeMode: 'cover',
            opacity: this.state.fadeAnim,
          }}
        />
      </View>
    );
  }
}
