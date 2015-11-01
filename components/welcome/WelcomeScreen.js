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
  TouchableHighlight,
  Navigator
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

export class WelcomeScreen extends React.Component{

  constructor(props) {
     super(props);
     this.state = {
       uri: 'http://smeworld.ae/wp-content/uploads/2013/09/dubaiSMElogo.png'
     };
   }

  render() {

    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: '#FFF', alignItems: 'center'}}>
          <Image source={require('image!logo')} style={{width: 400, height: 160, marginTop: 40, marginBottom: 20}} />
        <Text style={{margin:10,fontSize: 45, color:'#000'}}>
            Welcome To Dubai SME
          </Text>

        <Image source={require('image!emiratesid')} style={{width: 350, height: 220, marginTop: 40, marginBottom: 40}} />
        <TouchableHighlight onPress={() => {
            this.props.navigator.push({title: 'Meeting', id: 'dashboard', sceneConfig: Navigator.SceneConfigs.FloatFromRight,})
          }}>
        <View style={{flexDirection: 'row', width: 280, padding: 10, backgroundColor: '#D9232D', borderWidth: 1, borderColor: '#731117', alignItems: 'center', justifyContent: 'center'}}>

            <Text style={{color:'#FFF', fontSize: 20}}>
              Scan Your Emirates Id
            </Text>

            <Icon name="arrow-right" color="#FFF" size={20} style={{marginTop: 4, marginLeft: 10}} />
          </View>
          </TouchableHighlight>

          <Text style={{color:'#766946', fontSize: 17, marginTop: 10}}>
          I don't have Emirates ID
          </Text>

        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  whitePart: {

  }
});
