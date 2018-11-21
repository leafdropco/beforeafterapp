import React from "react";
import { View, Text } from "react-native";

export default class Card extends React.Component {
    render() {
        const { header, body } = this.props;
        return (<View style={{
            borderColor: '#000',
            borderWidth: 2,
        }}>
            <View>
                {header}
            </View>
            <View>
                {body}
            </View>
        </View>)
    }
}