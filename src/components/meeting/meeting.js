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

class Meeting extends React.Component {
    constructor(args) {
        super(args);
        let _status = MeetingStatus.BOOKED;
        if(this.props.meeting.BookedMeetingId == AppStore.currentMeeting.BookedMeetingId) {
           _status = MeetingStatus.STARTED;
        }
        else {
            _status = this.props.meeting.status
        }
        this.state = {
            meetingStatus: _status
        };
        AppStore.addEventListener('meetingstarted', this.onMeetingStarted.bind(this));
    }
    onMeetingStarted(meeting) {
        this.setState({ meetingStatus: meeting.status });
    }
    render() {
        let Component = this.state.meetingStatus == MeetingStatus.BOOKED ?  MeetingIntro : MeetingArea;
        return (
            <View style={styles.container}>
                <Sidebar />
                <UserProfile user={this.props.meeting.Clients} {...this.props} />
                <Component {...this.props} />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        flexDirection: 'row'
    },
});

module.exports = Meeting;
