import React from "react";
import { ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";

import { LinearGradient } from "expo";

import { Card, TransitionImage } from "../components/AppComponents";
import { Button } from "react-native-paper";
import * as firebase from "firebase";
const beforeAfter = [
  {
    title: "Air in my Hair, I just don't care",
    before:
      "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae4520846654cd8e84b23/1509614691763/OliviaBossertPhotography+%28108+of+191%29.jpg?format=1500w",
    after:
      "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae46b24a694220a87bccc/1509614716315/OliviaBossertPhotography+%281+of+1%29.jpg?format=1500w",
    duration: 3000,
    createdOn: "10/11/18"
  },
  {
    title: "Air in my Hair, I just don't care",
    before:
      "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae4520846654cd8e84b23/1509614691763/OliviaBossertPhotography+%28108+of+191%29.jpg?format=1500w",
    after:
      "https://static1.squarespace.com/static/585174d6893fc0a6ea9567ab/t/59fae46b24a694220a87bccc/1509614716315/OliviaBossertPhotography+%281+of+1%29.jpg?format=1500w",
    duration: 3000,
    createdOn: "10/11/18"
  }
];
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackground: (
        <LinearGradient
          colors={["#05809D", "#0AC9D9"]}
          style={{ width: `100%`, height: `100%`, alignItems: "center" }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        />
      ),
      headerRight: (
        <View style={styles.addButton}><Text style={styles.plus} onPress={navigation.getParam("addPresentation")}>+</Text></View>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ addPresentation: this.addPresentation });
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
        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          {beforeAfter.map((image, index) => {
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
                  width={(Dimensions.get('window').width/ 2)-20} 
                  height={Dimensions.get('window').height /2.5} 
                  images={{ before: image.before, after: image.after }} duration={image.duration} />}
                callback={() => null}
              />
            );
          })}
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
    alignItems: 'center',
  },
  plus: {
    color: '#ffffff',
    lineHeight: 35,
    fontSize: 30,
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