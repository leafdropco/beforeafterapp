import React from "react";
import {
  ActivityIndicator,
  View
} from "react-native";


export default class AuthLoadingScreen extends React.Component {
  constructor(props){
    super(props);
    if(this.props.screenProps.authed !=null){
      this.props.navigation.navigate(this.props.screenProps.authed? 'App' : 'Auth')
    }
  }
  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
      </View>
    );
  }
}
