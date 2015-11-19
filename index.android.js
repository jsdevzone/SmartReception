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
  Navigator,
  BackAndroid,
  AsyncStorage,
} = React;

import {Config} from './Config';



import {Sidebar} from './components/meeting/Sidebar';
import {ContentSidebar} from './components/meeting/ContentSidebar';

var NavigatorActions = require('./src/actions/navigator');
var ApplicationRoutes = require('./src/constants/appRoutes');


var Dashboard = require('./src/components/home/dashboard');
var UserLogin = require('./src/components/auth/userLogin');
//var Settings = require('./src/components/settings/settingsCategory');
var Meeting = require('./src/components/meeting/meeting');

import {Schedule} from './components/schedule/schedule';
import {Search} from './components/search/Search';
import {Settings} from './components/settings/Settings';

/**
 * Need to optimize the import section
 */
import Titlebar from './src/components/app/titleBar';
import Infobar from './src/components/app/infoBar';
import SplashScreen from './src/components/app/splashScreen';
import CredentialStore from './src/stores/credentialStore';

var _navigator  =  null;
var _initialRoute =  ApplicationRoutes.getRoute('dashboard', { component: SplashScreen });
var _isLoggedIn = CredentialStore.isAuthnticated();

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1  ) {
        return false;
    }
    _navigator.pop();
    return true;
});

var SmartReception = React.createClass({

  getInitialState: function(){
    return {
      currentState: 1,
      roomNo: 1,
      isAuthnticated: true
    };
  },

  componentDidMount: function() {
      CredentialStore.isAuthnticated().then((value) => this.onGetAuthCredentials(value));
      CredentialStore.addEventListener('logout', this.onApplicationLogout.bind(this));
  },

  onGetAuthCredentials: function(value) {
      let route = null;
      let isAuthnticated = (value != '' && value != null);
      this.setState({ isAuthnticated: isAuthnticated });
      if(!isAuthnticated) {
          route = { component: UserLogin, id: 'login', title: 'Login' };
      }
      else {
          route = { component: Dashboard, id: 'dashboard', title: 'Dashboard' };
      }
      _navigator.replaceAtIndex(route, 0);
      _navigator.popToTop();
  },

  onApplicationLogout: function() {
      this.setState({ isAuthnticated: false, });
      _navigator.replaceAtIndex({ component: UserLogin, id: 'login', title: 'Login' }, 0);
      _navigator.popToTop();
  },

  configureScene: function (route) {
      return Navigator.SceneConfigs.PushFromRight;
  },

  renderScene: function (route, navigator) {
      let scene = null;
      let Component = route.component;
      _navigator = navigator;

     // NavigatorActions.registerNavigator(_navigator);

      let meetingScene = (
          <View style={{flex: 1, flexDirection: 'row'}}>
              <Sidebar />
              <View style={styles.contentWrapper}>
                  <ContentSidebar />
                  <View style={{flex:1}}>
                      <Meeting />
                  </View>
              </View>
          </View>
      );

      let appScene = (
          <View style={styles.container}>
             <Titlebar  />
             <Infobar roomNo={this.state.roomNo} navigator={_navigator}/>
             <View style={styles.appContainer}>
                <Component navigator={_navigator}  />
            </View>
          </View>
      );


      return appScene;
  },

  render: function () {
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={_initialRoute}
        configureScene={this.configureScene}
        renderScene={this.renderScene} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#d9232d'
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
