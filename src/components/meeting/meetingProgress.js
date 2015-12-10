
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
            current: '00:00', meetingStarted: false, elapsedTime: new Date('01/01/2015 00:00:00')
        };
        
        if(AppStore.hasActualMeeting()) {
            let meeting = AppStore.currentMeeting;
            let _duration = meeting.Duration.split(":");
            let _minutes = (parseInt(_duration[0]) * 60) + parseInt(_duration[1]);
            this.state.duration = _minutes;
            this.state.target = meeting.Duration;
        }

        AppStore.addEventListener('meetingstarted', this.onMeetingStarted.bind(this));
        AppStore.addEventListener('meetingfinished', this.stopProgress.bind(this));
    }
    componentDidMount() {
        if(AppStore.hasActualMeeting()) {
            let _tick = (this.state.duration * 60 * 1000) / 100;
            let _step = 1 / (_tick / 1000);     
            let _strt = moment(AppStore.currentMeeting.ActualMeetings[0].MeetingStartTime);
            let _diff = (new Date() - _strt._d);
            let _elapsedTime = moment(this.state.elapsedTime).add(_diff, 'milliseconds')._d;

            this.setState({ percentage: (_diff / 1000) * _step, elapsedTime: _elapsedTime})
            this.startProgress()
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
                let _elapsedTime = moment(this.state.elapsedTime).add(1, 'second')._d;
                    this.setState({
                        percentage: this.state.percentage + _step,
                        percentageColor: getPercentageColor(this.state.percentage + _step),
                         elapsedTime: _elapsedTime
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
        let borderColor = this.props.isInBreadCrumb ? '#FFF': '#CCC';
        let style = this.props.isInBreadCrumb ? styles.breadCrumbStyle : styles.container; 
        let color = this.props.isInBreadCrumb ? '#FFF' : '#000';
        return (
            <View style={[style]}>
                <Text style={{color:color}}>{moment(this.state.elapsedTime).format('HH:mm:ss')}</Text>
                <View style={{ flex: 1,borderColor:borderColor, height: 10, borderWidth: 1, marginLeft: 5, marginRight: 5, marginTop: 4, flexDirection: 'row' }}>
                    <View style={[styles.complete, { flex: complete, backgroundColor: this.state.percentageColor }]}>
                    </View>
                    <View style={[ styles.incomplete, { flex: incomplete}]}>
                     </View>
                </View>
                <Text style={{color:color}}>{AppStore.currentMeeting.Duration}</Text>
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
    breadCrumbStyle: {
        paddingTop: 5,
        flexDirection: 'row',
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
