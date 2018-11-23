import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo";
export default class Header extends React.Component {
    render() {
        return (
            <LinearGradient
                colors={["#05809D", "#0AC9D9"]}
                style={{ width: `100%`, height: `100%` }}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{
                    marginLeft: 10, flexDirection: 'column', height: `100%`, justifyContent: 'center'
                }}>
                    <Text>
                        <Text style={{ fontSize: 20, color: '#ffffff' }}>Before /</Text>
                        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>/ After</Text>
                    </Text>
                </View>
            </LinearGradient>
        )
    }
}