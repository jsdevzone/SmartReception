'use strict';

/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */


import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'events';

import Moment from 'moment';
import RequestManager from '../core/requestManager';

/**
 * Schedule Store is flux store to load use schedules from the server 
 * and serves the incoming data to the view components.
 *
 * @class ScheduleStore
 * @extends EventEmitter
 * @store
 * @singleton
 */

var ScheduleStore = module.exports = Object.assign({}, EventEmitter.prototype, {

    /**
     * Get today's schedule for logged in user 
     *
     * @url - http://[server]/[service]/api/meeting/filter/today?employeeId={id}
     *
     * @param {Number} userId
     * @return {Promise} data
     */
     getTodaySchedules: function(userId) {
        
        let promise = RequestManager.get('meeting/filter/today', { employeeId: userId || 1 });
        promise.then( json => this.emit('todayscheduleloaded', json ));
        
        return promise;
     },

    /**
     * Get schedule of specific date
     *
     * @url - http://[server]/[service]/api/meeting/filter/date?employeeId={id}&date={date}
     *
     * @param {Date} date
     * @param {Number} userId
     * @return {Promise} data
     */
     getSchedules: function(userId, date) {
        let param = {  
            employeeId: userId || 1, 
            date: Moment(date).format("M/D/YYYY  00:00:00") 
        };

        let promise = RequestManager.get('meeting/filter/date', param);
        promise.then( json => this.emit('scheduleloaded', json ));
        
        return promise;
     },

     /**
     * Advisor starts the meeting. This sends the request to server and create ActualMeeting for current meeting
     *
     * @url - http://[server]/[service]/api/meeting/start
     *
     * @param {Meeting} meeting currentMeeting
     * @param {Function} callback
     * @return {Promise} data
     */
     startMeeting: function(meeting, callback) {
        
        let promise = RequestManager.post('meeting/start', meeting);
        promise.then( json => this.emit('meetingstarted', json ));
        
        return promise;
     }
});