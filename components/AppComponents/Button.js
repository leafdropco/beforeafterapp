
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default class Button extends React.Component {
    render() {
        return (<View style={styles.button}>
            <Text
                style={{ color: "#0AC9D9", textAlign: "center", padding: 15 }}
                onPress={this.props.callback}>
                {this.props.title}
            </Text>
        </View>)
    }
}
const styles = StyleSheet.create({
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
