
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
        let customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let component =  (<ScheduleList dataSource={this.props.dataSource} onSchedulePress={this.props.onSchedulePress} />);
        if(this.props.isLoading)
            component = (
                <View style={styles.loadingWrapper}>
                    <View style={styles.loadingInner}>
                        <Text>Loading</Text>
                    </View>
                </View>
            );
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
                    {component}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: 270,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#F7F8FC'
    },
    panel: {
    },
    calendarWrapper: {
        alignItems: 'stretch',
        height: 250
    },
    today: {
        flexDirection: 'row',
        padding: 15,
        marginTop: 0,
        marginBottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8'
    },
    scheduleList: {
        padding: 0,
        flex: 1
    },
    loadingWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingInner: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 4,
        borderColor: '#CCC',
        borderWidth: 1
    }
});

module.exports = ScheduleSidebar;
