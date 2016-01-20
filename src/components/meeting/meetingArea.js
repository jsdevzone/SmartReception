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

import React, {  StyleSheet, Text, View, Image, TouchableHighlight, DeviceEventEmitter,
  TouchableWithoutFeedback, TextInput, ListView, NativeModules, ToastAndroid, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';

import Notes from './notes';
import Summary from './summary';
import MinutesOfMeeting from './minutesOfMeeting';
import MeetingTitle from './meetingTitle';
import Attachments from '../app/attachments';
import MeetingStatus from '../../constants/meetingStatus';
import DrawingSurface from '../drawing/drawingSurface';
import Attendees from './attendees';
import Button from '../meeting/button';
import Feedback from '../feedback/feedback';

import AppStore from '../../stores/appStore';
import ClientStore from '../../stores/clientStore';
/**
 * MeetingArea
 *
 * @class MeetingArea
 * @extends React.Component
 */
export default class MeetingArea extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
        super(args);

        /**
         * @state
         */
         this.state = {
             /**
              * The Notes and Summary Tab index
              */
             selectedTabIndex: 1,
             /**
              * Is recoding sound in background
              */
             isRecording: false,
             /**
              * Checks whether the meeting data can be edited or not
              */
              isEditable: false,
              /**
               * Checks whether the meeting can be transferred or not
               */
              isTransferrable: false
         };

         /**
          * Check the meeting id is same as ongoing meeting then only enable buttons
          */
          if(this.props.meeting &&
              this.props.meeting.ActualMeetings &&
              this.props.meeting.ActualMeetings.length > 0 ){
                  if(this.props.meeting.Status >= MeetingStatus.STARTED &&
                      this.props.meeting.Status < MeetingStatus.CONFIRMED) {
                      this.state.isEditable = true;
                  }
                  if(AppStore.hasActualMeeting() &&
                        AppStore.currentMeeting.BookedMeetingId == this.props.meeting.BookedMeetingId &&
                        this.props.meeting.Status == MeetingStatus.STARTED) {
                      this.state.isTransferrable = true;
                  }
              }

         /**
          * If any previous unclosed sound recording  found, resume it
          */
         if(AppStore.isRecording)
            this.state.isRecording = true;

        /*
         * When user finishes the audio recording this event will be emitted from  the java code.
         * So capture it and add the recorded file into attachment list.
         */
        this.recordingEventSubscription = DeviceEventEmitter.addListener('recordingfinished', this.onRecordingFinished.bind(this));
     }

     /**
	  * @lifecycle
	  * @return {Void} undefined
	  **/
	 componentWillUnmount() {
		 // Stop recordingEventSubscription
		  this.recordingEventSubscription.remove();
	 }

     /**
      * When the user finishes the recording add the recorded audio to the attachment list
      *
      * @eventhandler
      * @param {String} filename - the recorded file name
      * @return {Void} undefined
      */
     onRecordingFinished(filename) {
         /**
          * If there is an attachment added event handler, call it with the newly recorded file
          */
         if(this.props.onAttachmentAdded) {
             // attachment object should be same as the  attachment entity
             let attachment = {
                 AttachmentId: 0,
                 Name: 'Sound recording',
                 Path: filename,
                 AttachmentTypeId: 1
             };
             // call the callback
             this.props.onAttachmentAdded(attachment);
         }
     }

     /**
      * @eventhandler
      * @param {Number} index
      * @return {Void} undefined
      */
     onTabPress(index) {
         /**
          * Play the native tap sound, as it's not supported in default view component by react native
          */
         NativeModules.MediaHelper.playClickSound();
         /**
          * Change the state
          */
         this.setState({ selectedTabIndex: index });
     }

     /**
      * @eventhandler
      * @param {Meeting} meeting
      * @return {Void} undefined
      */
     onMeetingUpdate(meeting) {
         return AppStore.updateActualMeeting(meeting);
     }

     /**
      * Triggers when the advisor press the finish button on meeting screen.
      * @eventhandler
      * @return {Void} undefined
      */
     onFinishPress() {
         if(AppStore.getCurrentMeetingId() == this.props.meeting.BookedMeetingId) {
             let dialog = new DialogAndroid();
             let options = {
                 title: 'Confirm',
                 content: 'Are you sure want to finish current meeting?' ,
                 positiveText: 'Yes',
                 negativeText: 'No',
                 neutralText: "Yes With Transfer",
                 onPositive: () => {
                     // Show waiting dialog
                     NativeModules.DialogAndroid.showProgressDialog();
                     // Finish the meeting
                     AppStore.finishCurrentMeeting().then(() => {
                        //Hide the  dialog box
                        NativeModules.DialogAndroid.hideProgressDialog();
                     });
                 },
                 onNeutral: this.transferMeeting.bind(this)
             };
             dialog.set(options);
             dialog.show();
         }
     }

     /**
      * Transfer the meeting to other employees.
      * @eventhandler
      * @return {Void} undefined
      */
     transferMeeting() {
         // Show waiting dialog
         NativeModules.DialogAndroid.showProgressDialog();

         // Initialise dialog
         let dialog = new DialogAndroid();

         // Get all the departments
         ClientStore.getDepartments().then(json => {
             // hide waiting dialog
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
                 ClientStore.getDepartmentEmployees(departmentId).then(response => {
                     // Show waiting dialog
                     NativeModules.DialogAndroid.hideProgressDialog();
                     // Transform the employees
                     let employees = new Array();
                     response.map(employee => employees.push(employee['FirstName'] + " " + employee["LastName"]));
                     //set new options
                     let newOptions = { title: 'Select a employee', positiveText: 'Select', items: employees };
                     newOptions.itemsCallback = (selectedEmployeeIndex) => {
                         let selectedEmployee = response[selectedEmployeeIndex];
                         /**
                          * Transfer the meeting
                          */
                         AppStore.transferMeeting(this.props.meeting, selectedEmployee).then(() => {
                            ToastAndroid.show('Meeting Transferred to '+ selectedEmployee.FirstName + " " + selectedEmployee.LastName + " Successfully.", ToastAndroid.LONG);
                         });
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
      * on Transfer button press
      * @eventhandler
      * @return {Void} undefined
      */
     onTransferPress() {

         let dialog = new DialogAndroid();
         let options = {
             title: 'Confirm',
             content: 'Are you sure want to continue?',
             "positiveText": "Yes",
             "negativeText": "No",
             "onPositive": () => { this.transferMeeting() },
             "onNegative": () => ToastAndroid.show("NEGATIVE!", ToastAndroid.SHORT)
         };
         dialog.set(options);
         dialog.show();
     }

     /**
      * Confirm and post the meeting passed through the props
      * @return {Void} undefined
      */
     postMeeting() {
         let dialog = new DialogAndroid();
         let options = {
             title: 'Confirm',
             content: 'Are you sure ?' ,
             positiveText: 'Yes',
             negativeText: 'No',
             onPositive: () => AppStore.postMeeting(this.props.meeting)
         };
         dialog.set(options);
         dialog.show();
     }

     /**
      * Start the recording
      * @return {Void} undefined
      */
     recordAudio() {
         /**
          * change the component state
          */
         this.setState({ isRecording: true });
         /**
          * Set the global store value
          */
         AppStore.isRecording = true;
         /*
          * Start the Recording
          */
         NativeModules.MediaHelper.startRecording(this.props.meeting.BookedMeetingId.toString());
     }

     /**
      * Stop the recording.
      * @return {Void} undefined
      */
     stopRecording() {
         /**
          * change the component state
          */
         this.setState({ isRecording: false });
         /**
          * Set the global store value
          */
         AppStore.isRecording = false;
         /*
          * Stop the Recording
          */
         NativeModules.MediaHelper.stopRecording();
     }

     /**
      * Move  the navigator to Sketches screen
      * @return {Void} undefined
      */
     navigateToSketches() {
         if(this.props.navigator) {
             let route = {
                 id: 'drawingsurface',
                 component: DrawingSurface,
                 title: 'Sketches',
                 props: { navigator: this.props.navigator, meeting: this.props.meeting }
             };
             this.props.navigator.push(route);
         }
     }

     /**
      * Render meeting tabs
      * @return {View} tabStripe
      */
     renderTabStripes() {
         /**
          * List Of tabs
          */
         let tabs = [
             { id: 1, text: 'NOTES', icon: 'sticky-note-o' },
             { id: 2, text: 'SUMMARY', icon: 'file-text-o' },
             { id: 3, text: 'MINUTES', icon: 'list-alt' },
             { id: 4, text: 'ATTACHMENTS', icon: 'paperclip' },
             { id: 5, text: 'ATTENDEES', icon: 'paperclip' }
         ];
         /**
          * @render
          */
         return (
             <View style={styles.tabWrapper}>
                 { tabs.map(item => this.renderTab(item.text, item.icon, item.id))}
             </View>
         );
     }

     /**
      * Renders the single tab component
      * @param {String} text
      * @param {String} icon
      * @param {Number} tabIndex
      * @param {Boolean} hideSeparator optional
      * @return {TouchableWithoutFeedback} tab
      */
     renderTab(text, icon, tabIndex, hideSeparator) {
         let style = null;
         /**
          * if hideSeparator then remove right border
          **/
         if(hideSeparator)
            style = { borderRightWidth: 0 };

         return (
             <TouchableWithoutFeedback onPress={()=>this.onTabPress(tabIndex)}>
                 <View style={[styles.tab, style]}>
                     <Text style={[styles.tabText, this.state.selectedTabIndex == tabIndex ? styles.tabSelected : {}]}>{text}</Text>
                 </View>
             </TouchableWithoutFeedback>
         );
     }

     /**
      * return currently selected screen
      * @return {View} component
      */
     getCurrentScreen() {
         let Component = Notes;

         switch (this.state.selectedTabIndex) {
            case 1:
                Component = Notes;
                break;
            case 2:
                Component = Summary;
                break;
            case 3:
                Component = MinutesOfMeeting;
                break;
            case 4:
                Component = Attachments;
                break;
            case 5:
                Component = Attendees;
                break;
         }

         return (<Component {...this.props} onMeetingUpdate={this.onMeetingUpdate.bind(this)} />);
     }

     /**
      * Render footer
      * @return {View} footer
      */
    renderFooter() {
        let style = { flex:1, borderRightWidth:0 };
        let recordBtn = (<Button icon="microphone" disabled={!this.state.isEditable} text="Record Audio" onPress={this.recordAudio.bind(this)} />);
        let finishBtn = (
             <Button icon="check" text="Finish Meeting"
                 disabled={AppStore.getCurrentMeetingId() != this.props.meeting.BookedMeetingId}
                 style={style}
                 onPress={this.onFinishPress.bind(this)} />
        );
        /**
         * If passed meeting status is finished hide the finish button and show the confirm btn
         */
        if(this.props.meeting.Status == MeetingStatus.FINISHED)
            finishBtn = (<Button icon="check" text="Confirm & Update Meeting" style={style} onPress={this.postMeeting.bind(this)} />);

         /**
          * If it's being recorded, then show stop btn
          */
         if(this.state.isRecording)
            recordBtn = (<Button disabled={!this.state.isEditable} icon="stop" text="Stop Recording" onPress={this.stopRecording.bind(this)} />);

         return (
             <View style={styles.footer}>
             { recordBtn }
                 <Button icon="list-alt" text="Sketches" onPress={this.navigateToSketches.bind(this)} />
                 <Button icon="comments-o" text="Feedback" onPress={() => {
                     if(this.props.navigator) {
                         this.props.navigator.push({
                             id: 'feedback',
                             component: Feedback,
                             title: 'Feedback',
                             props: { navigator: this.props.navigator, meeting: this.props.meeting }
                         });
                     }
                    }}/>
                 <Button icon="check-square-o" text="Survey"  />
                 <Button disabled={!this.state.isTransferrable} icon="exchange" text="Transfer"  onPress={this.onTransferPress.bind(this)} />
                 { finishBtn }
             </View>
         );
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         let currentComponent = this.getCurrentScreen();
         return (
            <View style={styles.container}>
                <MeetingTitle meeting={this.props.meeting} />
                <View style={styles.row}>
                    { this.renderTabStripes() }
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                        { this.getCurrentScreen() }
                    </View>
                    { this.renderFooter() }
                </View>
            </View>
         );
     }
 }

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1,
        margin: 5
    },
    footer: {
        backgroundColor:'#F0F1F3',
        borderTopColor: '#D8E0F1',
        borderTopWidth: 1,
        height: 75,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    row: {
        flex: 1
    },

    tabWrapper: {
        backgroundColor: '#F0F1F3',
        flexDirection: 'row',
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
    },
    tab: {
        flexDirection: 'row',
        borderRightColor: '#CCC',
        borderRightWidth: 1,
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        color: '#A4C1E8',
        fontWeight: 'bold'
    },
    tabSelected: {
        color: '#6477C1'
    }
});
