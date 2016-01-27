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
 import React, { View, StyleSheet, Text,  TouchableHighlight,
     TouchableWithoutFeedback, ToastAndroid, Image, TextInput, NativeModules, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';
 import Moment from 'moment';

 import ClientSplashScreen from './clientSplashScreen';
 import ClientStore from '../../stores/clientStore';
 import AppStore from '../../stores/appStore';
 import RadioButton from '../ux/radioButton';
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
                  FirstName: '',
                  LastName: '',
                  Position: '',
                  EmiratesIdNo: '0',
                  PassportNo: '0'
              },
              meeting: {},
              employee: {},
              hasMeeting: false,
              mode: 2,
              selectedPurposeIndex: 0
          };

          this.state.mode = this.props.mode || 2;

          if(this.props.client) {
              this.state.client.FirstName = this.props.client.fullName.replace(/,/gi,' ');
              this.state.client.Nationality = this.props.client.nationality;
              this.state.client.NationalityName = this.props.client.nationality;
              this.state.client.Gender = this.props.client.sex;
              this.state.client.GenderName = this.props.client.sex == 'M' ? 'Male' : 'Female';
              this.state.client.EmiratesIdNo = this.props.client.idnumber;
              this.state.client.ArabicName = this.props.client.arabicFullName.replace(/,/gi,' ');
              this.state.client.DateOfBirth = this.props.client.dateOfBirth;
            }
      }
      /**
       *
       * @lifecycle
       * @return {Void} undefined
       */
      componentDidMount() {
         if(this.state.mode != 1 && this.props.client) {
             ClientStore.getByIdentity(this.state.client.EmiratesIdNo).then(json => {
                if(json != null) {
                    let client = json;
                    client.CompanyName = json.Companies.Name;
                    client.FullName = json.FirstName + " " + json.LastName;
                    client.FirstName = json.FirstName + " " + json.LastName;
                    client.GenderName = json.Gender == 'M' ? 'Male': 'Female';
                    client.NationalityName = json.CountryId;
                    this.setState({ client: client });
                }
                else{
                    this.setState({ mode: 1 });
                }

                 ClientStore.getClientMeetingWithEmployee(this.state.client.EmiratesIdNo).then(data => {
                     if(data) {
                         this.setState({ meeting: data.BookedMeetings, employee: data.Employee, hasMeeting: true });
                     }
                 });

             });
         }
      }

      /**
       * Show the list of gender as a list dialog
       * @return {Void} undefined
       */
      showGenderOptions() {
          let options = {
              title: 'Select',
              positiveText: 'Select',
              items: ['Male', 'Female'],
          };

          /**
           * Callback for item select
           */
          options.itemsCallback = (index) => {
              let client = this.state.client;
              client.Gender = index == 0 ? 'M': 'F';
              client.GenderName = options.items[index];
              /**
               * Change the display to the selected value
               */
              this.setState({ client: client });
          };

          let dialog = new DialogAndroid();
          dialog.set(options);
          dialog.show();
      }

      /**
       * Show the list of gender as a list dialog
       * @return {Void} undefined
       */
      showNationalityOptions() {
          // Show waiting dialog
          NativeModules.DialogAndroid.showProgressDialog();
          // Get available countries from the server
          AppStore.getAvailableCountries().then(countries => {
              //Hide progress dialog
              NativeModules.DialogAndroid.hideProgressDialog();

              let arrCountries = new Array();
              countries.map(country => arrCountries.push(country['Name']));

              let options = {
                  title: 'Select',
                  positiveText: 'Select',
                  items: arrCountries
              };

              /**
               * Callback for item select
               */
              options.itemsCallback = (index) => {
                  let client = this.state.client;
                  client.CountryId = countries[index].CountryId;
                  client.NationalityName = arrCountries[index];
                  /**
                   * Change the display to the selected value
                   */
                  this.setState({ client: client });
              };

              let dialog = new DialogAndroid();
              dialog.set(options);
              dialog.show();
          });
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
          /**
           * Play the native tap sound, as it's not supported in default view component by react native
           */
          NativeModules.MediaHelper.playClickSound();

           if(this.state.mode == 1) {
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
                   this.props.navigator.push({
                       id: 'client',
                      title:'Client Home' ,
                      component: ClientSplashScreen,
                      props: {
                          isClientModule: true
                      }
                   });
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
              <TouchableWithoutFeedback onPress={this.onProceedClick.bind(this)}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>{text}</Text>
                  </View>
              </TouchableWithoutFeedback>
          );
      }

      onRadioPress(index) {
          this.setState({ selectedPurposeIndex: index });
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
                          <Text>{this.state.client.Position + " " + this.state.mode}</Text>
                      </View>
                      <View style={[styles.widget, {flex: 1}]}>
                          <View style={styles.widgetHeader}>
                              <Text style={styles.headerText}>SCHEDULED MEETING { this.state.mode }</Text>
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
                                  <View style={{ flex: 1}}>
                                      <Text>FULL NAME</Text>
                                      <TextInput value={this.state.client.FirstName}
                                          style={{ height: 40 }} underlineColorAndroid="#FFF"
                                      onChangeText={(text) => this.onFieldEdit('FirstName', text)}/>
                                  </View>
                              </View>
                              <View style={styles.formGroup}>
                                  <TouchableWithoutFeedback onPress={this.showGenderOptions.bind(this)}>
                                      <View style={styles.formItem}>
                                          <Text>GENDER</Text>
                                          <Text style={{ height: 40,  paddingLeft: 10, color: '#000'  }}>{this.state.client.GenderName}</Text>
                                      </View>
                                  </TouchableWithoutFeedback>
                                  <TouchableWithoutFeedback onPress={this.showNationalityOptions.bind(this)}>
                                      <View style={{ flex: 1}}>
                                          <Text>NATIONALITY</Text>
                                          <Text style={{ height: 40, paddingLeft: 10, color: '#000' }}>{this.state.client.NationalityName}</Text>
                                      </View>
                                  </TouchableWithoutFeedback>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={styles.formItem}>
                                      <Text>EMAIL</Text>
                                      <TextInput value={this.state.client.Email}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                      onChangeText={(text) => this.onFieldEdit('Email', text)}/>
                                  </View>
                                  <View style={{ flex :1 }}>
                                      <Text>MOBILE NO.</Text>
                                      <TextInput keyboardType="numeric" value={this.state.client.Mobile}  style={{ height: 40 }} underlineColorAndroid="#FFF"
                                      onChangeText={(text) => this.onFieldEdit('Mobile', text)}/>
                                  </View>
                              </View>
                              <View style={styles.formGroup}>
                                  <View style={{ flex: 1}}>
                                        <Text>PURPOSE OF THE VISIT</Text>
                                        <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                                            <RadioButton label="Business Village" onPress={()=>this.onRadioPress(0)} selected={this.state.selectedPurposeIndex == 0}/>
                                        <RadioButton label="Service Provider" onPress={()=>this.onRadioPress(1)} style={{marginRight: 10, marginLeft: 10}} selected={this.state.selectedPurposeIndex == 1}/>
                                    <RadioButton label="Entrepreneur" onPress={()=>this.onRadioPress(2)} selected={this.state.selectedPurposeIndex == 2}/>
                                      </View>
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
          justifyContent: 'center',
          height: 60
      },
      buttonText: {
          color: '#FFF',
          fontSize: 16
      }
  });
