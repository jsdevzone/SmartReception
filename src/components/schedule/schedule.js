
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../app/sidebar';
import ScheduleList from './scheduleList';
import UserProfile from '../meeting/userProfile';
import MeetingArea from '../meeting/meetingArea';
import ScheduleSidebar from './scheduleSidebar';

var { View, Text, StyleSheet, Component, } = React;

class Schedule extends Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <Sidebar />
                <ScheduleSidebar />
                <MeetingArea style={{flex: 1}}></MeetingArea>
                <UserProfile />
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

module.exports = Schedule;
