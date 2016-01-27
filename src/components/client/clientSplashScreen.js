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

 import React, { View, StyleSheet, Text, NativeModules,
     TouchableWithoutFeedback, Image, ToastAndroid, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';
 import Button from '../ux/button';
 import EmiratesIdReader from './emiratesIdReader';
 import ClientInfo from './clientInfo';
 /**
  * Custom Class Header
  *
  * @class ClientSplashScreen
  * @extends React.Component
  */
 export default class ClientSplashScreen extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
         super(args);

         /**
          * @state
          */
          this.state = {};
      }

      /**
       * Navigate to the emirates id reader screen
       * @return {Void} undefined
       */
      moveToEmiratesIdScreen() {
          /**
           * Play the native tap sound, as it's not supported in default view component by react native
           */
          NativeModules.MediaHelper.playClickSound();
          /*
           * Navigate to new route
           */
          let route = {
              id: 'emiratesid',
              title: 'Scan Your Emirates Id',
              component: EmiratesIdReader,
              props: { isClientModule: true }
          };
          this.props.navigator.push(route);
      }

      /**
       * * Navigate to the client registration screen
       * @return {Void} undefined
       */
      moveToRegisterScreen() {
          /**
           * Play the native tap sound, as it's not supported in default view component by react native
           */
          NativeModules.MediaHelper.playClickSound();
          /*
           * Navigate to new route
           */
           let route = {
               id: 'emiratesid',
               title: 'Scan Your Emirates Id',
               component: ClientInfo,
               props: { isClientModule: true, mode: 1 }
           };
           this.props.navigator.push(route);
      }

      /**
       * Render a single button to the screen
       * @param {String} text
       * @return {View} button
       */
      renderButton(text, handler) {
          return (
              <TouchableWithoutFeedback onPress={handler} background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>{text}</Text>
                  </View>
              </TouchableWithoutFeedback>
          );
      }

      /**
       * @render
       * @return {View} view
       */
      render() {
         return (
             <View style={styles.container}>
                 <View style={styles.content}>
                     <Image source={require('../../../resources/images/logo.png')} style={{width: 400, height: 160, marginBottom: 20}} />
                     <View style={styles.notificationWrapper}>
                         <Text style={styles.notification}>Welcome to Dubai SME! Please select one of the options below...</Text>
                     </View>
                     <View style={styles.buttonContainer}>
                         <TouchableWithoutFeedback onPress={this.moveToEmiratesIdScreen.bind(this)}>
                             <View style={styles.button}>
                                 <Text style={styles.buttonText}>I have Emirates ID</Text>
                             </View>
                         </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.moveToRegisterScreen.bind(this)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>I don't have Emirates ID</Text>
                            </View>
                        </TouchableWithoutFeedback>
                     </View>
                 </View>
                 <Image source={require('../../../resources/images/dubaiskyline.png')} style={{ flex: 1, width: null}} />
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
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#FFF'
    },
    content: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center'
    },
    notificationWrapper: {
        marginTop: 20
    },
    notification: {
        fontSize: 24,
        color: '#000'
    },
    buttonContainer: {
        marginTop: 30,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#BE3828',
        padding: 10,
        marginBottom: 10,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        height: 80
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18
    }
});
//E65C63
