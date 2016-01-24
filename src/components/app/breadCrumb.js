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
import React,{ StyleSheet, Text, View, Image, TouchableHighlight, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

import AppStore from '../../stores/appStore';
import MeetingProgress from '../meeting/meetingProgress';

/**
 * BreadCrumb is the gold colored bar just in the bottom of the title bar. Left side is the
 * BreadCrumb links. Center region contains the current meeting progress bar and right most part is
 * the current date.
 *
 * @class BreadCrumb
 * @extends React.Component
 */
 export default class BreadCrumb extends React.Component {
     /**
      * @constructor
      */
     constructor(args) {
        super(args);

        /**
         * @state
         */
         this.state = {
             /**
              * Navigation Stack
              * @state {Object} stack - the navigation stack
              */
             stack: this.props.navigator.state.routeStack,
             /**
              * Boolean status for whether app has ongoing meeting inside
              * @state {Boolean} hasMeeting
              */
             hasMeeting: false
         };
         /**
          * Check the AppStore if any ongoing meeting is there in the stack. If yes
          * make the hasMeeting status into true
          */
         if(AppStore.hasActualMeeting()) {
           this.state.hasMeeting = true;
         }
         /**
          * Add the handler for meetingfinished event. When the advisor press the meeting finish button
          * the progress bar should be disappeared.
          */
         AppStore.addEventListener('meetingfinished', this.onMeetingFinish.bind(this));
         /**
          * Add the handler for meetingstarted event. When the advisor press the meeting start button
          * in <MeetingIntro/> component  the progress bar should be visible.
          */
         AppStore.addEventListener('meetingstarted', this.onMeetingStart.bind(this));
     }

     /**
      * On press a link inside the BreadCrumb, the naviagtion should be moved to the
      * corresponding scree.
      * @eventhandler
      * @param {Number} index
      * @return {Void} undefined
      */
     onBreadCrumbPress(index) {
         var _route = this.props.navigator.state.routeStack[index];
         this.props.navigator.popToRoute(_route);
     }

     /**
      * When meeting finish change the state
      * @eventhandler
      * @return {Void} undefined
      */
     onMeetingFinish() {
         this.setState({ hasMeeting: false });
     }

    /**
     * When meeting start change the state
     * @eventhandler
     * @return {Void} undefined
     */
     onMeetingStart() {
         this.setState({ hasMeeting: true });
     }

     /**
      * Iterate  over the navigation stack and create BreadCrumb links.
      * @return {Array<Component>} breadCrumbItems
      */
     iterateNavigator() {
         let _breadCrumb = new Array();
         /*
          *  Start iterating
          */
     	this.state.stack.map((route, index) => {
            let _separator =  (index < this.state.stack.length - 1) ? ' > ': '';
            /*
             * Each item in the breadCrumbItem is an instance of TouchableHighlight component
             */
            let _breadCrumbItem = (
                <TouchableHighlight key={index} onPress={this.onBreadCrumbPress.bind(this, index)}>
                    <Text style={styles.breadCrumbItem}>{route.title}{_separator}</Text>
                </TouchableHighlight>
            );
     		_breadCrumb.push(_breadCrumbItem);
     	});
     	return _breadCrumb;
     }
     /**
      * Render the bread crumb bar into the screen
      * @render
      * @return {Component} View
      */
     render() {
         let today = Moment().format('MMMM Do YYYY');
         /*
          * if any ongoing meeting show the meeting progress screen
          */
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
/**
 * @style
 */
const styles = StyleSheet.create({
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
