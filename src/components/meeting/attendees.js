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
 import Moment from 'moment';
 import LoadMask from '../app/loadMask';
 import AppStore from '../../stores/appStore';
 import ClientStore from '../../stores/clientStore';

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
          this.loadAttendees();
      }

      /**
       * Load all the attendees for the passed meeting
       * @return {Void} undefined
       */
      loadAttendees() {
          AppStore.getAttendees(this.props.meeting)
            .then(json => this.setState({ attendees: json, isLoading: false }));
      }

      /**
       * Executes when the user tap on the Add Attendee button
       *
       * @eventhandler
       * @return {Void}  undefined
       */
      onAttendeeAdd() {
          // Show waiting dialog
          NativeModules.DialogAndroid.showProgressDialog();

          // Initialise dialog
          let dialog = new DialogAndroid();

          // Get all the departments
          ClientStore.getDepartments().then(json => {
              // Show waiting dialog
              NativeModules.DialogAndroid.hideProgressDialog();

              // iterate over departments and build department array
              let departments = [];
              json.map((item) => departments.push(item['Name']))

              // show  the departments
              let options = { title: 'Select a department', positiveText: 'Select', items: departments };
              options.itemsCallback = (selectedOption) => {
                  // Show waiting dialog
                  NativeModules.DialogAndroid.showProgressDialog();
                  // Get selected departmentId
                  let departmentId = json[selectedOption].DepartmentId;
                  // Get the employees on the selected department
                  ClientStore.getAvailableDepartmentEmployees(departmentId).then(response => {
                      // Show waiting dialog
                      NativeModules.DialogAndroid.hideProgressDialog();
                      // Transform the employees
                      let employees = new Array();
                      response.map(employee => employees.push(employee['FirstName'] + " " + employee["LastName"]));
                      //set new options
                      let newOptions = { title: 'Select a employee', positiveText: 'Select', items: employees };
                      newOptions.itemsCallback = (selectedEmployeeIndex) => {
                          let selectedEmployee = response[selectedEmployeeIndex];
                          AppStore.addAttendee(selectedEmployee, this.props.meeting).then(() => this.loadAttendees());
                      };
                      //reinitialize the dialog
                      let dialog1 = new DialogAndroid();
                      //show dialogs
                      dialog1.set(newOptions);
                      dialog1.show();
                  });
              };

              dialog.set(options);
              dialog.show();
          });
      }

      /**
       * Event handler for participant delete
       *
       * @eventhandler
       * @param {Participant} participant
       * @return {Void}  undefined
       */
      onParticipantDelete(participant) {
          let attendees = this.state.attendees;
          attendees.forEach((item, index) => {
              if(item.ParticipantId == participant.ParticipantId) {
                  attendees.splice(index, 1);
              }
          });
          this.setState({ attendees: attendees });
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
                    <TouchableNativeFeedback onPress={this.onAttendeeAdd.bind(this)}>
                        <View style={{ padding: 10, backgroundColor: '#FFF', margin: 10, borderColor: '#EEE', borderWidth: 1 }}>
                            <Text>Add New Attendee</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.container}>
                        { this.state.attendees.map(item => { return(<Attendee onParticipantDelete={() => this.onParticipantDelete(item)} participant={item} />)}) }
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
             isJoined: false,
             isStopped: false
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
      * Attendee leaves the meeting
      * @eventhandler
      * @return {Void} undefined
      */
     leaveMeeting() {
         /**
          * Play the native tap sound, as it's not supported in default view component by react native
          */
         NativeModules.MediaHelper.playClickSound();

         /**
          * Set the end time
          */
         this.props.participant.MeetingEndTime = new Date();
         /**
          * Change the state
          */
         this.setState({ isJoined: false, isStopped: true });
         /**
          * Update the server
          */
          AppStore.leaveAttendee(this.props.participant);
     }

     /**
      * Delete Participant
      * @eventhandler
      * @return {Void} undefined
      */
     deleteParticipant() {
         /**
          * Play the native tap sound, as it's not supported in default view component by react native
          */
         NativeModules.MediaHelper.playClickSound();
         /**
          * Delete from server
          */
         AppStore.deleteParticipant(this.props.participant.ParticipantId);
         /*
          * delete from list
          */
          if(this.props.onParticipantDelete)
            this.props.onParticipantDelete();
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         let icon = this.state.isJoined ?  "stop" : "play";
         let color = { backgroundColor: 'rgb(59, 89, 152)'};

         let button = (
             <TouchableNativeFeedback onPress={this.joinMeeting.bind(this)}>
                 <View style={[styles.btn, color]}>
                     <Icon name={icon} size={19} style={{ color: '#FFF'}} />
                 </View>
             </TouchableNativeFeedback>
         );

         let deleteButton = (
             <TouchableNativeFeedback onPress={this.deleteParticipant.bind(this)}>
                 <View style={[styles.btn, color]}>
                     <Icon name="trash" size={19} style={{ color: '#FFF'}} />
                 </View>
             </TouchableNativeFeedback>
         );

         if(this.state.isJoined || this.state.isStopped) {
             deleteButton = null;
         }

         /**
          * Attendee is joined but not left the meeting yet
          */
         if(this.props.participant.MeetingStartTime != null &&
             this.props.participant.MeetingEndTime == null)
         {
             this.state.isJoined = true;
             deleteButton = null;
         }

         if(this.state.isJoined) {
             deleteButton = null;
            icon = "stop"
            color = { backgroundColor: 'rgb(224, 47, 47)', paddingLeft: 5 };
            this.state.isJoined = true;
            button = (
                <TouchableNativeFeedback onPress={this.leaveMeeting.bind(this)}>
                    <View style={[styles.btn, color]}>
                        <Icon name={icon} size={19} style={{ color: '#FFF'}} />
                    </View>
                </TouchableNativeFeedback>
            );
        }

        /**
         * If the attendee already left the meeting then disable the buttons
         */
        if(this.props.participant.MeetingStartTime != null &&
        this.props.participant.MeetingEndTime != null) {
            button = null;
            deleteButton = null;
        }

        if(this.state.isStopped) {
            button = null;
            deleteButton = null;
        }

        let profileSource = "";
        let startTime = null;
        let endTime =  null;

        if(this.props.participant.MeetingStartTime)
            startTime = (<Text style={styles.startTime}> FROM - {Moment.utc(this.props.participant.MeetingStartTime).format('h:mm:ss a')}</Text>);

        if(this.props.participant.MeetingEndTime)
            endTime = (<Text style={styles.endTime}>To - {Moment.utc(this.props.participant.MeetingEndTime).format('h:mm:ss a')}</Text>);

        return (
             <View style={styles.attendee} >
                 <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                     <Text style={styles.profileName}>{this.props.participant.User.FirstName + " " + this.props.participant.User.LastName }</Text>
                     <Text style={styles.position}>Advisor</Text>
                     { startTime }
                     { endTime }
                 </View>
                 <View style={styles.buttons}>
                     { button }
                     { deleteButton }
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
     },
     startTime: {
         marginTop: 10,
         marginBottom: 5
     }
 });
