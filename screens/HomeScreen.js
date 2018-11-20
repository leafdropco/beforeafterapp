import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Linking,
  Alert,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { TransitionImage } from '../components/AppComponents/index';

const beforeAfter = [
  {
    title: "Air in my Hair, I just don't care",
    before:
      'https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae4520846654cd8e84b23/1509614691763/OliviaBossertPhotography+%28108+of+191%29.jpg?format=1500w',
    after:
      'https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae46b24a694220a87bccc/1509614716315/OliviaBossertPhotography+%281+of+1%29.jpg?format=1500w',
    duration: 3000,
  },
];
export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingVertical: 50,
          paddingHorizontal: 10,
        }}>
        {beforeAfter.map((image, index) => {
          return (
            <View>
              <TransitionImage duration={image.duration} images={image} />
              <Text>{image.title}</Text>
              <Text>Duraton: {image.duration}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
  addPresentation = () => {
    console.log(this.props);
    this.props.navigation.navigate('Presentation');
  };
}
