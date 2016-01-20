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
import React, { View, StyleSheet, Text,  TouchableWithoutFeedback, NativeModules } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';

/**
 * Custom Class Header
 *
 * @class Button
 * @extends React.Component
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
         this.state = {};
     }

     /**
      * On Press Handler
      * @eventhandler
      * @return {Void} undefined
      */
     onPress() {
         if(!this.props.disabled) {
            /**
             * Play the native tap sound, as it's not supported in default view component by react native
             */
            NativeModules.MediaHelper.playClickSound();
            /**
             * execute on press event passed through the props
             */
            if(this.props.onPress)
                this.props.onPress();
        }
     }

     /**
      * @render
      * @return {View} view
      */
     render() {
         /**
          * If any props with disabled = true then don't respond to the events
          */
         let color = "#424242";
         /**
          * If disabled change the color
          */
         if(this.props.disabled)
             color = "#CCC";

         return (
             <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                 <View style={[styles.button, styles[this.props.borderPosition || 'right'], this.props.style]}>
                     <Icon name={this.props.icon} size={30} color={color} />
                     <Text style={{textAlign:'center', color: color}}>{this.props.text}</Text>
                 </View>
             </TouchableWithoutFeedback>
         );
     }
 }

/**
 * @style
 */
const styles = StyleSheet.create({
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
    },
    none: {
        borderWidth: 0
    }
});
