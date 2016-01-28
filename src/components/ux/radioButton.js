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
 * @class RadioButton
 * @extends React.Component
 */
export default class RadioButton extends React.Component {
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
     * @return {Void} undefined
     */
    onPress() {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();
        /**
         * Execute the handler from props
         */
        if(this.props.onPress)
            this.props.onPress();
    }

    /**
     * @render
     * @return {View} view
     */
    render() {
        let selected = {};
        let selectedInner: {};
        if(this.props.selected) {
            selected = { borderColor: '#BE3450' };
            selectedInner = { backgroundColor : '#BE3450' };
        }

        return (
            <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                <View style={[styles.container, this.props.style]}>
                    <View style={[styles.radioOuter, selected]}>
                        <View style={[styles.radioInner, selectedInner]}>
                        </View>
                    </View>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.label}>{this.props.label}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

/**
 * @style
 */
 const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 7
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#CCC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7
    },
    labelWrapper: {
        marginLeft: 5,
        paddingTop: 2
    },
    selected: {
        borderColor: '#BE3450'
    },
    selectedInner: {
        backgroundColor: '#BE3450'
    }
});
