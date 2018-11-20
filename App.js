import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import MainTabNavigator from './navigation/MainTabNavigator';
import ApiKeys from './constants/ApiKeys';
import {requestCameraRoll} from "./helpers/permissions";

import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };
    requestCameraRoll();
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
    if (user && user.uid) this.setState({ uid: user.uid });
  };

  render() {
    if (
      (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) &&
      !this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && (
            <View style={styles.statusBarUnderlay} />
          )}
          {this.state.isAuthenticated ? (
            <MainTabNavigator uid={this.state.uid} />
          ) : (
            <RootNavigation />
          )}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () =>
    Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
      }),
    ]);

  _handleLoadingError = error => console.warn(error);

  _handleFinishLoading = () => this.setState({ isLoadingComplete: true });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
