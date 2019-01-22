import React from "react";
import {View, Text, Platform, Animated, Easing, Dimensions, Switch, Picker, Modal, TouchableOpacity } from "react-native";
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
        ticketCount: 1,
        ticketModalVisible: false,
        feedbackModalVisible: false,
        cart: 0,
        switchValues: [
            { name: 'Watermark', value: true, lockedForNonVip: true },
            {
                name: 'Show "Before & After" Titles',
                value: true,
                lockedForNonVip: false,
            },
            { name: 'Show Presentation Title', value: false, lockedForNonVip: true },
            { name: 'Export in 4k', value: false, lockedForNonVip: true },
        ],
        isVip: false,
        purchased: false
    };

    changePage(screen) {
        this.props.navigation.navigate(screen)
    }
    checkCart() {
        if(this.state.WaterMark === true && this.state.BATitlesValue === false && this.state.HqValue === false && this.state.TitleValue === false, this.state.TransitionValue === "fade") {
            this.setState({cart: false})
            //console.log("Cart State f: " + this.state.cart)
        }
        else this.setState({cart: true})// , console.log("Cart State t: " + this.state.cart)
    }
    updateCart(val) {

        if (val) {
            console.log("updateCart hit if true")
            const newCart = this.state.cart + 1
            this.setState({cart: newCart})
            console.log(this.state.cart)
        }
        else {
            console.log("updateCart hit else false")
            const newCart = this.state.cart - 1
            this.setState({cart: newCart})
        }console.log("new cart: " + this.state.cart)
    }
    expandFooter() {
        console.log("foot cart: " + this.state.cart)
        if (this.state.expanded) {
            Animated.timing(this.state.expAnimation, {toValue: height*0.1, duration: 300, easing: Easing.back()}).start(() => {
                this.setState({expanded: false})
            })
        }
        else {
            Animated.timing(this.state.expAnimation, {toValue: height*0.6, duration: 300, easing: Easing.back()}).start(() => {
                this.setState({expanded: true})
            })
        }
    }
    validateSave() {
        let saveConfig = {Watermark: this.state.WaterMark, TitleValue: this.state.TitleValue, BATitlesValue: this.state.BATitlesValue, HqValue: this.state.HqValue, TransitionValue: this.state.TransitionValue};
        // console.log(saveConfig)

        // Set state of cart then check if true && has tickets
        this.checkCart()

        if(this.state.cart){
            console.log("You're Ticket Count!")
            this.expandFooter()
            this.save(saveConfig)
            // Subtract Ticket
            let newTicketCount = (this.state.ticketCount -1)
            this.setState({ticketCount: newTicketCount});
        }
        else if(this.state.cart === false){
            this.expandFooter()
            this.save(saveConfig)
        }

        else this.showTicketModal()
    }
    save(config) {
        // SAVE LOGIC HERE...



        // Show save feedback if successful
        this.setState({feedbackModalVisible: true});
        setTimeout(() => {this.setState({feedbackModalVisible: false})}, 2000)
    }
    showTicketModal(visible) {
        this.setState({ticketModalVisible: visible});
    }

    updateSwitches(value, index, lockedForNonVip) {
        //check to see if user is VIP:
        const { isVip, switchValues } = this.state;

        if (lockedForNonVip && isVip) {
            let stateCopy = (Object.assign({}, switchValues)[index].value = !value);
            this.setState({ stateCopy });
        }
        if (!lockedForNonVip) {
            let stateCopy = (Object.assign({}, switchValues)[index].value = !value);
            this.setState({ stateCopy });
        }
    }


    render(){
        // Component gets rendered when footer is NOT expanded
        const ExpComponent = () => (
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{paddingLeft: 20}} onPress={() => {this.changePage('Home')}}>
                    <Ionicons
                        name={Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"}
                        size={36}
                        color="#0AC9D9"
                    />
                </Text>
                <Text style={{color: '#0AC9D9', fontSize: 18}}>My Presentation</Text>
                <Animated.View>
                    <Text style={{paddingRight: 20}} onPress={() => {this.expandFooter()}}>
                        <Ionicons
                            name={Platform.OS === "ios" ? `ios-download` : "md-download"}
                            size={36}
                            color="#0AC9D9" />
                    </Text>
                </Animated.View>
            </View>
        );

        // Component gets rendered when footer IS expanded
        const SaveComponent = () => (
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {this.expandFooter()}} style={{marginLeft: 20, marginTop: 20, borderColor: "#0AC9D9", borderWidth: 2}}>
                    <Text style={{padding: 6, color: "#0AC9D9", fontSize: 16}}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.expandFooter()}} style={{marginTop: 20}}>
                    <Text style={{padding: 6, color: "#0AC9D9", fontSize: 16, fontWeight: "bold"}}>
                        Credits: {this.state.cart > 0 ? this.state.cart : "Get More"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.validateSave()}} style={{flexDirection: "row", alignItems: "center", marginRight: 20, marginTop: 20, backgroundColor: "#0AC9D9", paddingHorizontal: 10, paddingVertical: 8,}}>
                    <Text style={{color: "#fff", fontSize: 16}}>
                        Save
                    </Text>
                    <Ionicons
                        name={Platform.OS === "ios" ? `ios-download` : "md-download"}
                        size={20}
                        color="#fff"
                        style={{marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        );

        // Displays Vip icon
        const VipIcon = () => (
            <TouchableOpacity style={{padding: 4, borderColor: "#0AC9D9", borderWidth: 1, marginLeft: 10}}>
                <Text style={{color: "#0AC9D9", fontSize: 10, fontWeight: "bold"}}>Locked</Text>
            </TouchableOpacity>
        );

         return(
             <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                 <Modal
                     animationType="slide"
                     transparent={false}
                     visible={this.state.ticketModalVisible}
                     onRequestClose={() => {
                         Alert.alert('Modal has been closed.');
                     }}>
                     <View style={{backgroundColor: "#1b1b1b", height: height, paddingTop: 50}}>
                         <TouchableOpacity style={{flexDirection: "row", paddingHorizontal: 20}} onPress={() => {
                             this.showTicketModal(!this.state.ticketModalVisible)}}>
                             <Ionicons
                                 name={Platform.OS === "ios" ? `ios-close` : "md-close"}
                                 size={55}
                                 color="#fff"
                                 style={{marginLeft: 10}}/>
                         </TouchableOpacity>
                         <View>
                             { // iterates through switch values
                                 this.state.switchValues.map((item, index, key) => (
                                     <View style={{borderBottomColor: "#d0f4f7", borderBottomWidth: 2, flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingBottom: 15, marginTop:45, width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                                         <View style={{flexDirection: 'row'}}>
                                             <Text style={{color: '#0AC9D9', fontSize: 18}}>
                                                 {item.name}
                                             </Text>
                                             {item.lockedForNonVip && <VipIcon/>}
                                         </View>
                                         <Switch
                                             onValueChange={() => {this.updateSwitches(item.value, index, item.lockedForNonVip), console.log()}}
                                             value={item.value} disabled={item.lockedForNonVip && !this.state.isVip} />
                                     </View>
                                 ))
                             }

                             <Text onPress={() => {
                                 this.showTicketModal(!this.state.ticketModalVisible);
                             }} style={{color: "#fff"}}>Hide Modal</Text>
                         </View>
                     </View>
                 </Modal>

                 <Modal
                     animationType="fade"
                     transparent={true}
                     visible={this.state.feedbackModalVisible}>
                     <View style={{backgroundColor: "rgba(0, 0, 0, 0.2)", height: height, paddingTop: 50, alignItems: "center", justifyContent: "center"}}>
                         <TouchableOpacity style={{width: 250, height: 100, backgroundColor: "#0AC9D9", borderRadius: 25, padding: 20, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: "#fff", fontSize: 20}}>Saved!</Text>
                         </TouchableOpacity>
                     </View>
                 </Modal>

                 <FullScreenPresentation
                     height="100%"
                     images={{ before: this.state.uid[1], after: this.state.uid[0] }}
                     duration={this.state.uid[3]}
                 />
                 <Animated.View style={{height: this.state.expAnimation, width: '100%', backgroundColor: '#fff', position: 'absolute', bottom: 0, zIndex:999, padding: 10}}>

                     { // Shows/hides save controls
                         this.state.expanded ? <SaveComponent /> : <ExpComponent />
                     }

                 </Animated.View>
             </View>
         );
        }

}
