
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../ux/progressBar';
import { getPercentageColor } from '../../utils/color';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

class MeetingProgress extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            duration: 0,
            percentage: 0,
            percentageColor: '#FFF',
            currentSecond: 0,
            currentMinutes: '00',
            target: '00:00',
            current: '00:00',
            meetingStarted: false
        };

        if(this.props.meeting && this.props.meeting.Duration) {
            var minutes =parseInt(this.props.meeting.Duration.split(":")[0]) * 60 + parseInt(this.props.meeting.Duration.split(":")[1])
            this.state.duration = minutes;
            this.state.target = this.props.meeting.Duration;
            this.state.meetinStarted = this.props.meeting.started;
        }
    }
    componentDidMount() {
        if(this.state.duration > 0 && this.state.meetingStarted) {
            let _tick = (this.state.duration * 60 * 1000) / 100;
            let _step = 1 / (_tick/1000);
            let _second = null;
            let _minute = null;

            setInterval(()=>{
                if(this.state.percentage < 100) {
                    _second = parseInt(this.state.currentSecond);
                    _minute = parseInt(this.state.currentMinutes);

                    if(_second == 59 ) {
                        _second = 0
                        _minute = _minute + 1;
                    }
                    else
                        _second = _second + 1;

                    if(_second < 10)
                        _second = "0" + _second;

                    if(_minute < 10)
                        _minute = "0" + _minute;

                    this.setState({
                        percentage: this.state.percentage + _step,
                        percentageColor: getPercentageColor(this.state.percentage + _step),
                        currentSecond: _second,
                        currentMinutes: _minute
                    });
                }
            }, 1000);
        }
    }


    render() {
        let complete = this.state.percentage;
        let incomplete = 100 - this.state.percentage;

        return (
            <View style={styles.container}>
                <Text>{this.state.currentMinutes}:{this.state.currentSecond}</Text>
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
        justifyContent: 'center'
    },
    incomplete: {
        backgroundColor: '#CCC'
    },
    complete: {
        flex: 0
    }
});

module.exports = MeetingProgress;