import React from "react";
import { ScrollView, Text, View } from "react-native";

import { LinearGradient } from "expo";

import { Card } from "../components/AppComponents";
import { Button } from "react-native-paper";

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
        <Button onPress={navigation.getParam("addPresentation")} title="+" />
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
        <View style={{ display: "flex" }}>
          {beforeAfter.map((image, index) => {
            const Header = (
              <View style={{ display: "flex" }}>
                <View>
                  <Text style={{ color: "#37809A", fontWeight: "bold" }}>
                    {image.title}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#37809A" }}>{image.createdOn}</Text>
                </View>
              </View>
            );
            return (
              <Card
                key={`Card_${index}`}
                header={Header}
                body={<Text>Body</Text>}
                callback={() => null}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
  addPresentation = () => this.props.navigation.navigate("AddPresentation");
}
