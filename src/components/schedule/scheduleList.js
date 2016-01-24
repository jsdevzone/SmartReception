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

import React, { StyleSheet, Text, View, TouchableHighlight, ListView, Image, NativeModules, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

//Custom Application Components
import { getRandomColor } from '../../utils/util';

// Store
import AppStore from '../../stores/appStore';
import ScheduleStore from '../../stores/scheduleStore';

/**
 * @class ScheduleList
 * @extends React.Component
 *
 * List of schedules
 *
 * @props {DataSource} dataSource
 * @props {Boolean}  showSeparator
 * @props {Function} onSchedulePress
 */
export default class ScheduleList extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {View} undefined
     */
    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.props.dataSource} renderRow={this.renderRow.bind(this)} style={{flex: 1}} />
            </View>
        );
    }

    /**
     * On Schedule Item press
     *
     * @eventhandler
     * @param {Object} rowData
     * @return {Void} undefined
     */
    onScheuleItemPress(rowData) {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();
        /**
         * execute on press event passed through the props
         */
        if(this.props.onSchedulePress)
            this.props.onSchedulePress(rowData);
    }

    /**
     * Checks the passed meeting is on going meeting
     * @param {BookedMeeting} meeting
     * @return {Boolean} isOngoing
     */
    isOngoingMeeting(meeting) {
        return AppStore.getCurrentMeetingId() == meeting.BookedMeetingId;
    }

    /**
     * Check the meeting is already finished.
     * @param {BookedMeeting} meeting
     * @return {Boolean} isFinished
     */
    isFinished(meeting) {
        return meeting.ActualMeetings != undefined &&
            meeting.ActualMeetings.length > 0 &&
            meeting.ActualMeetings[0].MeetingStartTime != null&&
            meeting.ActualMeetings[0].MeetingEndTime != null;
    }

    /**
     * Checks the meeting is delayed or not
     * @param {BookedMeeting} meeting
     * @return {Boolean} isDelayed
     */
    isDelayed(meeting) {
        let hasActualMeeting = meeting.ActualMeetings && meeting.ActualMeetings.length > 0;
        if(!hasActualMeeting)
        {
            let startTime = new Date(meeting.DateOfMeeting);
            startTime.setHours(startTime.getHours() - 4);
            startTime = Moment(startTime);
            let now = Moment(new Date());
            let difference = now.diff(startTime, 'minutes');
            return difference > 30;
        }
        return false;
    }

    /**
     * Transforms each row of list view. [See ListView for more details]
     *
     * @param {Object} rowData
     * @param {Number} sectionID
     * @param {Number} rowID
     */
    renderRow(rowData, sectionID: number, rowID: number) {
        var isFinished = this.isFinished(rowData);
        var showSeparator = this.props.showSeparator ? { borderBottomColor: '#F9F9F9', borderBottomWidth: 1 }: {};
        var timeComponent = (<Text style={[styles.time, { color: isFinished ? '#CCC': '#A1A1A1'}]}>{Moment.utc(rowData.DateOfMeeting).format('h:mmA')}</Text>);
        var photo = (
            <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg' }} style={styles.profileImage} />
        );

        // If the client does have the photo use it
        if(rowData.Clients && rowData.Clients.Photo)
            photo =(<Image source={{uri: rowData.Clients.Photo }} style={styles.profileImage} />);

        else {
            let color = isFinished ? '#E2E2E2' :  getRandomColor();
            // If the client does not have the photo use the first letter of name as profile picture
            photo =(
                <View style={[styles.profileImage, {backgroundColor: color}]}>
                    <Text style={styles.profileText}>{rowData.Clients.FirstName.substr(0,1)}</Text>
                </View>
            );
        }
        /*
         * If the meeting is on going meeting, then hide the time
         */
        if(this.isOngoingMeeting(rowData)) {
            timeComponent = (
                <View style={styles.onGoing}>
                    <Text style={styles.onGoingText}>Ongoing</Text>
                </View>
            );
        }

        if(this.isDelayed(rowData)) {
            timeComponent = (
                <View>
                    <Text style={[styles.time, { color:'#ba3536'}]}>{Moment.utc(rowData.DateOfMeeting).format('h:mmA')}</Text>
                    <Text style={[styles.time, { color:'#ba3536'}]}>Delayed</Text>
                </View>
            );
        }

        return (
            <TouchableHighlight underlayColor="#C6C7EA" onPress={() => this.onScheuleItemPress(rowData) }>
                <View style={[styles.listItem, showSeparator ]}>
                    {photo}
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: isFinished ? '#CCC': '#000'}]}>{ rowData.Clients.FirstName + " " +rowData.Clients.LastName }</Text>
                        <Text style={[styles.position, { color: isFinished ? '#CCC': '#A1A1A1'}]}>{rowData.Clients.Position }</Text>
                    </View>
                    <View style={styles.timeWrapper}>
                        { timeComponent }
                    </View>
                </View>
           </TouchableHighlight>
       );
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    listItem: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 25
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileInfo: {
        flexDirection: 'column',
        marginLeft: 14,
        paddingTop: 10,
        flex: 1
    },
    profileName: {
        color:'#000',
        fontSize: 15
    },
    time: {
        color:'#999',
    },
    position: {
        color:"#A1A1A1"
    },
    timeWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingTop:15
    },
    profileText: {
        color: '#FFF',
        fontSize: 25
    },
    onGoing: {
        borderColor: '#7FC37F',
        borderWidth: 1,
        padding: 5,
        color:'#7FC37F',
        marginTop: -1,
        borderRadius: 4
    },
    onGoingText: {
        color: '#7FC37F'
    }
});
