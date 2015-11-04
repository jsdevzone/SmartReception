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
  TextInput,
} = React;

import { IconTextView } from 'react-native-android-iconify';
import { TileView } from './TileView';

var styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: '#E3E3E3',
    flex: 1,
    flexDirection: 'column'
  }
});

export class Dashboard extends React.Component{
  render() {
    return (
      <View style={styles.dashboardContainer}>
        <TileView navigator={this.props.navigator} />
      </View>
    );
  }
}
