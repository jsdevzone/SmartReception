/**
 * @class Meeting
 * @author Jasim
 */
'use strict';

import React, { StyleSheet, Text, View, Image, 
    TouchableHighlight, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../app/sidebar';
import UserProfile from './userProfile';
import MeetingArea from './meetingArea';
import SplashScreen from '../app/splashScreen';
import MeetingIntro from './meetingIntro';
import AppStore from '../../stores/appStore';
import MeetingStatus from '../../constants/meetingStatus';
import MeetingProgress from './meetingProgress';

class Meeting extends React.Component {
    constructor(args) {
        super(args);
        
        this.state = {
            meetingStatus: MeetingStatus.BOOKED,
            hasMeeting: false
        };

        if (this.props.meeting) {
            if(this.props.meeting.BookedMeetingId == AppStore.currentMeeting.BookedMeetingId) 
                this.state.meetingStatus = MeetingStatus.STARTED;
            else
                this.state.meetingStatus = this.props.meeting.Status;
            this.state.hasMeeting = true;
        }

        AppStore.addEventListener('meetingstarted', this.onMeetingStarted.bind(this));
    }
    onMeetingStarted(meeting) {
        this.setState({ meetingStatus: meeting.Status });
    }
    getContentArea() {
        if(this.state.meetingStatus == MeetingStatus.BOOKED) 
            return (<MeetingIntro {...this.props} />);
        else
            return (<MeetingArea {...this.props} />);
    }
    render() {
        if(this.state.hasMeeting) {
            return (
                <View style={styles.container}>
                    <Sidebar />
                    <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
                        <UserProfile user={this.props.meeting.Clients} {...this.props} />
                        <MeetingProgress meeting={this.props.meeting} />
                    </View>
                    { this.getContentArea() }
                </View>
            );
        }
        else {
            return (
                <View><Text>Please select a meeting</Text></View>
            );
        }
    }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
});

module.exports = Meeting;
