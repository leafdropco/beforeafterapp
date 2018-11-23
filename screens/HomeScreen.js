import React from "react";
import { ScrollView, Text, View, StyleSheet, Dimensions, Platform, AsyncStorage } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";

import { Header, Card, TransitionImage } from "../components/AppComponents";

export default class HomeScreen extends React.Component {
  state = {
    uid: null,
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackground: (
        <Header />
      ),
      headerRight: (
        <View style={styles.addButton}>
          <Text style={styles.plus} onPress={navigation.getParam("addPresentation")}>
            <Ionicons
              name={Platform.OS === 'ios' ? `ios-add` : 'md-add'}
              size={28}
              color='#fff'
            />
          </Text>
        </View>
      )
    };
  };
  _retrieveUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        this.setState({ uid: value })
        let db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true })
        db.collection('data').doc(`${value}`).onSnapshot((doc) => {
          if (doc.exists) {
            let data = doc.data();
            this.setState({ data: data });
            console.log("Document data:", data);
          } else {
            this.setState({ data: null });
            console.log("No such document!");
          }
        }).catch(function (error) {
          this.setState({ data: null });
          console.log("Error getting document:", error);
        });
      }
    } catch (error) {
      console.log("There was an error")
      // Error retrieving data
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ addPresentation: this.addPresentation });
    this._retrieveUserId()
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          paddingVertical: 50,
          paddingHorizontal: 10
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.state && this.state.data &&
            this.state.data.presentations &&
            this.state.data.presentations.map((image, index) => {
              const Header = (
                <View style={styles.container}>
                  <Text style={styles.text}>{image.title}</Text>
                </View>
              );
              return (
                <Card
                  key={`Card_${index}`}
                  header={Header}
                  body={<TransitionImage
                    width={(Dimensions.get('window').width / 2) - 20}
                    height={Dimensions.get('window').height / 2.5}
                    images={{ before: image.before, after: image.after }} duration={image.duration} />}
                  callback={() => null}
                />
              );
            })}
          {this.state && this.state.data == null && (
            <View>
              <Text>Looks like you don't have any presentations...</Text>
              <Text>Click the plus button to get started</Text>
            </View>
          )}
        </View>
        <View><Text onPress={() => firebase.auth().signOut()}>SignOut</Text></View>
      </ScrollView>
    );
  }
  addPresentation = () => this.props.navigation.navigate("AddPresentation");
}
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#37809A',
    color: '#ffffff',
    marginRight: 20,
    borderColor: '#82C3D1',
    borderWidth: 2,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  plus: {
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 34,
    width: 35,
    height: 35,
    textAlign: 'center',
    alignSelf: "center"
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  }
})