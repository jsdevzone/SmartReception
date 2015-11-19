/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CredentialStore from '../../stores/credentialStore';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} = React;

class Titlebar extends React.Component{

    onLogout() {
        CredentialStore.logout();
    }

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
                <View style={styles.title}>
                </View>
                <TouchableHighlight underlayColor="#A51820" onPress={this.onLogout.bind(this)}>
                    <View style={styles.titlebarRightButton}>
                        <Icon name="key" size={18} style={styles.titlebarRightButtonText} />
                        <Text style={styles.titlebarRightButtonText}>Logout</Text>
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
    titlebarRightButton: {
        backgroundColor: '#A51820',
        margin: 3,
        padding: 5,
        flexDirection: 'row'
    },
    titlebarRightButtonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
});

module.exports = Titlebar;
