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
import React, {  StyleSheet,  Text,  View, } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Custom Class Header
 *
 * @class MeetingTitle
 * @extends React.Component
 */
export default class MeetingTitle extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
        super(args);

        /**
         * @state
         */
         this.state = {};
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         var time = moment.utc(this.props.meeting.DateOfMeeting);
         time.add(parseInt(this.props.meeting.Duration.split(":")[0]), 'h');
         time.add(parseInt(this.props.meeting.Duration.split(":")[1]), 'm')
         return (
             <View style={styles.meetingTitle}>
                 <View style={styles.meetingTitleInner}>
                     <View style={styles.meetingTitleTextWrapper}>
                         <Text style={styles.meetingTitleText} >{this.props.meeting.Subject }</Text>
                         <View style={{flexDirection: 'row'}}>
                             <Icon name="calendar" style={{marginTop: 3}} />
                             <Text>{moment.utc(this.props.meeting.DateOfMeeting).format('MMMM Do YYYY')}</Text>
                             <Icon name="clock-o" style={{marginTop: 3, marginLeft: 30}} />
                             <Text>{moment.utc(this.props.meeting.DateOfMeeting).format('hh:mm:ss')}- {time.format('hh:mm:ss')} </Text>
                         </View>
                     </View>
                     <View style={styles.currentDateWrapper}>
                         <Text style={styles.currentWeekText}>{time.format('dddd')}</Text>
                         <Text style={styles.currentDateText}>{time.format('DD')}</Text>
                     </View>
                 </View>
             </View>
         );
     }
 }

/**
 * @style
 */
const styles = StyleSheet.create({
    meetingTitle: {
        backgroundColor: '#EAEEF5',
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
    },
    meetingTitleInner: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    meetingTitleTextWrapper: {
        padding: 10,
        flex: 1
    },
    meetingTitleText: {
        fontSize: 28,
        marginBottom: 10
    },
    currentDateWrapper: {
        flexDirection: 'column',
        padding: 5,
        textAlign: 'center',
        borderColor: "#D8E0F1",
        borderLeftWidth: 1,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 10
    },
    currentDateText: {
        fontSize: 35,
    },
    currentWeekText: {
        fontSize: 18,
        color: "#000"
    }
});
