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
  DeviceEventEmitter,
  NativeModules,
} = React;





import {Sidebar} from './components/meeting/Sidebar';
import {ContentSidebar} from './components/meeting/ContentSidebar';

var NavigatorActions = require('./src/actions/navigator');
var ApplicationRoutes = require('./src/constants/appRoutes');


var Dashboard = require('./src/components/home/dashboard');
var UserLogin = require('./src/components/auth/userLogin');
//var Settings = require('./src/components/settings/settingsCategory');
var Meeting = require('./src/components/meeting/meeting');
import Schedule from './src/components/schedule/schedule';
import {Search} from './components/search/Search';
import {Settings} from './components/settings/Settings';
import Attachments from './src/components/app/attachments';
/**
 * Need to optimize the import section
 */
import Titlebar from './src/components/app/titleBar';
import Infobar from './src/components/app/infoBar';
import SplashScreen from './src/components/app/splashScreen';
import CredentialStore from './src/stores/credentialStore';
import ConnectionError from './src/components/app/connectionError';

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
var _index = 0;
var SmartReception = React.createClass({
  getInitialState: function(){
    return {
      currentState: 1,
      roomNo: 1,
      isAuthnticated: true,
      isConnectedToNetwork: false
    };
  },

  componentDidMount: function() {
      NativeModules.SmartReception.startNetworkMonitoring();

      CredentialStore.isAuthnticated().then((value) => this.onGetAuthCredentials(value));
      CredentialStore.addEventListener('logout', this.onApplicationLogout.bind(this));

      DeviceEventEmitter.addListener('connectionchanged', (e)=>{
          this.setState({ isConnectedToNetwork: e.isConnected });
      });
  },

  componentWillUnmount: function() {
      NativeModules.SmartReception.stopNetworkMonitoring();
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

             {(()=>{
                 if(!this.state.isConnectedToNetwork)
                    return (<ConnectionError />);
             })()}

             <View style={styles.appContainer}>
                <Component navigator={_navigator} {...route.props} />
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
