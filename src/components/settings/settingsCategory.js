/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var Tile = require('../home/tileBlock');
var ReactMaterial = require('react-native-material-kit');

import { getRandomColor, } from '../../utils/util';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

const {
  MKCardStyles,
  MKButton,
} = ReactMaterial;

class SettingsCategory extends React.Component{
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={{flex:1, flexDirection:'column',padding: 30}}>
            <View style={{padding: 10, borderBottomColor:'#CCC', borderBottomWidth: 1, marginBottom: 5}}>
                <Text style={styles.titleText}>Settings</Text>
                <Text>
                    Change your application settings here.
                </Text>
                <Text>
                    Tap any of the categories below and change the values on right side.
                </Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 30}}>
                <Tile icon="lock" text="list" scale="small" style={{backgroundColor: getRandomColor() }} iconColor="#FFF" textColor="#FFF" />
                <Tile icon="cog" text="cog" scale="small" style={{backgroundColor: getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
                <Tile icon="calendar" text="calendar" scale="small" style={{backgroundColor: getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
            </View>
            <View style={{flexDirection:'row'}}>
                <Tile icon="envelope" text="envelope" scale="small" style={{backgroundColor:getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
                <Tile icon="facebook" text="facebook" scale="small" style={{backgroundColor:getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
                <Tile icon="twitter" text="twitter" scale="small" style={{backgroundColor: getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
            </View>
            <View style={{flexDirection:'row'}}>
                <Tile icon="key" text="key" scale="small" style={{backgroundColor: getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
                <Tile icon="user" text="user" scale="small" style={{backgroundColor: getRandomColor()}} iconColor="#FFF" textColor="#FFF" />
            </View>
        </View>
        <View style={{flex:1, backgroundColor:'#CCC',padding: 10}}>
            <View style={styles.button}>
                <Text style={styles.button}>sdf</Text>
            </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#FFF',
    },
    titleText: {
        fontSize: 30
    },
    button:{
        backgroundColor:'#FFF',
        shadowOffset:{
           width: 10,
           height: 10,
       },
       shadowColor: 'black',
       shadowOpacity: 1.0,
   }
});
module.exports = SettingsCategory;
