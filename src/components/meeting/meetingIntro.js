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

import React, { StyleSheet, Text, View, Image,TouchableWithoutFeedback, NativeModules, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogAndroid from 'react-native-dialogs';
import Moment from 'moment';

// Store
import AppStore from '../../stores/appStore';

/**
 * @class MeetingIntro
 * @extends React.Component
 *
 * If the meeting is not started yet, this screen will be displayed and they can start meeting from this screen.
 *
 * @props {Meeting} meeting
 */
export default class MeetingIntro extends React.Component {

    /**
     * @constructor
     */
    constructor(args) {
        super(args);
        /**
         * @state
         */
        this.state = {
            buttonText: 'Start Your Meeting'
        };

    }

    /**
     * Checks the meeting is delayed or not
     * @param {BookedMeeting} meeting
     * @return {Boolean} isDelayed
     */
    isDelayed(meeting) {
        let hasActualMeeting = meeting.ActualMeetings && meeting.ActualMeetings.length > 0;
        if(!hasActualMeeting)
        {
            let startTime = new Date(meeting.DateOfMeeting);
            startTime.setHours(startTime.getHours() - 4);
            startTime = Moment(startTime);
            let endTime = Moment(startTime._d);
            endTime = endTime.add(meeting.Duration.split(':')[0], 'hour');
            endTime = endTime.add(meeting.Duration.split(':')[1], 'minutes');
            endTime = endTime.add(meeting.Duration.split(':')[2], 'second');
            let now = Moment(new Date());
            let difference = now.diff(startTime, 'minutes');
            let totalDiff = endTime.diff(startTime, 'minutes')
            return difference > (totalDiff/2);
        }
        return false;
    }

    /**
     * Event handler for start button press
     * @eventhandler
     * @return {Void} undefined
     */
    onStartButtonPress() {
        /**
         * Play the native tap sound, as it's not supported in default view component by react native
         */
        NativeModules.MediaHelper.playClickSound();

        let dialog = new DialogAndroid();
        let options = {};

        // If the passed meeting dont have actual
        // meeting inside we shows the room selection screen

        if(!AppStore.hasActualMeeting()) {
            /**
             * Read the emirates id data
             */
            this.setState({ buttonText: 'Validating Emirates Id....'})
            NativeModules.MediaHelper.readEmiratesId(content => {
                let client = JSON.parse(content);
                if(client.idnumber==this.props.meeting.Clients.EmiratesIdNo) {
                    // Show waiting dialog
                    NativeModules.DialogAndroid.showProgressDialog();

                    // Get the availaable rooms
                    AppStore.getAvailableMeetingRooms().then(data => {

                        // Hide progress dialog
                        NativeModules.DialogAndroid.hideProgressDialog();

                        /**
                         * Dialog only accepts string array
                         * So transforms server data into string array and save the same locally in this class
                         */
                        var rooms = new Array();
                        data.map(item  => rooms.push(item.Name));

                        options = {
                            title: 'Select A Meeting Area',
                            positiveText: 'Select',
                            items: rooms
                        };

                        /**
                         * Callback for item select
                         */
                        options.itemsCallback = (index) => {
                            // Show waiting dialog
                            NativeModules.DialogAndroid.showProgressDialog();
                            // start the meeting on server
                            AppStore.startMeeting(this.props.meeting, data[index].RoomId).then(() => {
                                // Hide progress dialog
                                NativeModules.DialogAndroid.hideProgressDialog();
                            });
                        };

                        /**
                         * Shows the dialog
                         */
                        dialog.set(options);
                        dialog.show();
                    });

                    this.setState({ buttonText: 'Start Your Meeting'})
                }
                else {
                    this.setState({ buttonText: 'Start Your Meeting'})
                    ToastAndroid.show('Invalid client - Can not match the client identity', ToastAndroid.LONG);
                }
            });
        }
        /**
         * Means that the current meeting has actual meeting.
         * So the user can't start it again.
         */
        else
        {
            options = {
                title: 'Error!',
                content: "Can't start start new meeting without stopping current one",
                positiveText: "OK"
            };
            dialog.set(options);
            dialog.show();
        }
    }

    /**
     * Renders the scene. [See Rect Js Render Method for more details]
     *
     * @render
     * @return {View} component
     */
    render() {
        let startBtn = (
            <TouchableWithoutFeedback onPress={this.onStartButtonPress.bind(this)}>
                <View style={[styles.button, {marginTop: 35}]}>
                    <View style={styles.buttonIcon}>
                        <Icon name="check" size={24} color="#FFF" style={{marginLeft: 10}} />
                    </View>
                    <View style={styles.buttonTextWrapper}>
                        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
        if(this.isDelayed(this.props.meeting))
            startBtn = null;
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <View style={styles.headerWrapper}>
                        <Image source={require('../../../resources/images/35.png')} style={styles.headerIcon} />
                        <Text style={styles.title}>Meeting - #{this.props.meeting.BookedMeetingId}</Text>
                    </View>

                    <View style={[styles.notification, styles.info]}>
                        <Text>You can start you current meeting by pressing start button below this text.
                        Please note that you can not stop the meeting once you started your meeting </Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                        { startBtn }
                    </View>
                </View>
            </View>
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
        backgroundColor: '#FFF',
        alignItems: 'stretch'
    },
    titleWrapper: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: '#919DF1',
        marginBottom: 10
    },
    buttonWrapper: {},
    button: {
        backgroundColor: '#0072bc',
        flexDirection: 'row',
        width: 300,
        alignItems: 'center'
    },
    buttonIcon: {
        backgroundColor: "#8BC34A",
        padding: 10,
        borderColor: '#8BC34A',
        borderWidth: 1
    },
    headerWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon: {
        width: 250,
        height: 250,
        marginBottom: 20
    },
    notification: {
        padding: 10,
        borderWidth:1,
        borderColor:'#66B061',
        margin: 25,
        marginTop: 35,
        width: 450
    },
    info: {
        backgroundColor: '#F2FFF8'
    },
    buttonTextWrapper: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 22
    }
});
