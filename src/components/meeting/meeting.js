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
    }
    render() {
        return (
            <View style={styles.container}>
                <Sidebar />
                <UserProfile />
                <MeetingArea />
            </View>
        );
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
