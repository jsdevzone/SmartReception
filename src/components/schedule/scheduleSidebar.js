
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../app/sidebar';
import Calendar from '../ux/calendar';
import ScheduleList from './scheduleList';
import Moment from 'moment'

var { View, Text, StyleSheet, Component, ListView, TouchableHighlight,} = React;

class ScheduleSidebar extends Component {
    constructor(args) {
        super(args);
        this.state = {
            today: Moment()
        }
    }
    render() {
        var customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return (
            <View style={styles.container}>
                <View style={[styles.panel, styles.calendarWrapper]}>
                    <Calendar onDaySelected={this.props.onDaySelected} />
                </View>
                <View style={[styles.panel, styles.today]}>
                    <Icon name="calendar" size={18} />
                    <Text>{this.props.scheduleDate.format('dddd, MMMM DD, YYYY')}</Text>
                </View>
                <View style={[styles.panel, styles.scheduleList]}>
                {
                    (() => {
                        if(this.props.isLoading) {
                        return (<Text>Loading</Text>)
                    }
                    else
                    {
                        return (<ScheduleList dataSource={this.props.dataSource} onSchedulePress={this.props.onSchedulePress} />);
                    }
                    })()
                }
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: 250,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    panel: {
        backgroundColor: '#FFF',
        borderColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        margin: 10
    },
    calendarWrapper: {
        alignItems: 'stretch',
        height: 250
    },
    today: {
        flexDirection: 'row',
        padding: 15,
        marginTop: 0,
        marginBottom: 0
    },
    scheduleList: {
        padding: 0,
        flex: 1
    },
});

module.exports = ScheduleSidebar;
