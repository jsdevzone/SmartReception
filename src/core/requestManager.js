'use strict';
import DialogAndroid from 'react-native-dialogs';
var RequestManager = {
	endpointBase: 'http://192.168.4.77/SmartReception.Service/api/',
    //endpointBase: 'http://smartreception.egovservice.com/services/api/',

	get: function(action, params) {
		let url = this.endpointBase + action;
        if(params) {
            var querystring = Object.keys(params)
                .map(key => key + '=' + encodeURIComponent(params[key]))
                .join('&');

            url = url + '?' + querystring;
        }
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                resolve(response.json());
            })
            .catch((error) => {
                if(reject)
                    reject(error);
            })
        });
	},
	post: function(action, params) {
		let url = this.endpointBase + action;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            .then((response) => resolve(response.json()))
            .catch((error) => {
                if(reject)
                    reject(error);
            })
        });
	}
};
module.exports = RequestManager;
