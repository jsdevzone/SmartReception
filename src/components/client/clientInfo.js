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
 import React, { View, StyleSheet, Text,  TouchableHighlight, ToastAndroid, Image, TextInput, NativeModules, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';
 import Moment from 'moment';

 import ClientSplashScreen from './clientSplashScreen';
 import ClientStore from '../../stores/clientStore';

 /**
  * Displays the client information.
  *
  * @class ClientInfo
  * @extends React.Component
  */
  export default class ClientInfo extends React.Component {
      /**
       * @constructor
       */
      constructor(args) {
         super(args);

         /**
          * @state
          */
          this.state = {
              client: {
                  FirstName: 'First',
                  LastName: 'Last',
                  Position: 'Your Position'
              },
              meeting: {},
              employee: {},
              hasMeeting: false
          };
      }

      componentDidMount() {
         if(this.props.mode != 1) {
             let identity = "1";
              this.setState({ client: {FirstName: ''} });
             ClientStore.getByIdentity(identity).then(json => {
                 let client = json;
                 client.CompanyName = json.Companies.Name;
                 this.setState({ client: client });

                 ClientStore.getClientMeetingWithEmployee(identity).then(data => {
                     if(data) {
                         this.setState({ meeting: data.BookedMeetings, employee: data.Employee, hasMeeting: true });
                     }
                 });

             });
         }

      }

      /**
       * Generic function to handle the text field value property change event
       *
       * @eventhandler
       * @param {String} property - key in the state user
       * @param {String} value - value to be changed
       * @return {Void} undefined
       */
      onFieldEdit(property, value) {
          let client = this.state.client;
          client[property] = value;
          this.setState({ client: client });
      }

      onProceedClick() {
           if(this.props.mode == 1) {
               NativeModules.DialogAndroid.showProgressDialog();
               ClientStore.registerClientTemporary(this.state.client).then(() => {
                   NativeModules.DialogAndroid.hideProgressDialog();
                   var dialog = new DialogAndroid();
                   dialog.set({
                            title: 'Thank you for using SME Service',
                            content: 'Please move to the receptionist for further details.',
                            positiveText: 'OK',
                            onPositive : () => {
                                this.props.navigator.push({
                                   title:'Client Home' ,
                                   component: ClientSplashScreen,
                                   props: {
                                       isClientModule: true
                                   }
                                });
                            }
                  });
                   dialog.show();


               })
           }
           else {
               NativeModules.DialogAndroid.showProgressDialog();
               ClientStore.loginClient(this.state.client.ClientId).then(json => {
                   NativeModules.DialogAndroid.hideProgressDialog();
                   var dialog = new DialogAndroid();
                   dialog.set({
                            title: 'Thank you for using SME Service',
                            content: 'The DA will come to you shortly, Please wait on the recption. Thank you',
                            positiveText: 'OK',
                            onPositive : () => {
                                this.props.navigator.push({
                                   title:'Client Home' ,
                                   component: ClientSplashScreen,
                                   props: {
                                       isClientModule: true
                                   }
                                });
                            }
    });
                   dialog.show();
               });
           }
      }

      /**
       * Render a single button to the screen
       * @param {String} text
       * @return {View} button
       */
      renderButton(text) {
          return (
              <TouchableHighlight onPress={this.onProceedClick.bind(this)}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>{text}</Text>
                  </View>
              </TouchableHighlight>
          );
      }
      /**
       * @render
       * @return {View} view
       */
      render() {
          return (
              <Image source={require('../../../resources/images/ClientPageBg.png')} style={styles.container} >
                  <View style={styles.sidebar}>
                      <View style={[styles.widget, styles.profile]}>
                          <View style={styles.profileIcon}>
                              <Icon name="user" color="#FFF" size={55} style={{ marginLeft: 20}} />
                          </View>
                          <Text style={{ marginTop: 10, fontSize: 20, color: '#000'}}>
                              {this.state.client.FirstName + " " + this.state.client.LastName}
                          </Text>
                          <Text>{this.state.client.Position}</Text>
                      </View>
                      <View style={[styles.widget, {flex: 1}]}>
                          <View style={styles.widgetHeader}>
                              <Text style={styles.headerText}>SCHEDULED MEETING</Text>
                          </View>
                          <View style={styles.widgetBody}>
                              {(() => {
                                  if(this.state.hasMeeting)
                                    return (<ClientMeeting meeting={this.state.meeting} employee={this.state.employee} />)
                              })()}

                              <View style={{ marginTop: 30}}>
                                  <Text>You Don't have Scheduled Meeting.Please click the button to the right and our receptionist will be assisting you.</Text>
                              </View>
                          </View>
                      </View>
                  </View>
                  <View style={[ styles.widget, { flex : 1, marginLeft: 20}]}>
                      <View style={styles.widgetHeader}>
                          <Text style={styles.headerText}>CLIENT INFORMATION</Text>
                      </View>
                      <View style={styles.widgetBody}>
                          <Image source={require('../../../resources/images/logo-small.png')} style={styles.logo} />
                          <View style={styles.formWrapper}>
                              <View style={styles.formHeader}>
                                  <Text style={{ color: '#000', fontSize: 20 }}>Personal Details</Text>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={styles.formItem}>
                                      <Text>FIRST NAME</Text>
                                      <TextInput value={this.state.client.FirstName}
                                          style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('FirstName', text)}/>
                                  </View>
                                  <View style={{ flex : 1}}>
                                      <Text>LAST NAME</Text>
                                      <TextInput value={this.state.client.LastName}
                                          style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('LastName', text)}/>
                                  </View>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={styles.formItem}>
                                      <Text>GENDER</Text>
                                       <TextInput style={{ height: 40 }} underlineColorAndroid="#FFF" />
                                  </View>
                                  <View style={{ flex: 1}}>
                                      <Text>NATIONALITY</Text>
                                      <TextInput style={{ height: 40 }} underlineColorAndroid="#FFF" />
                                  </View>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={styles.formItem}>
                                      <Text>IDENTIFICATION TYPE</Text>
                                      <TextInput style={{ height: 40 }} underlineColorAndroid="#FFF" />
                                  </View>
                                  <View style={styles.formItem}>
                                      <Text>IDENTIFICATION NO.</Text>
                                      <TextInput value={this.state.client.EmiratesIdNo} style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('EmiratesIdNo', text)}/>
                                  </View>
                                  <View style={{ flex :1 }}>
                                      <Text>MOBILE NO.</Text>
                                      <TextInput value={this.state.client.Mobile}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('Mobile', text)}/>
                                  </View>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={{ flex: 1}}>
                                      <Text>EMAIL</Text>
                                      <TextInput value={this.state.client.Email}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('Email', text)}/>
                                  </View>
                              </View>
                              <View style={[styles.formHeader, { marginTop: 20 }]}>
                                  <Text style={{ color: '#000', fontSize: 20 }}>Company Information</Text>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={styles.formItem}>
                                      <Text>COMPANY</Text>
                                      <TextInput
                                          value={this.state.client.CompanyName}
                                          style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('CompanyName', text)}/>
                                  </View>
                                  <View style={{ flex : 1}}>
                                      <Text>JOB TITLE</Text>
                                      <TextInput value={this.state.client.Position}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('Position', text)}/>
                                  </View>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={[styles.formItem, { flex: 2}]}>
                                      <Text>LOCATION</Text>
                                      <TextInput value={this.state.client.Location}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('Location', text)}/>
                                  </View>
                                  <View style={{ flex : 1}}>
                                      <Text>P.O.BOX</Text>
                                      <TextInput value={this.state.client.PoBox}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                          onChangeText={(text) => this.onFieldEdit('PoBox', text)}/>
                                  </View>
                              </View>

                              <View style={{ alignItems: 'flex-end', paddingTop: 25}}>
                                    {this.renderButton('Proceed...')}
                              </View>

                          </View>
                      </View>

                  </View>
              </Image>
          );
      }
  }


/**
 * @class ClientMeeting
 * @extends React.Component
 */
 class ClientMeeting extends React.Component {
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
      * @render
      * @return {View} view
      */
     render() {
         return (
             <View style={{ flexDirection: 'row', paddingBottom: 20, paddingTop: 10, paddingLeft: 5, paddingRight: 5, borderBottomColor: '#D4D4D4', borderBottomWidth: 1 }}>
                 <View style={{ marginRight: 10 }}>
                     <Icon name="table"  size={50} />
                 </View>
                 <View style={{ flex: 1 }}>
                     <Text style={{ fontWeight: 'bold', color: '#000', marginBottom: 2 }}>{this.props.employee.FirstName + " " + this.props.employee.LastName}</Text>
                     <Text>{Moment.utc(this.props.meeting.DateOfMeeting).format('h:mmA')}</Text>
                     <Text>{"Meeting Room " + this.props.meeting.RoomId}</Text>
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
          padding: 20,
          flexDirection: 'row',
          alignItems: 'stretch',
          paddingTop: 0,
          width: null,
          height: null
      },
      sidebar: {
          width: 250,
          flexDirection: 'column',
      alignItems: 'stretch'
      },
      widget: {
          borderColor: '#EA6656',
          borderWidth: 1
      },
      widgetHeader: {
          backgroundColor: '#EA6656',
          padding: 10
      },
      headerText: {
          color: '#FFF'
      },
      widgetBody: {
          padding: 10,
          alignItems: 'stretch'
      },
      widgetFooter: {
          alignItems: 'flex-end',
          padding: 10,
          paddingTop: 25
      },
      profile: {
          height: 250,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center'
      },
      profileIcon: {
          backgroundColor: '#EA6656',
          width: 90,
          height: 90,
          borderRadius: 45,
          alignItems: 'center',
          justifyContent: 'center'
      },
      logo: {
          position: 'absolute',
          top: -25,
          right: 15
      },
      formWrapper: {
          borderWidth: 1,
          borderColor: '#CCC',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 115,
          flex: 1,
          alignItems: 'stretch'
      },
      formHeader: {
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          padding: 10,
          paddingLeft: 0
      },
      formGroup: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#CCC'
      },
      formItem: {
          flex: 1,
          borderRightWidth: 1,
          borderRightColor: '#CCC',
          marginRight: 10
      },
      label: {
          paddingTop: 10
      },
      textField: {
          padding: 20,
      },
      button: {
          backgroundColor: '#BE3828',
          padding: 8,
          marginBottom: 10,
          width: 100,
          alignItems: 'center',
          justifyContent: 'center'
      },
      buttonText: {
          color: '#FFF',
          fontSize: 16
      }
  });