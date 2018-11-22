import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
import { LinearGradient } from "expo";

import Colors from "../../constants/Colors";

export default class LoginScreen extends React.Component {
  static navigationOptions ={
    headerMode: 'none',
      headerTransitionPreset:'fade-in-place',
      title:'test'
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    if (this.props.screenProps.isAuthenticated) {
      this.props.navigation.navigate('App')
    }

  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };
  render() {
    return (
      <View
        style={{
          height: `100%`,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white"
        }}
      >
        <View style={{ height: `30%` }}>
          <LinearGradient
            colors={["#05809D", "#0AC9D9"]}
            style={{ width: `100%`, height: `100%`, alignItems: "center" }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Text
              style={{
                color: "white",
                paddingTop: `25%`,
                fontSize: 24,
                marginBottom: 24
              }}
            >
              <Text>before /</Text>
              <Text style={{ fontWeight: "bold" }}>/ After</Text>
            </Text>
            <View style={{ flexGrow: 1 }} />
            <View
              style={{ marginLeft: 20, marginRight: 20, flexDirection: "row", width: "100%", justifyContent: 'space-between' }}
            >
              <View
                style={{
                  padding: 20,
                  textAlign: "center",
                  borderBottomColor: "#fff",
                  borderBottomWidth: 2
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Sign In
                </Text>
              </View>
              <View style={{ textAlign: "center" }}>
                <Text
                  style={{ padding: 20, color: "#fff" }}
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  New Account
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{ padding: 20, paddingTop: 40, flex: 1, alignItems: "center" }}
        >
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={text => {
              this.setState({ email: text });
            }}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.button}>
            <Text
              style={{ color: "#0AC9D9", textAlign: "center", padding: 15 }}
              onPress={this.onLoginPress}
            >
              Sign In
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text
              style={{ color: "#0AC9D9", textAlign: "center", padding: 10 }}
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            >
              Forgot Password?
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    color: Colors.inputBorder,
    width: `100%`,
    backgroundColor: `#fff`,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: Colors.inputBorder,
    padding: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  button: {
    width: 110,
    color: Colors.inputBorder,
    backgroundColor: `#fff`,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: Colors.inputBorder,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3
  }
});
