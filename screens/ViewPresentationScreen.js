import React from "react";
import {View, Text, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import "firebase/firestore";

import { TransitionImage, FullScreenPresentation } from "../components/AppComponents";

export default class ViewPresentationScreen extends React.Component{
    static navigationOptions = { header: null };

    constructor(props){
        super(props)
        this.state = {
            uid: this.props.navigation.state.params.data
        }
    }


    componentDidMount() {
        console.log(this.props.navigation.state.params.data)
        //this.setState({uid: this.props.navigation.state.params.data})
    }

    changePage(screen) {
        this.props.navigation.navigate(screen)
        console.log(screen)
    }

    render(){
     return(
         <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
             <FullScreenPresentation
                 height="100%"
                 images={{ before: this.state.uid[1], after: this.state.uid[0] }}
                 duration={this.state.uid[3]}
             />

             <View style={{height: '10%', width: '100%', backgroundColor: '#000', position: 'absolute', bottom: 0, zIndex:999, padding: 10}}>
                 <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                     <Text style={{paddingLeft: 20}} onPress={() => {this.changePage('HomeScreen')}}>
                         <Ionicons
                             name={Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"}
                             size={36}
                             color="#0AC9D9"
                         />
                     </Text>
                     <Text style={{color: '#0AC9D9', fontSize: 18}}>Title</Text>
                     <Text style={{paddingRight: 20}}>
                         <Ionicons
                             name={Platform.OS === "ios" ? `ios-download` : "md-download"}
                             size={36}
                             color="#0AC9D9"
                         />
                     </Text>
                 </View>
             </View>
         </View>
     );
    }

}
