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
import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';

import AppConstants from '../constants/appConstants';
import RequestManager from '../core/requestManager';

/**
 * Credential Store is flux store to manage the authentication and user Credentials between the server and client app.
 *
 * @class CredentialStore
 * @extends EventEmitter
 * @store
 * @singleton
 */
var CredentialStore = module.exports = Object.assign({}, EventEmitter.prototype, {

    /**
     * Checks whether user is authenticated. Checking the local storage for the token
     *
     * @return {Promise} data
     */
    isAuthenticated: function() {
       const STORATE_KEY = AppConstants.storageKey + ':user';
        return AsyncStorage.getItem(STORATE_KEY);
    },


   /**
    * authenticate the user, request for token
    *
    * @url - http://[server]/[service]/token
    *
    * @param {User} user - the user object with username and password.
    * @return {Promise} data
    */
    authenticate: function(user) {
        const STORATE_KEY = AppConstants.storageKey + ':user';

        return new Promise((resolve, reject) => {
            /**
            * Construct the request
            */
            let promise = RequestManager.getToken(user);
            /**
            * Process the response
            */
            promise.then( json => {
                if(json && json.access_token != null && json.access_token != undefined) {
                    /**
                     * Set the auth header to RequestManager. So that every sub sequent request will include it.
                     */
                     RequestManager.authHeader = {
                         Authorization: 'Bearer ' + json.access_token
                     };
                    /**
                     * Load the user information from the server
                     */
                     this.getUserInformation(json);
                }
                else {
                    // only for testing
                    this.emit('authenticated', { success: false });
                }
            });
        });
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
     * Logout the application
     * @param {Function} callback, the callback function that should be triggered.
     * @return {Void} undefined
     */
    logout: function (callback) {
        const STORATE_KEY = AppConstants.storageKey + ':user';
        AsyncStorage.removeItem(STORATE_KEY).then(() => {
             if(callback)
                callback();
            else
                this.emit('logout');
        });
    },

    /**
     * After authenticated request for user information
     * @param {Object} the user and token information to pass
     * @return {Promise} promise
     */
    getUserInformation: function (json) {
        const STORATE_KEY = AppConstants.storageKey + ':user';

        /**
         * Request for user information
         */
        RequestManager
            .get('userinfo', { username: json.userName})
            .then(user => {
                // combine user data and auth data together into single object
                Object.assign(json, user, { success: true })

                let data = JSON.stringify(json);
                /**
                 * Save the generated token and user information to the local storage
                 */
                AsyncStorage.setItem(STORATE_KEY, data, () => {
                    this.emit('authenticated', json);
                });
            });
    }
});
