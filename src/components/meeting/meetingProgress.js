
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
            duration: 2,
            percentage: 0,
            percentageColor: '#FFF',
            currentSecond: 0,
            currentMinutes: 0,
        };
    }
    componentDidMount() {
        let _tick = (this.state.duration * 60 * 1000) / 100;
        let _step = 1 / (_tick/1000);
        let _second = null;

        setInterval(()=>{
            if(this.state.percentage < 100) {

                if(this.state.currentSecond == 0 )
                    _second = 59
                else
                    _second = this.state.currentSecond - 1;

                this.setState({
                    percentage: this.state.percentage + _step,
                    percentageColor: getPercentageColor(this.state.percentage + _step),
                    currentSecond: _second
                });
            }
        }, 1000);

    }
    render() {
        let complete = this.state.percentage;
        let incomplete = 100 - this.state.percentage;

        return (
            <View style={styles.container}>
                <Text>00:{this.state.currentSecond}</Text>
                <View style={{ flex: 1,borderColor:'#CCC', height: 10, borderWidth: 1, marginLeft: 5, marginRight: 5, marginTop: 4, flexDirection: 'row' }}>
                    <View style={[styles.complete, { flex: complete, backgroundColor: this.state.percentageColor }]}>
                    </View>
                    <View style={[ styles.incomplete, { flex: incomplete}]}>
                    </View>
                </View>
                <Text>50:00</Text>
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
