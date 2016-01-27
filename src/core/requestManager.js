'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Credential Store is flux store to manage the authentication and user Credentials between the server and client app.
 *
 * @class RequestManager
 * @extends Object
 * @helper
 * @singleton
 */

import { ToastAndroid } from 'react-native';

var RequestManager = module.exports = {

	// local address
	endpointBase: 'http://192.168.4.77/SmartReception.Service/api/',

	// remote server address
    //endpointBase: 'http://smartreception.egovservice.com/services/api/',

	/**
	 * Authentication header, should sent for each request.
	 */
	authHeader: {},

	/**
	 * Send request to server to generate the token
	 * @param {User} user - object with username and password
	 * @return {Promise} promise
	 */
	get: function(action, params) {
		if(!action)
			throw new Error('The parameter action is mandatory');

		let url = this.endpointBase + action;

		if(params) {
			var querystring = Object.keys(params)
				.map(key => key + '=' + encodeURIComponent(params[key]))
				.join('&');

			url = url + '?' + querystring;
		}

		let header = Object.assign({}, {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}, RequestManager.authHeader);

		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET',
				headers: header
			})
			.then((response) => {
				if(response != null && response != undefined)
					resolve(response.json())
				else
					resolve(undefined)
			})
			.catch((error) => {
				if(reject)
					reject(error);
			})
		});
	},

	/**
	 * Send request to server to generate the token
	 * @param {User} user - object with username and password
	 * @return {Promise} promise
	 */
	post: function(action, params) {
		let url = this.endpointBase + action;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
				headers: Object.assign({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, RequestManager.authHeader)	,
                body: JSON.stringify(params)
            })
            .then((response) => resolve(response.json()))
            .catch((error) =>
			{
                if(reject)
                    reject(error);
            });
        });
	},

	/**
	 * Send request to server to generate the token
	 * @param {User} user - object with username and password
	 * @return {Promise} promise
	 */
	getToken: function(user) {
		let url = this.endpointBase.replace("api/", "token");

		// add grant type to the parameter object
		user.grant_type = 'password';


		let querystring = "";
		if(user) {
            querystring = Object.keys(user)
                .map(key => key + '=' + encodeURIComponent(user[key]))
                .join('&');
        }

		// Create a new promise
        return new Promise((resolve, reject) => {
            fetch(url, {
				credentials: 'include',
                method: 'POST',
                headers: {
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: querystring
            })
            .then(response => {
				resolve(response.json());
			})
			.catch((error) =>
			{
                if(reject)
                    reject(error);
            });
        });
	}
};
