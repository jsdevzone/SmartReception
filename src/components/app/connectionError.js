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

import React, { View, Text, StyleSheet, } from 'react-native';

/**
 * Displays a banner when the internet connection lost
 * @class ConnectionError
 * @extends React.Component
 */
export default class ConnectionError extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
        super(args);
    }
    /**
     * @render
     * @return {View} component
     */
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Can not connect to network, please check the connection...</Text>
            </View>
        );
    }
};

/**
 * @styles
 */
const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#D68989',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#FFF'
    }
});
