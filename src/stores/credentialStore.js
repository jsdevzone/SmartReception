'use strict';

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';
import AppConstants from '../constants/appConstants';

var CredentialStore = Object.assign({}, EventEmitter.prototype, {
    isAuthnticated: function() {
        const STORATE_KEY = AppConstants + ':user';
        return AsyncStorage.getItem(STORATE_KEY);
    },
    authenticate: function(user) {
        const STORATE_KEY = AppConstants + ':user';
        AsyncStorage.setItem(STORATE_KEY, user.username).then(() => {
            this.emit('authenticated');
        });
    },
    addListener: function(name, callback) {
        this.on(name, callback);
    },
    addEventListener: function(name, callback) {
        this.on(name, callback);
    },
    logout: function (callback) {
        const STORATE_KEY = AppConstants + ':user';
         AsyncStorage.removeItem(STORATE_KEY).then(() => {
             if(callback)
                callback();
            else 
                this.emit('logout');
        });
    }
});

module.exports = CredentialStore;
