'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */


import React, { StyleSheet, Text, View, Image, TouchableHighlight, TextInput, NativeModules, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Sidebar from '../app/sidebar';
import UserProfile from './userProfile';
import MeetingArea from './meetingArea';
import SplashScreen from '../app/splashScreen';
import MeetingIntro from './meetingIntro';

import MeetingProgress from './meetingProgress';
import PenSurface from '../ux/penSurface';

// constants
import MeetingStatus from '../../constants/meetingStatus';

// Store
import AppStore from '../../stores/appStore';

/**
 * @class Meeting
 * @extends React.Component
 *
 * Meeting Main Screen
 *
 * @props {Meeting} meeting
 * @props {Navigator} navigator
 */
export default class Meeting extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
        this.state = {
            meetingStatus: MeetingStatus.BOOKED,
            hasMeeting: false,
            meeting: {}
        };

        /**
         * Checks the props has meeting in it and current meeting is same as passed meeting.
         * And set the default state values.
         */
        if (this.props.meeting) {

            if(this.props.meeting.BookedMeetingId == AppStore.currentMeeting.BookedMeetingId)
                this.state.meetingStatus = MeetingStatus.STARTED;
            else
                this.state.meetingStatus = this.props.meeting.Status;

            this.state.hasMeeting = true;
            this.state.meeting = this.props.meeting;
        }

        /**
         * Add handler for meeting started event
         */
        AppStore.addEventListener('meetingstarted', this.onMeetingStarted.bind(this));

    }

    /**
     * Triggers when the meeting started event fired from AppStore
     *
     * @eventhandler
     * @param {Meeting} meeting
     * @return {Void} undefined
     */
    onMeetingStarted(meeting) {
        this.setState({ meetingStatus: meeting.Status, meeting: meeting });
    }

    /**
     * Handle attachment add event
     *
     * @eventhandler
     * @param {Attachment} attachment
     * @return {Void} undefined
     */

    onAttachmentAdded(attachment) {
        let meeting = this.state.meeting;

        /**
         * If the meeting does not have attachments yet add it
         */
        if(!meeting.Attachments) {
            meeting.Attachments = new Array();
        }
        // Add the attachment to local state
        meeting.Attachments.push(attachment);

        // Change the State
        this.setState({ meeting: meeting });

        // Attach file to the server
        NativeModules.MediaHelper.uploadFile(attachment.Path, meeting.BookedMeetingId.toString(), attachment.Name, "", () => {});
    }

    /**
     * Meeting center content area
     *  @return {View} component
     */
    getContentArea() {
        // if the status of meeting is booked then show introduction screen
        if(this.state.meetingStatus == MeetingStatus.BOOKED)
            return (<MeetingIntro {...this.props} />);
        // else show meeting screen
        else
            return (<MeetingArea {...this.props}
                        meeting={this.state.meeting}
                        onAttachmentAdded = {this.onAttachmentAdded.bind(this)} />);
    }

    /**
     * If there is no meeting pased as props show the notification
     *  @return {View} component
     */
    showNotification() {
        return (
            <View style={styles.container}>
                <PenSurface style={{flex:1}}/>
                <View style={{height: 100}}>
                    <TouchableHighlight onPress={()=>{
                            NativeModules.PenSurface.switchToEraserMode();
                    }}>
                         <Text>Eraser</Text>
                    </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{
                        NativeModules.PenSurface.switchToPenMode();
                    }}>
                            <Text>Pen</Text>
                        </TouchableHighlight>
                </View>
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
        let component =   (
            <View style={styles.container}>
                <Sidebar />
                <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
                    <UserProfile user={this.props.meeting.Clients} {...this.props} />
                </View>
                { this.getContentArea() }
            </View>
        );
        if(!this.state.hasMeeting) {
            component =  this.showNotification();
        }
        return component;
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
});
