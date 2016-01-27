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

 import React, { View, StyleSheet, Text, TextInput, } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';

 /**
  * Custom Text Field With icon on th right side
  *
  * @class TextField
  * @extends React.Component
  *
  * @props {Object} style - Custom style object
  * @props {String} placeholder - Palceholder text for input Text
  * @props {String} icon - Font icon name
  * @props {String} iconColor - Hex color for icon color
  * @props {Function} onChangeText - Handler function on text change event
  * @props {String|Object|Number} value -The text field value. It should be attached with some state
  * @props {String} keyboardType  - The type of keyboard
  * @props {Number}  maxLength - Maximum allowed charecter
  */
export default class TextField extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
         super(args);
    }

    /**
     * @render
     * @return {View} view
     */
    render() {
        let icon = null;
        if(this.props.icon)
            icon = (<Icon name={this.props.icon} color={this.props.iconColor || "#B52216" } size={20} />);
        return (
            <View style={[styles.textFieldWrapper, this.props.style]}>
                <TextInput style={styles.textField}
                    underlineColorAndroid="#F4F4F4"
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.keyboardType || "default"} />
                {icon}
            </View>
        );
    }
 }

/**
 * @style
 */
const styles = StyleSheet.create({
    textFieldWrapper: {
        flexDirection: 'row',
        height: 40,
        borderColor:'#F4F4F4',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        color: '#000',
        flex: 1
    },
});
