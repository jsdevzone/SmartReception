'use strict';
/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 *
 * Copyright (C) E-Gov LLC, Dubai, UAE - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import React, { View, StyleSheet, Text,  Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';

/**
 * Application SplashScreen
 *
 * @class SplashScreen
 * @extends React.Component
 */
export default class SplashScreen extends React.Component {
     /**
      * @constructor
      */
    constructor(args) {
         super(args);

        /**
         * @state
         */
        this.state = {};
    }

     /**
      * @render
      * @return {View} view
      */
    render() {
        let _status = "Loading...";
        let _url ="http://i1.pepperfry.com/img/grey.gif";

        return (
            <Image source={require('../../../resources/images/splashbg.jpg')} style={styles.container}>
                <Text style={styles.title}>Smart Reception System</Text>
                <Text style={styles.loadingText}>Loading...</Text>
            </Image>
        );
    }
}
/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null
    },
    title: {
        fontSize: 28,
        color: '#FFF',
        fontFamily: 'Verdana'
    },
    loadingText: {
        fontSize: 14,
        color: '#FFF',
        fontFamily: 'Verdana'
    }
});
