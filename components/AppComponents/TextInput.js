import React from "react"
import { TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
export default class DefaultTextInput extends React.Component {

    render() {
        return (<TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            {...this.props}
        />)
    }
}
const styles = StyleSheet.create({
    input: {
        color: Colors.color,
        width: `100%`,
        backgroundColor: `#fff`,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: Colors.inputBorder,
        padding: 15,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3
    }
})
