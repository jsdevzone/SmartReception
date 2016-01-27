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
import React, {StyleSheet, Text, View, Image, TouchableHighlight, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

// Custom Local Components
import Tile from './tileBlock';
import UserStore from '../../stores/userStore';
import RouteStore from '../../stores/routeStore';
import AppStore from '../../stores/appStore';
import Meeting from '../meeting/meeting';

/**
 * @class UpcomingMeeting
 * @extends React.Component
 *
 * A simple tile block which displays the upcoming meeting of logged in user
 *
 * @props {Navigator} navigator
 */

export default class UpcomingMeeting extends React.Component {

    /**
     * @constructor
     */
    constructor(args){
        super(args);

        this.state = { isLoading: true, meeting: {} };

        /**
         * When the requested data is loaded using UserStore, the store fires nextmeetingloaded event.
         * Check UserStore.getNextMeeting() method for more details about loading the next meeting of the current user.
         */
        UserStore.addEventListener('nextmeetingloaded', this.onMeetingLoaded.bind(this));
    }

    /**
     * Lifecycle event of react js. Triggered just before the view is rendered to the screen
     *
     * @lifecycle
     * @return {Void} undefined
     */
    componentDidMount() {
        UserStore.getUpcomingMeeting(AppStore.user.UserName || 1).then(this.onMeetingLoaded.bind(this));
    }

    /**
     * When the next meeting is loaded from the server this method should be triggered as a handler. And data
     * should be attached to this component as state.
     *
     * @eventhandler
     * @param {Meeting} data, details of meeting loaded from the server
     * @return {Void} undefined
     */
    onMeetingLoaded(data) {
        if(data) {
            this.setState({ meeting: data, isLoading: false });
        }
    }

    /**
     * Event handler, when user press on this component screen should change to meeting screen
     *
     * @eventhandler
     * @param {String} name name of the route. check the Dashboard component to get the list of route list.
     * @return {Void} undefined
     */
    onTilePress(name) {
        if(this.state.meeting.BookedMeetingId) {
            let route = RouteStore.get(name)
            if(route) {
                let routeConfig = {
                    id: 'meeting',
                    title: 'Meetings',
                    component: Meeting,
                    props: {
                        meeting: this.state.meeting
                    }
                };
                this.props.navigator.push(routeConfig);
            }
        }
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {View} the tile view
     */
    render() {

        let date = Moment(new Date());
        let meeting = this.state.meeting;

        if(!this.state.isLoading && this.state.meeting.DateOfMeeting)
            date = Moment(meeting.DateOfMeeting, Moment.ISO_8601);
        let time = date.format('MMMM Do, hh:mm:ss A');

        let fullName = null;
        if(meeting.Clients)
            fullName = meeting.Clients.FirstName + " " + meeting.Clients.LastName;

        /**
         * Here the component displays the information of the client for next meeting
         */

        let component = (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            </View>
        );

        /**
         * If the data is not yet loaded from the server we should display a loading message
         */
        if(!this.state.isLoading)
            component = (
                <View style={styles.profileInfoWrapper}>
                    <Text style={styles.name}>{this.state.meeting.Clients.FirstName + " " + this.state.meeting.Clients.LastName}</Text>
                    <View style={styles.profileItemWrapper}>
                        <Icon name="envelope" size={18} color="#B5C8E2" />
                        <Text style={styles.profileItem}>{this.state.meeting.Clients.Email}</Text>
                    </View>
                    <View style={styles.profileItemWrapper}>
                        <Icon name="phone" size={18} color="#B5C8E2" />
                        <Text style={styles.profileItem}>+27 78 669 2347</Text>
                    </View>
                    <View style={styles.profileItemWrapper}>
                        <Icon name="map-marker" size={18} color="#B5C8E2" />
                        <Text style={styles.profileItem}>{this.state.meeting.Clients.Location}</Text>
                    </View>
                </View>
            );

        return(
            <Tile scale="large" style={{ alignItems: 'stretch' }} onPress={() => this.onTilePress('meeting')}>
                <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.userProfileWrapperLeft}>
                            <Text style={{color:'#2A5488'}}>Next </Text>
                        </View>
                        <View style={[styles.userProfileWrapperLeft, {flex: 1, backgroundColor:'#DBE7F5', alignItems: 'flex-end'}]}>
                            <Text style={{color:'#2A5488'}}>{time}</Text>
                        </View>
                    </View>
                    <View style={[styles.userProfileWrapper, {flex: 1}]}>
                        <View style={{backgroundColor:'#FFF', width: 80, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}}
                                    style={styles.profileImage} />
                        </View>
                        { component }
                    </View>
                </View>
            </Tile>
        );
    }
}

/**
 * @style
 */
const styles = StyleSheet.create({
    dashboardContainer: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        flexDirection: 'column'
    },
    horizontal: {
        flexDirection: 'row'
    },
    searchTileWrapper: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    copyrightBanner: {
        alignItems:'flex-end',
        flex :1,
        padding: 25
    },
    userProfileWrapper: {
        backgroundColor: '#EAEEF5',
        borderBottomColor: '#D8E0F1',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    profileImage: {
        width: 60,
        height: 60,
        borderColor: '#EAEEF5',
        borderWidth: 5,
        borderRadius: 5
    },
    profileInfoWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'stretch'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5B7EB8'
    },
    profileItemWrapper: {
        flexDirection: 'row',
        paddingTop: 2,
        flexWrap: 'nowrap'
    },
    profileItem: {
        color: '#5B7EB8',
        flexWrap: 'nowrap'
    },
    userProfileWrapperLeft: {
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 80,
        padding: 5,
        backgroundColor: '#EAEEF5'
    },
});
