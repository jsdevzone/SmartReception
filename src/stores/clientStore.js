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
	 * Get the list of meetings of specific clients with employee details
	 *
	 * @url - http://[server]/[service]/api/meeting/byclientwithemployee?clientIdentity={identity}
	 *
	 * @param {String} identity client identity
	 * @return {Promise} data
	 */
	getClientMeetingWithEmployee: function(identity) {
		let promise = RequestManager.get('meeting/byclientwithemployee', { clientIdentity: identity});
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
	 * Get the details of clint by emirates id no
	 * @url - http://[server]/[service]/api/client/filter?filter={filter}
	 *
	 * @param {String} filter name of the client
	 * @return {Promise} data
	 */
	getByIdentity: function(identity) {
		let promise = RequestManager.get('client/identity', { identity: identity });
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
	},

	/**
	 * Get the details of clint by emirates id no
	 * @url - http://[server]/[service]/api/client/filter?filter={filter}
	 *
	 * @param {String} filter name of the client
	 * @return {Promise} data
	 */
	loginClient: function(identity) {
		let promise = RequestManager.get('client/proceed', { clientId: identity });
		return promise;
	},

	/**
	 * Get the list of the departments
	 * @url - http://[server]/[service]/api/client/departments
	 *
	 * @return {Promise} data
	 */
	getDepartments: function() {
		let promise = RequestManager.get('client/departments');
		return promise;
	},

	/**
	 * Get the list of the employees in a department
	 * @url - http://[server]/[service]/api/client/department/employees
	 *
	 * @param {Number} departmentId
	 * @return {Promise} data
	 */
	getDepartmentEmployees: function(departmentId) {
		let promise = RequestManager.get('client/department/employees',  { departmentId: departmentId });
		return promise;
	},

	/**
	 * Get the list of the available employees in a department
	 * @url - http://[server]/[service]/api/client/department/availablemployees
	 *
	 * @param {Number} departmentId
	 * @return {Promise} data
	 */
	getAvailableDepartmentEmployees: function(departmentId) {
		let promise = RequestManager.get('client/department/availablemployees',  { departmentId: departmentId });
		return promise;
	},
});
