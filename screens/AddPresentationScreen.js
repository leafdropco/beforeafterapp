import React from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Alert
} from "react-native";
import { ImagePicker } from "expo";
import * as firebase from "firebase";
import "firebase/firestore";

import { Button, DefaultTextInput } from "../components/AppComponents";
import { Header } from "../components/AppComponents";
import { uuid } from "../helpers/uuid";
export default class AddPresentationScreen extends React.Component {
  static navigationOptions = {
    headerBackground: <Header />,
    headerLeft: null
  };
  state = {
    before: null,
    after: null,
    title: null
  };
  componentDidMount() {
    this._getCurrentPresentations();
  }
  _getCurrentPresentations = () => {
    const { authed, uid } = this.props.screenProps;

    if (authed && uid != null) {
      let db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true });
      db.collection("data")
        .doc(`${uid}`)
        .onSnapshot(doc => {
          if (doc.exists) {
            let data = doc.data();
            this.setState({ data: data });
          } else {
            this.setState({ data: null });
          }
        });
    }
  };
  _urlToBlob(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  }

  _uploadImageAsync = async (uri, location) => {
    const blob = this._urlToBlob(uri);
    const ref = firebase
      .storage()
      .ref()
      .child(location);
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
  };
  _saveImage = () => {
    const { authed, uid } = this.props.screenProps;
    const { before, after } = this.state;
    if (before != null && after != null && title != null) {
      if (authed && uid != null) {
        let db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true });
        db.collection("data")
          .doc(`${uid}`)
          .set({
            presentations:
              this.state.data && this.state.data.presentations
                ? this.state.data.presentations.concat({
                    title: "Test Post",
                    before:
                      "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae4520846654cd8e84b23/1509614691763/OliviaBossertPhotography+%28108+of+191%29.jpg?format=1500w",
                    after:
                      "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae46b24a694220a87bccc/1509614716315/OliviaBossertPhotography+%281+of+1%29.jpg?format=1500w",
                    duration: 3000,
                    createdOn: firebase.database.ServerValue.TIMESTAMP
                  })
                : [
                    {
                      title: "Test Post",
                      before:
                        "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae4520846654cd8e84b23/1509614691763/OliviaBossertPhotography+%28108+of+191%29.jpg?format=1500w",
                      after:
                        "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae46b24a694220a87bccc/1509614716315/OliviaBossertPhotography+%281+of+1%29.jpg?format=1500w",
                      duration: 3000,
                      createdOn: firebase.database.ServerValue.TIMESTAMP
                    }
                  ]
          });
      }
    } else {
      Alert.alert("Sorry, you can create an empty Presentation");
    }
  };

  _pickBeforeImage = async () => {
    const { authed, uid } = this.props.screenProps;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3]
      });

      if (!result.cancelled && authed && uid != null) {
        let imageUrl = this._uploadImageAsync(
          result.uri,
          `data/${uid}/${uuid()}_before.jpg`
        );
        this.setState({ before: imageUrl });
      }
    } catch {}
  };
  _pickAfterImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    if (!result.cancelled && authed && uid != null) {
      let imageUrl = this._uploadImageAsync(
        result.uri,
        `data/${uid}/${uuid()}_after.jpg`
      );
      this.setState({ after: imageUrl });
    }
  };

  render() {
    let { before, after } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <DefaultTextInput
            placeholder="Presentation Name"
            onChange={value => this.setState({ title: value })}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: `45%` }}>
              <Button title="Before" callback={this._pickBeforeImage} />
            </View>
            <View />
            <View style={{ width: `45%` }}>
              <Button title="After" callback={this._pickAfterImage} />
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* {before && (
              <Image
                source={{ uri: before }}
                style={{
                  width: Dimensions.get("window").width / 2 - 20,
                  height: Dimensions.get("window").height / 2.5,
                  shadowColor: "#000000",
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
                  width: Dimensions.get("window").width / 2 - 20,
                  height: Dimensions.get("window").height / 2.5,
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1.0
                }}
              />
            )} */}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button title="Save" callback={this._saveImage} />
            <Text onPress={() => this.props.navigation.navigate("Home")}>
              Cancel
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 50,
    paddingHorizontal: 10
  }
});
