'use strict';

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';
import AppConstants from '../constants/appConstants';
import CredentialStore from './credentialStore';

var AppStore = Object.assign({}, EventEmitter.prototype, {
		user: null,
		currentMeeting: null,
		loadAppSettings: function() {
				CredentialStore.isAuthenticated().then((authenticated) => {
						let _settings = {
								isAuthenticated: authenticated,
								user: { name: 'Muhammed Jasim', profession: 'Fullstack Developer' },
						};
						this.emit('appsettingsloaded', _settings);
				});
		},
		startMeeting: function (meeting) {
				this.currentMeeting = meeting;
				this.emit('meetingstarted', meeting);
		},
    addEventListener: function(name, callback) {
        this.on(name, callback);
    },
    logout: function (argument) {
        CredentialStore.logout(() => this.emit('logout'));
    }
});

module.exports = AppStore;