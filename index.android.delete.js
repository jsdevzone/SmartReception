


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