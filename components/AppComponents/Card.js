import React from "react";
import { View, Text } from "react-native";

export default class Card extends React.Component {
    render() {
        const { header, body } = this.props;
        return (<View style={{
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowRadius: 3,
                marginBottom: 20
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
