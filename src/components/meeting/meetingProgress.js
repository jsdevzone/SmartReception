
/**
 * @class MeetingProgress
 * @author Jasim
 */
'use strict';

import React, { StyleSheet, Text, View, Image, 
    
    TouchableHighlight, TextInput, } from 'react-native';

import moment from 'moment';
import ProgressBar from '../ux/progressBar';
import AppStore from '../../stores/appStore';

import {getPercentageColor} from '../../utils/color';


class MeetingProgress extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            duration: 0, percentage: 0, currentHour: '00',
            percentageColor: '#FFF', currentSecond: "00",
            currentMinutes: '00', target: '00:00',
            current: '00:00', meetingStarted: false
        };
        
        if(this.props.meeting && this.props.meeting.Duration) {
            let _duration = this.props.meeting.Duration.split(":");
            let _minutes = (parseInt(_duration[0]) * 60) + parseInt(_duration[1]);
            this.state.duration = _minutes;
            this.state.target = this.props.meeting.Duration;
        }

        AppStore.addEventListener('meetingstarted', this.onMeetingStarted.bind(this));
        AppStore.addEventListener('meetingfinished', this.stopProgress.bind(this));
    }
    componentDidMount() {
        if(AppStore.currentMeeting && AppStore.currentMeeting.ActualMeetings) {
            let _tick = (this.state.duration * 60 * 1000) / 100;
            let _step = 1 / (_tick / 1000);     
            let _strt = moment(AppStore.currentMeeting.ActualMeetings.MeetinStartTime);
            let _diff = (new Date().getTime() - _strt._d.getTime()) / 1000;
        }
    }
    onMeetingStarted(meeting) {
        this.setState({ meetingStarted: true });
        this.startProgress();
    }
    startProgress(startTime) {
       
        let _tick = (this.state.duration * 60 * 1000) / 100;
        let _step = 1 / (_tick / 1000);
        let _second = null;
        let _minute = null;
        let _hour = null;

        this._timer = setInterval(()=>{
            if(this.state.percentage < 100) {
                _second = parseInt(this.state.currentSecond);
                _minute = parseInt(this.state.currentMinutes);
                _hour = parseInt(this.state.currentHour);

                    if(_second == 59 ) {
                        _second = 0
                        _minute = _minute + 1;
                    }
                    else
                        _second = _second + 1;

                    if(_minute == 59)
                        _hour = _hour + 1;

                    if(_second < 10)
                        _second = "0" + _second;

                    if(_minute < 10)
                        _minute = "0" + _minute;

                    if(_hour < 10)
                        _hour = "0" + _hour;

                    this.setState({
                        percentage: this.state.percentage + _step,
                        percentageColor: getPercentageColor(this.state.percentage + _step),
                        currentSecond: _second,
                        currentMinutes: _minute,
                        currentHour: _hour
                    });
                }
            }, 1000);
    }
    stopProgress() {
        clearInterval(this._timer);
    }
    render() {
        let complete = this.state.percentage;
        let incomplete = 100 - this.state.percentage;

        return (
            <View style={styles.container}>
                <Text>{this.state.currentHour}:{this.state.currentMinutes}:{this.state.currentSecond}</Text>
                <View style={{ flex: 1,borderColor:'#CCC', height: 10, borderWidth: 1, marginLeft: 5, marginRight: 5, marginTop: 4, flexDirection: 'row' }}>
                    <View style={[styles.complete, { flex: complete, backgroundColor: this.state.percentageColor }]}>
                    </View>
                    <View style={[ styles.incomplete, { flex: incomplete}]}>
                    </View>
                </View>
                <Text>{this.props.meeting.Duration}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F1F3',
        padding: 10,
        flexDirection: 'row',
        borderTopColor: '#D8E0F1',
        borderTopWidth: 1,
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1,
        justifyContent: 'center',
        width: 300
    },
    incomplete: {
        backgroundColor: '#CCC'
    },
    complete: {
        flex: 0
    }
});

module.exports = MeetingProgress;
