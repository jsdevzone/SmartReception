/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @author Jasim
 */
'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

class SplashScreen extends React.Component{
    render() {
        let uri = 'https://camo.githubusercontent.com/60d741b9bfc3081d1c9f4aa6297ba82db8b706b7/687474703a2f2f692e696d6775722e636f6d2f4c4475485a65662e676966';
        return (
            <View style={styles.container}>
                <Image source={{uri: uri}} style={styles.loadingImage} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingImage: {
        width: 300,
        height: 300
    }
});

module.exports = SplashScreen;
