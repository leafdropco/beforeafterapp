import React from "react";
import { View, Text } from "react-native";

export default class Card extends React.Component {
    render() {
        const { header, body } = this.props;
        return (<View style={{
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
        }}>
            <View>
                <View>
                    {header}
                </View>
                <View>
                    {body}
                </View>
            </View>
        </View>
        )
    }
}