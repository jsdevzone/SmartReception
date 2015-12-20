'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 */

import React, { StyleSheet, Text, View, TouchableHighlight, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

import Calendar from '../ux/calendar';
import ScheduleList from './scheduleList';


/**
 * @class ScheduleSidebar 
 * @extends React.Component 
 * 
 * Sidebar view with calendar and schedule list on schedule search screen
 *
 * @props {Boolean} isLoading status whether data is loading or not
 * @props {DataSource} dataSource for schedule list
 * @props {Function} onSchedulePress -  event handler for schedule press
 * @props {Function} onDaySelected - event handler for day press on calendar
 * @props {Date} scheduleDate - date of the current schedule selected
 */
export default class ScheduleSidebar extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);

        /**
         * @state
         */
        this.state = {
            today: Moment()
        }
    }

     /**
     * Renders the scene. [See Rect Js Render Method for more details]
     * @render
     * @return {View} view
     */
    render() {
        
        let component =  (
            <ScheduleList dataSource={this.props.dataSource} onSchedulePress={this.props.onSchedulePress} />
        );


        // If the parent component is loading the data from server, then show loading message .
        if(this.props.isLoading) {
            component = (
                <View style={styles.loadingWrapper}>
                    <View style={styles.loadingInner}>
                        <Text>Loading</Text>
                    </View>
                </View>
            );
        }


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


/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        width: 270,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#F7F8FC',
        borderRightColor: '#e8e8e8',
        borderRightWidth: 1
    },
    panel: {
    },
    calendarWrapper: {
        alignItems: 'stretch',
        height: 270
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
