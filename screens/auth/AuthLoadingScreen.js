import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import ApiKeys from "../../constants/ApiKeys";
import * as firebase from "firebase";
import {requestCameraRoll} from "../../helpers/permissions"


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false
    };
    requestCameraRoll();

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    console.log(
      "=========AUTH CHANGED====================", user)
    
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
    
    this.props.navigation.navigate(this.state.isAuthenticated ? "App" : "Auth");
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
