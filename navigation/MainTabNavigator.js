import React from "react";
import { createStackNavigator } from "react-navigation";

import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import PresentationScreen from "../screens/PresentationScreen";

export default createStackNavigator({
  Home: HomeScreen,
  AddPresentation: PresentationScreen,
  Profile: ProfileScreen
});
