
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default class Button extends React.Component {
    render() {
        return (<View style={styles.button}>
            <Text
                style={{ color: "#fff", textAlign: "center", padding: 15 }}
                onPress={this.props.callback}>
                {this.props.title}
            </Text>
        </View>)
    }
}
const styles = StyleSheet.create({
    button: {
        color: Colors.inputBorder,
        backgroundColor: `#0AC7D7`,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: Colors.inputBorder,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3
    }
});
