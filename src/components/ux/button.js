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

 import React, { View, StyleSheet, Text,  TouchableNativeFeedback, ToastAndroid, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import DialogAndroid from 'react-native-dialogs';

 /**
  * Custom button to be used in whole application
  *
  * @class Button
  * @extends React.Component
  *
  * @props {Object} style - Custom style object
  * @props {String} iconColor - Hex color for icon color
  * @props {Function} onPress - Handler function on value select
  * @props {String} text -The button text
  * @props {String} icon - The font awesome icon
  */
export default class Button extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
         super(args);
         /**
          * @state
          */
          this.state = {
          };
    }

    /**
     * @render
     * @return {View} view
     */
    render() {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCC', false)}>
                <View style={[styles.button, this.props.style]}>
                    <Icon name={this.props.icon || "table"} size={20}/>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
 }

/**
 * @style
 */
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#B52216',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 0,
        borderColor: '#B52216',
        borderWidth: 1
    },
});
