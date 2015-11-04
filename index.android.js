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


import {Titlebar} from './components/common/Titlebar';
import {Infobar} from './components/common/Infobar';
import {Sidebar} from './components/meeting/Sidebar';
import {ContentSidebar} from './components/meeting/ContentSidebar';
import {Meeting} from './components/meeting/Meeting';
import {Dashboard} from './components/dashboard/Dashboard';
import {WelcomeScreen} from './components/welcome/WelcomeScreen';
import {Gallery} from './components/gallery/Gallery';
import {Login} from './components/auth/Login';
import {Schedule} from './components/schedule/schedule';

let _navigator  =  null;

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
      _navigator = navigator;
      switch(route.id) {
          case 'welcome':
            return (<WelcomeScreen navigator={navigator} />)
            break;
          case 'meeting':
            scene = (
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
            break;
          case 'schedule':
            scene = (<Schedule navigator={_navigator} />);
            break;
          case 'login':
            scene = (<Login navigator={_navigator} />);
            break;
          case 'dashboard':
            scene = (<Dashboard navigator={_navigator} />);
            break;
      }
      let appScene = (
          <View style={styles.container}>
             <Titlebar  />
             <Infobar roomNo={this.state.roomNo} navigator={_navigator}/>
             <View style={styles.appContainer}>
                {scene}
            </View>
          </View>
      );
      return appScene;
  },

  render: function () {
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{title: 'Dashboard', id: 'login', sceneConfig: Navigator.SceneConfigs.FloatFromRight,}}
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
