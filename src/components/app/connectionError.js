'use strict';
import React, { View, Text, StyleSheet, } from 'react-native';

class ConnectionError extends React.Component {
    constructor(args) {
        super(args);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Can not connect to network, please check the connection...</Text>
            </View>
        );
    }
};

var styles = StyleSheet.create({
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

module.exports = ConnectionError;
