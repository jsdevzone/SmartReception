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
  TouchableWithoutFeedback
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var styles = StyleSheet.create({
  titlebar: {
    height: 55,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 10
  },
  icon: {
    color: '#FFF',
    width: 32,
    height: 32,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 5
  },
  user: {
    color: "#FFF",
    fontSize: 18
  },
  designation: {
    color: "#FFF",
    fontSize: 13
  }
});


export class Titlebar extends React.Component{
  render() {
    return (
      <View style={styles.titlebar}>
        <TouchableWithoutFeedback  onPress={this.props.onTitleToggle}>
          <Icon name="list" size={65} color="#FFF" style={styles.icon}  />
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.user}>John Doe</Text>
          <Text style={styles.designation}>Business Advisor</Text>
        </View>
      </View>
    );
  }
}
