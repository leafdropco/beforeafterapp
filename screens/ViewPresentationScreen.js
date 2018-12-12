import React from "react";
import {View, Text, Platform, Animated, Easing, Dimensions } from "react-native";
var {width, height} = Dimensions.get('window');

import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import "firebase/firestore";

import { TransitionImage, FullScreenPresentation } from "../components/AppComponents";

export default class ViewPresentationScreen extends React.Component{
    static navigationOptions = { header: null };


    constructor(props){
        super(props)
    }

    state = {
        uid: this.props.navigation.state.params.data,
        expAnimation: new Animated.Value(height*0.1),
        arrowAnimation: new Animated.Value(180),
        expanded: false,
        rotateValue: new Animated.Value(180)
    }


    componentDidMount() {
    }

    changePage(screen) {
        this.props.navigation.navigate(screen)
    }

    rotateAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.rotateValue, {
                toValue: 180,
                duration: 300,
                easing: Easing.linear()
            })
        ])
    }

    expandFooter() {
        if (this.state.expanded) {
            Animated.timing(this.state.expAnimation, {toValue: height*0.1, duration: 300, easing: Easing.back()}).start(() => {
                Animated.timing(this.state.rotateValue, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.linear()
                })
                this.state.expanded = false
                console.log(this.state.rotateValue)
            })
        }
        else {
            Animated.timing(this.state.expAnimation, {toValue: height*0.3, duration: 300, easing: Easing.back()}).start(() => {
                Animated.timing(this.state.rotateValue, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.linear()
                })
                this.state.expanded = true
                console.log(this.state.rotateValue)
            })
        }

    }


    render(){
        const interpolateRotateAnimation = this.state.rotateValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

     return(
         <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
             <FullScreenPresentation
                 height="100%"
                 images={{ before: this.state.uid[1], after: this.state.uid[0] }}
                 duration={this.state.uid[3]}
             />
             {console.log(this.state.expAnimation.__getValue())}
             <Animated.View style={{height: this.state.expAnimation, width: '100%', backgroundColor: '#000', position: 'absolute', bottom: 0, zIndex:999, padding: 10}}>
                 <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                     {console.log(interpolateRotateAnimation)}
                         <Text style={{paddingLeft: 20}} onPress={() => {this.changePage('Home')}}>
                            <Ionicons
                                name={Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"}
                                size={36}
                                color="#0AC9D9"
                            />
                         </Text>

                     <Text style={{color: '#0AC9D9', fontSize: 18}}>Title</Text>

                     <Animated.View style={{transform: [{rotate: interpolateRotateAnimation}]}}>
                         <Text style={{paddingRight: 20}} onPress={() => {this.expandFooter()}}>
                             <Ionicons
                                 name={Platform.OS === "ios" ? `ios-download` : "md-download"}
                                 size={36}
                                 color="#0AC9D9"
                             />
                         </Text>
                     </Animated.View>
                 </View>
             </Animated.View>
         </View>
     );
    }

}
