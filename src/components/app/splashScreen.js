'use strict';

import React, { StyleSheet, Text, View, Image, } from 'react-native';

class SplashScreen extends React.Component {
    render() {

        let _status = "Loading...";
        let _url ="http://i1.pepperfry.com/img/grey.gif";

        return (
            <View style={styles.container}>
                <Image source={{uri: _url}} style={styles.loadingImage} />
                <Text style={styles.status}>{this.props.status}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingImage: {
        width: 300,
        height: 300
    },
    status: {

    }
});

module.exports = SplashScreen;
