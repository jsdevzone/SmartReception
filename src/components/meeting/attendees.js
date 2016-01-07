'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Copyright (C) E-Gov LLC, Dubai, UAE - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
 import React, { View, StyleSheet, Text,
     TouchableNativeFeedback, ToastAndroid, Image, ScrollView, NativeModules, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';

 import LoadMask from '../app/loadMask';
 import AppStore from '../../stores/appStore';

 /**
  * Custom Class Header
  *
  * @class Attendees
  * @extends React.Component
  */
  export default class Attendees extends React.Component {
      /**
       * @constructor
       */
      constructor(args) {
         super(args);

         /**
          * @state
          */
          this.state = {
              attendees: new Array(),
              isLoading: true
          };
      }

      /**
       * @lifecycle
       * @componentDidMount
       * @return {Void} undefined
       */
      componentDidMount() {
          /**
           * Get the attendees list and set the state on response
           */
          AppStore.getAttendees(this.props.meeting).then(json => this.setState({ attendees: json, isLoading: false }));
      }

      /**
       * @render
       * @return {View} view
       */
      render() {
          let component = (<LoadMask />);
          /**
           * If the data is not loading show the data
           */
          if(!this.state.isLoading)
            component = (
                <ScrollView style={{flex:1, backgroundColor: '#F4F4F4'}}>
                    <View style={styles.container}>
                        { this.state.attendees.map(item =>{ return(<Attendee participant={item} />)}) }
                    </View>
                </ScrollView>
            );
          return component;
      }
  }

/**
 * Custom Class Header
 *
 * @class Attendee
 * @extends React.Component
 */
 class Attendee extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
        super(args);

        /**
         * @state
         */
         this.state = {
             isJoined: false
         };
     }

     /**
      * @eventhandler
      * @return {Void} undefined
      */
     joinMeeting() {
         /**
          * Play the native tap sound, as it's not supported in default view component by react native
          */
         NativeModules.MediaHelper.playClickSound();
         /**
          * Change the state
          */
         this.setState({ isJoined: !this.state.isJoined });
         /**
          * Update the server
          */
          AppStore.joinAttendees(this.props.participant);
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         let icon = this.state.isJoined ?  "stop" : "play";
         let color = { backgroundColor: 'rgb(59, 89, 152)'};

         if(this.state.isJoined)
            color = { backgroundColor: 'rgb(224, 47, 47)', paddingLeft: 5 };

         return (
             <View style={styles.attendee} >
                 <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                     <Image  source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}} style={styles.attendeeImage} />
                     <Text style={styles.profileName}>{this.props.participant.User.FirstName + " " + this.props.participant.User.LastName }</Text>
                     <Text style={styles.position}>Advisor</Text>
                 </View>
                 <View style={styles.buttons}>
                    <TouchableNativeFeedback onPress={this.joinMeeting.bind(this)}>
                        <View style={[styles.btn, color]}>
                            <Icon name={icon} size={19} style={{ color: '#FFF'}} />
                        </View>
                    </TouchableNativeFeedback>
                 </View>
             </View>
         );
     }
 }

 /**
  * @style
  */
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#F4F4F4',
         flexDirection: 'row',
         flexWrap : 'wrap',
         alignItems: 'center'
     },
     attendee: {
         backgroundColor: '#FFF',
         margin: 10,
         alignItems: 'stretch',
         padding: 10,
         width: 200,
         borderColor: '#EEE',
         borderWidth: 1
     },
     attendeeImage: {
         width: 100,
         height: 100,
         borderRadius: 50
     },
     buttons: {
         flexDirection: 'row',
         marginTop: 5,
         padding: 10,
         alignItems: 'center',
         justifyContent: 'center'
     },
     profileName: {
         color: '#000',
         fontSize: 20,
         marginTop: 10
     },
     position: {
         color: '#CCC',
         fontSize: 15
     },
     btn: {
         marginLeft: 10,
         width: 40,
         height: 40,
         borderRadius: 20,
         backgroundColor: 'rgb(59, 89, 152)',
         alignItems: 'center',
         justifyContent: 'center',
         paddingLeft: 8
     },
     stopBtn: {
         marginLeft: 10,
         width: 40,
         height: 40,
         borderRadius: 20,
         backgroundColor: 'rgb(224, 47, 47)',
         alignItems: 'center',
         justifyContent: 'center',
         paddingLeft: 5
     }
 });
