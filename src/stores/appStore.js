'use strict';

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';
import AppConstants from '../constants/appConstants';
import CredentialStore from './credentialStore';
import MeetingStatus from '../constants/meetingStatus';
import RequestManager from '../core/requestManager';

var AppStore = Object.assign({}, EventEmitter.prototype, {
	user: {},
	currentMeeting: {},
	actualMeeting: {},
	meetingAreas: [
		"Room 1", "Room 2", "Room 3", "Waiting Area"
	],
	copyOptions: [ "Append To Exisiting", "Replace Exisiting", "Prepend To Exisiting"],
	loadAppSettings: function() {
		const STORAGE_KEY = AppConstants.storageKey ;
		AsyncStorage.multiGet([ STORAGE_KEY + ':currentMeeting', STORAGE_KEY + ':user', ]).then((data) => {
			let _settings = {};

			data.forEach((item) => {
				if(item[0] == STORAGE_KEY + ":user") {
					if(item[1] != null && item[1] != '') {
						_settings.user = { name:'Muhammed Jasim', profession:'Sr. Software Developer' };
						_settings.isAuthenticated = true;
					}
				}
				if(item[0] == STORAGE_KEY + ":currentMeeting") {
					if(item[1] != null && item[1] != "") {
						this.currentMeeting = JSON.parse(item[1])
						_settings.currentMeeting = this.currentMeeting;
					}
				}
			})

			this.emit('appsettingsloaded', _settings);
		});
	},
	startMeeting: function (_meeting, _roomNo) {
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';
		this.currentMeeting = _meeting;
		this.currentMeeting.status = MeetingStatus.STARTED;
		RequestManager.post('meeting/start', _meeting).then((json) => {
			this.currentMeeting = json;
        	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(json));
			this.emit('meetingstarted', this.currentMeeting);
		});
	},
	updateActualMeeting: function(meeting) {
		RequestManager.post('meeting/update', meeting).then(json => {
			if(this.currentMeeting && (this.currentMeeting.BookedMeetingId == meeting.BookedMeetingId)) {
				this.currentMeeting = json;
				this.saveCurrentMeetingToLocalStorage(json)
			}
			this.emit('actualMeetingupdated', json);
		});
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

module.exports = AppStore;
