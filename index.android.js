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
} = React;

import {Config} from './Config';

import {Titlebar} from './components/common/Titlebar';
import {Infobar} from './components/common/Infobar';
import {Sidebar} from './components/meeting/Sidebar';
import {ContentSidebar} from './components/meeting/ContentSidebar';
import {Meeting} from './components/meeting/Meeting';

var NavigatorActions = require('./src/actions/navigator');
var ApplicationRoutes = require('./src/constants/appRoutes');
var Dashboard = require('./src/components/home/dashboard');
var UserLogin = require('./src/components/auth/userLogin');
var Settings = require('./src/components/settings/settingsCategory');

let _navigator  =  null;
let _initialRoute =  ApplicationRoutes.getRoute('dashboard', { component: Settings });

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
      roomNo: 1
    };
  },

  titleClick:function () {
    var id = this.state.currentState == 1 ? 0 : 1;
    this.setState({ currentState: id});
  },

  configureScene: function (route) {
      return Navigator.SceneConfigs.PushFromRight;
  },

  renderScene: function (route, navigator) {
      let scene = null;
      let Component = route.component;
      _navigator = navigator;

      NavigatorActions.registerNavigator(_navigator);

      let meetinScene = (
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
        renderScene={this.renderScene}
      />
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
