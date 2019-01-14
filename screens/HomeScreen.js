import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  AsyncStorage,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

import { Header, Card, TransitionImage } from "../components/AppComponents";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackground: <Header />,
      headerRight: (
        <View style={styles.addButton}>
          <Text
            onPress={navigation.getParam("addPresentation")}
          >
            <Ionicons
              name={Platform.OS === "ios" ? `ios-add-circle` : "md-add-circle"}
              size={36}
              color="#fff"
            />
          </Text>
        </View>
      ),
      headerMode: (navigation.state.params && navigation.state.params.shouldHide) ? "none" : "float",
    };
  };
  _getPresentations = async () => {
    const { authed, uid } = this.props.screenProps;
    if (authed && uid != null) {
      let db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true });
      db.collection("data")
        .doc(`${uid}`)
        .onSnapshot(doc => {
          if (doc.exists) {
            let data = doc.data();
            function compare(a, b) {
              return a.createdOn > b.createdOn ? -1 :
                a.createdOn < b.createdOn ?
                  1 : 0;
            }
            data.presentations.sort(compare)
            this.setState({ data: data });
          } else {
            this.setState({ data: null });
            //No such document.
          }
        });
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ shouldHide: true });
    this.props.navigation.setParams({ addPresentation: this.addPresentation });
    this._getPresentations();
  }

  render() {
    return (
    <View>
        <ScrollView
          style={{
            flex: 'grow',
            flexDirection: "column",
            paddingTop: 20,
              paddingBottom: 75,
            paddingHorizontal: 13,
              height: "100%"
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: 'wrap' }}>
            {this.state &&
              this.state.data &&
              this.state.data.presentations &&
              this.state.data.presentations.map((image, index) => {
                  {console.log(image);}
                const Header = (
                  <View style={styles.container}>
                    <Text style={styles.text} onPress={()=>this.goToViewPresentation([image.after, image.before, image.title, image.duration])}>{image.title}</Text>
                    <Text style={styles.para} onPress={()=>this.goToViewPresentation([image.after, image.before, image.title, image.duration])}>12/17/2018</Text>
                  </View>
                );
                return (
                  <Card
                    key={`Card_${index}`}
                    header={Header}
                    body={
                      <TransitionImage
                        width={Dimensions.get("window").width / 2 - 20}
                        height={Dimensions.get("window").height / 2.5}
                        images={{ before: image.before, after: image.after }}
                        duration={image.duration}
                      />
                    }
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
        </ScrollView>
        <View style={{position: "fixed", width: 75, bottom: 50, left: 0, backgroundColor: "#05809D", borderBottomRightRadius: 25, borderTopRightRadius: 25, padding: 10}}>
            <Text style={{color: "#fff"}} onPress={() => firebase.auth().signOut()}>SignOut</Text>
        </View>
      </View>

    );
  }
    addPresentation = () => {
      this.props.navigation.setParams({ shouldHide: true });
      this.props.navigation.navigate("AddPresentation");
    }
    goToViewPresentation = (pres) => {
        this.props.navigation.navigate("ViewPresentation", {data: pres})
    }
}
const styles = StyleSheet.create({
  addButton: {
      paddingRight: 10,
      paddingBottom: "10%",
      alignSelf: "flex-end"
  },
  container: {
    alignItems: "center",
      width: "100%",
      padding: 10,
      backgroundColor: "#fff",
  },
  text: {
      color: "#05809D",
      fontWeight: "bold",
  },
    para: {
        color: "#05809D",
    }
});
