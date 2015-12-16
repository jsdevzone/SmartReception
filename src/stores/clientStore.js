'use strict';

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';
import AppConstants from '../constants/appConstants';
import RequestManager from '../core/requestManager';

var ClientStore = Object.assign({}, EventEmitter.prototype, {
	getClientMeeting: function(identity) {
		return RequestManager.get('meeting/byclient', { clientIdentity: identity});
	},
	updateClientContacts: function(client) {
		return RequestManager.post('client/updatecontact', client);
	},
	registerClient: function(client) {
		return RequestManager.post('client/register', client);
	},
	getClients: function(filter) {
		return RequestManager.get('client/filter', { filter: filter != undefined ? filter : '' }).then(clients => {
			this.emit('clientlistloaded', clients);
		});
	},
	addEventListener: function(evt, callback) {
		this.on(evt, callback);
	}
});

module.exports = ClientStore;
