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
	loadAppSettings: function() {
		const STORAGE_KEY = AppConstants.storageKey ;
		AsyncStorage.multiGet([ STORAGE_KEY + ':currentMeeting', STORAGE_KEY + ':user', ]).then((data) => {
			let _settings = {
				isAuthenticated: data[1][1] != null && data[1][1] != '',
				user: { name: 'Muhammed Jasim', profession: 'Fullstack Developer' },
			};
			if(data[0][1] != null && data[0][1] != '') {
				this.currentMeeting = JSON.parse(data[0][1])
				_settings.currentMeeting = this.currentMeeting;
				_settings.user.name = this.currentMeeting.Clients.FirstName + this.currentMeeting.Clients.LastName
			}
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
	updateMeeting: function () {
		const STORAGE_KEY = AppConstants.storageKey + ':currentMeeting';
		if(this.currentMeeting && this.currentMeeting.ActualMeetings && this.currentMeeting.ActualMeetings.length > 0) {
			RequestManager.post('meeting/update', this.currentMeeting).then((json) => {
				AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(json));
				this.currentMeeting = json;
				this.emit('meetingupdated', this.currentMeeting);
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
  addEventListener: function(name, callback) {
    this.on(name, callback);
  },
  logout: function (argument) {
    CredentialStore.logout(() => this.emit('logout'));
  }
});

module.exports = AppStore;