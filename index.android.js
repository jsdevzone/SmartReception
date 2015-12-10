
'use strict';

import React, { AppRegistry, StyleSheet, Text, View, Image, Navigator, 
  BackAndroid, AsyncStorage, DeviceEventEmitter, NativeModules, } from 'react-native';

import Dashboard from './src/components/home/dashboard';
import UserLogin from './src/components/auth/userLogin';
import Titlebar from './src/components/app/titleBar';
import BreadCrumb from './src/components/app/breadCrumb';
import SplashScreen from './src/components/app/splashScreen';
import ConnectionError from './src/components/app/connectionError';
import AppStore from './src/stores/appStore';


var _navigator  =  null;
var _initialRoute =  null;
var _isLoggedIn = false;

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1  ) {
        return false;
    }
    _navigator.pop();
    return true;
});

class SmartReception extends React.Component {
    constructor(args) {
        super(args);        
        _initialRoute = { 
            id: 'splashscreen', title: 'SplashScreen', component: SplashScreen 
        };
        this.state = {
            isLoading: true,
            isAuthenticated: false,
            isConnectedToNetwork: false,
            user: {},
            data: '',
            hasCurrentMeeting: false
        };
        AppStore.loadAppSettings();
        AppStore.addEventListener('appsettingsloaded', this.onAppSettingsRetrieve.bind(this))
        AppStore.addEventListener('logout', this.onAppLogout.bind(this));
        AppStore.addEventListener('meetingfinished', this.onMeetingFinished.bind(this));
        AppStore.addEventListener('meetingposted', this.onMeetingFinished.bind(this));
        DeviceEventEmitter.addListener('connectionchanged', this.onConnectionStatusChanged.bind(this));
    }
    componentDidMount() {
        NativeModules.SmartReception.startNetworkMonitoring();
    }
    onMeetingFinished() {
        _navigator.pop();
    }
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
        if(!isAuthnticated) 
            route = { component: UserLogin, id: 'login', title: 'Login' };
        else {
            newState.hasCurrentMeeting = _settings.currentMeeting != undefined;
            route = { component: Dashboard, id: 'dashboard', title: 'Dashboard', props: { isClientModule: false } };
        }
        this.setState(newState);
        _navigator.replaceAtIndex(route, 0);
        _navigator.popToTop();
    }
    onAppLogout() {
        this.setState({ isAuthnticated: false, });
        _navigator.replaceAtIndex({ component: UserLogin, id: 'login', title: 'Login' }, 0);
        _navigator.popToTop();
    }
    onConnectionStatusChanged(e) {
        this.setState({ isConnectedToNetwork: e.isConnected });
    }
    configureScene() {
        return Navigator.SceneConfigs.PushFromRight;
    }
    componentWillUnmount() {
        NativeModules.SmartReception.stopNetworkMonitoring();
        if(AppStore.isRecording) {
            NativeModules.MediaHelper.stopRecording();
        }
    }
    renderScene(route, navigator) {
        let scene = null;
        let Component = route.component;
        let routeProps = route.props ;
        let connectionInfo = !this.state.isConnectedToNetwork ? (<ConnectionError/>) : null;

        _navigator = navigator;

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
    render() {
        return (
            <Navigator debugOverlay={false} 
                  initialRoute={_initialRoute} 
                  configureScene={this.configureScene.bind(this)}
                  renderScene={this.renderScene.bind(this)} />
        );
    }
}

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

AppRegistry.registerComponent('SmartReception', () => SmartReception);
