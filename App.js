import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import RootNavigation from "./navigation/RootNavigation";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { requestCameraRoll } from "./helpers/permissions";
import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      Auth: RootNavigation
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
