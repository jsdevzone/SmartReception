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

import React, { StyleSheet, Text, View, Image, TouchableWithoutFeedback,
    TouchableNativeFeedback, ListView, TouchableHighlight, NativeModules, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

/**
 * App components
 */
import Meeting from '../meeting/meeting';
import LoadMask from '../app/loadMask';
import ScheduleList from '../schedule/scheduleList';
/**
 * Stores
 */
import RouteStore from '../../stores/routeStore';
import ScheduleStore from '../../stores/scheduleStore';
import AppStore from '../../stores/appStore';

/**
 * @class ScheduleList
 * @extend Rect.Component
 *
 * This class renders the list of notifications for today, tomorrow and day after tomorrow
 * on right side of the  dashboard screen.
 *
 * @props {Navigator} navigator
 */
export default class Notifications extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        // ListView data source object
        this.listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            selectedTabIndex: 0,
            dataSource: this.listDataSource.cloneWithRows([]),
            isLoading: true,
            pendingCounts: {
                pending: 0,
                finished: 0
            }
        };

        /**
         * Add event listener to meetingstarted event. This list should be
         * reloaded with updated data whenever the user starts the meeting.
         */
        AppStore.addEventListener('meetingstarted', this.reloadMeetingList.bind(this));

        /**
         * Add event listener to meetingfinished event. This list should be
         * reloaded with updated data whenever the user finish the meeting.
         */
        AppStore.addEventListener('meetingfinished', this.reloadMeetingList.bind(this));
        /**
         * Add event listener to actualMeetingupdated event. This list should be
         * reloaded with updated data whenever the user updates the current meeting data.
         */
        AppStore.addEventListener('actualMeetingupdated', this.reloadMeetingList.bind(this));
        /**
         * Add event listener to actualMeetingupdated event. This list should be
         * reloaded with updated data whenever the user post the meeting with final changes
         */
        AppStore.addEventListener('meetingposted', this.reloadMeetingList.bind(this));

        /*
         * Load todays schedule
         */
         this.reloadMeetingList();
    }

    /**
     * Reloads todays meeting list
     * @return {Void} undefined
     */
    reloadMeetingList() {
        this.getSchedules(new Date());
    }

    /**
     * Loads the schedules to list of specific days
     * @param {Date} date
     * @return {Void} undefined
     */
    getSchedules(date) {
        ScheduleStore
            .getSchedules(AppStore.user.UserName || 1, date)
            .then(this.onScheduleLoaded.bind(this));
    }

    /**
     *  Life cycle method
     *  This method will be called when the component is mounted to the application
     *  See React Js componentDidMount method.
     *
     *  @lifecycle
     *  @return {Void} undefined
     */
    componentDidMount() {
        ScheduleStore.getScheduleCount(AppStore.user.UserName || 1).then(this.updatePendingCount.bind(this))
    }

    /**
     * Updates the count of pending in the top most part
     * @param {Object} obj
     * @return {Void} undefined
     */
    updatePendingCount(obj) {
        this.setState({ pendingCounts: { pending: obj.Pending, finished: obj.Finished }});
    }

    /**
     * Event handler for schedule loaded from the server.
     *
     * @eventhandler
     * @param {Array<Meetings>} data
     * @return {Void} undefined
     */
    onScheduleLoaded(data) {
        this.setState({ isLoading:false, dataSource: this.listDataSource.cloneWithRows(data) });
    }


    /**
     * Handles list item press on the schedule list. Navigates to meeting screen.
     *
     * @param {Meeting} meeting
     * @return {Void} undefined
     */
    onSchedulePress(meeting) {
        if(this.props.navigator) {
           let route = RouteStore.get('meeting');
            if(route) {
                route.props = { meeting: meeting };
                this.props.navigator.push(route);
            }
        }
    }

    /**
     * Handles tab press event. changes the current state selected index and loads
     * data from the server based on the tab
     *
     * @param {Number} idx
     * @return {Void} undefined
     */
    onTabPress(idx) {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();
        /**
         * Caclulate the date and get the schedules
         */
        let date = Moment().add(idx, 'days')._d;
        this.setState({ selectedTabIndex: idx, isLoading: true });
        this.getSchedules(date);
    }

    /**
     * Renders the current date and user status on top of the container
     * @return {View} component
     */
    renderUserStatus() {
        let _today = Moment().format('MMMM Do YYYY h:mm:ss a');
        let _iconStyle = { color: '#1fa67a', marginRight: 4 };
        let _statusStyle = { fontSize: 14 };

        return (
            <View style={styles.statusContainer}>
                <View style={styles.visibility}>
                    <Icon name="check-circle" size={20}  style={_iconStyle} />
                    <Text style={_statusStyle}>Online since - {_today}</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>

                </View>

            </View>
        );
    }

    /**
     * Renders any notification counts to the top of tile
     * @return {View} component
     */
    renderNotificationCounts() {
        return (
            <View style={styles.counterContainer}>
                <NotificationCount count={this.state.pendingCounts.pending} text="Today's Pending" />
                <NotificationCount count={this.state.pendingCounts.finished} text="Total Finished" />
            </View>
        );
    }

    /**
     * renders a tab like views
     * @return {View} tabstrip
     */
    renderTabStrip() {
        return (
            <View style={styles.tabStripWrapper}>
                <TouchableHighlight onPress={this.onTabPress.bind(this, 0)} style={styles.tabWrapper}>
                    <View style={[styles.tab, this.state.selectedTabIndex == 0 ? styles.tabSelected : null]}>
                        <Text style={styles.tabText}>Today</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onTabPress.bind(this, 1)} style={styles.tabWrapper}>
                    <View style={[styles.tab, this.state.selectedTabIndex == 1 ? styles.tabSelected : null]}>
                        <Text style={styles.tabText}>{Moment().add(1, 'days').format('dddd')}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onTabPress.bind(this, 2)} style={styles.tabWrapper}>
                    <View style={[styles.tab, this.state.selectedTabIndex == 2 ? styles.tabSelected : null]}>
                        <Text style={styles.tabText}>{Moment().add(2, 'days').format('dddd')}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {View} component
     */
    render() {

        let _separator = require('../../../resources/images/fancy_separator.png');
        let _component = (<ScheduleList {...this.props}
                                dataSource = {this.state.dataSource}
                                onSchedulePress={this.onSchedulePress.bind(this)}/>);

         //If data is loading show loading screen inorder to block further interactions on componenr
         if(this.state.isLoading)
            _component = (<LoadMask />);

        return (
            <View style={styles.notificationTile}>
                { this.renderUserStatus() }
                { this.renderNotificationCounts() }
                <Image source={_separator} style={{width: 350, height: 30}} />
                { this.renderTabStrip() }
                { _component }
            </View>
        );
    }
}

/**
 * Creates a component which displays the count on top of notification tile
 * @class NotificationCount
 * @extends React.Component
 *
 * @props icon
 * @props count
 * @props text
 */
class NotificationCount extends React.Component {
    /**
     * @render
     * @return {Component} undefined
     */
    render() {
        let _icon = this.props.icon || 'calendar';
        return (
            <View style={styles.counter}>
                <View style={{flexDirection:'row'}}>
                    <Icon name={_icon} size={15} />
                    <Text style={{ marginLeft: 5, fontStyle: 'bold', color: '#423E39' }}>{this.props.count}</Text>
                 </View>
                 <View>
                    <Text style={{color:'#AEA3B0', size: 6}}>{this.props.text}</Text>
                 </View>
              </View>
        );
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
    notificationTile: {
        flexDirection:'column',
        alignItems:'stretch',
        flex: 1
    },
    statusContainer: {
      flexDirection:'row',
      padding: 10,
    },
    visibility: {
        padding: 2,
        fontSize: 12,
        marginLeft: 10,
        flexDirection: 'row'
    },
    counterContainer: {
        padding: 15,
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 25,
    },
    counter: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    tabStripWrapper: {
        flexDirection: 'row',
        backgroundColor: '#5C6BC0',
        borderTopColor: '#7481CE',
        borderTopWidth: 1
    },
    tabWrapper: {
        flex: 1
    },
    tab: {
        padding: 13,
        alignItems: 'center',
        flex: 1
    },
    tabText: {
        color: '#FFF'
    },
    tabSelected: {
        backgroundColor: '#5361AD'
    }
});
