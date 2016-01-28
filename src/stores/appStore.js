'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */
import { AsyncStorage, ToastAndroid, } from 'react-native';
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
	user: {
		/*
		 * First name of the logged in user
		 * @property {String} FirstName
		 */
		FirstName: '',
		/*
		 * Last name of the logged in user
		 * @property {String} LastName
		 */
		LastName: '',
		/*
		 * Profession of the logged in user
		 * @property {String} Profession
		 */
		Profession: '',
		/*
		 * Username of the logged in user
		 * @property {String} UserName
		 */
		UserName: ''
	},

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
	 * The web service Endpoint address
	 * @proprty {String} serviceEndPoint
	 */
	serviceEndPoint: null,

	/**
	 * Application mode - whethere reception tablet or advisor tabler
	 * @proprty {String} applicationMode
	 */
	applicationMode: null,

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
			STORAGE_KEY + ':serviceEndPoint',
			STORAGE_KEY + ':applicationMode'
		];

		AsyncStorage.multiGet(keysToRetrieve).then((data) => {
			let _settings = {};

			data.forEach((item) => {
				/**
				 *  Item at zero is the authentication information
				 */
				if(item[0] == STORAGE_KEY + ":user") {
					if(item[1] != null && item[1] != '') {
						let authHeader = JSON.parse(item[1])

						AppStore.user.FirstName = authHeader.FirstName;
						AppStore.user.LastName = authHeader.LastName;
						AppStore.user.Profession = 'Sr. Software Developer';
						AppStore.user.UserName = authHeader.UserName;


						_settings.user = { name: AppStore.user.FirstName + " " + AppStore.user.LastName, profession:'Sr. Software Developer', userName: AppStore.user.UserName };
						_settings.isAuthenticated = true;

						if(authHeader.access_token) {
							RequestManager.authHeader = { 'Authorization': 'Bearer ' + authHeader.access_token };
						}
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
				/*
				 * serviceEndPoint
				 */
				 if(item[0]==STORAGE_KEY + ":serviceEndPoint") {
					 if(item[1] != null && item[1] != "") {
 						this.serviceEndPoint = item[1];
						//RequestManager.endpointBase = item[1];
 					}
				 }
				 /*
 				 * applicationMode
 				 */
 				 if(item[0]==STORAGE_KEY + ":applicationMode") {
					 if(item[1] != null && item[1] != "") {
 						this.applicationMode = item[1]
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
	 * @return {Promise} the request
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

		let promise = RequestManager.post('meeting/start', meeting);

		/**
		 * Send request to server
		 */
		promise.then(json => {
			this.currentMeeting = json;
			this.emit('meetingstarted', this.currentMeeting);

			/**
			 * Save it to local storage
			 */
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(json));
		});

		return promise;
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

	/**
	 * Save the current meeting details to local storage
	 *
	 * @param {Meeting} meeting
	 * @return {Promise} promise
	 */
	saveCurrentMeetingToLocalStorage: function(meeting) {
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';
		return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meeting));
	},

	/**
	 * Update the meeting data to the server
	 *
	 * @url - http://[server]/[service]/api/meeting/update?[meeting]
	 *
	 * @param {Meeting} meeting
	 * @return {Promise} promise
	 */
	updateMeeting: function () {
		let promise = null;
		/**
		 * Check if any current meeting is going on
		 */
		if (this.hasActualMeeting())
		{
			promise = RequestManager.post('meeting/update', this.currentMeeting);
			promise.then(json => {
				this.currentMeeting = json;
				/**
				 * @emit the event
				 */
				this.emit('meetingupdated', this.currentMeeting);
				/**
				 * Save to local storage
				 */
				this.saveCurrentMeetingToLocalStorage(json);
			});
		}
		return promise;
	},

	/**
	 * Get the list of attendees for the meetin
	 *
	 * @url - http://[server]/[service]/api/meeting/attendees?BookedMeetingId
	 *
	 * @param {Meeting} meeting
	 * @return {Promise} promise
	 */
	getAttendees: function(meeting) {
		let promise = RequestManager.get('meeting/attendees', { meetingId: meeting.BookedMeetingId });
		return promise
	},


	/**
	 * When the participant join the meeting the advisor will press the button and call this method to start
	 * the participant to be included in the meeting
	 *
	 * @url - http://[server]/[service]/api/meeting/joinattendee
	 *
	 * @param {Participant} participant
	 * @return {Promise} promise
	 */
	joinAttendees: function(participant) {
		let promise = RequestManager.post('meeting/attendee/join', { participantId: participant.ParticipantId });
		return promise
	},

	/**
	 * Add new attendee to the meeting
	 *
	 * @url - http://[server]/[service]/api/meeting/attendee/add
	 *
	 * @param {AspNetUsers} user
	 * @param {BookedMeeting} meeting
	 * @return {Promise} promise
	 */
	addAttendee: function(user, meeting) {
		let promise = RequestManager.post('meeting/attendee/add', { user: user.UserName, meetingId: meeting.BookedMeetingId });
		return promise
	},

	/**
	 * Attendee leave the meeting
	 *
	 * @url - http://[server]/[service]/api/meeting/attendee/leave
	 *
	 * @param {Participants} participant
	 * @return {Promise} promise
	 */
	leaveAttendee: function(participant) {
		let promise = RequestManager.post('meeting/attendee/leave', participant);
		return promise
	},

	/**
	 * Transfer Meeting
	 *
	 * @url - http://[server]/[service]/api/meeting/transfer
	 *
	 * @param {BookedMeeting} meeting
	 * @param {AspNetUsers} user
	 * @return {Promise} promise
	 */
	transferMeeting: function(meeting, employee) {
		let requestParam = { BookedMeetingId: meeting.BookedMeetingId, EmployeeId: employee.UserName  };
		let promise = RequestManager.post('meeting/transfer', requestParam);
		return promise
	},

	/**
	 * Finish ongoing meeting
	 *
	 * @url - http://[server]/[service]/api/meeting/finish
	 *
	 * @return {Void} undefined
	 */
	finishCurrentMeeting: function() {
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';
		if(this.hasActualMeeting()) {
			let promise = RequestManager.post('meeting/finish', this.currentMeeting);
			promise.then(json => {
				// On response remove the current meeting from local storage
				AsyncStorage.setItem(STORAGE_KEY, "");
				// Reset the current meeting in AppStore
				this.currentMeeting = {};
				//emit meeting finished event
				this.emit('meetingfinished', this.currentMeeting);
			});
			return promise;
		}
	},

	/**
	 * Post meeting after edit is finalized
	 *
	 * @url - http://[server]/[service]/api/meeting/post
	 * @param {BookedMeeting} meeting
	 * @return {Promise} promise
	 */
	postMeeting: function(meeting) {
		let promise = RequestManager.post('meeting/confirm', meeting);
		promise.then(json => this.emit('meetingposted', json));
		return promise;
	},

	/**
	 * Post user feedback to the server
	 *
	 * @url - http://[server]/[service]/api/meeting/feedback
	 * @param {BookedMeeting} meeting
	 * @param {Number} feedback - 1,2,3,4,etc.
	 * @return {Promise} promise
	 */
	postUserFeedback: function(meeting, feedback) {
		return RequestManager.post('meeting/feedback/' + feedback, meeting);
	},

	/**
	 * alternative method for attaching the event listeners to the store
	 *
	 * @param {String} name -  the event name
	 * @param {Function} callback
	 * @return {Void} undefined
	 */
  	addEventListener: function(name, callback) {
    	this.on(name, callback);
  	},

	/**
	 * Logout the application
	 * @return {Void} undefined
	 */
  	logout: function (argument) {
	    CredentialStore.logout(() => this.emit('logout'));
  	},

	/**
	 * Check whethere an ongoing meeting is there
	 *
	 * @return {Boolean} hasMeeting
	 */
	 hasActualMeeting: function() {
  		return (this.currentMeeting != null &&
  			this.currentMeeting.ActualMeetings != undefined &&
  			this.currentMeeting.ActualMeetings.length >  0);
  	},

	/**
	 * Get the meeting id of currently ongoing meeting. If no meeting returns zero
	 * @return {Number} BookedMeetingId
	 */
  	getCurrentMeetingId: function() {
  		if(this.hasActualMeeting())
  			return this.currentMeeting.BookedMeetingId;
  		return 0;
  	},


	/**
	 * Get actual meeting id of ongoing meeting
	 * @return {Number} ActualMeetingId
	 */
  	getActualMeetingId: function() {
  		if(this.hasActualMeeting())
  			return this.currentMeeting.ActualMeetings[0].ActualMeetingId;
  		return 0;
  	},

	/**
	 * Get the available countries
	 *
	 * @url - http://[server]/[service]/api/meeting/feedback
	 * @return {Promise} promise
	 */
	getAvailableCountries: function() {
		let promise = RequestManager.get("countries");
		return promise;
	},

	/**
	 * Get the attachments for the meeting
	 *
	 * @url - http://[server]/[service]/api/meeting/attachments
	 * @param {Number} meetingId
	 * @return {Promise} promise
	 */
	getAttachments: function(meetingId) {
		let promise = RequestManager.get("meeting/attachments", { meetingId: meetingId });
		return promise;
	},

	/**
	 * Delete Selected Attachment
	 *
	 * @url - http://[server]/[service]/api/meeting/attachments/delete
	 * @param {Number} attachmentId
	 * @return {Promise} promise
	 */
	deleteAttachments: function(attachmentId) {
		let promise = RequestManager.post("meeting/attachments/delete/" + attachmentId, { AttachmentId: attachmentId });
		return promise;
	},

	/**
	 * Delete the already added attendee
	 *
	 * @url - http://[server]/[service]/api/meeting/attendee/delete
	 * @param {Number} participantId
	 * @return {Promise} promise
	 */
	deleteParticipant: function(participantId) {
		let promise = RequestManager.post("meeting/attendee/delete/" + participantId, { meetingId: participantId});
		return promise;
	},

	/**
	 * Change the logged in user status
	 *
	 * @url - http://[server]/[service]/api/user/status/change
	 * @param {Number} status
	 * @return {Promise} promise
	 */
	changeUserStatus: function(status) {
		let promise = RequestManager.post("user/status/change/", { user: '', status: '' });
		return promise;
	},

	/**
	 * Get the average feedbacks for the logged in user
	 *
	 * @url - http://[server]/[service]/api/userfeedback
	 * @return {Promise} promise
	 */
	getUserAverageFeedback: function(status) {
		let promise = RequestManager.get("userfeedback", { userName:  this.user.UserName });
		return promise;
	},

	/**
	 * Get the active survey
	 *
	 * @url - http://[server]/[service]/api/survey
	 * @return {Promise} promise
	 */
	getActiveSurvey: function() {
		let promise = RequestManager.get("surveys");
		return promise;
	},

	/**
	 * Post survey answers to the server
	 *
	 * @url - http://[server]/[service]/api/survey/post
	 * @param {Array<ClientSurveys>} survey
	 * @return {Promise} promise
	 */
	postUserSurvey: function(survey) {
		let promise = RequestManager.post("survey/post", survey);
		return promise;
	}

});
