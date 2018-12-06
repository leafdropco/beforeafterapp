import React from "react";
import {
  Image,
  View,
  SafeAreaView,
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
import { LinearGradient } from "expo";
import ButtonSecondary from "../components/AppComponents/ButtonSecondary";

export default class AddPresentationScreen extends React.Component {
  static navigationOptions = {
    headerLeft: null,
    header:null,
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
                duration: 300,
                createdOn: new Date(),
              })
              : [
                {
                  title: this.state.title,
                  before: this.state.before,
                  after: this.state.after,
                  duration: 300,
                  createdOn:  new Date()
                }
              ]
        });
        this.props.navigation.navigate("Home")
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
      <SafeAreaView style={styles.scrollView}>
        <LinearGradient
            colors={["#05809D", "#0AC9D9"]}
            style={styles.title}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
        >
          <Text>
            <Text style={{ fontSize: 16, color: '#ffffff' }}>New </Text>
            <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold' }}>Presentation</Text>
          </Text>
        </LinearGradient>

        <View>
          <DefaultTextInput
            placeholder="Presentation Name"
            value={this.state.title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", }}
          >
            <View style={{ width: `45%`, alignItems: "center" }}>
              <ButtonSecondary title="Add Before" callback={() => this._pickImage('before', (imageUrl) => this.setState({ before: imageUrl }))} />
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
                }} />)
              }
            </View>
            <View />
            <View style={{ width: `45%`, alignItems: "center" }}>
              <ButtonSecondary title="Add After" callback={() => this._pickImage('after', (imageUrl) => this.setState({ after: imageUrl }))} />
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
              height: 150,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
                bottom: 0
            }}
          >
              <Button title="Cancel" callback={() => this.props.navigation.navigate("Home")} />
              <If condition={this.state.before != null && this.state.after != null}>
                <Button title="Save" callback={this._saveImage} />
              </If>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const If = (props) => {
    if (props.condition) {
        return (
            <View>
                {props.children}
            </View>
        )
    }
    return null
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  title: {
      paddingLeft: 25,
      paddingVertical: 10,
      width: 200,
      marginBottom: 20,
      marginLeft: -20,
  }
});
