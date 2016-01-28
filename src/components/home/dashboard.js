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

import React, { StyleSheet, Text, View, Image,
    TouchableHighlight, TextInput, NativeModules } from 'react-native';

//Custom npm dependencies
import Icon from 'react-native-vector-icons/FontAwesome';

// Custom components
import Tile from './tileBlock';
import Meeting from '../meeting/meeting';
import Schedule from '../schedule/schedule';
import SplashScreen from '../app/splashScreen';
import UpcomingMeeting from './upcomingMeeting';
import ClientHome from '../client/ClientHome';
import ClientSearch from '../client/clientSearch';
import Feedback from '../feedback/feedback';
import Notifications from './notifications';
import FeedbackSummary from './feedbackSummary';
import Settings from '../settings/settings';
import Survey from '../feedback/survey';
//Stores
import UserStore from '../../stores/userStore';
import RouteStore from '../../stores/routeStore';
import AppStore from '../../stores/appStore';

/**
 * Adds routes to the route store
 */
RouteStore.add('meeting', { title: 'Meeting', component: Meeting });
RouteStore.add('calendar', { title: 'Calendar', component: Schedule });
RouteStore.add('splash', { title: 'Splash Screen', component: SplashScreen });
RouteStore.add('client', { title: 'Client', component: ClientHome, props: { isClientModule: true }});
RouteStore.add('client search', { title: 'Clients', component: ClientSearch });
RouteStore.add('feedback', { title: 'Feedback', component: Feedback });
RouteStore.add('settings', { title: 'Settings', component: Settings });
RouteStore.add('survey', { title: 'Survey', component: Survey });
/**
 * @class Dashboard
 * @extend React.Component
 *
 * @props {Navigator} navigator
 * Home screen for the DA. This contains metro style tile designs
 */
export default class Dashboard extends React.Component{

    /**
     * @constructor
     */
    constructor(args){
        super(args);
        this.state = { meeting: {} };
    }

    /**
     * Handles the user press event on tile, and shows the new screen by changing the navigation
     *
     * @eventhandler
     * @param {String} route
     * @return {Void} undefined
     * */
    onTilePress(route) {
        this.props.navigator.push(RouteStore.get(route));
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {Void} undefined
     */
    render() {
        return (
            <View style={styles.dashboardContainer}>
                <View style={[{ margin:15, alignItems:'center' }]}>
                    <View style={[styles.horizontal, { marginTop: 25 }]}>
                        <View>
                            <View style={styles.horizontal}>
                                <Tile onPress={() => {
                                    if(AppStore.hasActualMeeting()) {
                                    this.onTilePress('meeting')
                                    }
                                }} icon="calendar-check-o" text="Meeting" scale="small"  />
                                <Tile onPress={() => this.onTilePress('calendar')} icon="calendar" text="Calendar" />
                                <UpcomingMeeting navigator={this.props.navigator} />
                            </View>
                            <View style={styles.horizontal}>
                                <FeedbackSummary />
                                <View>
                                    <Tile onPress={() => this.onTilePress('settings')} icon="cog" text="Settings" />
                                    <Tile onPress={() => this.onTilePress('client search')} icon="user" text="Clients" />
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <Tile icon="comments-o" text="Feedback" onPress={() => this.onTilePress('feedback')} />
                                { this.renderSearchTile() }
                                <Tile icon="check-square-o" text="Survey" onPress={() => this.onTilePress('survey')} />
                            </View>
                        </View>
                        { this.renderScheduleTile() }
                    </View>
                </View>
                { this.renderCopyrightBanner() }
            </View>
        );
    }

    /**
     * Renders the date tile on dashboard
     * @return {Tile} tile
     */
    renderDateTile() {
        return (
            <Tile  onPress={() => this.onTilePress('client')}>
                <Text>Wednsday, 11:19:05</Text>
                <Text style={{fontSize: 20, marginTop: 4}}>October</Text>
                <Text style={{fontSize: 35}}>28</Text>
                <Text style={{fontSize: 20}}>2015</Text>
            </Tile>
        );
    }

    /**
     * Renders the search tile on dashboard
     * @return {View} tile
     */
    renderSearchTile() {
        return (
            <View style={styles.horizontal}>
                <Tile scale="large">
                    <View style={styles.searchTileWrapper}>
                        <Icon name="search" size={65} color="#F03552" style={{marginLeft: 10}}/>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 18}}>Search</Text>
                            <Text>Search people or meeting here...</Text>
                        </View>
                    </View>
                </Tile>
              </View>
        );
    }

    /**
     * Renders the right most big schedule tile on dashboard
     * @return {Tile} tile
     */
    renderScheduleTile() {
        let alignment = { alignItems: 'stretch' };

        return (
            <Tile scale="fullColumn" style={alignment}>
                <Notifications {...this.props} navigator={this.props.navigator}/>
            </Tile>
        );
    }

    /**
     * Render the copyright banner on bottom right corner of  dashboard
     * @return {View} component
     */
    renderCopyrightBanner() {
        return (
            <View style={styles.copyrightBanner}>
                <Text>Powered By - e-Gov LLC </Text>
            </View>
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
    },
    profileItem: {
        color: '#5B7EB8'
    },
    userProfileWrapperLeft: {
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 80,
        padding: 5,
        backgroundColor: '#EAEEF5'
    },
});
