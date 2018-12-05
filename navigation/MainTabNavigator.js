import { createStackNavigator } from "react-navigation";

import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import AddPresentationScreen from "../screens/AddPresentationScreen";
import ViewPresentationScreen from "../screens/ViewPresentationScreen";
export default createStackNavigator({
  Home: HomeScreen,
  AddPresentation: AddPresentationScreen,
  ViewPresentation: ViewPresentationScreen,
  Profile: ProfileScreen
});
