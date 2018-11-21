import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

import { LinearGradient } from 'expo';

import Colors from '../../constants/Colors';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert('Passwords do not match');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          const ref = firebase.database().ref();
          var usersRef = ref.child('users');
          var userRef = usersRef.push({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            yomiName: `${this.state.firstName} ${this.state.lastName}`,
            email: this.state.email,
            isDonor: false,
          });
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  render() {

    return (
      <View style={{ height: `100%`, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <View style={{ height: `30%` }}>
        <LinearGradient
          colors={['#05809D', '#0AC9D9']}
          style={{ width: `100%`, height: `100%`, alignItems: 'center' }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
        <Text style={{ color: 'white', paddingTop: `25%`, fontSize: 24, marginBottom: 24 }}><Text>before /</Text><Text style={{ fontWeight: 'bold' }}>/ After</Text></Text>
          <View style={{display: 'flex', flexGrow: 1}}></View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
            <View style={{textAlign: 'center'}}>
              <Text style={{padding: 20, color: '#fff'}} onPress={()=> this.props.navigation.navigate("Login")}>Sign In</Text>
            </View>
            <View style={{padding: 20, textAlign: 'center', borderBottomColor: '#fff', borderBottomWidth: 2}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>New Account</Text>
            </View>
          </View>
          </LinearGradient>
          </View>
          <View style={{ padding: 20, paddingTop: 40, flex:1, alignItems:'center' }}>
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

            <TextInput style={styles.input}
              value={this.state.password}
              onChangeText={text => {
                this.setState({ password: text });
              }}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
            style={styles.input}
            value={this.state.passwordConfirm}
            onChangeText={text => {
              this.setState({ passwordConfirm: text });
            }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            />

            <TextInput style={styles.input}
            value={this.state.firstName}
            onChangeText={text => {
              this.setState({ firstName: text });
            }}
            placeholder="First Name"
            autoCapitalize="words"
            autoCorrect={true}
            />

            <TextInput style={styles.input}
            value={this.state.lastName}
            onChangeText={text => {
              this.setState({ lastName: text });
            }}
            placeholder="Last Name"
            autoCapitalize="words"
            autoCorrect={true}
            />



          <View style={styles.button} onPress={this.onSignupPress}>
            <Text style={{color: '#0AC9D9', textAlign: 'center'}} onPress={this.onSignupPress}>Sign Up</Text>
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
    shadowRadius: 3,
  },
  button: {
    width: 110,
    color: Colors.inputBorder,
    backgroundColor: `#fff`,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: Colors.inputBorder,
    padding: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});
