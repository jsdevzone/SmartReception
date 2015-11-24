
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../app/sidebar';
import CalendarView from '../ux/calendar';
import ScheduleList from './scheduleList';

var { View, Text, StyleSheet, Component, ListView, TouchableHighlight,} = React;

class ScheduleSidebar extends Component {
    constructor(args) {
        super(args);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Icon name="calendar" color="#BCCFE7" size={16} />
                    <Text style={styles.titleText}> Schedule </Text>
                </View>
                <View style={styles.calendarWrapper}>
                    <CalendarView style={{flex: 1, width: 250, height: 280}} />
                </View>
                <View style={styles.today}>
                    <Icon name="calendar" size={18} />
                    <Text>Today, May 25, 2015</Text>
                </View>
                <ScheduleList />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: 250,
        backgroundColor: '#F7F8FC',
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1
    },
    titleBar: {
        padding: 10,
        borderBottomColor: '#C4D3E7',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    titleText: {
        color: '#5075B2',
        fontWeight: 'bold'
    },
    calendarWrapper: {
        backgroundColor: '#F7F8FC',
        padding: 10,
        paddingTop: 0,
        borderBottomColor: '#C4D3E7',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    today: {
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: '#C4D3E7',
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        padding: 12,
        paddingLeft: 15
    },
    separator: {
        height: 1,
        backgroundColor: '#C4D3E7',
    },
    text: {
        flex: 1,
    },
    time: {
        marginRight: 15
    },
});

module.exports = ScheduleSidebar;
