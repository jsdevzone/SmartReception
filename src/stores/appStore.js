'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';

import RequestManager from '../core/requestManager';
import AppConstants from '../constants/appConstants';
import CredentialStore from './credentialStore';
import MeetingStatus from '../constants/meetingStatus';



/**
 * App Store is flux store. This store serves as skeleton for server side data  service
 * for the application. Most of the components is using this store to save and retrieve
 * user, meeting and  client data from local storage and server.
 *
 * @class AppStore
 * @extends EventEmitter
 * @store
 * @singleton
 */
var AppStore = module.exports = Object.assign({}, EventEmitter.prototype, {

	/**
	 * Current user logged in to the application. When application starts this variable should be
	 * loaded from the local storage. If it's value is empty then should redirect into login screen.
	 * @proprty {Object} user
	 */
	user: {},

	/**
	 * When the advisor starts a meeting, the meeting details should be saved locally in the application.
	 * And this variable represents the currently only going meeting. This variable is shared by all the components
	 * in the application
	 * @proprty {Object} user
	 */
	currentMeeting: {},

	/**
	 * Not using should be removed safely
	 */
	actualMeeting: {},

	/**
	 * List of rooms/ meeting areas, should be loaded from server always
	 * @proprty {Array<String>} meetingAreas
	 **/
	meetingAreas: [
		"Room 1", "Room 2", "Room 3", "Waiting Area"
	],

	/**
	 * When user copy text from summary or notes, these are available options that the user can act upon.
	 * @proprty {Object} user
	 */
	copyOptions: [ "Append To Exisiting", "Replace Exisiting", "Prepend To Exisiting"],

	/**
	 * Loads the application state from the local storage. Each time when user leaves the application we are saving the application
	 * state into the local storage. Local state include the current user, identity infos, current meeting details, app settings , etc.
	 *
	 * @return {Void} undefined
	 */
	loadAppSettings: function() {
		const STORAGE_KEY = AppConstants.storageKey ;
		const keysToRetrieve = [
			STORAGE_KEY + ':currentMeeting',
			STORAGE_KEY + ':user',
		];

		AsyncStorage.multiGet(keysToRetrieve).then((data) => {
			let _settings = {};

			data.forEach((item) => {
				/**
				 *  Item at zero is the authentication information
				 */
				if(item[0] == STORAGE_KEY + ":user") {
					if(item[1] != null && item[1] != '') {
						_settings.user = { name:'Muhammed Jasim', profession:'Sr. Software Developer' };
						_settings.isAuthenticated = true;
					}
				}
				/**
				 * Information about the current meeting
				 */
				if(item[0] == STORAGE_KEY + ":currentMeeting") {
					if(item[1] != null && item[1] != "") {
						this.currentMeeting = JSON.parse(item[1])
						_settings.currentMeeting = this.currentMeeting;
					}
				}
			});

			this.emit('appsettingsloaded', _settings);
		});
	},

	/**
	 * Get the list of available rooms from the server.
	 *
	 * @url - http://[server]/[service]/api/availablerooms
	 * @return {Promise} requestPromise
	 */
	getAvailableMeetingRooms: function() {
		let promise = RequestManager.get('availablerooms');
		promise.then(json => this.availablerooms = json || []);
		return promise;
	},


	/**
	 * Add actual meeting to booked meeting. Advisor starts the meeting by pressing start button
	 * in <MeetingIntro /> component.
	 *
	 * @url - http://[server]/[service]/api/meeting/start?[meeting]
	 *
	 * @param {Meeting} meeting
	 * @param {Number} roomNo
	 * @return {Void} undefined
	 */
	startMeeting: function (meeting, roomNo) {

		// to store into local storage
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';

		/**
		 * Updates the current meeting values
		 */
		this.currentMeeting = meeting;
		this.currentMeeting.RoomId = roomNo;
		this.currentMeeting.Status = MeetingStatus.STARTED;

		/**
		 * Send request to server
		 */
		RequestManager.post('meeting/start', meeting).then((json) => {
			this.currentMeeting = json;
			this.emit('meetingstarted', this.currentMeeting);

			/**
			 * Save it to local storage
			 */
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(json));
		});
	},

	/**
	 * When something happens on meeting like save summary or notes, update the actualmeeting object to server
	 *
	 * @url - http://[server]/[service]/api/meeting/update?[meeting]
	 *
	 * @param {Meeting} meeting
	 * @return {Promise} promise
	 */
	updateActualMeeting: function(meeting) {
		let promise = RequestManager.post('meeting/update', meeting);

		promise.then(json => {
			// If the updated meeting is current meeting update current meeting
			if(this.currentMeeting && (this.currentMeeting.BookedMeetingId == meeting.BookedMeetingId)) {
				this.currentMeeting = json;
				// save the current meeting to local storage
				this.saveCurrentMeetingToLocalStorage(json)
			}
			// emit event
			this.emit('actualMeetingupdated', json);
		});

		return promise;
	},
	saveCurrentMeetingToLocalStorage: function(meeting) {
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';
		return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meeting));
	},
	updateMeeting: function () {
		if(this.currentMeeting && this.currentMeeting.ActualMeetings && this.currentMeeting.ActualMeetings.length > 0) {
			RequestManager.post('meeting/update', this.currentMeeting).then((json) => {
				this.currentMeeting = json;
				this.emit('meetingupdated', this.currentMeeting);
				this.saveCurrentMeetingToLocalStorage(json);
			});
		}
	},
	finishCurrentMeeting: function() {
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';
		if(this.currentMeeting && this.currentMeeting.ActualMeetings && this.currentMeeting.ActualMeetings.length > 0) {
			RequestManager.post('meeting/finish', this.currentMeeting).then((json) => {
				AsyncStorage.setItem(STORAGE_KEY, "");
				this.emit('meetingfinished', this.currentMeeting);
				this.currentMeeting = {};
			});
		}
	},
	postMeeting: function(meeting) {
		RequestManager.post('meeting/confirm', meeting).then(json => {
			this.emit('meetingposted', json);
		});
	},
	postUserFeedback: function(meeting, feedback) {
		return RequestManager.post('meeting/feedback/' + feedback, meeting);
	},
  	addEventListener: function(name, callback) {
    	this.on(name, callback);
  	},
  	logout: function (argument) {
	    CredentialStore.logout(() => this.emit('logout'));
  	},
  	hasActualMeeting: function() {
  		return (this.currentMeeting != null &&
  			this.currentMeeting.ActualMeetings != undefined &&
  			this.currentMeeting.ActualMeetings.length >  0);
  	},
  	getCurrentMeetingId: function() {
  		if(this.hasActualMeeting()) {
  			return this.currentMeeting.BookedMeetingId;
  		}
  		return 0;
  	}
});
