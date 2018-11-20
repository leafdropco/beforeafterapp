import React from 'react';
import { Button, Image, View, ScrollView } from 'react-native';

import { ImagePicker } from 'expo';
import { TransitionImage } from '../components/AppComponents';

export default class PresentationScreen extends React.Component {
  state = {
    before: null,
    after: null,
  };
  render() {
    let { before, after } = this.state;
    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingVertical: 50,
          paddingHorizontal: 10,
        }}>
        <View>
          {!before && (
            <Button title="Add Before Photo" onPress={this._pickBeforeImage} />
          )}
          {before &&
            !after && (
              <Button title="Add After Photo" onPress={this._pickAfterImage} />
            )}
          <View style={{ display: 'flex' }}>
            {before && (
              <Image
                source={{ uri: before }}
                style={{ width: 50, height: 50 }}
              />
            )}
            {after && (
              <Image
                source={{ uri: after }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </View>
          {before &&
            after && (
              <View>
                <TransitionImage
                  duration={1000}
                  images={{ before: before, after: after }}
                />
              </View>
            )}
        </View>
      </ScrollView>
    );
  }

  _pickBeforeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ before: result.uri });
    }
  };
  _pickAfterImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ after: result.uri });
    }
  };
}
