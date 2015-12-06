/**
 * @class Titlebar
 * @author Jasim
 */
'use strict';

import React, { StyleSheet, Text, View, Image, 
	TouchableWithoutFeedback, TouchableHighlight, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CredentialStore from '../../stores/credentialStore';
import AppStore from '../../stores/appStore';

class Titlebar extends React.Component {
    constructor(args) {
        super(args);
    }
    onLogout() {
        CredentialStore.logout();
    }
    render() {
        return (
            <View style={styles.titlebar}>
                <TouchableWithoutFeedback>
                    <Icon name="list" size={65} color="#FFF" style={styles.icon}  />
                </TouchableWithoutFeedback>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.user}>{this.props.user.name}</Text>
                    <Text style={styles.designation}>{this.props.user.profession}</Text>
                </View>
                <View style={styles.title}>
                </View>
                <TouchableHighlight underlayColor="#A51820" onPress={this.onLogout.bind(this)}>
                    <View style={styles.logoutButton}>
                        <Icon name="key" size={18} style={styles.logoutButtonText} />
                    	<Text style={styles.logoutButtonText}>Logout</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

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
  },
  title: {
      flex: 1
  },
  logoutButton: {
      backgroundColor: '#A51820',
      margin: 3,
      padding: 5,
      flexDirection: 'row'
  },
  logoutButtonText: {
      color: '#FFF',
      fontWeight: 'bold'
  },
});

module.exports = Titlebar;
