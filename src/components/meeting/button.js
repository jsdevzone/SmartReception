'use strict';

import React, {  StyleSheet, Text, View, Image, TouchableHighlight,
  TouchableWithoutFeedback, TextInput, ListView,} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


class Button extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={[styles.button, styles[this.props.borderPosition || 'right'], this.props.style]}>
                    <Icon name={this.props.icon} size={30} />
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

var styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5
    },
    right: {
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1,
    },
    left: {
        borderRightColor: '#D8E0F1',
        borderRightWidth: 1,
    },
    bottom: {
        borderBottomColor: '#D8E0F1',
        borderBottomWidth: 1,
    }
});

module.exports = Button;