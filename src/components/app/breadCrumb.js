/**
 * Sample React Native App
 * @author Jasim
 */
'use strict';

import React,{ StyleSheet, Text, View, Image, TouchableHighlight, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import AppStore from '../../stores/appStore';
import MeetingProgress from '../meeting/meetingProgress';

class BreadCrumb extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            stack: this.props.navigator.state.routeStack,
            hasMeeting: false
        };
        if(AppStore.hasActualMeeting()) {
          this.state.hasMeeting = true;
        }
        AppStore.addEventListener('meetingfinished', this.onMeetingFinish.bind(this));
        AppStore.addEventListener('meetingstarted', this.onMeetingStart.bind(this));
    }
    onBreadCrumbPress(index) {
        var _route = this.props.navigator.state.routeStack[index];
        this.props.navigator.popToRoute(_route);
    }
    onMeetingFinish() {
      this.setState({ hasMeeting: false });
    }
    onMeetingStart() {
      this.setState({ hasMeeting: true });
    }
    iterateNavigator() {
    		let _breadCrumb = new Array();
    		this.state.stack.map((route, index) => {
    				let _separator =  (index < this.state.stack.length - 1) ? ' > ': '';
    				let _breadCrumbItem = (
    						<TouchableHighlight onPress={this.onBreadCrumbPress.bind(this, index)}>
    								<Text style={styles.breadCrumbItem}>{route.title}{_separator}</Text>
    						</TouchableHighlight>
    				);
    				_breadCrumb.push(_breadCrumbItem);
    		});
    		return _breadCrumb;
    }
    render() {
    	let today = Moment().format('MMMM Do YYYY');
      let hasMeeting = this.state.hasMeeting ? (<MeetingProgress isInBreadCrumb={true} />) : null;
        return (
            <View style={styles.infobar}>
                <View style={{flexDirection:'row'}}>
                    <Icon name="home" color="#FFF" size={15} style={styles.infoText} />
                    { this.iterateNavigator() }
                </View>
                <View style={styles.content}>
                    {hasMeeting}
                </View>
                <View style={styles.rightSectionWrapper}>
                    <Icon name="clock-o" color="#FFF" size={15} style={styles.infoText} />
                    <Text style={styles.date}>{today}</Text>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({
  infobar: {
    height: 45,
    width: null,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#766946'
  },
  icon: {
    color: '#FFF',
    width: 32,
    height: 32,
    fontSize: 30,
    marginLeft: 10
  },
  infoText: {
    color: '#FFF',
    marginLeft: 10,
    marginTop: 5
  },
  breadCrumbItem: {
  	color: '#FFF', 
  	marginLeft: 2, 
  	marginTop: 3, 
  	fontSize: 15
  },
  rightSectionWrapper: {
  	flexDirection:'row'
  },
  date: {
  	color: '#FFF', 
  	marginLeft: 2, 
  	marginTop: 3, 
  	fontSize: 15
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    alignItems: 'center'
  }
});

module.exports = BreadCrumb;
