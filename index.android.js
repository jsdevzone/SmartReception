'use strict';

/**
 * Smart Reception System
 * @Author Jasim
 * @Company E-Gov LLC
 *
 * This application uses the Facebook's react native framework to build its User interface.
 * This file is the entry point of this application. If anyone want to edit this application
 * he needs to be master following technologies:
 *      1. JavaScript & ECMA Script 2015
 *      2. React JS - See [https://facebook.github.io/react/]
 *      3. Android Native Development
 *      4. React Native - See [https://facebook.github.io/react-native/]
 *      5. Java
 *      6. Node JS
 *      7. Little bit about Gradle 
 *      8. Flux Architecture - See [https://facebook.github.io/flux/docs/overview.html]
 * These are the technologies i have used in this application.
 * 
 */
import React, { AppRegistry, StyleSheet, Text, View, Image, Navigator, 
  BackAndroid, AsyncStorage, DeviceEventEmitter, NativeModules, } from 'react-native';

import SignalR from 'react-native-signalr';

import Dashboard from './src/components/home/dashboard';
import UserLogin from './src/components/auth/userLogin';
import Titlebar from './src/components/app/titleBar';
import BreadCrumb from './src/components/app/breadCrumb';
import SplashScreen from './src/components/app/splashScreen';
import ConnectionError from './src/components/app/connectionError';
import AppStore from './src/stores/appStore';

import DrawingSurface from './src/components/drawing/drawingSurface';

var _navigator  =  null;
var _initialRoute =  null;
var _isLoggedIn = false;

/**
 * Attach event listener to android back button press.
 * If navigator stack length is greater than one it pops out 
 * the last  route from the stack. If it's the dashboard then exit 
 * the application to the android home screen.
 * Refer navigator component of react native for more details.
 * 
 * https://facebook.github.io/react-native/docs/navigator.html 
 * 
 *
 */
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1  ) {
        return false;
    }
    _navigator.pop();
    return true;
});

/**
 * @class SmartReception
 * @extends React.Component
 * 
 * This is  the entry point of the application.  And this class deals with the almost every
 * application related events and state. You can check it's constructor to get the registered event listeners and it's
 * host methods
 *
 */
class SmartReception extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
        super(args);        
        // Initial route variable -  first screen should be the SplashScreen class
        // as there will be some delay on rendering complex dashboard screen
        // we should provide a loading screen to user to make them feel that 
        // the application is highly responsive.
        _initialRoute = { 
            id: 'splashscreen', title: 'SplashScreen', component: SplashScreen 
        };
        
        // React Js State for this SmartReception components
        this.state = {
            isLoading: true,
            // if the user is logged it, this should be true.
            isAuthenticated: false,
            // this status will be changed based on the internet connection.
            isConnectedToNetwork: false,
            // current user[advisor] logged in to this application
            user: {},
            data: '',
            // status for currently any meeting is going on
            hasCurrentMeeting: false
        };
        
        // Loads the application settings from AsyncStorage
        // You can find more about AsyncStorage in the url below
        // https://facebook.github.io/react-native/docs/asyncstorage.html#content
        AppStore.loadAppSettings();
        
        /*
         *  Loading settings is always asyncrounous. After settings are loaded from the local storage
         *  AppStore class will emit appsettingsloaded event with loaded settings as parameter. 
         *  This line captures the event registers handler for the event
         */ 
        AppStore.addEventListener('appsettingsloaded', this.onAppSettingsRetrieve.bind(this))
        
        /*
         * Registers handler for logout event from AppStore
         * Logout event is triggered when user press logout button on title bar.
         */ 
        AppStore.addEventListener('logout', this.onAppLogout.bind(this));
        
        /* When an advisor finishes a meeting with client whole application needs be notified that 
         * the current meeting is finished and ui should be changed according the event.
         * This event is fired when advisor press finish meeting on meeting screen.
         */ 
        AppStore.addEventListener('meetingfinished', this.onMeetingFinished.bind(this));
        
        /*
         * Event handler registration for meeting posted event. This event is fired when 
         * the advisor press  confirm meeting button on meeting screen
         */
        AppStore.addEventListener('meetingposted', this.onMeetingFinished.bind(this));
        
        /* 
         * When the device network state changed connection changed event will be triggered.
         * Note that this is not a standard event on the platform. You can find a custom broadcast 
         * receiver on SmartReception.java class which emits this event on connection status change.
         */ 
        DeviceEventEmitter.addListener('connectionchanged', this.onConnectionStatusChanged.bind(this));
    }
    
    /**
     *  Life cycle method
     *  This method will be called when the component is mounted to the application
     *  See React Js componentDidMount method.
     * 
     *  @lifecycle
     *  @return {Void} undefined
     */
    componentDidMount() {
        NativeModules.SmartReception.startNetworkMonitoring();
    }

    /**
     * Configuring SignalR event for Real Time Communication
     * @return {Void} undefined
     */
    configureSignalR() {

    }
    
    /**
     * Event handler for meeting finished event. It just go back to the previous screen, ie. 
     * to dashboard from meeting screen by popping out the natvigator route.
     * 
     * @eventhandler
     * @return {Void} undefined
     */
    onMeetingFinished() {
        _navigator.pop();
    }
    
    /**
     * Event handler for settings loaded event. This fires on startup of the application.
     * 
     * @eventhandler
     * @param {Object} _settings the settings objects loaded from local storage by AppStore class
     * @return {Void} undefined
     */
    onAppSettingsRetrieve(_settings) {
        this.setState({ data: JSON.stringify(_settings) });
        let route = null;
        let isAuthnticated = _settings.isAuthenticated;
        let newState = { 
            isAuthnticated: false, 
            user: _settings.user, 
            data:isAuthnticated, 
            isLoading: true
        };
        // If no previous authentication found, change the screen to UserLogin screen 
        if(!isAuthnticated) 
            route = { component: UserLogin, id: 'login', title: 'Login' };
        else {
            // If a previous authentication found, then load the Dashboard screen
            newState.hasCurrentMeeting = _settings.currentMeeting != undefined;
            route = { component: Dashboard, id: 'dashboard', title: 'Dashboard', props: { isClientModule: false } };
        }
        // Set the component state to change load the settings loaded from local storage
        this.setState(newState);
        
        // Currently navigator is showing loading screen. So replace it with route object assigned
        // on above line then show it on the screen.
        _navigator.replaceAtIndex(route, 0);
        _navigator.popToTop();
    }
    
    /**
     * Triggers when user logged out of the application. 
     * This method just redirect into the login screen.
     * 
     * @eventhandler
     * @return {Void} undefined
     */
    onAppLogout() {
        this.setState({ isAuthnticated: false, });
        _navigator.replaceAtIndex({ component: UserLogin, id: 'login', title: 'Login' }, 0);
        _navigator.popToTop();
    }
    
    /**
     * When network state changed this method will be notified and component state will be changed.
     * If no internet connection then a banner will appear on top of the application.
     * 
     * @eventhandler
     * @return {Void} undefined
     */
    onConnectionStatusChanged(e) {
        this.setState({ isConnectedToNetwork: e.isConnected });
    }
    
    /**
     * Navigator's configureScene method defines the  transformation effect to new scene.
     * 
     * @return {SceneConfig} 
     */
    configureScene() {
        return Navigator.SceneConfigs.PushFromRight;
    }
    
    /**
     * Lifecycle event of react js. Triggered just before the view is rendered to the screen
     * 
     * @lifecycle
     * @return {Void} undefined
     */
    componentWillUnmount() {
        NativeModules.SmartReception.stopNetworkMonitoring();
        if(AppStore.isRecording) {
            NativeModules.MediaHelper.stopRecording();
        }
    }
    
    /**
     * This method renders the scene of given route
     * 
     * @param {Object} route
     * @param {Navigator} navigator
     * @return {View} app
     */
    renderScene(route, navigator) {
        let scene = null;
        let Component = route.component;
        let routeProps = route.props ;
        let connectionInfo = !this.state.isConnectedToNetwork ? (<ConnectionError/>) : null;

        _navigator = navigator;

        // This is the  advisor module
        let app = (
            <View style={ styles.container }>
                <Titlebar user={this.state.user} />
                <BreadCrumb navigator={_navigator} />
                {connectionInfo}
                <View style={ styles.appContainer }>
                    <Component navigator={_navigator} {...route.props} />
                </View>
            </View>
        );

        /**
         * If the route has the property isClientModule which is true then thre will
         * not be titlebar and infobar and that scene will be full screen. Normally Client Module
         * in which the clients can login on reception area has this property true
         */
        if(route.props && route.props.isClientModule == true) {
            app = (
                <View style={ styles.container }>
                    <View style={ styles.appContainer }>
                        <Component navigator={_navigator} {...route.props} />
                    </View>
                </View>
            );
        }

        return app;
    }
    
    /**
     * React Js  Render method. This is the main component rendering method.
     * Check out React Js documentation for more about render method.
     * @return {Navigator} navigator
     */
    render() {
        return (
            <Navigator debugOverlay={false} 
                  initialRoute={_initialRoute} 
                  configureScene={this.configureScene.bind(this)}
                  renderScene={this.renderScene.bind(this)} />
        );
    }
}

/**
 * @style
 */
var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#d9232d',
    alignItems: 'stretch'
  },
  appContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFF'
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  shadowSeparator: {
    width: 5
  }
});

// This line hooks the SmartReception component to the android ecosystem.
AppRegistry.registerComponent('SmartReception', () => SmartReception);