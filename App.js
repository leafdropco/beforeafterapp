import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from "./navigation/RootNavigation";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { requestCameraRoll } from "./helpers/permissions";
import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase"
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: null
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
      }),
    ]);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  };
  
  render() {
    const T = createAppContainer(
      createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: MainTabNavigator,
          Auth: RootNavigation
        },
        {
          initialRouteName: "AuthLoading",
        }
      )
    );
    return <T screenProps={{authed: this.state.isAuthenticated}}/>; 
  }
}