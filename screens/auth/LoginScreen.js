import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo';

import Colors from '../../constants/Colors';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => { },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  onCreateAccountPress = () => {
    var navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Signup' })],
    });
    this.props.navigation.dispatch(navActions);
  };

  onForgotPasswordPress = () => {
    var navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ForgotPassword' })],
    });
    this.props.navigation.dispatch(navActions);
  };

  render() {
    return (
      <View style={{ height: `100%`, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <View style={{ height: `40%` }}>
          <LinearGradient
            colors={['#4B8E97', '#A3ECF5']}
            style={{ width: `100%`, height: `100%`, alignItems: 'center' }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={{ color: 'white', paddingTop: `10%`, fontSize: 20 }}><Text>before /</Text><Text style={{ fontWeight: 'bold' }}>/ After</Text></Text>
            <View style={{ display: 'flex', justifyContent: 'space-between', }}>
              <View>
                <Text style={{}}>Sign up</Text>
              </View>
              <View>
                <Text>Sign In</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ padding: 20, }}>
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

          <View style={{ paddingTop: 10 }} />

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

          <Button style={styles.button} title="Login" onPress={this.onLoginPress} />
          <Button title="Create account..." onPress={this.onCreateAccountPress} />
          <Button
            title="Forgot Password..."
            onPress={this.onForgotPasswordPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    color: Colors.inputBorder,
    width: `100%`,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.inputBorder,
    padding: 20
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.inputBorder,
    padding: 20
  }
});
