/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
import { IconTextView } from 'react-native-android-iconify';
import { ProgressBar } from '../ux/ProgressBar';
import { SidebarButton } from './ContentSidebar'

var styles = StyleSheet.create({
  meetingTitle: {
    padding: 10
  },
  meetingTitleInner: {
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  currentDateWrapper: {
    flexDirection: 'column',
    padding: 5,
    textAlign: 'center',
    borderColor: "#CCC",
    borderRightWidth: 1,
    paddingRight: 25,
    paddingLeft: 25,
  },
  currentDateText: {
    fontSize: 45,
  },
  currentWeekText: {
    fontSize: 18,
    color: "#000"
  },
  meetingTitleTextWrapper: {
    padding: 10,
    flex: 1
  },
  meetingTitleText: {
    fontSize: 40,
    marginBottom: 10
  },
  footer: {
    backgroundColor: '#F4F4F4',
    height: 70,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopColor: '#CCC',
    borderTopWidth: 1
  },
  finishButton: {
    backgroundColor: '#D9232D',
    borderColor:'#771318',
    borderWidth: 1,
    textAlign: 'center',
    alignItems:'center',
    flexDirection: 'column',
    width:85,
    height: 45,
    borderRadius: 4,
    marginTop: 14
  }
});

export class Meeting extends React.Component{
  render() {
    return (
      <View style={{flex:1,  flexDirection: 'column'}}>
        <MeetingTitle />
        <View style={{flex:1, alignItems: 'stretch', flexDirection: 'column'}}>
            <View style={{
                margin: 10, padding: 10,
                marginTop: 10,
                backgroundColor: '#F1F1F1', flex: 1,
                shadowColor: '#AB965D',
                borderColor: '#E6E0CE',
                borderWidth: 1,
                alignItems: 'center'
              }}>
                <Text style={{color: "#CCC"}}> Please Add Your Notes Here </Text>
            </View>
            <View style={{
                margin: 10, padding: 10,
                marginTop: 0,
                backgroundColor: '#F1F1F1', flex: 1,
                shadowColor: '#AB965D',
                borderColor: '#E6E0CE',
                borderWidth: 1,
                alignItems: 'center'
              }}>
                <Text style={{color: "#CCC"}}> Please Add Your Summary Here </Text>
            </View>
        </View>
        <MeetingFooter />
      </View>
    );
  }
}

class MeetingTitle extends React.Component {
  render() {
    return (
      <View style={styles.meetingTitle}>
        <View style={styles.meetingTitleInner}>
          <View style={styles.currentDateWrapper}>
            <Text style={styles.currentWeekText}>Tuesday</Text>
        <Text style={styles.currentDateText}>27</Text>
          </View>
          <View style={styles.meetingTitleTextWrapper}>
            <Text style={styles.meetingTitleText} >Project 1 - Company 1</Text>
            <View style={{flexDirection: 'row'}}>
                <Icon name="calendar" style={{marginTop: 3}} />
            <Text> Tuesday, October 27, 2015 </Text>
              <Icon name="clock-o" style={{marginTop: 3, marginLeft: 30}} />
                <Text>07: 00- 09: 00 </Text>
            </View>
          </View>
          <FinishButton />
        </View>
      </View>
    );
  }
}

class MeetingFooter extends React.Component {
  render() {
    return (
      <View style={styles.footer}>
        <SidebarButton  text="Survey" icon='comments-o'/>
      <SidebarButton  text="Feedback" icon='check-square-o'/>
    <SidebarButton  text="Questionaire" icon='list-alt'/>
  <SidebarButton text="Transfer" icon='exchange'/>
          <View style={{flex:1, flexDirection:'column', padding: 5}}>
            <Text>Meeting Progress </Text>
            <ProgressBar   color="#766946"  borderColor="#766946" />
          </View>
          <SidebarButton text="Finish" icon='check'/>
      </View>
    );
  }
}

class FinishButton extends React.Component {
  render() {
    return (
      <View style={styles.finishButton}>
        <Text style={{color:"#FFF", fontSize: 20, marginTop: 8}}>Save</Text>
      </View>
    )
  }
}
