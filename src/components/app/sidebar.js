/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

class Sidebar extends React.Component{
  render() {
    return (
      <View style={styles.sidebar}>
        <View  style={styles.iconWrapper} >
          <Icon name='home' size={25} style={styles.icon}/>
        </View>
        <View  style={[styles.iconWrapper, styles.selected]} >
          <Icon name='calendar' size={25} style={styles.icon}/>
        </View>
        <View  style={styles.iconWrapper} >
          <Icon name='cog' size={25} style={styles.icon}/>
        </View>
        <View  style={styles.iconWrapper} >
          <Icon name='calendar-check-o' size={25} style={styles.icon}/>
        </View>
        <View  style={styles.iconWrapper} >
          <Icon name='comments-o' size={25} style={styles.icon}/>
        </View>
        <View  style={styles.iconWrapper} >
          <Icon name='check-square-o' size={25} style={styles.icon}/>
        </View>
        <View  style={styles.iconWrapper} >
          <Icon name='power-off' size={25} style={styles.icon}/>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    sidebar: {
        width: 50,
        flexDirection: 'column',
        backgroundColor:'#393B4A'
    },
    iconWrapper: {
        padding: 15,
        height: 50
    },
    icon: {
        color: '#FFF',
        fontSize: 25,
    },
    selected: {
        backgroundColor: '#766946'
    }
});
