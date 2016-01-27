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

import Tile from './tileBlock';
import AppStore from '../../stores/appStore';
/**
 * Custom Class Header
 *
 * @class FeedbackSummary
 * @extends React.Component
 */
export default class FeedbackSummary extends React.Component {
    /**
     * @constructor
     */
    constructor(args) {
        super(args);

         /**
          * @state
          */
         this.state = {
             feedbacks :{
                 good: 0,
                 bad: 0,
                 fair: 0
             }
         };
         /**
          * Add handler for on user feedback events.
          */
         AppStore.getUserAverageFeedback().then(this.onUserFeedback.bind(this));
    }

    /**
     * On load user feedbacks
     * @param {Object} data
     * @return {Void} undefined
     */
    onUserFeedback(data) {
        let feedbacks = {};
        feedbacks.good = data.Good || 0;
        feedbacks.fair = data.Fair || 0;
        feedbacks.bad = data.Bad || 0;
        this.setState({ feedbacks: feedbacks });
    }

     /**
      * @render
      * @return {View} view
      */
     render() {
        return (
            <Tile scale="extraLargex2" style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Average Client Feedbacks</Text>
                </View>
                <View style={styles.feedbackContainer} >
                    <View style={styles.feedback}>
                        <Icon name="smile-o" color="#999" size={95} style={styles.feedbackIcon} />
                        <Text style={styles.feedbackText}>{this.state.feedbacks.good}</Text>
                    </View>
                    <View style={styles.feedback}>
                        <Icon name="meh-o" color="#999" size={95} style={styles.feedbackIcon} />
                        <Text style={styles.feedbackText}>{this.state.feedbacks.fair}</Text>
                    </View>
                    <View style={styles.feedback}>
                        <Icon name="frown-o" color="#999" size={95} style={styles.feedbackIcon} />
                        <Text style={styles.feedbackText}>{this.state.feedbacks.bad}</Text>
                    </View>
                </View>
            </Tile>
        );
    }
}
/**
 * @style
 */
const styles = StyleSheet.create({
    container: {
        borderTopColor: '#ECC320',
        borderTopWidth: 4,
        alignItems: 'stretch'
    },
    feedbackContainer: {
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    feedback: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    feedbackIcon: {
        marginBottom: 4,
        paddingLeft: 25
    },
    feedbackText: {
        color: '#999',
        fontSize: 20
    },
    header: {
        padding: 10,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 18,
    }
});
