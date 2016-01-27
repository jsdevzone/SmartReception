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
 import React, { View, StyleSheet, Text,  NativeModules,
     TouchableWithoutFeedback, Image, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';
 import ClientInfo from './clientInfo';
 /**
  * When client press I have emirates id button from the home screen this screen will be displayed.
  *
  * @class EmiratesIdReader
  * @extends React.Component
  */
  export default class EmiratesIdReader extends React.Component {
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
       * Moves the navigator to the client info edit screen.
       * @return {Void} undefined
       */
      moveToClientScreen() {
          let route = {
              id: 'emiratesid',
              title: 'Scan Your Emirates Id ',
              component: ClientInfo,
              props: { isClientModule: true }
          };
          this.props.navigator.push(route);
      }

      /**
       * Reads the emirates id data from the usb terminal
       * @return {Void} undefined
       */
      readEmiratesIdData() {
          /**
           * Play the native tap sound, as it's not supported in default view component by react native
           */
          NativeModules.MediaHelper.playClickSound();

          /**
           * Read the emirates id data
           */
          NativeModules.MediaHelper.readEmiratesIdData(content => {
              let client = JSON.parse(content);
              let route = {
                  id: 'emiratesid',
                  title: 'Scan Your Emirates Id ',
                  component: ClientInfo,
                  props: {
                      isClientModule: true,
                      client: client,
                      navigator: this.props.navigator
                  }
              };
              this.props.navigator.push(route);
          });

      }


      /**
       * Render a single button to the screen
       * @param {String} text
       * @return {View} button
       */
      renderButton(text) {
          return (
              <TouchableWithoutFeedback onPress={this.readEmiratesIdData.bind(this)}>
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
                      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                          <Image source={require('../../../resources/images/logo.png')} style={{width: 400, height: 160, marginBottom: 20}} />
                      </View>
                      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                          <View style={styles.widget}>
                              <View style={styles.widgetHeader}>
                                <Text style={styles.headerText}>Emirates ID Reader</Text>
                              </View>
                              <View style={styles.widgetBody}>
                                  <Text style={{ fontSize: 15, color: '#2F2F2F' }}>Please insert your Emirates ID into the card reader as shown below</Text>
                                  <Image source={require('../../../resources/images/IdReader.png')} style={{ marginTop: 20, marginBottom: 20 }} />
                              </View>
                              <View style={styles.widgetFooter}>
                                 {this.renderButton('Continue....')}
                              </View>
                          </View>
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
          backgroundColor: '#FFF',
          paddingTop: 50
      },
      content: {
          flex: 1,
          alignItems: 'center',
          padding: 20,
          flexDirection: 'row'
      },
      widget: {
          borderColor: '#BE3828',
          borderWidth: 1,
          width: 350
      },
      widgetHeader: {
          backgroundColor: '#BE3828',
          padding: 10
      },
      headerText: {
          color: '#FFF'
      },
      widgetBody: {
          padding: 10,
          alignItems: 'center'
      },
      widgetFooter: {
          alignItems: 'flex-end',
          padding: 10
      },
      button: {
          backgroundColor: '#BE3828',
          padding: 8,
          marginBottom: 10,
          width: 150,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center'
      },
      buttonText: {
          color: '#FFF',
          fontSize: 16
      }
  });
