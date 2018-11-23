import React from "react";
import { Image, View, ScrollView, StyleSheet, Text, Dimensions } from "react-native";

import { ImagePicker, LinearGradient } from "expo";
import { Button, DefaultTextInput } from "../components/AppComponents";
import {Header} from "../components/AppComponents";
export default class PresentationScreen extends React.Component {
  static navigationOptions = {
    headerBackground: (
      <Header />
    ),
    headerLeft: null,
  };
  state = {
    before: null,
    after: null
  };
  render() {
    let { before, after } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <DefaultTextInput placeholder="Presentation Name" />
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ width: `45%` }}>
              <Button title="Before" callback={this._pickBeforeImage} />
            </View>
            <View></View>
            <View style={{ width: `45%` }}>
              <Button title="After" callback={this._pickAfterImage} />
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            {before && (
              <Image
                source={{ uri: before }}
                style={{
                  width: (Dimensions.get('window').width / 2) - 20,
                  height: Dimensions.get('window').height / 2.5,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1.0
                }}
              />
            )}
            {after && (
              <Image
                source={{ uri: after }}
                style={{
                  width: (Dimensions.get('window').width / 2) - 20,
                  height: Dimensions.get('window').height / 2.5,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1.0
                }}
              />
            )}
          </View>
          <View style={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
          }}>
            <Button title="Save" callback={this._saveImage} />
            <Text onPress={() => this.props.navigation.navigate('Home')}>Cancel</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  _saveImage = () => {
    console.log("Saved!");
    //push to home screen, the user should get a live update of their picture. 
    // We may want to push to a presentationView /shrug
    this.props.navigation.navigate('Home')
  }
  _pickBeforeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ before: result.uri });
    }
  };
  _pickAfterImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ after: result.uri });
    }
  };
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 50,
    paddingHorizontal: 10
  }
});
