
import React, { View, Text, StyleSheet, Component, ListView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../app/sidebar';
import ScheduleList from './scheduleList';
import UserProfile from '../meeting/userProfile';
import MeetingArea from '../meeting/meetingArea';
import ScheduleSidebar from './scheduleSidebar';
import ScheduleStore from '../../stores/scheduleStore';

class Schedule extends Component {
    constructor(args) {
        super(args);

        this.store = new ScheduleStore();
        this.store.addEventListener('scheduleloaded', this.onScheduleLoaded.bind(this));

        let _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: _dataSource,
            dataSourceWithData: _dataSource.cloneWithRows([]),
            user: {
                Companies: {},
                Countries: {}
            }
        };

        this.store.getSchedule(new Date())
    }
    onScheduleLoaded(data) {
        this.setState({ 
            dataSource: this.state.dataSource.cloneWithRows(data),
            user: data[0].Clients
        });
    }
    onSchedulePress(schedule) {
        this.setState({ user: schedule.Clients });
    }
    render() {
        return (
            <View style={styles.container}>
                <Sidebar />
                <ScheduleSidebar dataSource={this.state.dataSource} onSchedulePress={this.onSchedulePress.bind(this)} />
                <View style={{flex:1}}>
                </View>
                <UserProfile user={this.state.user} />
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
