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
            hasMeeting: hasMeeting
        };
    }
    render() {
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
                    <MeetingArea meeting={this.state.meeting} />
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
