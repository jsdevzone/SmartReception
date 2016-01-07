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
 * User Store is flux store to load app user related data from the server
 * and serves the incoming data to the view components.
 *
 * @class UserStore
 * @extends EventEmitter
 * @store
 * @singleton
 */
var UserStore = module.exports = Object.assign({}, EventEmitter.prototype, {

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
     * Loads client details from the server.
     *
     * @url - http://[server]/[service]/api/client?id={userId}
     *
     * @param {Number} userId
     * @return {Promise} data
     */
    getUserDetails: function(userId) {
        let promise =  RequestManager.get('client', { id: userId || 1});
        return promise;
    },

    /**
     * Loads upcoming meeting of this user
     *
     * @url - http://[server]/[service]/api/meeting/upcoming?employeeId={id}
     *
     * @param {Number} userId
     * @return {Promise} data
     */
    getUpcomingMeeting: function(userId) {
        let promise = RequestManager.get('meeting/upcoming', { employeeId: userId || 1});
        promise.then( json => { this.emit('nextmeetingloaded', json) });
        return promise;
    },

    /**
     * Loads the preious meeting of the client
     *
     * @url - http://[server]/[service]/api/meeting/history?clientId={id}
     *
     * @param {Number} userId
     * @return {Promise} data
     */
    getPreviousSchedule: function(clientId) {
        let promise = RequestManager.get('meeting/history', { employeeId: 1, clientId: clientId });
        promise.then(json => this.emit('historyloaded', json));
        return promise;
    }
});
/*

var employeeId = 1;



class UserStore extends AbstractStore {
    constructor() {
        super();
    }

    getUserDetails(userId) {

        fetch('http://192.168.4.77/SmartReception.Service/api/client?id=' + userId)
  .then((response) => response.json())
  .then((json) => {
    this.fireEvent('userloaded', json);
  })
  .catch((error) => {
    console.warn(error);
  });
    }

    getHistory() {
        fetch('http://192.168.4.77/SmartReception.Service/api/client/history')
  .then((response) => response.json())
  .then((json) => {
    this.fireEvent('historyloaded', json);
  })
  .catch((error) => {
    console.warn(error);
  });
    }

    getPreviousSchedule(clientId) {
        this.get('meeting/history', { employeeId: 1, clientId: clientId }).then((json) => {
            this.emit('historyloaded', json);
        });
    }

    getNextMeeting() {
        this.get('meeting/upcoming', { employeeId: 1 }).then((json) => {
            this.emit('nextmeetingloaded', json);
        });
    }

}

module.exports = UserStore;
*/
