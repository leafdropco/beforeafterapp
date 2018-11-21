import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "./../screens/auth/LoginScreen";
import SignupScreen from "./../screens/auth/SignupScreen";
import ForgotPasswordScreen from "./../screens/auth/ForgotPasswordScreen";

export default createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen
});
