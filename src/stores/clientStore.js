'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';

import RequestManager from '../core/requestManager';

/**
 * Client Store is flux store to load client related data from the server
 * and serves the incoming data to the view components. This store is responsible for loading
 * all the client related data.
 *
 * @class ClientStore
 * @extends EventEmitter
 * @store
 * @singleton
 */
var ClientStore = module.exports = Object.assign({}, EventEmitter.prototype, {

	/**
	 * Get the list of meetings of specific clients
	 *
	 * @url - http://[server]/[service]/api/meeting/byclient?clientIdentity={identity}
	 *
	 * @param {String} identity client identity
	 * @return {Promise} data
	 */
	getClientMeeting: function(identity) {
		let promise = RequestManager.get('meeting/byclient', { clientIdentity: identity});
		return promise;
	},

	/**
	 * Updates the client contact details on the server.
	 *
	 * @url - http://[server]/[service]/api/client/updatecontact?client={client}
	 *
	 * @param {Client} client
	 * @return {Promise} data
	 */
	updateClientContacts: function(client) {
		let promise = RequestManager.post('client/updatecontact', client);
		return promise;
	},

	/**
	 * Register new client to the server
	 *
	 * @url - http://[server]/[service]/api/client/register?client={client}
	 *
	 * @param {Client} client
	 * @return {Promise} data
	 */
	registerClient: function(client) {
		let promise =  RequestManager.post('client/register', client);
		return promise;
	},

	/**
	 * Register new client temporary to the server
	 *
	 * @url - http://[server]/[service]/api/client/register_temp?client={client}
	 *
	 * @param {Client} client
	 * @return {Promise} data
	 */
	registerClientTemporary: function(client) {
		let promise =  RequestManager.post('client/register_temp', client);
		return promise;
	},

	/**
	 * Get the list of clients
	 *
	 * @url - http://[server]/[service]/api/client/filter?filter={filter}
	 *
	 * @param {String} filter name of the client
	 * @return {Promise} data
	 */
	getClients: function(filter) {
		let promise = RequestManager.get('client/filter', { filter: filter || '' });
		promise.then(clients => { this.emit('clientlistloaded', clients); });
		return promise;
	},

	/**
     * Add the event listener for this object
     * @param {String} evt the event name
     * @param {Function} callback, the callback function that should be triggered.
     * @return {Void} undefined
     */
	addEventListener: function(evt, callback) {
		this.on(evt, callback);
	}
});
