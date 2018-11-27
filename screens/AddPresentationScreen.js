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
    title: 'My Presentation'
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
    // this function is a stop gap until the real issue is resolved in react-native:
    // https://github.com/facebook/react-native/pull/22063

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

  _uploadImageAsync = async (uri, location, callback) => {
    const ref = firebase
      .storage()
      .ref()
      .child(location);
    this._urlToBlob(uri).then((d) => {
      ref.put(d).then(t => {
        t.ref.getDownloadURL().then((downloadURL) => callback(downloadURL))
      });
    });
  };
  _saveImage = () => {
    const { authed, uid } = this.props.screenProps;
    if (this.state.before != null && this.state.after != null && this.state.title != null) {
      console.log("saving", this.state.title)
      let db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true });
      db.collection("data")
        .doc(`${uid}`)
        .set({
          presentations:
            this.state.data && this.state.data.presentations
              ? this.state.data.presentations.concat({
                title: this.state.title,
                before: this.state.before,
                after: this.state.after,
                duration: 3000,
                createdOn: firebase.database.ServerValue.TIMESTAMP
              })
              : [
                {
                  title: this.state.title,
                  before: this.state.before,
                  after: this.state.after,
                  duration: 3000,
                  createdOn: firebase.database.ServerValue.TIMESTAMP
                }
              ]
        });
    }
    else {
      Alert.alert("Sorry, you can create an empty Presentation");
    }
  };

  _pickImage = async (type, callback) => {
    const { authed, uid } = this.props.screenProps;
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3]
      });

      if (!result.cancelled && authed && uid != null) {
        await this._uploadImageAsync(
          result.uri,
          `data/${uid}/${uuid()}_${type}.jpg`,
          (imageUrl) => callback(imageUrl)
        );
      }
    } catch { }
  };

  render() {
    let { before, after } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <DefaultTextInput
            placeholder="Presentation Name"
            value={this.state.title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: `45%` }}>
              <Button title="Before" callback={() => this._pickImage('before', (imageUrl) => this.setState({ before: imageUrl }))} />
              {this.state.before != null && (<Image source={{ uri: this.state.before }}
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
                }} />)}
            </View>
            <View />
            <View style={{ width: `45%` }}>
              <Button title="After" callback={() => this._pickImage('after', (imageUrl) => this.setState({ after: imageUrl }))} />
              {this.state.after != null && (<Image source={{ uri: this.state.after }}
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
                }} />)}
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
