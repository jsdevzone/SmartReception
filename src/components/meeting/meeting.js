/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var Sidebar = require('../app/sidebar');
var UserProfile = require('./userProfile');
var MeetingArea = require('./meetingArea');

import SplashScreen from '../app/splashScreen';
import MeetingIntro from './meetingIntro';
import AppStore from '../../stores/appStore';



var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

class Meeting extends React.Component{
    constructor(args){
        super(args);
        var hasMeeting = false;
        if(this.props.meeting) {
            hasMeeting = true;
        }
        this.state = {
            meeting: this.props.meeting || {},
            hasMeeting: hasMeeting,
            isMeetingStarted: false
        };

        AppStore.on('meetingstarted', () => {
            var meeting = this.state.meeting;
            meeting.State = 1;
            this.setState({ isMeetingStarted: true, meeting: meeting });
        });



    }
    render() {
        var content = this.state.isMeetingStarted ? ( <MeetingArea  meeting={this.state.meeting} /> ): ( <MeetingIntro meeting={this.state.meeting} /> )
        if(!this.state.hasMeeting) {
            return (
                <View style={styles.container}>
                    <SplashScreen style={{flex:1}}/>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Sidebar />
                    <UserProfile user={this.state.meeting.Clients} meeting={this.state.meeting}/>
                {content}
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        flexDirection: 'row'
    },
});

module.exports = Meeting;
