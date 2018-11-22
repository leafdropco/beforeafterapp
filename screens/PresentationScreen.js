import React from "react";
import { Button, Image, View, ScrollView, StyleSheet } from "react-native";

import { ImagePicker, LinearGradient } from "expo";
import { TransitionImage, DefaultTextInput } from "../components/AppComponents";
import * as Expo from "expo";
export default class PresentationScreen extends React.Component {
  static navigationOptions = {
    headerBackground: (
      <LinearGradient
        colors={["#05809D", "#0AC9D9"]}
        style={{ width: `100%`, height: `100%`, alignItems: "center" }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
    )
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
          <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
            <View style={{width:`45%`}}>
              <DefaultTextInput placeholder="Before" />
            </View>
            <View></View>
            <View style={{width:`45%`}}>
              <DefaultTextInput placeholder="After" />
            </View>
          </View>
          {!before && (
            <Button title="Add Before Photo" onPress={this._pickBeforeImage} />
          )}
          {before && !after && (
            <Button title="Add After Photo" onPress={this._pickAfterImage} />
          )}
          <View style={{ display: "flex" }}>
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
          {before && after && (
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
