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
      TouchableNativeFeedback, TouchableWithoutFeedback, TouchableHighlight,
      Image, ToastAndroid, } from 'react-native';
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

      moveToEmiratesIdScreen() {
          this.props.navigator.push({ id: 'emiratesid',
              title: 'Scan Your Emirates Id ',
              component: EmiratesIdReader, props: {
                  isClientModule: true
              }});
      }

      moveToRegisterScreen() {
          this.props.navigator.push({ id: 'tes',
              title: 'Scan Your Emirates Id ',
              component: ClientInfo, props: {
                  isClientModule: true,
                  mode: 1
              }});
      }

      /**
       * Render a single button to the screen
       * @param {String} text
       * @return {View} button
       */
      renderButton(text, handler) {
          return (
              <TouchableNativeFeedback onPress={handler} background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>{text}</Text>
                  </View>
              </TouchableNativeFeedback>
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
                        <TouchableHighlight onPress={this.moveToRegisterScreen.bind(this)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>I don't have Emirates ID</Text>
                            </View>
                        </TouchableHighlight>
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
        alignItems: 'center',
        paddingTop: 30
    },
    notificationWrapper: {
        marginTop: 60
    },
    notification: {
        fontSize: 24,
        color: '#000'
    },
    buttonContainer: {
        marginTop: 30
    },
    button: {
        backgroundColor: '#BE3828',
        padding: 10,
        marginBottom: 10,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18
    }
});
//E65C63
