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


import React, { StyleSheet, Text, View, Image, DeviceEventEmitter,
	TouchableWithoutFeedback, TouchableHighlight,NativeModules, ToastAndroid } from 'react-native';

import DialogAndroid from 'react-native-dialogs';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStore from '../../stores/appStore';

/**
 * Custom Class Header
 *
 * @class TiltBar
 * @extends React.Component
 */
 export default class TiltBar extends React.Component {
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
			  * Status to show whether sound recording is turned on or not
			  * @property {Boolean} recordingStatus
			  */
			  recordingStatus: false
		 };

		 /**
          * If any previous unclosed sound recording  found, resume it
          */
         if(AppStore.isRecording)
            this.state.recordingStatus = true;

		 /*
          * When user finishes the audio recording this event will be emitted from  the java code.
          * So capture it and add the recorded file into attachment list.
          */
         this.recordingStartedSubscription =  DeviceEventEmitter.addListener('recordingstarted', this.onRecordingStarted.bind(this));
		 /*
          * When user finishes the audio recording this event will be emitted from  the java code.
          * So capture it and add the recorded file into attachment list.
          */
         this.recordingStoppedSubscription = DeviceEventEmitter.addListener('recordingfinished', this.onRecordingFinished.bind(this));
     }


	 /**
      * Logout the application
      *
      * @eventhandler
      * @return {Void} undefined
      */
	 onLogout() {

		 /**
		  * Play the native tap sound, as it's not supported in default view component by react native
		  */
		 NativeModules.MediaHelper.playClickSound();

		 /**
		  * IF any ongoing meeting is there first finish it
		  */
		 if(AppStore.hasActualMeeting()) {
			let dialog = new DialogAndroid();
			dialog.set({ title: 'Notice!',content: 'Please finish the ongoing meeting before you logout', positiveText: 'OK'});
			dialog.show();
		 }
		 else {
		 	AppStore.logout();
		 }
     }

	 /**
      * When the user starts the recording show the msg on titlebar
      *
      * @eventhandler
      * @param {String} filename - the recorded file name
      * @return {Void} undefined
      */
     onRecordingStarted(filename) {
         /**
          * Change the state
          */
         this.setState({ recordingStatus: true });
     }
	 /**
      * When the user finishes the recording hide the msg on titlebar
      *
      * @eventhandler
      * @param {String} filename - the recorded file name
      * @return {Void} undefined
      */
     onRecordingFinished(filename) {
		 /**
          * Change the state
          */
         this.setState({ recordingStatus: false });
     }

	 /**
	  * @lifecycle
	  * @return {Void} undefined
	  **/
	 componentWillUnmount() {
		 // Stop recordingStartedSubscription
		 this.recordingStartedSubscription.remove();
		 // Stop recordingStoppedSubscription
		 this.recordingStoppedSubscription.remove();
	 }

	 /**
	  * Show the different user status
	  * @return {Void} undefined
	  */
	 changeStatus() {
		 let options = ["Available", "Busy", "Not Available"];
		 let dialog = new DialogAndroid();
		 dialog.set({ title: 'Change the Status',content: 'Please select on of the options', items: options });
		 dialog.show();
	 }

	 /**
	  * The logout button
	  * @return {TouchableWithoutFeedback} button
	  */
	 renderLogoutButton() {
		 return (
			 <TouchableWithoutFeedback underlayColor="#A51820" onPress={this.onLogout.bind(this)}>
			   <View style={styles.logoutButton}>
				 <Icon name="key" size={18} style={styles.logoutButtonText} />
				 <Text style={styles.logoutButtonText}>Logout</Text>
			   </View>
			 </TouchableWithoutFeedback>
		 );
	 }
	 /**
	  * Left most user Information
	  * @return {TouchableWithoutFeedback} button
	  */
	 renderUserInformation() {
		 return (
			 <TouchableWithoutFeedback onPress={this.changeStatus.bind(this)}>
				 <View style={styles.profileWrapper}>
					 <Icon name="list" size={65} color="#FFF" style={styles.icon}  />
					 <View style={{flexDirection: 'column'}}>
						 <Text style={styles.user}>{AppStore.user.FirstName + " " + AppStore.user.LastName}</Text>
					 <Text style={styles.designation}>{AppStore.user.Profession}</Text>
				 	</View>
				 </View>
			 </TouchableWithoutFeedback>
		 );
	 }

     /**
      * @render
      * @return {View} view
      */
     render() {
		 let recordingStatus = null;
		 if(this.state.recordingStatus)
		 	recordingStatus = (
				<View style={styles.logoutButton}>
 				 <Icon name="pause" size={18} style={styles.logoutButtonText} />
 				 <Text style={styles.logoutButtonText}>Recording Audio</Text>
 			   </View>
			);

         return (
			 <Image source={require('../../../resources/images/header.png')} style={styles.titlebar}>
               { this.renderUserInformation() }
               <View style={styles.title}>
               </View>
			   { recordingStatus }
			   { this.renderLogoutButton() }
             </Image>
         );
     }
 }

 var styles = StyleSheet.create({
	 profileWrapper: {
		 flexDirection: 'row',
		 justifyContent: 'center'
	 },
	 titlebar: {
     	width:Dimensions.get('window').width,
    	height: 55,
      	flexDirection: 'row',
      	padding: 10,
      	paddingTop: 10
  	},
  	icon: {
      	color: '#FFF',
      	width: 32,
      	height: 32,
      	fontSize: 30,
      	marginLeft: 10,
      	marginTop: 5
  	},
  	user: {
      	color: "#FFF",
      	fontSize: 18
  	},
  	designation: {
      	color: "#FFF",
      	fontSize: 13
  	},
  	title: {
      	flex: 1,
  	},
  	logoutButton: {
      	backgroundColor: '#A51820',
      	margin: 3,
      	padding: 5,
      	flexDirection: 'row'
  	},
  	logoutButtonText: {
      	color: '#FFF',
      	fontWeight: 'bold'
  	}
});
